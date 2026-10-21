<!-- Climb batch 15, rung O (rung-duplicates-coverage). The compiled checker refuses two functional methods of one name with equivalent parameter types wherever their self parameters stand (row 707). It covers an inherited abstract method through every combination of the types that the comprises clauses of its parameter types list, within walk's bounds (row 709). Walk refuses an object where its search for a cover does not settle (row 708). Under P-26, P-147 and P-60. Written by the rung's worker (Opus) in /home/user/fortress-dupcover, branch wip/rung-duplicates-coverage, cut from ee1aa1a95 and seeded from the batch's base build /home/user/fortress-base15. -->

# Rung O: the No Duplicates Rule at two self positions, and coverage on both paths

- problem: the three expected failures that climb batch 14's skeptics measured:
  - row 707: `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositions.fss:7-8`, stopped by the code generator (`XXXNoDuplicatesRuleSelfPositions.test:3` at the base);
  - row 709: `ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairs.fss:13-17`, refused (its `.test:3` at the base);
  - row 708: `ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.fss:17-19`, loaded (its `.test:1` at the base).
- spec: `Specification/advanced/overloading.tex:548-549`, the No Duplicates Rule as restated, and `Specification/basic/traits.tex:627-648`, an object defines an inherited abstract method by "definitions whose parameter types are subtypes of it and together cover it".
- precedent: row 574's repair in the same check (`aa07efb31`), now `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:446-451`; walk's `Constructor.definedBelow` and `coverParts`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:480-575`; walk's `OverloadedFunction.overlapCoveredBy`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:880-940`.
- deviation:
  - The checker skips the split where the abstract method or a covering method has static parameters of its own, and the team's union test alone decides (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:136-145`; 725).
  - Walk counts a covering body whose domain it cannot read as no cover, where the brief's literal reading would refuse (`Constructor.java:502-504`).
  - The duplicate message names the domain of the pair's declaration written first, not the one the set's order met second (`OverloadingChecker.scala:444-451`, `:755-762`).
  - None from the specification's spelling.
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:441-451`, `:755-762`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:107-181`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:462-518`; `Specification/appendices/changes.tex:2497-2501`, `:2876-2888`.

## 1. What changed, and why

**Row 707, the compiled checker** (`OverloadingChecker.scala:441-442`)

`checkOverloading` counted a duplicate only where `oracle.equiv` held and the two self positions were equal: `sp == sp2`, the team's line (`OverloadingChecker.scala:368` at `a874948ac`). The condition is now `sp == sp2 || (sp.isDefined && sp2.isDefined)`. Two functional methods, each with a self position, are duplicates where `oracle.equiv` holds, wherever their self parameters stand.

The other cases keep their checks:
- Two top-level functions keep `sp == sp2`, since both are `None`.
- A top-level function beside a functional method (`None` beside `Some`) keeps its own check, `checkFancyRule` (`:400-411`).

The rule is the specification's, as climb batch 14's rung P restated it (row 696; `overloading.tex:548-549`). It is also the 2011 paper's, "if $d_1 \ms d_2$ and $d_2 \ms d_1$ then $d_1 = d_2$" (`Papers/Types/rules.tick:158-161`), and the 2019 paper's: the type group's late word (P-26). The parameter type compared is the whole domain, with the self parameter's type in its place. So a pair is a duplicate exactly when each declaration is applicable to every call to which the other is.

The message printed the domain of whichever declaration the check met second in a set's order, and the set's order varied between runs (section 8). It now prints the domain of the pair's declaration written first, by file, line and column (`:444-451`, helper `writtenBefore` at `:755-762`).

**Row 709, the compiled checker** (`AbstractMethodChecker.scala:107`, `:124-181`)

`checkObjectDeclaration` asked only whether the abstract method's domain is below the union of the covering bodies' domains (the team's line, `AbstractMethodChecker.scala:103` at `a874948ac`). `TypeAnalyzer` splits a trait type through its clause below a union (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:159-164`), but compares a tuple with each member alone (`:165-166`).

