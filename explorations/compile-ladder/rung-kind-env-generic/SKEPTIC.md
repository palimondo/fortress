# Climb batch 33, rung V: the skeptic's check

Head judged: `173fc4a21f`, the worker's last commit. Code head: `18d5b51578`. This is the first skeptic launch on the rung. REPORT.md and record.md were already on the branch. The journal's texts are byte for byte the same (`journal-text.py ... reportText rung:V resume:V` wrote 23563 bytes, `recordText` 10654; `cmp` with the branch's files printed nothing). So no commit was made for them.

The old code ran from `/home/user/fortress-base37`, whose HEAD is `c3b16ef2d1`. That commit is an ancestor of the base `1609258002b0`. `git diff --name-only c3b16ef2d1 1609258002b0` lists no path under `ProjectFortress/src`, `ProjectFortress/astgen`, `Library` or `ProjectFortress/LibraryBuiltin`, so its code is the base's.

## Verdict

**Approved.** The three edits of `CodeGen.java` do what the report says, and only that, each in a member that V's section names. Each follows the code generator's own precedent: `extendJ` at `CodeGen.java:2204-2205` and `:5915-5916`, `bindAndGenerateClauseBody`, and the local tuple binding's element getter at `:4765`. The tests failed on the base's code before the edit was built, and passed after the last change of code. My fixes are four corrections. Each is settled by the brief, the skill or a measured run, and none is contested.

## What I checked

1. **The stages.** Their nohup calls (19:09:20 count, 19:17:12 distance) ran on `18d5b51578`, after the last code edit (18:46:46, built 18:51:39 to 18:54:06). The count table `diff` against `explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt` printed nothing. Distance: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt <worker's table>` printed `DISTANCE SAME   0`, and `#shadow every shadow edit matched the tracked sources`. The shadow patch exited 0 at 18:55:46. No Scala changed, so the count was not run again.
2. **Test first**, from the worker's transcript.
   - 18:38:36: `junit.sh base` on the first forms of tests 1 and 2, before the first build (18:40:56): 'E is not in the kind env [][]', 'T is not in the kind env [][]', 'Tests run: 6,  Failures: 6'.
   - The final forms on the old code, 18:51:24 (tests 1 and 2: the same messages, 6 failures) and 18:54:26 (test 3: 'NoClassDefFoundError: TypecaseTupleNamesCompiled$s').
   - 18:54:40: `junit.sh fix2`, after the last code change was built: 'OK (9 tests)'.
   - At one thread (18:55:10 to 18:55:23): new code 'rc=0 out=PASS' three times; old code the two kind-env messages and the `NoClassDefFoundError`.
3. **The diff, line by line.**
   - The constructor reads each type's inherited methods under `typeAnalyzer.extendJ(tci_sps, tci_decl.getHeader().getWhereClause())`. This is V1's rule, at the site of row 812's stack (base `CodeGen.java:500`).
   - `GenericMethodBodyMakerFnDecl` compiles a generic body in a nested `CodeGen` over the declaration's static parameters and `where` clause. The copy constructor (`CodeGen.java:367-401`) carries every field the body maker read before. `declaredResult` is set on the copy, which is the generator that runs `generateActualMethodCode`.
   - `bindElementsAndGenerateClauseBody` casts to the descriptor that `forTypecase` already tests with: `jvmBoxedTypeName`, which is `makeTupleDescriptor(t, ifNone, false)` (`NamingCzar.java:1103-1105`, `:1454-1463`), as the precedent's `rhs_type_desc` is. It binds each `PlainPattern` other than `_` by its position.
   - No member of Q (`forIf`, `forFnExpr`, `forLetFn`, `castToTypeBelow`) or of I (`forMethodInvocation`) is touched. The hunks of Q's and I's branches (`CodeGen.java:3924-4524` and `:7212-7458` at the base) do not meet V's (`:498`, `:2540-2610`, `:2747`).
4. **The precedent.** The worker's search is right: two of the base's nested constructions extend the analyzer, and `forTypecase` has one binding site.
5. **The tests.** Each test exercises its defect. Each file carried two comment lines: the second, inside `run()`, was the specification's citation. Test 1 cited `trait-parameters.tex`, "Where Clauses", which says nothing of a `comprises` clause. The sentence its members rest on is in `traits.tex`, "Trait Declarations": 'A listed type may be an instantiation of a parameterized trait, provided that every static variable ... is ... a where-clause variable'. Fix 1 corrects both.
6. **Programs of mine** (below).
7. **The three homes.** Two defects that my programs measured had none: row 1067 and row 1068, fix 2. One defect the report named, `APPCOV`'s fall-through `()`, is not a defect: fix 2.
8. **Ledger and siblings.**
   - `ledger-find` on 'kind env', 'typecase clause', 'typecase pattern', 'MatchFailure' and 'VerifyError invokevirtual'. Rows 789, 1010, 1046 and 756 are the checker's and are untouched.
   - No earlier row held the defect of row 1067 or that of row 1068.
   - The other site of the binding defect is the single-name form, which binds already.
   - The other site of the kind environment is a non-generic body's `where`-clause variable. It is left out, and row 867 holds that call.
9. **The report's provenance lines and citations.** Each cited line was opened with `sed -n` and says what is claimed: `CodeGen.java:2204-2205`, `:5915-5916`, `:2568-2576`, `:4743-4768`, `:2659`, `:2890`, `:6933`, `:7069`; base `:500`, `:2539-2540`, `:2714-2715`, `:6892`, `:7028`; `TypeAnalyzer.scala:208`, `:225`; `typecase.tex:12`, `:15`, `:66-67`, `:104-111`; `trait-parameters.tex:329`; `Decls.scala:212`; `OverloadSet.java:2419-2430`; `changes.tex:1732-1734`; `List.fss:93-99`, `:252`; `CovariantCollection.fss:30-38`; `FortressLibrary.fss:1656`, `:1664`.
   - No sentence of the specification is made false (my grep agrees).
   - The whole-suite run is the brief's: `ant testFast` on `18d5b51578`, 'BUILD SUCCESSFUL', compiler track 'Tests run: 1703, Failures: 0' (the 31b gate's 1694 plus 9).
   - Rung V makes false two FACTS sentences that cite row 812, F-181's and F-281's. Fix 4 hands them over.
