<!-- Climb batch 16, rung K: the compiled checker reads a component's own abstract functional methods (rows 727, 572 and 734), and reports a static argument that breaks the bound of a callee's result type at the call (row 720). -->

# Rung K: abstract functional methods read, a broken bound reported at the call

- problem: on the base `XXXNoDuplicatesRuleAbstract` was keyed on the code generator's stop, 'Likely bug in static analysis, apparently malformed overload set not rejected' (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411`). The per-provider set dropped a component's own bodiless functional method (`OverloadingChecker.scala:138-141` at 528438ac5). Row 720's reproducer named the callee's result, not the call: `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleAbstract.test:3`
- spec: a trait provides what it declares or inherits, abstract declarations included (`Specification/basic/traits.tex:580-581`), and an object must define each abstract method it inherits: `Specification/basic/traits.tex:628-633`
- precedent: the team's dotted per-provider set keeps abstract dotted methods with no body filter: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:170-172`
- deviation: the team's 2012 functional set kept bodies only (a874948ac, line 133); it now keeps every functional method a type provides: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:137`
- deviation: the well-formedness walk's own `error` now chooses the error's place, with three helpers beside it and two lines of `walk`: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:42-82`
- historical: OverloadingChecker.scala, TypeWellFormedChecker.scala and `Specification/appendices/changes.tex`, all of the 2012 tree: `Specification/appendices/changes.tex:2622`

For where a static error is reported, the specification says nothing: `grep -rn -i 'reported at\|is reported\|location of .*error' Specification/basic Specification/basic-lib` prints nothing.

## 1. What changed, and why

**Rows 727, 572 and 734: the per-provider check reads abstract functional methods.** Q1's answer is (a), refuse (P-149). `toFunctionalMethodArrows` now keeps every functional method a trait or object provides, as `toMethodArrows` keeps every dotted one (`OverloadingChecker.scala:131-137`). It keeps the `implemented` filter, which drops an abstract method that a declaration of a strict subtype with the same parameter types implements (`:147-152`). Before, in a component, it kept a functional method only if the method had a body or its trait came from an imported api (`:138-141` at the base). That was the judge's reading (b) of climb batch 8 (`explorations/compile-ladder/rung-overloading-checker/JUDGE.md`, section 7, decision 1). The revival's helper `declaredInUnit`, used only by that condition, is removed (`:173-181` at the base).
- Row 727: an abstract `f(self, y: S)` beside a concrete `f(self, y: S)` in one trait is refused, 'There are multiple declarations of f with the same parameter type: (S)'. So is the pair at two self positions, through row 707's check.
- Row 572: in `object O extends { A, B }`, `A` has an abstract `pick(self)` and `B` a concrete one. The object is refused, 'Invalid overloading of pick in trait O: A->String ... and B->String ...', as its dotted twin already was.
- Row 734, the Q1 probe's row of the same shape with return types that differ, is refused the same way.
- One more face, measured here. On the base, an object's own `f(self): String` that defines its trait's abstract `f(self): ZZ32` compiled, and its run failed with 'java.lang.VerifyError: Bad return type'. The dotted twin was refused. The return-type check of an overriding pair reads its arrows through the same function (`OverloadingChecker.scala:657-658`), so it now refuses the functional one too: 'For f, the return type of O->String ... should be a subtype of the return type of T->ZZ32'.
- Operators stay as row 584 leaves them: `isDeclaredName` and `NodeUtil.validOp` are untouched (`OverloadingChecker.scala:710-714`). A symbolic operator's pair, row 726, is still the code generator's stop.

**Row 720: a broken bound is reported at the call.** A call's type keeps the spans of the callee's declared type. The well-formedness walk meets that type in the call's type information, and on the base it reported the error at the type node (`TypeWellFormedChecker.scala:158-165` at the base), which is the callee's declaration. The walk now remembers the nearest expression it is in (`:65`, `:145-146`, `:274`).
- An error on a type node that lies outside that expression is reported at the expression instead (`:47-62`, `:72-82`).
- It is reported once for each message and place of the node, as the errors at the node were. The driver drops a second error with the same text and place (`ProjectFortress/src/com/sun/fortress/exceptions/MultipleStaticError.java:31-40`).
- It goes to the innermost expression the walk met the node in, and to the first of them where two are disjoint.
- It is not moved when the node is ill-formed where it is written: then the error stays at the declaration, as before.
- A type written inside its own expression, a parameter's type and a declaration's type keep their errors where they were.

Two earlier versions were wrong, and each fault has a test now:
- The first (96c441771) reported at the nearest expression each time. `XXXStaticArgBoundAtCallOnce` printed 'has 3 errors' on it, against 1 on the base: a call in a tuple, the tuple, and a second call of the callee.
- The second (f53bee311) also moved the error of a type that is ill-formed where it is written, so that error came twice. `GenTest5` went from 32 errors to 42, and `XXXIllFormedTypeAtDeclarationOnce` printed 'has 2 errors'.
- The third (a79a51661) gives the base's number of errors in every program I compared.

## 2. The test before the fix, and after

The failing run was on the base's code, before the edit was first built: the tree at af6485ffb with the base's build, at 13:14:30Z, while the first build of the edit was at 13:19.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXNoDuplicatesRuleAbstract.test XXXNoDuplicatesRuleAbstractSelfPositions.test XXXFunctionalMethodMeetAbstractSibling.test XXXDottedMethodMeetAbstractSibling.test XXXStaticArgBoundAtCall.test
    1) ProjectFortress/compiler_tests/XXXNoDuplicatesRuleAbstract(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    3) ProjectFortress/compiler_tests/XXXFunctionalMethodMeetAbstractSibling(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    4) ProjectFortress/compiler_tests/XXXStaticArgBoundAtCall(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 5,  Failures: 4,  Errors: 0

The other tests' runs before the fix:
- `XXXDottedMethodMeetAbstractSibling`, the guard, was green there: 'Saw expected failure'.
- `XXXNoDuplicatesRuleAbstractSelfPositions`, in its final form without an object, failed in `junit.sh base2 ...` at 13:15:10Z: 'Tests run: 1,  Failures: 1'. My first draft of it had an object that the abstract-method check refused.
- `XXXFunctionalMethodMeetAbstractSiblingNarrower` and `XXXAbstractFunctionalMethodReturnType` failed in `junit.sh base3 ...` at 13:16:15Z: 'Tests run: 2,  Failures: 2,  Errors: 0'.
- `XXXStaticArgBoundAtCallOnce`, written after the first version showed the extra errors, failed through the harness on the old code:

      explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base16 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXStaticArgBoundAtCallOnce.test <tree>/ProjectFortress/compiler_tests/XXXStaticArgBoundAtCall.test
      .../XXXStaticArgBoundAtCallOnce.fss:12:23-26:
          Ill-formed type: V[\T\]
      1) .../XXXStaticArgBoundAtCallOnce(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
      Tests run: 2,  Failures: 2,  Errors: 0

- `XXXIllFormedTypeAtDeclarationOnce` guards a behaviour that works on the base. It is green on the old code ('OK (1 test)') and red on the second version ('has 2 errors', 'Saw wrong failure').

The passing run, after the last change of code (a79a51661), with the neighbours whose verdicts the brief keeps (the NoDuplicatesRule, FunctionalMethodMeet, OverloadTwoBounds and DottedMethodMeet tests, the pinned ill-formed-type tests `XXX10f`, `XXX10j`, `XXX10q`, `XXX6q` and `XXXBoundCheckSameNameTwoScopes`, and the override and covering tests):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new3 ProjectFortress/compiler_tests <50 .test files>
    OK (50 tests)

`XXXNoDuplicatesRuleSelfPositionsOperator` (row 726) keeps its code-generator key and its verdict.

The first added `XXX` test, `XXXNoDuplicatesRuleAbstractSelfPositions`, was shown red on a deliberate fix. With its abstract `f(self, y: S)` removed, `junit.sh reddemo ...` printed 'Saw wrong failure. compile' and 'Tests run: 1,  Failures: 1'. The file was then restored byte for byte, and `git status` was clean.

## 3. Where the fix belongs, and the precedent

**Place.** The fix is in two places:
- the per-provider overloading check of the compiled checker (`explorations/coordinator/map/modules-and-phases.md`, B.7), which the brief names;
- the well-formedness walk, which runs after type checking (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:268`).