Where that test fails, a new helper beside it, `coveredByParts`, now decides as walk's `Constructor.definedBelow` does:
- The domain and every covering domain must be tuples of one length, without static parameters, varargs or keywords (`:136-146`). Otherwise the team's refusal stands.
- Each position is split into parts through the comprises clauses of its type, read by `TypeAnalyzer.comprisedTypes` (`TypeAnalyzer.scala:832`, read and not edited).
- A part is split only while some covering domain's type at that position does not hold it (`:151-166`), as `coverParts` does (`Constructor.java:551-575`).
- The search stops, and the object is refused, at a cycle, after 10,000 steps (`COVER_STEPS`, `:125`), or past 4,096 combinations of parts (`COVER_PARTS`, `:126`, `:170-173`). These are walk's `OVERLAP_STEPS` and `OVERLAP_PARTS` (`OverloadedFunction.java:865`, `:868`).
- Every combination of parts, one from each position, must lie inside one covering domain, position by position (`:175-180`), as `definedBelow` asks with `someBelow` (`Constructor.java:520-540`).

`TypeAnalyzer.scala` and `OverloadedFunction.java` are not edited. The split only turns refusals into acceptances. Where `coveredByParts` returns false, the team's refusal and its message stand, and the helper prints nothing.

**Row 708, walk** (`Constructor.java:462-518`)

`definedBelow` returned true where its search did not settle. Now:
- It returns false where `coverParts` does not settle (`:515`): a cycle, a symbolic type, a type it cannot read, or `OVERLAP_STEPS`.
- It returns false past `OVERLAP_PARTS` (`:518`). Both follow `overlapCoveredBy`, which refuses an overlap whose search does not settle (`OverloadedFunction.java:890`, `:894`).
- A covering body whose domain throws a `FortressException` while it is read is skipped as no cover (`:502-504`), as `overlapCoveredBy` skips a candidate it cannot read (`OverloadedFunction.java:914-915`). With no cover left, the object is refused (`:506`).

The javadoc says so. Generic objects stay unchecked (row 665).

**Appendix I** (`Specification/appendices/changes.tex`)

No normative sentence changes. Three Effect sentences now say what both paths do (P-95), amended in place (P-96), as `3ba2d005f` rewrote an Effect when row 676's departure was repaired:
- in "Overloading with static parameters", the sentence on row 707 (`:2497-2501`);
- in "Traits with comprises clauses read at the level of values", the sentences on rows 708 and 709 (`:2876-2888`).

One sentence is added to the second Effect: the checker splits no tuple where a method has static parameters of its own. It names row 725, written `row~725` at `:2888`, which the gather numbers.

The specification was built (`./ant genSource && ./ant tex`: two `BUILD SUCCESSFUL`). `grep -c "^LaTeX Warning: Reference\|^! Undefined control sequence\|multiply defined" Specification/fortress/fortress.log` printed 0. The build's ignored files were removed.

## 2. The tests: the failing run, and the pass

