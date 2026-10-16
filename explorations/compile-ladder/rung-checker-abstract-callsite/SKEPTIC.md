<!-- Climb batch 16, rung K's skeptic: what was checked, the two fixes of row 720's placement (one settled, one contested), the corrections of the report and record, and the verdict. -->

# Rung K, the skeptic's review

Head judged: `a79a51661` (the worker's last commit of code; `23bc16268` adds only its report and record from the run's journal). Head after: the commit of this file. Verdict: **contested**, one fix contested (section 5.2).

## 1. What I checked

- The count stage, timed on the base build and on the worker's head in one session (section 2).
- Test first, in the worker's transcript (section 3).
- The diff against the rung's section, the specification and P-149 (section 4).
- My own programs, old code against new, walk and compiled (section 6), with the two fixes they led to (section 5).
- The record: provenance lines, sentences made false, FACTS and ledger lines (section 7).
- Competing declarations: none. The eight test components the rung adds and the two I add have no namesake in the test folders or `ProjectFortress/src/com/sun/fortress/`; `enclosingExpr`, `outside` and `within` are private, beside private namesakes in other classes (`TypeHierarchyChecker.scala:78`, `impls/Misc.scala:151`).

## 2. The count stage (P-148)

Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. `ps aux` before each run showed another tree's probe and, for the second run, rung H's skeptic's count stage on its head.

    cd /home/user/fortress-base16 ; explorations/coordinator/tools/checker-count/run.sh $W/count/base.txt $W/count/base     # 15:49:28, load 1.14
    seconds 360
    cd /home/user/fortress-abstractsite ; explorations/coordinator/tools/checker-count/run.sh $W/count/head.txt $W/count/head  # 15:56:20, load 2.56
    seconds 371

- The head is 3.1 % above the base, within the 6 % of `compiler.md`; the worker's pairs were +2.6 % and +1.1 %. The rung's declarations take no measurable time, as the worker's profile says.
- My two tables are equal by `diff` (`#total 39`, `#locations 38`, `#crash none`), and equal to the worker's `base`, `change` and `pass` tables.
- My head's `run.txt`, with the tree path masked, is byte-equal to the worker's `change3` run. Against the base the only difference is row 433's two sites, `FortressLibrary.fss:3405` and `:3411` gone, `:3422:5-26` and `:3424:5-26` come.
- The worker's speed pass made no edit; its reason (the profile) holds, and there is no reuse to audit.

## 3. Test first

From the worker's transcript (`agent-a2e6db75c8ee1fc90.jsonl`):
- 13:14:30, call `5By7x8`: `junit.sh base` on the base's build, before any edit of code (the first at 13:17:48, call `Eg1DLA`; the first build at 13:18:48, `rWoMKs`): 'Saw wrong failure' for `XXXNoDuplicatesRuleAbstract`, `XXXFunctionalMethodMeetAbstractSibling` and `XXXStaticArgBoundAtCall`, 'Tests run: 5,  Failures: 4,  Errors: 0', the dotted guard 'Saw expected failure'.
- 13:15:10 (`4T8fe3`) and 13:16:15 (`D2FCcf`): `XXXNoDuplicatesRuleAbstractSelfPositions`, then the narrower twin and the return-type test, each 'Saw wrong failure' on the base's build.
- 14:21:09 (`AFtQQK`): `XXXStaticArgBoundAtCallOnce` through the harness on the old code, 'Saw wrong failure', 'Tests run: 2,  Failures: 2'.
- The passing run `junit.sh new3`, 'OK (50 tests)', after the last edit of code (14:43:43, `F63Ttd`) and its build (14:45:10); `ant testQuick` on `a79a51661` (`testQuick-v3`), 'BUILD SUCCESSFUL', 86, 263 and 1220 tests, no failure.

The order holds for every test the worker names.

## 4. The diff

**`toFunctionalMethodArrows`** (`OverloadingChecker.scala:131-153`). The body condition is gone and the `implemented` filter stays, as the rung's section and P-149 ask; `declaredInUnit`, the revival's, had no other caller. The dotted set reads abstract dotted methods with no filter (`:170-172`): the precedent. The overriding return-type check reads its arrows through the same function (`:657-659`), so it now sees an abstract functional method of a component's own trait; that is the return-type face the worker measured, and two more faces in section 6. `isDeclaredName` and `validOp` are untouched (row 584).

**The well-formedness walk** (`TypeWellFormedChecker.scala`). An error on a node outside the nearest expression goes to an expression. Two faults, each measured by a program of mine and fixed (section 5).

**Appendix I** (`changes.tex:2622-2629`). The corrected sentence says what the checker does now for named functional methods, and the next keeps the operators' half (rows 584, 726). It is true of the head.

## 5. Fixes

### 5.1 A call held by a local variable was reported at a later use (`f7d2cd80b`, settled)