**Precedent for rows 727 and 572.**
- The dotted set, `toMethodArrows`, reads abstract dotted methods (`OverloadingChecker.scala:170-172`).
- Row 707's repair in the same check (`59b1d0a4d`) counts two functional methods as duplicates wherever their self parameters stand. The abstract pair at two self positions now meets that check.

**Other body filters in the file: one.** The top-level set's `onlyConcrete` (`:118-121`) reads declarations with a body in a component. It is the top-level rule, not a type's. An abstract functional method beside a top-level function of its parameter type is refused there by the team's `checkFancyRule`, on the base and now. The probe `AbsFmTop` prints 'Overload violation: the declaration of top-level function f ... is more specific than the declaration of the functional method f' on the old code and the new.

**Precedent for row 720.**
- The walk checks the static arguments written at a reference where they are written (`TypeWellFormedChecker.scala:234-235`). A type that the reference does not write is its callee's, and its error now goes to the reference.
- The key of a moved error is the driver's own de-duplication key: the error's text and place.

The ways weighed are in section 8.

## 4. What the specification settles

Three rules refuse both rows' shapes:
- The No Duplicates Rule on the non-strict relation (`Specification/advanced/overloading.tex:548-549`) refuses an abstract and a concrete declaration with the same parameter type.
- The Meet Rule for Functional Methods applies to what a type provides (`overloading.tex`, "Meet Rule"; `Specification/basic/traits.tex:580-581`). It refuses row 572's object, which provides two declarations and none on their meet.
- The object must define the abstract method it inherits (`traits.tex:628-633`).