Compiled tests, in `ProjectFortress/compiler_tests/`:
- `XXXNoDuplicatesRuleSelfPositions` (row 707): rekeyed from the code generator's stop to the checker's refusal, `compile_err_contains=There are multiple declarations of f`.
- `XXXNoDuplicatesRuleSelfPositionsPlain` (row 707, new): the plain pair `f(self, y: S)` beside `f(x: S, self)`, keyed the same.
- `AbstractMethodCoveredPairs` (row 709, from `XXXAbstractMethodCoveredPairs`, renamed with `git mv`): compiled, linked and run with `run_out_contains=PASS`, its four values asserted.
- `XXXAbstractMethodNotCoveredPairs` (row 709's control, new): the body at `(Pong, Side)` narrowed to `(Pong, Ping)`. Refused before and after, with `compile_err_contains=has no concrete implementation in the object Joiner`.
- `XXXAbstractMethodCoverUnsettled` (row 708's compiled twin, new): the same program as the walk test. Refused before and after, with `compile_err_contains=has no concrete implementation in the object O`.

Interpreter test, in `ProjectFortress/tests/`:
- `AbstractMethodCoverUnsettledWalk` (row 708, from `XXXAbstractMethodCoverUnsettledWalk`, renamed with `git mv`): `load_exception_contains=does not define an abstract method declared in type H`.

**The failing run**, on the base's code. The tree was the base build's seed with only these test files changed; they were committed afterwards as `c9dd86208`. The edit was first built at 12:28.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXNoDuplicatesRuleSelfPositions.test XXXNoDuplicatesRuleSelfPositionsPlain.test AbstractMethodCoveredPairs.test XXXAbstractMethodNotCoveredPairs.test XXXAbstractMethodCoverUnsettled.test      # 2026-10-14T12:23:41Z
    Likely bug in static analysis, apparently malformed overload set not rejected for
    1) ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositions(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    2) ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsPlain(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    3) ProjectFortress/compiler_tests/AbstractMethodCoveredPairs(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output compile
    Tests run: 7,  Failures: 5,  Errors: 0

In that run the two controls passed as expected failures ("Saw expected failure"). `AbstractMethodCoveredPairs`'s link and run failed too (failures 4 and 5).

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-duplicates-coverage/h1 ProjectFortress/tests/AbstractMethodCoverUnsettledWalk.fss ProjectFortress/tests/AbstractMethodCoverUnsettledWalk.test      # 2026-10-14T12:23:56Z
    . interpret tmp/rung-duplicates-coverage/h1/tests/AbstractMethodCoverUnsettledWalk
    1
     Missing expected refusal at load
    Tests run: 1,  Failures: 1,  Errors: 0

**The first `XXX` test the rung adds, red on a deliberate fix**, on the base's code. `XXXAbstractMethodCoverUnsettled`'s body was changed for one run to `g(self, a: D, b: D, c: D, d: D, e: D)`, which defines the method, then restored.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh reddemo ProjectFortress/compiler_tests XXXAbstractMethodCoverUnsettled.test      # 2026-10-14T12:24:29Z
     Saw failure, but did not satisfy compile_err_contains; expected
    has no concrete implementation in the object O
    1) ProjectFortress/compiler_tests/XXXAbstractMethodCoverUnsettled(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile

**The pass**, after the last edit (`f537abed8`) was built at 13:21:47, with the library order. The run includes:
- the rows' tests;
- the three new expected failures (section 10);
- the tests the brief keeps: `OverloadTwoBoundsClosedFamily`, `OverloadTwoBoundsClosedTrait`, `XXX2f`, `XXXNoDuplicatesRule` (row 696) and `XXXFunctionalMethodDuplicateSelfSecond` (row 574);
- every compiled test that pins the duplicate message: `XXX0v`, `XXX6i`, `XXX7a` to `XXX7e`, `XXXNatOpenOverloadChecker`.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after2 ProjectFortress/compiler_tests XXXNoDuplicatesRuleSelfPositions.test XXXNoDuplicatesRuleSelfPositionsPlain.test AbstractMethodCoveredPairs.test XXXAbstractMethodNotCoveredPairs.test XXXAbstractMethodCoverUnsettled.test XXXAbstractMethodCoveredPairsGeneric.test XXXGenericFunctionalMethodBesidePlain.test OverloadTwoBoundsClosedFamily.test OverloadTwoBoundsClosedTrait.test XXX2f.test XXXNoDuplicatesRule.test XXXFunctionalMethodDuplicateSelfSecond.test XXX0v.test XXX6i.test XXX7a.test XXX7b.test XXX7c.test XXX7d.test XXX7e.test XXXNatOpenOverloadChecker.test      # 2026-10-14T13:21:57Z
    . run ProjectFortress/compiler_tests/AbstractMethodCoveredPairs (365ms) PASS
    OK (26 tests)

    ant testSystem      # 13:35, on f537abed8
     interpret /home/user/fortress-dupcover/ProjectFortress/tests/AbstractMethodCoverUnsettledWalk  OK Saw expected refusal at load

The walk tests the brief keeps also passed, in one harness run on the first code state (`317fc0ef5`, 12:29:16Z, `OK (23 tests)`), and again in `ant testSystem` on the final one: `AbstractMethodCoveredWalk`, `PairsRunRangesWalk`, `FileConversion`, `XXXUnimplementedMethod`, the `AbstractMethod*Walk` and `Override*Walk` tests, `XXXAbstractMethodUndefinedGenericWalk`, `XXXAbstractMethodUndefinedGenericObjectExpressionWalk` and `XXXNoDuplicatesRuleWalk`.

## 3. Where the fix belongs, and the precedent search

**Row 707.** The site is the duplicate check itself (`checkOverloading`, `OverloadingChecker.scala:430-509`). Both the top-level set (`checkFunctionOverloading`) and each trait's and object's set (`checkMethodOverloading`) call it (`explorations/coordinator/map/spec-to-implementation.md`, the row on multiple dispatch; `modules-and-phases.md`, B.7). `OverloadSet`'s stop at `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411` is the symptom.

The precedent is row 574's repair of the same check's message (`aa07efb31`, climb batch 10, rung C). The duplicate check has one site. The file has 3 other sites that compare self positions; they belong to the Meet Rule, not the No Duplicates Rule, and they stay (row 545 holds their question):
- `functionalMethodsAtOnePosition` (`:596`);
- `meetRule` (`:607-611`);
- `coverageRule` (`:646-649`).

**Row 709.** The site is `AbstractMethodChecker.checkObjectDeclaration`; the feature row on method declarations names `AbstractMethodChecker.scala`. The shape followed is walk's `definedBelow` and `coverParts` (F-27, F-145). The checker's own cover search, `OverloadingOracle.coversOverlap` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:188-239`, the Meet Rule's closed-trait case), is the other precedent; decision 3 says why it is not the one followed.

**Row 708.** The site is `Constructor.definedBelow`. The precedent is `overlapCoveredBy`.

## 4. What the specification settles

- **No Duplicates Rule.** It refuses two declarations each applicable to every call to which the other is (`overloading.tex:548-549`). A functional method's parameter type includes the self parameter's type at its position: functional methods "can be viewed as top-level function declarations" (`traits.tex`, "Method Declarations"). So both of row 707's pairs are refused, wherever self stands.
- **Coverage.** An object defines an inherited abstract method by bodies at narrower parameter types that together cover it, comprises clauses read at the level of values (`traits.tex:627-648`, P-147, P-60). Row 709's bodies cover `(Side, Side)`. Row 708's one body covers only `(P1, P1, P1, P1, P1)`, so the object is refused however the search ends.
- **The bound.** The specification bounds no search. The bound of 4,096 combinations is the implementations' (decision 4).

## 5. Old against new

| program | old (base) | new |
|---|---|---|
| `XXXNoDuplicatesRuleSelfPositions`, compiled | code generator stops: "Likely bug in static analysis, apparently malformed overload set not rejected" | "There are multiple declarations of f with the same parameter type: (S, T)" and "... (T)" (section 8) |
| `XXXNoDuplicatesRuleSelfPositionsPlain`, compiled | the same stop | "... (S, S)" and "... (S)" |
| both row 707 pairs, walk | refused at load | refused at load: "Overloading of f(x:S,self:S) ... and f(se..." |
| `AbstractMethodCoveredPairs`, compiled | refused: "Domain (Side, Side) is not a subtype of OR((Ping, Pong),(Pong, Side),(Ping, Ping))" | compiles, links, runs: `PASS` |
| `AbstractMethodCoveredPairs`, walk | runs | `PASS` |
| `XXXAbstractMethodNotCoveredPairs`, compiled | refused | refused |
| `AbstractMethodCoverUnsettledWalk`, walk | loads, prints `1` | refused at load |
| `XXXAbstractMethodCoverUnsettled`, compiled | refused: "Domain (D, D, D, D, D) is not a subtype of (P1, P1, P1, P1, P1)" | refused, same message (7,776 combinations, past the bound) |
| `NoDuplicatesRule`, compiled | "... of dup with the same parameter type: Box[\U\]" | "... Box[\T\]" (the first written) |
| `ProbeGenericFm` (one generic functional method in an object), walk | `11` | `11` |
| `ProbeGenericFmPair` (that method beside a plain one), walk / compiled | 'Missing type T' / `ClassCastException` | the same / the same (723, 724) |
| `ProbeGenericCover` (a covering body with a static parameter of its own), walk / compiled | 'Missing type T' / "Domain (Side, Side) is not a subtype of OR((Pong, Side),(Ping, T$7))" | the same / the same (723, 725) |

How these ran:
- The probes ran from `tmp/rung-duplicates-coverage/probe/`.
- The old code ran through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base15 <tree>/tmp/rung-duplicates-coverage/old-caches`.
- The new code ran with a private caches folder.
- The probes' committed forms are the three expected failures of section 10. The two compiled ones also ran on the old code through `fortress junit`: "Saw expected failure", "OK Saw expected exception", `OK (2 tests)`.

## 6. Suites, the count, the distance, the ladder

**Suites**, once on each code state.

The first code state (`317fc0ef5`):
- `ant testQuick`: BUILD SUCCESSFUL, compiler 1178, library 86, othercompiler 263, 0 failures.
- `ant testSystem`: BUILD SUCCESSFUL, 604, 0 failures.

The final code state (`f537abed8`, after the message edit):

    ant testQuick      # BUILD SUCCESSFUL, Total time: 12 minutes 36 seconds
    fast-compiler: Tests run: 1180, Failures: 0, Errors: 0
    fast-library: Tests run: 86, Failures: 0, Errors: 0
    fast-othercompiler: Tests run: 263, Failures: 0, Errors: 0
    ant testSystem     # BUILD SUCCESSFUL, Total time: 3 minutes 37 seconds
    system-0..3: Tests run: 148, 155, 148, 154 (605), Failures: 0, Errors: 0

Against climb batch 14's gate:
- The compiler track holds 7 more tests than the gate's 1173: five new `.test` files, plus `AbstractMethodCoveredPairs`'s link and run.
- The interpreter suite holds 1 more than 604: `XXXGenericFunctionalMethodBesidePlainWalk`.

**The count**, on the final code; the before is climb batch 14's landed table.

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-duplicates-coverage/checker-count-postedit.txt tmp/rung-duplicates-coverage/cc-post
    diff explorations/compile-ladder/climb-batch-14/gate/checker-count.txt tmp/rung-duplicates-coverage/checker-count-postedit.txt    # no output, rc 0
    #total	1
    #crash	none

- It ran from 13:39:13 to 13:44:52, 339 s (load 8.35 at its start), within the stage's 900 s limit.
- On the first code state it was the same: 440 s, no diff.
- Its one error is the base's, at `Library/FortressLibrary.fss:1314:10`.

**The distance**, on the final code; the before is climb batch 14's landed table and the per-site list.

    explorations/coordinator/tools/distance/run.sh tmp/rung-duplicates-coverage/distance-postedit.txt tmp/rung-duplicates-coverage/dist-post
    #total	54
    #kind	overloading	0
    #kind	abstract-method	0
    #seconds	1947	FortressLibrary 1191
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt tmp/rung-duplicates-coverage/distance-postedit.txt
    DISTANCE SAME   54

By site, against the per-site list by row:

    diff <(tail -n +2 explorations/compile-ladder/gate/distance-sites.tsv | cut -f6,7 | sort) <(tail -n +2 tmp/rung-duplicates-coverage/dist-post/errors.tsv | cut -f6,7 | sort)

prints nothing. The 54 sites have the same locations and messages; the rung edits no library file, so no line moved (row 577). The whole table, apart from its `#seconds` and `#machine` lines, equals the landed one. The first code state's run was the same: 54, `DISTANCE SAME`, no site diff. No site moved.

**The ladder.** The change's own subset is the four files whose recorded first error in the baseline names a check this rung edits, the abstract-method refusal; none names the duplicate check. They are `tests/XXXextendBoolean.fss`, `XXXextendFloatLiteral.fss`, `XXXextendIntLiteral.fss` and `XXXextendOprParam2.fss`, found with:

    awk -F'\t' '{print $1"\t"$2"\t"$4"\t"$11}' explorations/compile-ladder/baseline-2026-09-19/ladder.tsv | grep -i "inherited abstract\|multiple declarations\|malformed\|overload set\|no concrete"

How it ran:
- The drivers `run-subset.sh` and `classify.py` were copied under `tmp/rung-duplicates-coverage/ladder/`, with a copy of the tree's caches.
- It ran on the final code, 13:55:33 to 13:56:01.
- The gate's ladder does not run these files, so they were compared with the baseline's `ladder.tsv`: `diff` of corpus, file, phase and first error prints nothing.

All four stay at `typecheck` with "The inherited abstract method ... from the trait ...". No ladder file moved.

## 7. Sentences made false

Corrected by the rung:
- `Specification/appendices/changes.tex:2500-2502` (before): "except two functional methods whose \KWD{self} parameters stand at different positions, which only its code generator refuses, as a malformed overload set (row~707 ...)".
- `changes.tex:2876-2880` (before): "and it does not refuse an object where its search through the \KWD{comprises} clauses does not settle ... (row~708 ...)".
- `changes.tex:2881-2885` (before): "The compiled type checker does not split a tuple of parameter types through \KWD{comprises} clauses ... (row~709 ...)".

Now false, for the gather; record.md gives the new text for the FACTS entries:
- FACTS F-145: "A search for a cover that does not settle does not refuse (row 708) ... The compiled checker misses a cover through the listed types of two parameters (row 709)."
- FACTS F-223: its title's "except between functional methods whose `self` parameters stand at different positions", and "A pair at different positions passes it, and the code generator then stops the compile (row 707)."
- The skill, `.claude/skills/fortress-repo/references/interpreter.md:42`: "If walk's search for a cover does not settle, it does not refuse."
- The skill, `.claude/skills/fortress-repo/references/revival-changes.md:66`: "If walk's search for a cover does not settle, walk does not refuse the object (ledger row 708). The compiled checker misses a cover that needs the listed types of two parameters together (ledger row 709)."

Not affected:
- No note in the chapters names these departures: `grep -rn "malformed\|self parameters stand\|settle" Specification/basic Specification/advanced` finds none on them.
- The Effect of "Overloading with static parameters" does not say that the checker checks no symbolic operator (row 584). It did not say so before the rung either; the rung's sentence makes that no truer and no falser.

## 8. Points to report

- **The message row 707's refusal prints** (`OverloadingChecker.scala:444-451`):
  - Both declarations' spans, then "There are multiple declarations of f with the same parameter type: ", then the domain of the declaration written first: without its self parameter in a trait's or object's check, whole in the top-level set.
  - The generic pair prints `(S, T)` (top level) and `(T)` (trait `S`, and object `O`, which provides both; one message); two errors.
  - The plain pair prints `(S, S)` and `(S)`.
  - Before the message edit the domain was that of the declaration the check met second in a set's order. It varied between runs: the harness run of `317fc0ef5` printed `(S, T)`, `(T)`, `(U)`; a direct compile printed `(U, S)` and `(U)`. Now three runs, two direct and one in the harness, print `(S, T)` and `(T)`.
  - `XXXNoDuplicatesRule` now prints `Box[\T\]` where it printed `Box[\U\]`. Its key is unchanged, and so is its verdict.
- **The bound row 709's split takes** (`AbstractMethodChecker.scala:125-126`): 10,000 steps and 4,096 combinations of parts, walk's `OVERLAP_STEPS` and `OVERLAP_PARTS` (`OverloadedFunction.java:865`, `:868`). Past them the object is refused. Row 708's shape, 6^5 = 7,776 combinations, is refused by both paths.
- **A library, team or test declaration newly refused:** none. `ant testQuick` and `ant testSystem` are green, and the count's table did not move.
  - The library's pairs at two self positions, found with `grep -nE "\(\s*[^)]*[a-zA-Z_0-9']+\s*:[^)]*,\s*self\s*[,)]" Library/*.fs? ProjectFortress/LibraryBuiltin/*.fs?`:
    - `FlatString`'s `opr ||(self, b:FlatString)` and `opr ||(a:FlatString, self)` (`Library/FlatString.fsi:17`, `:20`), which are equivalent;
    - `String`'s `||`, `|||`, `//`, `///` at `(self, b:Any)` and `(a:Any, self)` (`Library/FortressLibrary.fsi:2494-2495`, `:2501-2502`, `:2507-2508`, `:2513-2514`), which are not equivalent.
  - The check reaches none of these, since it checks no symbolic operator (`isDeclaredName`, row 584).
  - The word-named functional methods with self not first are `IN`, `NOTIN` and `MATCH`, for example `Library/FortressLibrary.fsi:691`, `:695` and `Library/GeneratorLibrary.fsi:16-17`. None has a same-named sibling with self first: `grep -nE "opr\s+(IN|NOTIN|MATCH)\s*\(\s*self"` prints nothing.
