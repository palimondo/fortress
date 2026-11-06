# Check of c8 (c-run4), base c124c6b65

mech.md: "MECH: 9 lines, 0 failing, every check passes." Pins read: 61f1c6a93, 93884be8d, 83b1cae78, ab067d9b6, 32242b80d, 25238e60c, 052a7c3fe are in the base's history; 8b6fca9b5 and ed4782762 are not, and no new line cites them. closes.txt, dups.txt, pairs.txt are empty.

## 896: rewrite. FAIL (2)
1. Fidelity. Passage: "... at 61f1c6a93. An `EmptyString` name reaches that binding through `asFlatString` (`Library/System.fss:52-56`), by reading. Run: a scratch program of `getProperty("", "?")` under `bin/fortress` printed that line." The run was not on the route the line now describes. Source: the old line (evidence/896.md) says "On climb batch 26's base a flat `""` raised so through the glue class"; at 93884be8d^ `Library/System.fss:45` binds `getProperty` to `interpreter.glue.prim.StringPrim$GetProperty`, and 93884be8d moved it onto `systemOps`. The `systemOps` route at the base is by reading only. Correction, in the notes: replace "(`interpreter/glue/StaticNativeApp.java:252-257`), at 61f1c6a93." with "(`glue/StaticNativeApp.java:252-257`), at 61f1c6a93, by reading."; replace "Run: a scratch program of `getProperty("", "?")` under `bin/fortress` printed that line." with "Run before 93884be8d, through `StringPrim$GetProperty`: `getProperty("", "?")` under `bin/fortress` printed that line."; replace "Workaround: test the name for emptiness first." with "Workaround: test the name for emptiness." (notes 696 of 700).
2. Cold read. Passage, claim: "not as one of the library's" has no noun, and a worker has no target. Correction: end the claim "not as one of the library's exceptions" (claim 227 of 300).
- Nothing lost: passes (the dropped batch-26 sentence is in the history; item 1 restores the run's tree). Present, status (`NEGATIVE-BOUNDED`), reproducer `none` with its program: pass.

## 368: rewrite. FAIL (1)
1. Cold read. Passage: "`java.lang.Error: No Fortress type (yet) for foreign Java type descriptor 'Ljava/lang/Class;'`, imported by no Fortress source." It reads two ways (the helper, or `Class`). The point of the row is that the unused private helper is wrapped all the same. Correction, in the notes: replace ", imported by no Fortress source." with " though no Fortress source imports the helper."; to pay for it, replace "(`compiler/nativeInterface/FortressTransformer.java:53`, `cr.accept(fa, 0)`)" with "(`compiler/nativeInterface/FortressTransformer.java:53`)" (notes 693 of 700).
- Fidelity: the citations hold at the base (FortressTransformer.java:53, FortressMethodAdapter.java:215-225, :250-258, unchanged since 93884be8d). Siblings 895 and 874 first: 874's notes name 368 and the same whole-class wrapper read (`toImplFFFF`, FortressMethodAdapter.java:250-268). Nothing lost, present, status (beside `silent`, item 265): pass.

## 377: measure. PASS
The question is narrow (one compile of the recovered `Sk2OldNew.fss`, then the narrowing); the command runs from the main tree (`git cat-file -e ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss` succeeds); each outcome maps to a rewrite or a close. The throw at the base is `CodeGen.java:2874` (read).

## 812: rewrite. FAIL (1)
1. Cold read. Passage, claim: "a generic trait that defines a member of a trait listing a type at a type `where`-clause variable in its `comprises` clause". The cold reader could not tell which trait lists what. Source: `compiler_tests/ComprisesWhereFunctionalMethodChecker.fss` at the base: `trait AnyC comprises { C[\E\] } where [\E\]`, `trait C[\E\] extends AnyC` defines `cat`. Correction, in the claim: replace "a trait listing a type at a type `where`-clause variable in its `comprises` clause" with "a trait whose `comprises` clause lists a type at a `where`-clause type variable" (claim 240 of 300).
- Fidelity: `STypesUtil.scala:1587` is the `analyzer.lteq(tt2, tt)` in `removeIdenticallyCoveredMethods` (:1573), reached from `properlyInheritedMethodsNotIdenticallyCovered` (:1563-1565), which `CodeGen.java:488` calls, at the base. The program exists; its `.test` is `typecheck` only, so "No gated test" holds. `rung-codegen-where/REPORT.md` exists. Nothing lost: 809 and 775 are FIXED, so the dropped siblings and "Hidden on the base by 809" are false now; the full paths are kept in short form; :485 is re-pinned to :488. Present, status: pass.

## 818: rewrite. PASS
`FortressLibrary.fss:1496` holds `asif`; `CodeGen.java:1675-1677` is `defaultCase` throwing `sayWhat`; the code generator has no `AsIfExpr` at the base (grep: 0); `Evaluator.java:109` is `forAsIfExpr`. The count is pinned "At 32242b80d". The report is now in the notes, with reproducer `none`; `AsIfProbe.fss` was never committed (no history under `perf-probes/codegen-distance/repro/`), so "uncommitted" is true and its text is given. Nothing lost: :1672 re-pinned to :1675, the paths kept in short form.

## 819: rewrite. FAIL (1)
1. Cold read. Passage: "A function, `g(x:(ZZ32,ZZ32)): ZZ32 = h(x)`, prints `3`." `h` is never defined, so a worker cannot rebuild the control. Source: `explorations/perf-probes/codegen-distance/REPORT.md:173`, "for `h(x:(ZZ32,ZZ32)): ZZ32 = 3`". Correction, in the notes: replace that sentence with "A function, `g(x:(ZZ32,ZZ32)): ZZ32 = h(x)`, `h` as `!`, prints `3`."; to pay for it, replace "(`compiler/codegen/CodeGen.java:2874` at c124c6b65)" with "(`CodeGen.java:2874` at c124c6b65)" (notes 695 of 700).
- Fidelity: the sites `FortressLibrary.fss:4199`, `:4200` (`= x#`), `:4242`, `:4243` (`= l#`) hold at the base, pairs and triples; :2874 is the throw. Nothing lost: :4193, :4194, :4236, :4237 and :2821 are re-pinned, not lost. Reproducer `none` with the probe's text: pass.

## 822: rewrite. FAIL (1)
1. Fidelity. Passage, claim: "..., its type analyzer lacking the function's own static parameters: ..." states a cause, while the notes say "not reproduced apart from it, not traced". Source: `REPORT.md:165`, note (c), gives only the stack and the message. Correction: in the claim delete ", its type analyzer lacking the function's own static parameters"; in the notes replace "not reproduced apart from it, not traced." with "not reproduced apart from it; that the analyzer lacks the function's static parameters is untraced." (notes 696 of 700).
- `Library/List.fss:93` is `private app[\T,E extends T,F extends T\]`, `:252` is `object ArrayList[\E\]`; `CodeGen.java:488` is the call of row 812's site. 557 is FIXED, so dropping it is correct (home: row 557, history). Siblings 812, 789 first: pass.

## 874: keep. PASS
`explorations/compile-ladder/plan-25/probes/codegen.sh` is in the tree; `repository/ForeignJava.java:807` is `FortressTransformer.transform(...)` at the base; ForeignJava.java, FortressMethodAdapter.java unchanged from 25238e60c to the base (empty diff). Nothing stands unanswered.

## 875: keep. PASS
`Library/OneShotFlag.fss:18` is `atomic if canTryIt then ...` at the base (unchanged since 25238e60c); at 25238e60c `CodeGen.java:1672` is `defaultCase` and :1733 `forAtomicBlock`, as the row pins; the base's `CodeGen.java` has no `AtomicExpr` case. The commits since that touch CodeGen add no such case.

## 895: rewrite. FAIL (1)
1. Reproducer. Passage: "Run: the distance stage with `Library/FlatString.fss:25-26` edited to name `systemOps.lineSeparator` (it names `stringOps`):" At the base `systemOps` has no `lineSeparator`: its methods are `getProperty` (:20), `getEnvironment` (:24), `getArgs` (:29). The helper moved to `stringOps` (:72) in 8b6fca9b5, gathered into 93884be8d. So the edit as written names a missing helper, and the run was before the move. Correction, in the notes: replace that passage with "Run before 93884be8d moved `lineSeparator` from `systemOps` to `stringOps`: the distance stage with `Library/FlatString.fss:25-26` naming `systemOps.lineSeparator`:"; to pay for it, replace "`ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:29`" with "`nativeHelpers/systemOps.java:29`" (notes 695 of 700).
- Fidelity otherwise: `NamingCzar.java:339-340` maps `FStringVector` to `StringVector`; `System.fss:41`, `:51` name `systemOps`; the pin 93884be8d is in the base's history (8b6fca9b5 is not). Status beside `silent` (item 265): pass.

## 340: rewrite. FAIL (1)
1. Cold read. Passage: "Workaround: `do … end` around it. Same (walk runs all but the last): ..." The bare "Same" reads as "the same workaround" as easily as "the same crash". Source: the old line, "Same crash (walk runs all but the last)". Correction, in the notes: replace "Same (walk" with "Same crash (walk"; to pay for it, replace "two paths reach the coercion with different stacks" with "two paths reach the coercion at unlike stacks" (notes 699 of 700).
- Fidelity: `CodeGen.java:3477-3481` is `methodReturnAndFinish`, :2874 the throw; `typecase.tex:53-55` and :110-111 hold the grammar and the union typing; the XXX tests named exist. Nothing lost: :3425-3427 and :2820-2821 re-pinned; row 498 kept as the first sibling.

## 498: rewrite. PASS
`PatternMatchingDesugarer.scala:668-671` is `checkClause`, keeping `matchType`; `Specification/basic/expressions/typecase.tex:15` defers to the pattern-matching proposal; `patternMatching1.fss:39` is `Leaf(i) => i`; the probe's old path is readable at ab067d9b6^ (`git cat-file -e` succeeds). Status beside `silent` (item 265): pass. Siblings 340 first.

## Counts
Pass: 5 (377, 818, 874, 875, 498). Fail: 7 rows (896 twice; 368, 812, 819, 822, 895, 340).