P-149 takes that reading, and P-26 the papers' rules. No normative sentence changes. The specification is silent on where a static error is reported. The coordinator's call 4 settles row 720.

## 5. Programs run old against new

| program | old (base build) | new (a79a51661) |
|---|---|---|
| `XXXNoDuplicatesRuleAbstract` | code generator: 'malformed overload set not rejected' | 'There are multiple declarations of f with the same parameter type: (S)' at :7, :8 |
| `XXXNoDuplicatesRuleAbstractSelfPositions` | code generator, the same | the same message at :7, :8 |
| `SelfPosObjOwn` (that pair, with an object defining the abstract one) | code generator, the same | the same message |
| `XXXFunctionalMethodMeetAbstractSibling` (SkAbsConc) | compiles | 'Invalid overloading of pick in trait O: A->String ... and B->String' |
| `XXXFunctionalMethodMeetAbstractSiblingNarrower` (row 734) | compiles | 'Invalid overloading of pick in trait O: A->R ... and B->R1' |
| `XXXDottedMethodMeetAbstractSibling` (SkAbsConcDot) | 'Invalid overloading of m in trait O' | the same |
| `RetWrongFm`, `XXXAbstractFunctionalMethodReturnType` | compiles; the run fails, 'java.lang.VerifyError: Bad return type' | 'For f, the return type of O->String ... should be a subtype of the return type of T->ZZ32' |
| `RetWrongDot` (its dotted twin) | 'For m, the return type of O->String ... should be a subtype of ...' | not rerun: no dotted path changed |
| `AbsFmTop`, `ConcFmTop` | 'Overload violation: ...' | the same |
| `XXXStaticArgBoundAtCall` | one error at :12:23-26, the callee's result | one error at :13:19-27, the call |
| `XXXStaticArgBoundAtCallOnce` | one error at :12:23-26 | one error at :13:21-29, the call inside the tuple |
| `XXXIllFormedTypeAtDeclarationOnce` | one error at :11:8-14, the declaration | the same |
| `FactoryUnboundedCaller` (row 720's reproducer) | two errors at :11:42-48 | two errors at :16:20-17:8, the typecase clause's body, which begins at the call |
| `Nest720` (a tuple, a local variable) | one error at :8:23-26 | one error at :9:20-28 |
| `GenTest5` | 32 errors | 32 errors, five at their calls in place of the callee's or a synthesized place |
| `tupleTypeParam` | 3 errors, one at :18:8-9 | 3 errors, that one at the call :25:7-36 |

Walk is untouched. It refuses both rows' shapes at load (F-142).

## 6. The checker count, the distance, the suites and the ladder

**Count stage, P-148.** Machine: nproc 4, Intel Xeon @ 2.10 GHz (2100 MHz), openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Each run was started by itself, with `ps aux` checked first. I waited 27 minutes for other trees' jobs before the first base run.

| run | tree and code | started | load at start | beside it | seconds |
|---|---|---|---|---|---|
| base | /home/user/fortress-base16, 528438ac5 | 13:54:12 | 2.79 6.69 9.17 | another tree's compiled suite, started with it | 383 |
| first version | rung's tree, 96c441771 | 14:00:50 | 3.48 4.56 7.31 | another tree's suite | 392 |
| change | rung's tree, a79a51661 | 15:19:19 | 0.85 1.24 3.31 | another tree's distance stage, from 15:19:28 | 393 |
| pass | rung's tree, a79a51661 (the pass made no edit) | 15:27:26 | 3.15 3.25 3.58 | the same distance stage | 371 |
| base again | /home/user/fortress-base16 | 15:33:50 | 2.78 3.59 3.70 | the same distance stage | 367 |

Reading the times:
- The change's two runs average 382 s and the base's 375 s, which is +1.9 %.
- Like for like beside one job: pass 371 s against the base again 367 s, +1.1 %; change 393 s against the first base 383 s, +2.6 %.
- Runs of the same code differed by up to 5.9 % (393 against 371), so no change of speed is measurable.

The comparisons:
- Tables: `diff` of base, change and pass prints nothing (39 errors, 38 locations, no crash), and so does `diff` of the two base runs.
- Whole outputs, the tree path masked as TREE: change and pass are identical. The base's two runs are identical.
- Change against base, the only difference is row 433's two sites:

      < TREE/Library/FortressLibrary.fss:3405:8-25:
      <     Ill-formed type: MaxSumReductionPair[\T\]
      < TREE/Library/FortressLibrary.fss:3411:8-25:
      > TREE/Library/FortressLibrary.fss:3422:5-26:
      > TREE/Library/FortressLibrary.fss:3424:5-26:

- The count does not reach the component's overloading check while its type errors stand (F-42), so row 727's repair cannot move it.

**The speed pass.** I started with a profile. I made a JFR recording of the whole count stage on the change (settings=default, maxsize=2g; 17,527 samples over 446 s), aggregated with `jdk.jfr.consumer`:
- `TypeWellFormedChecker.walk`: 127 samples inclusive, 0.7 %. Its new helpers: 0.
- `OverloadingChecker.toFunctionalMethodArrows`: 3 samples, 0.0 %.
- `OverloadingChecker.checkOverloading`, the apis' checks: 16.6 %, of which `validOverloading` is 4.1 %. Neither is the rung's declaration.
- The solver, rung S's: `Formula.and`, `reduce` and `minTypes` 81 %, `TypeAnalyzer.normalize` 83.7 %.
- Top self frames: `AbstractNode.hashCode` 7.4 %, `Statics.anyHash` 5.8 %, `BoxesRunTime.equals2` 5.8 %, `List.prependedAll` 4.2 %, `ASTGenHelper.scalaify` 3.5 %.

The third version adds a map probe only on an error, and the stage has four such errors. So the two declarations hold no time to save, and the pass makes no edit and reuses no answer, so there is nothing to audit. ant testQuick ran on the final code (below).

Two notes on the profile:
- An earlier recording with `settings=profile` hit JFR's default 250 MB cap and kept only the last 281 s.
- Both instrumented runs printed '#total 38', '#locations 37': the site `Library/FortressLibrary.fss:130` was gone and the apis' order changed. That is row 488's dependence on identity hashes, which JFR moves. Neither run is one to compare.

**Distance.** It ran once on the final code (a79a51661):

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-15b/gate/distance.txt <tree>/tmp/rung-checker-abstract-callsite/distance-postedit3.txt
    DISTANCE SAME   49

- The table equals 15b's but for `#seconds` (1074, FortressLibrary 557, against 1075 and 628) and `#machine` (load at start 5.09).
- Per site: I compared `dist-post3/errors.tsv` with `explorations/compile-ladder/gate/distance-sites.tsv` by kind, location and message, row by row, not by the stage's class (row 577). Of 49 sites, only row 433's two wellformed sites moved, from `FortressLibrary.fss:3405` and `:3411` to `:3422` and `:3424`, the calls `MaxSumReductionPair[\T\]` and `MinSumReductionPair[\T\]` in `SumReduction`'s `distribute`. The sites at `:3421` and `:3423` stay.
- No site comes from row 727's repair. The distance stage runs the component's overloading check with every stage on, so neither library holds the shape of rows 727, 572 or 734.
- No `#class` row moved.
- A distance run on the second version (f53bee311) also gave 'DISTANCE SAME   49' with the same two moves. Its result is superseded.

**Suites.** ant testQuick ran on each code state:
- 96c441771: 'BUILD SUCCESSFUL', 'Total time: 15 minutes 23 seconds', CompilerJUTest 1218.
- f53bee311: 'BUILD SUCCESSFUL', 'Total time: 12 minutes 23 seconds', CompilerJUTest 1219.
- a79a51661, the final code: 'BUILD SUCCESSFUL', 'Total time: 10 minutes 48 seconds'. LibraryJUTest 86, OtherCompilerJUTest 263 and CompilerJUTest 1220, with 0 failures. That is the 1212 of 15b's gate plus the 8 new tests.

**The compiler's library.** The library order compiled all five components on every build, each 'rc=0', with five jars.

**Ladder subset.** I took 12 files whose first error in the baseline's `ladder.tsv` names an ill-formed or unbound type, an overloading refusal or an inherited abstract method: `GenTest5`, `AfterTypeChecking`, `ColonOperator`, `XXXGenericOverload`, `XXXGenericOverload2`, `XXXextendBoolean`, `XXXextendFloatLiteral`, `XXXextendIntLiteral`, `XXXextendOprParam2`, `XXXtupleTypeParam3`, `tupleTypeParam` and `tupleTypeParam2`. None is in the gate's pass list, so they are compared with the baseline, not with 15b's `ladder.tsv`. They ran after the edit only, with copied drivers under the rung's scratch. Every phase is the same. Two first errors differ, because an error moved to its call now sorts later:
- `GenTest5`: 'Ill-formed type: TestReduction[\()\]' became 'TestCondition[\()\]'. The first error moved from :93:22-37 to the call at :177:30-63. There are 32 errors on the old code and on the new.
- `tupleTypeParam`: 'Ill-formed type: Obj[\(ZZ32, ZZ32)\]' became 'Tra[\(T, T)\]'. That error moved from :18:8-9, the object's name, to the call at :25:7-36. There are 3 errors on both.

**The paths my edit touches.** They are under `ProjectFortress/src/com/sun/fortress/scala_src/`, `ProjectFortress/compiler_tests/` and `Specification/`, so both stages ran.

## 7. Sentences made false

- The Effect of "Overloading with static parameters", `Specification/appendices/changes.tex:2622-2627` at the base: "and reads no abstract functional method of a trait that the component it checks declares (row~727): two declarations of such an operator, or such an abstract method and a concrete one, with the same parameter type pass it, and only its code generator refuses them, as a malformed overload set (rows~726 and~727)." It is corrected here (`changes.tex:2622-2629`), in two sentences. The first says the checker reads the abstract functional methods a type provides as it reads abstract dotted ones, and refuses the pair that only its code generator refused before. The second keeps the operator half (rows 584 and 726).
- `Specification/appendices/changes.tex:2630-2633` (now), "The interpreter loads such a pair ... (row~373)", is made false by rung W, not by this rung. It is left for the gather.
- No other sentence of `Specification/` or `Documentation/` says what the checker does with abstract functional methods or where it reports a bound. `grep -rn 'row~727\|row~572\|row~720\|row~734\|malformed overload' Specification Documentation` finds only the corrected Effect.
- The specification builds clean: `./ant genSource` and `./ant tex` end 'BUILD SUCCESSFUL', and the log has no 'LaTeX Warning: Reference', multiply-defined label or undefined control sequence.
- These statements in the record are false now, which is revival-change material:
  - F-80's "Unchecked: a pair one of whose declarations is the component's own abstract one (row 572)";
  - row 572's walk note ('InterpreterBug ... row 100's mechanism'), already stale since F-142;
  - the places in rows 720 and 433;
  - JUDGE.md decision 1's reading (b), as the checker's behaviour.