- **A test whose verdict changes other than the three tests of the rows:** none. No ladder file moved.
- **A count or distance site that moves:** none (section 6).
- **Text beyond the three Appendix I sentences:** one Effect sentence added in the same entry, on 725 (`changes.tex:2885-2888`); it is not normative. The sentences made false are in section 7, the skill's two among them.
- **An edit of `TypeAnalyzer.scala` or `OverloadedFunction.java`, or of the library or the code generator:** none.

## 9. Decisions

1. **Row 707: two functional methods are duplicates wherever their self parameters stand; nothing else changes.** Chosen: `sp == sp2 || (sp.isDefined && sp2.isDefined)`.
   - Not taken: dropping the self-position condition. It would make a top-level function beside a functional method a duplicate, though the brief keeps that pair's own check, `checkFancyRule` (`:400-411`).
   - Not taken: comparing domains without self. It would make `f(self, x: A)` in `A` and `f(self, x: A)` in `B` duplicates.
   - Not taken: a refusal in `OverloadSet`, which already calls the stop a bug of static analysis (`OverloadSet.java:409-411`).
2. **The message names the domain of the pair's declaration written first** (`:444-451`, `:755-762`). Evidence: the varying runs in section 8.
   - Not taken: leaving the set's order to decide.
   - Not taken: printing both domains, which would change a pinned message (`XXXFunctionalMethodDuplicateSelfSecond.test:3`).
   - The pinned messages (`XXX0v`, `XXX6i`, `XXX7a` to `XXX7e`) still pass, because their pairs' domains print the same.