The generated walker visits a `LocalVarDecl`'s body, the lines after the declaration, before its right-hand side (`ProjectFortress/src/com/sun/fortress/scala_src/nodes/FortressAst.scala:1944-1945`). The worker's rule keeps the first expression it meets the type in, so the error went to the first use of the variable.

    tmp/.../skeptic/bin/diffrun.sh SkLocalUse       # x = vec[\T\]() on line 10, w: Any = x on line 11
    === old compile
    SkLocalUse.fss:8:23-26:
    === new compile
    SkLocalUse.fss:11:12:

The walk now visits a local variable's right-hand side before its body (`TypeWellFormedChecker.scala:284-287`). Test `XXXStaticArgBoundAtCallNotAtUse`, a call on line 14 whose value a tuple on line 15 uses:
- on `a79a51661` (`junit.sh skhead`, 16:31:01): '...NotAtUse.fss:15:13:', 'Saw wrong failure. compile', 'Tests run: 2,  Failures: 2';
- on `f7d2cd80b` (`junit.sh sks1`): '...NotAtUse.fss:14:7-15:', 'Saw expected failure';
- shown red with its defect removed (`vec[\A\]` for `vec[\T\]`, `junit.sh skred`): 'Saw wrong failure', 'Tests run: 1,  Failures: 1'; the file restored byte for byte.

Settled by the rung's section, "Row 720 follows the coordinator's call 4: an error is reported at the call whose static argument breaks the bound" (`explorations/coordinator/CLIMB-BATCH-16.md:176`, call 4 at `:84`). The worker did not argue for a use: its rule, the first expression met, met the use first by the walker's order.

### 5.2 A second call with the same printed static argument was reported nowhere (`491a5631a`, contested)

The worker keyed a moved error on its message and its node's printed place, the key the driver de-duplicates on. Two calls of one callee in two declarations whose type parameters have one name print one message about one place, so the second call got no error; renaming the second declaration's parameter brings it back:

    tmp/.../skeptic/bin/diffrun.sh SkTwoCalls SkTwoCallsU      # first[\T\] and second[\T\] (or [\U\]) each call vec[\_\]()
    SkTwoCalls.fss:9:21-29:           ... File SkTwoCalls.fss has 1 error.
    SkTwoCallsU.fss:9:21-29:  SkTwoCallsU.fss:10:22-30:  ... File SkTwoCallsU.fss has 2 errors.

The worker's own `XXXStaticArgBoundAtCallOnce` asserted this: 'has 1 error' for `pair` and `again`. And in `SkFlows`, which binds a call to a variable used later, the head reported two errors, both at uses of variables (14:13, 14:16), and none at the four calls of the two other functions.

The fix: a moved error's place is kept for each type node met, at the innermost expression the walk met that node in. Each call makes its own node, and the expressions its value flows to share it and add no error (`SkCallThenUse`, `SkLocalUse`: one error, at the call). Places of one message and node place that nest keep the inner one (a call in a tuple: one error, at the call). None is kept where the node is ill-formed where it is written (`XXXIllFormedTypeAtDeclarationOnce`, 1 error). The places are made into errors at the end of `check` (`TypeWellFormedChecker.scala:37-61`).

Tests: `XXXStaticArgBoundAtEachCall` (new) and `XXXStaticArgBoundAtCallOnce` (rekeyed from 1 error to 2):
- on `a79a51661` (`junit.sh skhead`): '...EachCall.fss:13:21-29:', 'has 1 error', 'Saw wrong failure';
- on `f7d2cd80b` (`junit.sh sks1b`, 16:55:26): both 'Saw wrong failure', 'Tests run: 2,  Failures: 2,  Errors: 0';
- on `491a5631a` (`junit.sh sks2`, the rung's and fixes' 35 test files): 'OK (47 tests)'; EachCall's errors at :13:21-29 and :14:22-30.

**The worker's argument** (REPORT.md section 8, decisions 3 and 5): the first version, at the nearest expression each time, "multiplied errors", `XXXStaticArgBoundAtCallOnce` printing 3 where the base printed 1, the second call among them; the key "is its message and the node's printed place, the text the driver de-duplicates on, so each of the base's distinct errors stays one error"; the node's identity "would report a type built twice from one declaration twice".

**Mine**: the base's one error for two calls was a consequence of its wrong place, the callee's declaration; once the place is the call, the two calls are two errors at two places, and call 4 cites javac and scalac, which report a bound violation at each use of the type argument. The key made whether a call is reported depend on how another declaration names its parameter. Identity alone would double a nested pair, which is why places of one key that nest keep the inner one: a type built twice for one call is met in that call's own expressions, whose places nest or coincide, and adds no error (the reproducer's one node met at the typecase, the clause's block and the call; the tuple of `XXXStaticArgBoundAtCallOnce`).