## 8. Decisions, each with the ways not taken

1. **Rows 727 and 572: drop the body filter and keep `implemented`** (P-149, reading (a)). Not taken:
   - (b), the base's reading (JUDGE.md section 7);
   - Scala's exemption for a sibling body, the Q1 probe's `scala` shadows, which P-149 refuses;
   - a check in `AbstractMethodChecker` (item 62's other way), which the brief excludes and which would leave row 727 to the code generator.
2. **`declaredInUnit` is removed**, rather than left unused. The revival wrote it for the filter alone (70d5486f9), and nothing else calls it: `grep -rn declaredInUnit ProjectFortress/src` prints nothing now.
3. **Row 720 is fixed in the walk, by reporting at an enclosing expression.** The ways weighed:
   - (a) the nearest expression each time, the first version: errors multiplied;
   - (b) once per message and place, at the innermost expression, the second version: it doubled a type that is ill-formed where it is written;
   - (c) taken: (b), and no move where the node is ill-formed where it is written. This gives the base's number of errors, at the call;
   - (d) check a call's static arguments against the chosen callee's bounds in the type checker, at the call. It moves the check into `STypeChecker`'s call path, with rung S's solver underneath, and drops the walk's check of every other type in expression information;
   - (e) give a call's type the call's spans where the checker instantiates the declared type. That changes the spans every other message prints.
4. **`error` itself chooses the place**, so the errors of `getTypes` and `walkStaticArgs` follow the same rule. `error` is the walk's own helper (`TypeWellFormedChecker.scala:47`). Not taken: changing only the bound error's call (`:202-204`), which would leave the walk's other errors on a call's type at the callee.
5. **The key of a placed error is its message and the node's printed place**, the text the driver de-duplicates on (`MultipleStaticError.java:31-40`). So each of the base's distinct errors stays one error. Not taken: the node's identity, under which a type built twice from one declaration is reported twice.
6. **Two tests beyond the brief's list**, each for a defect measured here that the repair closes: row 734 (`XXXFunctionalMethodMeetAbstractSiblingNarrower`) and the return-type face (`XXXAbstractFunctionalMethodReturnType`). There is also one guard for each faulty earlier version.
7. **The dotted guard pins today's 'in trait O'** for an object, home 3 of NEW-K-1. Not taken: keying on 'Invalid overloading of m in' only.
8. **The speed pass makes no edit**: the profile gives the two declarations nothing to save (section 6). Not taken: a memo of a type's functional arrows across its providers. It would need an audit and saves nothing that can be measured.
9. **The base was timed a second time**, beside the same job as the pass, for a like-for-like pair. The run used private scratch; nothing else ran in the base build.
10. **The tests are compile tests with the `XXX` prefix**, the folder's convention for a refusal at compile time.

## 9. Points to report

- **A declaration of either library that the check now refuses: none.** Rows 727 and 572's line landed (96c441771). The compiler's library compiles in all five library-order runs. In the distance stage, no site of the one library comes or goes.
- **The messages now printed.**
  - Row 727: 'There are multiple declarations of f with the same parameter type: (S)', at `XXXNoDuplicatesRuleAbstract.fss:7:3-21` and `:8:3-25`.
  - Row 572: 'Invalid overloading of pick in trait O: A->String @ ...:7:3-8:1 and B->String @ ...:10:3-26'.
  - Row 720: 'Ill-formed type: V[\T\] The static argument T does not satisfy the corresponding bound K.', at `XXXStaticArgBoundAtCall.fss:13:19-27`, the call `vec[\T\]()`. The reproducer's two errors are at `FactoryUnboundedCaller.fss:16:20-17:8`.
- **Count or distance sites beyond :3405 and :3411: none.** Those two moved to :3422 and :3424.
- **Each count run's seconds and load**: in section 6. Base 383 s at load 2.79, change 393 s at 0.85, pass 371 s at 3.15; the first version 392 s at 3.48; the base again 367 s at 2.78.
- **Compiled tests and the ladder.** No existing compiled test changes its verdict: `XXXNoDuplicatesRuleAbstract` was rekeyed, as its row's own. In the ladder subset no phase moves, and two first errors change (`GenTest5`, `tupleTypeParam`).
- **Refusals beyond the named rows**: row 734's shape, and an object's functional method that defines its trait's own abstract one with an unrelated return type. That one compiled and failed verification on the base.
- **The new place applies to every error of the walk on a type met outside its expression**, not only to a broken bound: an unbound type, an arity, a size. In `GenTest5`, errors the base printed at 'Type checker generated.:0:0' are now at a call (`:645:4-31`).
- **Normative text changed: none** beyond the Effect sentence. The sentences made false are in section 7.
- **Files edited: only the two checker files named.** No library, walk or code-generator edit.

## 10. Defects and their homes

- Row 727: home 1, `XXXNoDuplicatesRuleAbstract` (rekeyed) and `XXXNoDuplicatesRuleAbstractSelfPositions`.
- Row 572: home 1, `XXXFunctionalMethodMeetAbstractSibling`.
- Row 734: home 1, `XXXFunctionalMethodMeetAbstractSiblingNarrower`.
- Row 720: home 1, `XXXStaticArgBoundAtCall`, with `XXXStaticArgBoundAtCallOnce` and `XXXIllFormedTypeAtDeclarationOnce`.
- The return-type face: home 1, `XXXAbstractFunctionalMethodReturnType`. It has no row, since the change repairs it.
- NEW-K-1, the per-provider message calls an object 'trait' (`OverloadingChecker.scala:338`): home 3. The row, and `XXXDottedMethodMeetAbstractSibling`, which pins today's text. The specification prescribes no message.
- The two earlier versions' extra errors never landed alone. Their home is 1, in a79a51661, held by `XXXStaticArgBoundAtCallOnce` and `XXXIllFormedTypeAtDeclarationOnce`.
- The instrumented runs' 38 against 39: a note for row 488.

## 11. For FACTS

See record.md: a rewrite of F-80, and one new entry on where the well-formedness walk reports a type.

## 12. Commands worked out

- **A JFR profile of the whole count stage.**
  - In a copy of `checker-count/run.sh`, add `-XX:FlightRecorderOptions:stackdepth=256 -XX:StartFlightRecording=filename=$SCRATCH/prof.jfr,settings=default,maxsize=2g,dumponexit=true` to the java line.
  - `settings=profile` with JFR's default 250 MB cap keeps only the last minutes; `jfr summary` shows the span kept.
  - Read the recording with a single-file Java program over `jdk.jfr.consumer.RecordingFile`. It counts, for each name given, the `jdk.ExecutionSample` events with a frame whose class and method hold it, and prints the top self frames.
- **The per-site distance comparison.**

      diff <(awk -F'\t' '$1!~/^#/ {print $1"\t"$6"\t"substr($7,1,110)}' explorations/compile-ladder/gate/distance-sites.tsv | sort) <(awk -F'\t' '$1!~/^#/ {print $1"\t"$6"\t"substr($7,1,110)}' <dist>/errors.tsv | sort)

## 13. Refusals met

- The harness refused my write of this report and of record.md. Their text is my result.
- The automatic permission check refused my kill of my own distance run on the superseded second version. I did not retry it. It finished on its own, and the final distance ran separately on the final code.