3. **Row 709 follows walk's `definedBelow`, not the checker's `coversOverlap`.** Chosen: a helper in `AbstractMethodChecker` with walk's lazy split, its bounds and its question, so that the two paths agree on what is covered and where the search stops.
   - Not taken: `OverloadingOracle.coversOverlap` (`:188-239`). It is bounded by 1,000 cuts (`:186`), not combinations, and takes arrow types.
   - Not taken: a tuple split in `TypeAnalyzer`'s union case (`:165-166`). That is rung C's file, and it would change every subtype question below a union.
   - Not taken: each combination against the whole union by `tsa.subtypeED`. For ground tuples it is the same question, member by member, but it would build up to 4,096 tuple nodes.
4. **The bound is walk's: past 4,096 combinations or 10,000 steps the object is refused.**
   - Not taken: sharing the constants, since `OverloadedFunction.java` is not to be edited.
   - Not taken: no bound, which would accept row 708's shape where walk refuses it.
5. **No split where a method has static parameters of its own** (`:136-145`).
   - Not taken: splitting through the schema's body type with `tsa.subtypeED`. It reaches walk's failure (723) and the code generator's (724), and goes beyond the row.
   - Recorded as 725.
6. **Row 708: an unreadable covering body is no cover; an unsettled split refuses.**
   - Not taken: `return false` at `:503` as well, reading the brief's three returns literally. That would refuse an object that its other bodies cover. `overlapCoveredBy` skips a candidate it cannot read (`OverloadedFunction.java:914-915`) and refuses only where its own parts do not settle (`:890`, `:894`).
   - Either way, an object whose cover rests on an unreadable domain is refused.