**Its cost**, measured:
- `ProjectFortress/not_working_library_tests/GenTest5.fss`, outside the suites: 32 errors on the base and the head, 36 now: the calls at `:646`, `:647`, `:648` (four `cross` calls, the first at `:645` already reported) and a second reference at `:384`. Its first error is unchanged, '...GenTest5.fss:131:21-37: Ill-formed type: TestCondition[\()\]'. `tupleTypeParam` is unchanged, 3 errors.
- In `SkFlows`, `ident(x)` of a variable holding the bad call is reported at its inferred static argument (12:7-10), as the base reported it at 'Type checker generated.:0:0'.
- The library: by reading, no change. Its two moved sites name objects referenced once each (`grep` finds `MaxSumReductionPair` and `MinSumReductionPair` only at `FortressLibrary.fss:3422`, `:3424`).
- Row 488: an instrumented count run, `checker-count/run.sh` with this file's classes compiled into a scratch folder ahead of the build, lost the site `FortressLibrary.fss:130` ('#total 38', '#locations 37', 'Function body has type TotalComparison' gone), in two builds of the fix's code, with Scala closures and without; the same run with the worker's own file compiled the same way, and with fix 5.1 alone, gave the head's table and output byte for byte. The tables' api rows and the two moved sites are the head's in all four. The mechanism is not found: the fix computes no hash of a node. So on this branch alone the fix moves row 488's identity-hash dependence; rung H's change makes the checker's output one under any identity-hash sequence, and the gate runs on the merged tree. No count or distance stage was run on the committed fix.

