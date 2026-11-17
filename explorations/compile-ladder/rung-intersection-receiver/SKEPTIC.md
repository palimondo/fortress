# Rung I (`rung-intersection-receiver`): the skeptic's check

Judged: the worker's head `feca5471a5`. One launch of the skeptic worked this rung; the branch held `REPORT.md` and `record.md` already, byte for byte the texts of the run's journal (`cmp` of `journal-text.py`'s output against both files: no difference), so no commit of them was needed. After my commits the head is the commit of this file.

Verdict: **approved**. The change does what the section and fork I1 ask, and its tests failed on the base's code and pass after. One defect of the change, a getter's call on an intersection sent to a conjunct without that getter, is repaired test first (`e9718fa115`), settled by fork I1. My programs measured three defects that are not the rung's making; each has its home now (section 7). The Appendix I sentence that the rung made false is corrected (`e496234cea`).

## 1. The stages

The section asks for none (STAGE_BLIND). `git diff --name-only 1609258002b0...HEAD` lists `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` and `Specification/appendices/changes.tex` beside the test folders and `explorations/`: `CodeGen.java` is outside the folders that a stage-blind change keeps to, but the count and the distance stages run the checker and no code generation (F-34), and the section waives them; the gate runs both on the merged tree. The report's F-34 measure (`codegen-measure.sh`, 17 refused, 743 emitted, 4 kinds, `@@CG OK FnDecl __filter ... FortressLibrary.fss:1489:1-1497:2`, which I read in the worker's output) ran on `e0a5274db2`'s code, the worker's code, not on my fix; my fix only narrows the owners of a call with no arrow, and a conjunct with a getter the checker found still qualifies, so by reading no declaration of that measure moves. The distance stage's shadow patch applies to the fixed `CodeGen.java`:

    ( python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <tree>/tmp/.../shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py <tree>/tmp/.../shadow-src ); echo exit=$?
    exit=0

## 2. Test first, in the worker's transcript

- Failing on the base's code: call `XKq5WN`, 19:31:10, `junit.sh fail ... CoverageReturnMethodCall.test` (header 19:31:11Z), before the first edit of `CodeGen.java` (call `Giic8K`, 19:32:25): 'java.lang.ClassCastException: class com.sun.fortress.nodes.IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType', 'Tests run: 3,  Failures: 3,  Errors: 0'. The `get` and `pick` assertions were added at 19:35:24 (`NwQNhA`), after the edit had been compiled into a scratch folder (`yfnDsM`, 19:33:14), and seen failing at 19:35:38Z (`HKsoXH`) on the tree's base build (`CodeGen.class` dated 10:53), before `ant compileAll` (`EKvck2`, 19:36:52): the same lines. The base's code ran in both; the skill's order wants the run to end before the edit is first compiled, which the first run meets and the second does not. I take the test as seen failing on the base's code, as the report says it.
- `TypecaseBinderMethodCall`, written after the build, failed on the old code through `old-fortress.sh ... junit` at 19:57:26Z, the same `ClassCastException`, as the skill asks of a test written after the fix.
- Passing after the last change of code (`875e23e726`, whitespace only, rebuilt by 20:04:27 and the library order by 20:05:19): call `VSR9re`, 20:05:24, `junit.sh final ...`: '. run ProjectFortress/compiler_tests/CoverageReturnMethodCall (863ms) PASS', 'OK (22 tests)'.
- `ant testFast` on `2e1dcbaa2d`'s code: 'BUILD SUCCESSFUL', 'Total time: 14 minutes 42 seconds', compiler 1696, library 86, othercompiler 263 (read in the worker's log).

## 3. The diff, and my programs