7. **A comprises clause with an ellipsis is read as `comprisedTypes` reads it**, as the team's own split of one parameter does (`TypeAnalyzer.scala:159-164`).
   - Not taken: a guard of my own, as `coversOverlap` has (`OverloadingOracle.scala:210`). It would make the tuple split differ from the one-parameter split.
   - Every ellipsis clause in the library is `comprises { ... }` alone, for example `Library/FortressLibrary.fsi:397` and `Library/IntMap.fsi:21`. Its list is empty, so it is not split.
8. **The three new defects get expected failures as well as rows** (home 2): each program is valid by the specification.
9. **No decision record**: no normative text changes.
10. **After the message edit, both suites, the count, the distance and the ladder subset ran again on the final code.**

## 10. Defects and their homes

Repaired (home 1):
- **Row 707**: tests `XXXNoDuplicatesRuleSelfPositions` and `XXXNoDuplicatesRuleSelfPositionsPlain`.
- **Row 708**: test `AbstractMethodCoverUnsettledWalk`.
- **Row 709**: test `AbstractMethodCoveredPairs`, with `XXXAbstractMethodNotCoveredPairs` beside it.
- **The duplicate message varied with the set's order**: repaired in `f537abed8`. `XXXNoDuplicatesRuleSelfPositions`' output is the same on every run.