If the judge reverts `491a5631a`, its test, the rekey and its lines of record.md go with it, and the defect needs a ledger row, home 3 (the specification is silent on where an error is reported, REPORT.md's grep), reproducer `ProjectFortress/compiler_tests/XXXStaticArgBoundAtCallOnce.test`, which then pins today's one error.

### 5.3 Corrections (`03003f2a7`)

- REPORT.md's problem line cited `XXXNoDuplicatesRuleAbstract.test:3`, which now holds the checker's refusal; it cites the code generator's stop, `OverloadSet.java:411`.
- REPORT.md section 5 put the reproducer's errors at "the typecase clause's body"; they are at the call: the walk's innermost expression there is the `_RewriteFnApp` whose span the parser runs to 17:8 (a debug copy printed 'in _RewriteFnApp FactoryUnboundedCaller.fss:16:20-17:8').
- F-223 says the checker "reads no abstract functional method of a trait the component declares (row 727)" and names `XXXNoDuplicatesRuleAbstract` a departure: false since the rung. Its rewrite is in record.md, and REPORT.md section 7 lists it.
- NEW-K-2 in record.md: the top-level face of row 727's mechanism (section 6, `SkAbsTopDiff`).

## 6. My programs

Under `tmp/rung-checker-abstract-callsite/skeptic/p/`, each compiled and run on the old code (`old-fortress.sh` with the base build) and on the head, and run under walk on both; at `FORTRESS_THREADS=1` here, and at 4 in the harness runs of section 5. The diff writes no Fortress state: its fields are the checker's own, in one thread.

| program | old | head (`a79a51661`) | walk, old and new |
|---|---|---|---|
| `SkSwapped734`, row 734 with the return types swapped | compiles; run 'java.lang.AbstractMethodError' | 'Invalid overloading of pick in trait O: A->R1 ... and B->R' | 'Invalid overloading of pick in O' |
| `SkTraitSibling`, `trait C extends { A, B }`, abstract `pick` in `A`, body in `B`, `O extends C` with its own | compiles, prints `o` | 'Invalid overloading of pick in trait C' | refused, 'Invalid overloading of pick in C' |
| `SkTraitSiblingDot`, its dotted twin | 'Invalid overloading of m in trait C' | the same | prints `o` |
| `SkOverrideWiden`, `trait U extends T` redeclaring `f(self)` at `String` over `ZZ32` | compiles; run 'java.lang.VerifyError: Bad return type' | 'For f, the return type of U->String ... should be a subtype of the return type of T->ZZ32' | prints `x` |
| `SkSelfPosObj`, abstract `g(self, y: ZZ32)` and `g(x: ZZ32, self)` in `S` | compiles, `PASS` | 'Invalid overloading of g in trait S: (S, ZZ32)->ZZ32 ... and (ZZ32, S)->ZZ32' | `PASS` |
| `SkSelfPosConc`, the same pair concrete | refused, 3 errors | the same | `PASS` |
| `SkValidAbstract`, `SkCovering`: abstract functional methods defined by an object, by covering bodies, over a generic trait | `PASS` | `PASS` | `PASS` |
| `SkAbsTopDiff`, abstract `h(self)` in `S` beside top-level `h(x: String)` | compiles, `PASS` | the same | refused, 'first parameters x:[String] and self:[S] are unrelated' |
| `SkConcTopDiff`, the same with `h(self)` concrete | 'Invalid overloading of h in component SkConcTopDiff: S->ZZ32 ... and String->ZZ32' | the same | not run |
| `SkMethodCall`, `Maker.make[\T\]()` with an unbounded `T` | 'No such method Maker.make.' at the call | the same | prints FAIL, never calls it |
| `SkLocalUse`, `SkTwoCalls`, `SkTwoCallsU`, `SkCallThenUse`, `SkFlows` | section 5 | section 5 | print FAIL, never call `vec` |

Readings:
- `SkSwapped734`, `SkTraitSibling` and `SkOverrideWiden` are refusals beyond the rows the rung names, each the Meet Rule or the return-type rule now applied to an abstract functional method of the component's own trait, as to the dotted twin or the concrete one; two of them failed at run time on the base.
- `SkSelfPosObj` is refused as its concrete twin already is: the prelude's `ZZ32` lists no `comprises`, so it and `S` may overlap (row 698); walk, on the one library, runs both.
- `SkAbsTopDiff` against `SkConcTopDiff` is NEW-K-2: in a component the top-level set reads declarations with a body (`OverloadingChecker.scala:118-121`), functional methods among them, so the abstract one beside an unrelated top-level function is never put to the Meet Rule for functions, which `overloading.tex`, "Meet Rule", applies to a functional method and a function. The worker searched this filter and kept it on its probe of a more specific top-level function, which `checkFancyRule` refuses; an unrelated one escapes. It is outside the rung's one declaration, so it is recorded, not fixed; no `XXX` compile test can hold a refusal not made, and the compiled program runs `PASS`.
- `SkMethodCall`: a dotted call is already refused at the call, by overload resolution.

## 7. The record

- Provenance lines, opened with `sed -n`: the problem line's citation was corrected (5.3); spec `traits.tex:628-633` and precedent `OverloadingChecker.scala:170-172` say what they claim; the deviation lines cite the head's own lines; the historical line's citation, `changes.tex:2622`, is the corrected sentence.
- Sentences of the specification made false: only the Effect sentence the rung corrects (`grep` of `Specification` and `Documentation` for rows 572, 720, 727, 734, 433 and 'abstract functional method' finds only it). In the record: F-80 and F-223 (record.md), row 572's walk note, rows 720 and 433's places, JUDGE.md decision 1's reading (b).
- record.md's lines for the fixes are in their commits, so a revert of 5.2 takes its own.

## 8. Where I differ from the worker's account

- Decision 3's way (c), "once per message and place, at the innermost expression met": the first expression met was a variable's use (5.1), and one key for two calls (5.2).
- Decision 5's key: section 5.2.
- Section 3, "Other body filters in the file: one ... so it stays": the filter lets an abstract functional method beside an unrelated top-level function pass (NEW-K-2).

## 9. Defects and their homes

- A call held by a local variable reported at a use: home 1, `XXXStaticArgBoundAtCallNotAtUse` (`f7d2cd80b`).
- A second call with the same printed static argument reported nowhere: home 1, `XXXStaticArgBoundAtEachCall` and the rekeyed `XXXStaticArgBoundAtCallOnce` (`491a5631a`, contested; home 3 if reverted, section 5.2).
- The top-level face of row 727: NEW-K-2, the row only, reproducer none.
- Row 734's swapped face, the trait-sibling face and the trait-override face: home 1, closed by the rung's line `96c441771`; the first is row 734's own claim, held by `XXXFunctionalMethodMeetAbstractSiblingNarrower`; the other two have no test of their own, and are of the shape of `XXXFunctionalMethodMeetAbstractSibling` and `XXXAbstractFunctionalMethodReturnType`.

## 10. The failure-mode question

The rung turns loud failures into earlier loud ones: the code generator's 'Likely bug in static analysis' stop, and `VerifyError` and `AbstractMethodError` at run time, become the checker's refusals. Nothing turns into a quiet value. One quiet case was in the worker's placement, a second bad call reported nowhere while the program was still refused; 5.2 reports it.

## 11. The whole suite

    ant testQuick      # on 491a5631a, after the last fix of code, 16:57:47, load 3.81
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 176.739 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 249.756 sec
    [junit] Tests run: 1222, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 400.223 sec
    BUILD SUCCESSFUL
    Total time: 6 minutes 47 seconds

The compiler track is the worker's 1220 and my two new tests. No count or distance stage ran on the fixes (section 5.2 gives the instrumented probes, which are not runs to compare); the report's tables are those of the worker's head, `a79a51661`.

## 12. Verdict

Contested. The rung is right with the fixes: the abstract functional methods are read as P-149 asks, the refusals are the specification's, the library and both stages are unchanged, and a broken bound is reported at its call. One fix, 5.2, is contested: the worker argued for one error per message and place.