10. **Competing names.** None. `namesTupleElements`, `bindElementsAndGenerateClauseBody` and `tci_ta` occur only in `CodeGen.java`, and the three test components occur only as their own files, in this tree and in the batch's other worktrees.
11. **Failure mode.** The rung turns compile crashes and `NoClassDefFoundError`s into the values that walk gives. No program of mine gave a quiet wrong value. The one disagreement with walk is row 1068, where walk is wrong.

## Programs of mine, old against new

Under `tmp/rung-kind-env-generic/skeptic/p/`, through `tmp/rung-kind-env-generic/skeptic/diff.sh` (walk new and old, then compile and run new and old). `FORTRESS_THREADS=1`, and `SkC2`, `SkE2`, `SkA2` and `SkB` again at 4 with the same output. The diff shows no mutable variable, field, atomic block or library write.

- `SkA2`, an object `Lw[\X, Y\]` below a generic trait `L[\G\]` below `AnyK comprises { K[\E\] } where [\E\]`. Walk and new print 'Kk', 'Lk'. Old: 'SkA2.fss:12:22: G is not in the kind env [][]' (the middle trait's parameter).
- `SkB`, generic functions over `C[\T\]`, one with `where { U extends Shape }`. New prints 'CC', 'CiC', as walk does. Old: 'SkB.fss:13:33: E is not in the kind env [][]'.
- `SkC2`, tuple patterns with `_`, three elements, a closure that captures the names, a nested `typecase` over the names, and `cat2(up(s), twice(n))`, whose arguments fork. New prints walk's '3', 'y!6', 'none', 'c6', 'n7', 'm'. Old: 'NoClassDefFoundError: CONST'.
- `SkE2`, `(x: T, y: T)` in a generic function, read and unread. New prints walk's 'both T', 'first T', 'neither', 'b', 'd'. Old dies at the read: 'NoClassDefFoundError: SkE2$y'.
- `SkE3`, a tuple pattern in an object's method. New prints walk's '13', '10'. Old: 'NoClassDefFoundError: CONST'.
- `SkF2`, an arrow-typed element read, and a name beside a type-only element, `(s: String, ZZ32) => s || "+int"`. New prints '4', '0', 'm+int'. Walk prints '(m,1)+int': row 1068. Old dies at the arrow's read: 'NoClassDefFoundError: SkF2$f'.
- `SkE1`, a single-name arm in a generic function that calls a method on its name: `a': Bx[\T\] => a'.size()`. Old: 'SkE1.fss:11:26: E is not in the kind env [][]'. New: 'ClassCastException: class com.sun.fortress.nodes.IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType'. That is row 540, rung I's wall, as the report says of `app`.
- `SkD1` and `SkD2`, a name at a trait above its selector's object type, `typecase a of x: Shape => x.nm()` for `a: Sq`, alone and in a pair. Walk prints 'sq' and 'sq1'. Old and new for the single name: 'VerifyError: Bad type on operand stack ... Type 'SkD1$Shape' (current frame, stack[0]) is not assignable to 'SkD1$Sq''. New for the pair: the same; old for the pair: 'NoClassDefFoundError: SkD2$x'. This is row 1067.
- `SkW`, `(s: String, ZZ32) => tag(s)` and `(ZZ32, s: String) => tag(s)` with `tag(x: String)`. Compiled new prints 'string m', 'string n'. Walk, old and new: 'Unification error: Closure/Constructor for tag param 1 (x:String) got arg (m,1): (String,ZZ32)'. This is row 1068. Its mechanism: `Evaluator.forTypecase` binds a single collected name to the whole value and pairs several names with the elements from the first (`interpreter/evaluator/Evaluator.java:1530-1551`).
- `SkM`, a `typecase` without `else` in a function returning `String` and in one returning a trait. Walk, old and new compiled: 's', 'caught', 'REACHED', then 'FortressException: class fortress.CompilerLibrary$MatchFailure with string Match failure'. The pre-typecheck desugarer adds an `else` that throws (`compiler/desugarer/TypecaseExprDesugarer.java:43-49`, applied at `compiler/PreTypeCheckDesugarer.java:118`), so `APPCOV`'s fall-through pushes no `()`.
- `SkL`, the reserved point "a change to the one library's text": `<|1, 2|> || <|3|>` and two concatenations with an empty list, through `List`'s `app`, under walk. Old and new print '<|1, 2, 3|>', '<|3|>', '<|1, 2|>'. `git diff --name-only 1609258002b0...HEAD -- Library ProjectFortress/LibraryBuiltin explorations/run-c4/src explorations/apl/mg` prints nothing. So the rung changes no library text and no model line. The brief leaves the microGPT checks to the commit stage.
- `SkF3` (a nested pattern's names) and `SkC`'s shadowing arm are refused alike by old and new, 'Variable 'i' not found.' and 'Variable s is already declared.': not this rung's.

## The fixes

All four are corrections.

1. `5dcae80838`. **The three tests carry one comment line each.** The citation is folded into the first line, and test 1 cites `traits.tex`, "Trait Declarations". Settled by the brief ('A test file that you write holds one comment line') and `tests-writing.md`, "Names, comments, citations". On the old code, `old-fortress.sh ... junit` of the three, with the pair below: 'E is not in the kind env [][]', 'T is not in the kind env [][]', 'NoClassDefFoundError: TypecaseTupleNamesCompiled$s', 'Tests run: 11,  Failures: 7'. On the head, `ONE_JVM=1 junit.sh skhead ...`: 'OK (11 tests)'.
2. `41448b352b`. **Two defects deferred with `XXX` tests, and `APPCOV`'s fall-through read again.**
   - Row 1067: `compiler_tests/XXXTypecaseClauseNameAboveSelector.test` (run, `run_out_contains=REACHED`) and `TypecaseClauseNameAboveSelectorLink.test` (link). Home 2: `typecase.tex`, "Typecase Expressions", 'the static type of the corresponding identifier is the intersection of T and the corresponding guarding type'. The checker accepts the program, and a `VerifyError` there is home 2 by `tests-writing.md`. Old: 'REACHED', 'java.lang.VerifyError', 'Saw expected failure (Exit code != 0)'. Head: the same, in 'OK (11 tests)'. With both parameters changed to `a: Shape` for one run, then restored (`cmp` equal): 'PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1'.
   - Row 1068: `tests/XXXTypecaseTypeOnlyElementWalk.fss`. `harness-one.sh` on the head and the base build's `harness-one.sh` on the old code each print 'OK Saw expected exception' and 'OK (1 test)'.
   - REPORT.md's and record.md's `APPCOV` sentences now say what `SkM` measured. The two rows are in record.md, in the template, linted ('number 1' is the only rule they fail).
3. `1f79d163b2`. **record.md's FACTS hand-over bounds the `app` form by row 540.** An arm that calls a method on its intersection-typed name stops there (`SkE1`; `app`'s arms 2 and 3).
4. `7ded92f5de`. **F-181's and F-281's row-812 sentences are handed over as false after V.**

No fix changed Java or Scala, so no suite was run.

## Where I differ from the worker

- The worker read `APPCOV`'s typecase as pushing `()`, and listed the reading as not done. A compiled run shows `MatchFailure`.
- The worker's test 2 reads its arms' names through `sz[\T\](a')`, not a method call. That keeps it off row 540, so it shows row 822 closed only where no arm calls a method on an intersection. The FACTS hand-over now says so.
- `TypecaseGenericArmsCompiled` passes with the binding alone (the worker's scratch run). So row 822 closes by the binding, row 1066's repair, and not by V1's kind environment. The worker reports this as decision 3, and the record shows it.