Deferred, each with a row and an expected failure (home 2):
- **723**: walk stops at load, 'Missing type T', on an object that overloads a functional method with a static parameter of its own beside a plain one of the same name. Test: `ProjectFortress/tests/XXXGenericFunctionalMethodBesidePlainWalk.fss`. The overloading is valid: `T extends Ping` and `Pong` exclude each other.
- **724**: the code generator's `ClassCastException` on the same program. Test: `compiler_tests/XXXGenericFunctionalMethodBesidePlain.test`.
- **725**: the checker splits no tuple where a covering method has static parameters of its own. Test: `compiler_tests/XXXAbstractMethodCoveredPairsGeneric.test`, keyed on today's refusal.

All three behave the same on the base. Their tests (`a392db9da`) ran through the harness, and again in the final suites:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-duplicates-coverage/h3 ProjectFortress/tests/XXXGenericFunctionalMethodBesidePlainWalk.fss
     OK Saw expected exception
    OK (1 test)
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh newxxx ProjectFortress/compiler_tests XXXGenericFunctionalMethodBesidePlain.test XXXAbstractMethodCoveredPairsGeneric.test
     OK Saw expected exception
     Saw expected failure
    OK (2 tests)

## 11. Commands

None beyond the skill's. The old code's `fortress junit` ran through `old-fortress.sh`, and the probes' private caches follow `compiler.md`, "Testing an edit here".