The edit replaces an intersection receiver type that `sanitizePossibleStupidIntersectionType` leaves whole by its owner among the trait-type conjuncts, the conjuncts the checker searches (`traitTypesCallable`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Common.scala:96-97`), and casts the receiver with `generalizedCastTo` to the class `methodCall` names (`CodeGen.java:7580-7584`, `:631`). The one replaced `receiverType` feeds all three of the base's crash sites (`:7270`, `:7323`, `:7497` on the base). Fork I1 (`explorations/coordinator/CLIMB-BATCH-33.md:561`): "the conjunct that declares or inherits the called method, the most specific where several do"; the worker reads "the called method" as the declaration the checker's arrow names, which is what the fork says, no narrower.

**The finding, a defect of the change.** Where the call has no arrow, as a desugared getter's, the worker's rule took any conjunct with a member of the call's name. A getter of one conjunct beside a method of its name with a parameter in the other compiled to a call of an absent getter. `SkGetterClash`: `trait Shape getter side(): String`, `trait Marked side(n: ZZ32): String`, `object BothShape extends { Shape, Marked }`, and `s'.side || " / " || s'.side(3)` in an arm `s': Marked` over `s: Shape`, and the arm `k': Shape` over `k: Marked`:

    old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches SkGetterClash.fss          (walk)
    shape first: shape side / marked side 3
    marked first: shape side / marked side 4
    FORTRESS_HOME=<tree> FORTRESS_CACHES=<copy of the tree's caches> bin/fortress compile SkGetterClash.fss && ... run SkGetterClash      (the worker's head)
    Caused by: java.lang.NoSuchMethodError: 'fortress.CompilerBuiltin$String SkGetterClash$Marked.side()'
    	at SkGetterClash.viaShape(.../SkGetterClash.fss:14)

On the base's code the compile stops, 'ClassCastException ... IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType', at `CodeGen.forMethodInvocation(CodeGen.java:7323)`.

The other programs, each run under walk on the old code, compiled on the old code and compiled on the rung's code, at `FORTRESS_THREADS=1` (the diff writes no mutable state, field, atomic block or library state; the harness runs above are at four threads):

| program | walk | old compiled | rung compiled |
|---|---|---|---|
| `SkOverride`: `tag` inherited by both from `Tagged`; `who` overridden in `LeftResult` only; `name` in both and in the object, on `choose(m)` | tag: tagged, who: left who, name: both name | compile stops, `ClassCastException` at `CodeGen.java:7323` | the same three lines as walk |
| `SkGetter`: getter `side` in both, overridden in the object; `lonly`, `ronly` in one each | both side, left only, right only | stops, `:7323` | as walk |
| `SkFormTuple`: `(a, k) = (choose(m), 3)`, `a.right()` | right 3 | stops, `:7323` | as walk |
| `SkFormTwo`: a method of two parameters; `typecase q of q': LeftSub => q'.sub() q'.left() q'.right()` on a value typed by the intersection | seven 7; sub left right | stops, `:7323` | as walk |
| `SkGenericBinder`: arm `b': Marked` over `Box[\ZZ32\]` reading `get(): E`, a method of `Marked` and one of `Box`; and in a generic function over `Box[\E\]` | concrete: 42, mark: marked box box, param: s | stops, `:7323` | as walk |
| `SkFormClosure`: `f = fn () => choose(m)`, `f().left()` | closure: left right | stops, `:7323` | links; dies 'Unable to read serialized data for Intersection??' in `instantiateAbstractArrow` |
| `SkClosureNoMethod`: the same closure, `g: LeftResult = f()`, no call on the intersection | left | links; dies the same | links; dies the same |
| `SkVarConjunct`: arm `x': Marked` over `x: X`, `X extends Shape`, `x'.name()` | marked square | 'No such method AND(Marked,X).name.' | the same refusal |
| `SkVarTrait`: arm `x': Shape` over `x: X`, `X extends Object` | marked square other | 'X is not in the kind env [][]' (row 822, rung V's) | the same |
| `SkGetterTypes`: `getter side(): String` in `Shape`, `getter side(): ZZ32` in `Marked`, an object of both, `"binder " \|\| s'.side` | binder shape side | stops, `:7323` | binder 7 |

After my fix (`e9718fa115`), rebuilt: `SkGetterClash` prints walk's two lines; `SkGetter`, `SkOverride`, `SkFormTwo` print what they printed before it; `SkGetterTypes` still prints 'binder 7'.

The reserved point "a change of which declaration a call reaches": `SkOverride` on the base's code and on the rung's. Not reached: every such call stopped the compile on the base (`ClassCastException` at `CodeGen.java:7323`), and on the rung's code each runs the declaration that walk runs, the value's own by the JVM's dispatch on its class. A model line: none; `git diff --name-only 1609258002b0...HEAD -- explorations/run-c4 explorations/apl` prints nothing.

## 4. Where the fix belongs, the precedent

The code generator alone, in `forMethodInvocation`, as the section gives it; the checker's typing stays (P-60). The cast follows rung K's `castToTypeBelow` (`generalizedCastTo`, `CodeGen.java:7652` on the base) and `methodCall`'s own class name (`:631`); the most specific owner follows `emitBodyGivenBy`'s `typeAnalyzer.lteq` (`:7088-7091` on the base). `sameTraitName` copies `Types.sameName` (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:112`), which is private; `Id.equals` compares spans too (`ProjectFortress/src/com/sun/fortress/nodes/Id.java:61-63`), so the copy is needed where `Types.java` is not the rung's to edit. The other casts of a type to `TraitType` or `NamedType` in the file are guarded or read declared types, as the report says.

## 5. The tests

Each test file holds one comment line, says what it checks and is named by its topic; none cites the specification. `CoverageReturnMethodCall` asserts `.right()`, the variable and the getter of row 540's notes. My fix's case went into `TypecaseBinderMethodCall`, the test of methods on a binder typed by an intersection: `sideOf` and `sideOfFlagged`, the two orders of the conjuncts.

## 6. My fix, test first

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfail ProjectFortress/compiler_tests TypecaseBinderMethodCall.test      (worker's head build, 21:10:36Z)
    . run ProjectFortress/compiler_tests/TypecaseBinderMethodCall (553ms) java.lang.NoSuchMethodError
    Caused by: java.lang.NoSuchMethodError: 'fortress.CompilerBuiltin$String TypecaseBinderMethodCall$Flagged.side()'
    Tests run: 3,  Failures: 1,  Errors: 0

Walk prints `PASS` on the extended program (`cd ProjectFortress && ../bin/fortress compiler_tests/TypecaseBinderMethodCall.fss`). The ways: (a) where the call has no arrow, a conjunct qualifies only with a method of the name that takes the call's argument by its number of parameters, none for the void type (`takesArgumentOf`, `CodeGen.java:7564-7571`), taken; (b) the JVM parameter signature of each method against the call's, as `emitBodyGivenBy` matches bodies (`:7125-7132`), not taken: `staticBodySig` unwraps the declared return type, which a method may leave out; (c) the getter modifier, not taken: it misses a setter's call, which has no arrow either; (d) an arrow on the desugared getter call, not taken: the desugarer is a shared phase outside the section. Built with `ant compileAll` and the library order, then:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skpass ProjectFortress/compiler_tests CoverageReturnMethodCall.test TypecaseBinderMethodCall.test CoverageReturnExpected.test CoverageReturnGood.test CoverageReturnGoodReversed.test CoverageReturnInferred.test XXXCoverageReturnInferred.test XXXCoverageReturnBad.test XXXCoverageReturnGenericFamily.test TypecaseBindRungG.test      (21:12:31Z, on e9718fa115's code)
    . run ProjectFortress/compiler_tests/CoverageReturnMethodCall (604ms) PASS
    . run ProjectFortress/compiler_tests/TypecaseBinderMethodCall (628ms) PASS
    OK (22 tests)

No whole suite: the fix is the code generator's (`tests-running.md`, "When to run a whole suite"); the gate runs every suite on the merged tree. Settled by fork I1, `CLIMB-BATCH-33.md:561`, "the conjunct that declares or inherits the called method": a conjunct whose method of the name takes a parameter does not declare the getter called. The worker's report describes the old rule for a getter (section 8, "any of the name where the call has no arrow") without arguing for it; I corrected that description and record.md's finding 2 and FACTS entry to the fixed rule, and moved their line citations to the fixed code (`4c549dc867`, `4b598008ee`). The worker's decisions (section 9) are as written.

## 7. Defects and their homes

- Row 540: home 1, the rung's tests; it closes as record.md says.
- A getter's call on an intersection sent to a conjunct without the getter (the change's own): home 1, repaired, `TypecaseBinderMethodCall` (`e9718fa115`).
- The compiled checker drops a type-parameter conjunct of an intersection before reading its bound, so `x'.name()` in an arm `x': Marked` over `x: X`, `X extends Shape`, is refused, 'No such method AND(Marked,X).name.', where `typecase.tex` ("Typecase Expressions") types the binder by the intersection and walk prints 'marked square': home 2, `compiler_tests/XXXTypecaseBinderParameterBound.test` (`841c1b5e96`), row 1072 in record.md. Seen as expected on the base's code (`old-fortress.sh ... junit`: ' Saw expected failure', 'OK (1 test)') and on the head (' Saw expected failure', 'OK (1 test)'); with `x.name()` in the arm for one run, red: 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'; restored. The rung's owner search keeps to the same conjuncts, so a repair of the checker reaches it.
- A function expression whose result is typed by the intersection dies where its closure is made, 'Unable to read serialized data for Intersection??': a fourth route of row 559, on the base's code too. Home 2, `compiler_tests/XXXIntersectionClosureResult.test` with `IntersectionClosureResultLink.test` (`6ed7ace850`): ' Saw expected failure (Exit code != 0)', 'OK (2 tests)' on the head and on the base's code. Row 559's notes had 6 characters left, so record.md gives its rewrite with the route, linted.
- The compiled checker accepts an object that inherits two getters of one name from sibling traits, where it refuses two dotted methods so inherited ('Invalid overloading of m in object PandQ'); walk runs it too. In `SkGetterTypes` the two paths then answer differently ('binder shape side' under walk, 'binder 7' compiled). No gated test can record a missing refusal of the compiled checker as an expected failure: row 1073 in record.md, reproducer none, as row 653.
- `SkVarTrait`'s 'X is not in the kind env' is row 822's, which rung V repairs; on the merged tree that form reaches the rung's owner search, which finds `Shape`.

## 8. The ledger and sibling sites

`ledger-find` on intersection, conjunct, receiver and typecase binder: rows 540, 541, 543, 559, 367 (a union receiver, the checker's), 964; none but 540 and 559 bears on the change. Walk has no static types and no such cast. No other site of the cast in `CodeGen.java` (section 4).

## 9. The report

Its five provenance lines: each cited line opened with `sed -n` says what the report claims (ledger `:177`, FACTS `:38`, `switch-rehearsal.md:189`, `types-vals-vars.tex:627-628`, `method-invocation.tex:47-48`, the base's `CodeGen.java:7630`, `:7652`, `:7088-7091`, `Types.java:112`, the head's members). The section's own citation of `__filter` at `FortressLibrary.fss:1404` is stale; the report's `:1489` is right. The sentence the change makes false, `Specification/appendices/changes.tex:3740-3747` ("four ways ... its code generator stops at a method call on a value of such a type (row~540)"), is corrected to three ways, rows 543, 546 and 547 (`e496234cea`); `grep -rn '540' Specification --include=*.tex` finds no other. record.md's F-175 correction now reads it. The whole-suite run is the worker's `ant testFast` on `2e1dcbaa2d`'s code; the head's code differs from it by my fix, whose own tests ran as above.

## 10. Competing declarations

`intersectionMethodOwner`, `traitConjuncts`, `takesArgumentOf`, `sameTraitName`, `castReceiver` and `receiverCast`: no other declaration in `ProjectFortress/src/com/sun/fortress/`, nor in the other rungs' diffs of `CodeGen.java`. The components `CoverageReturnMethodCall`, `TypecaseBinderMethodCall`, `XXXTypecaseBinderParameterBound` and `XXXIntersectionClosureResult`: one file each in the test folders.

## 11. Loud failures made quiet

On the base every such call stopped the compile with a `ClassCastException`. Now: the calls of section 3 run and print walk's answers; a call whose owner no conjunct holds stops with a `CompilerError`, 'Can't find the owner of m among the conjuncts of T', where the checker's search and the code generator's agree, unreachable; a function expression so typed links and dies at run time (row 559); and on an object that the checker should refuse (row 1073) the compiled path answers the first conjunct's getter, a quiet value where walk answers the other, 7 for 'shape side'.

## Commits

- `e9718fa115` Skeptic's fix: a getter on an intersection goes to a conjunct whose method of its name takes no argument (defect; settled by fork I1).
- `841c1b5e96` the expected-failure test of row 1072 (correction, home 2).
- `6ed7ace850` the expected-failure pair of row 559's fourth route (correction, home 2).
- `e496234cea` Appendix I's Effect corrected (correction; a path outside the section, settled by `.claude/skills/fortress-repo/references/specification.md:58`).
- `4c549dc867`, `4b598008ee` REPORT.md and record.md corrected (corrections).
