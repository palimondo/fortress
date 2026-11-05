<!-- Climb batch 26's gather record: the rungs W, S, L and T applied on main in that order, their commits, the rows opened and closed, the merged tree's tests, the points to report, the items for the curator and where each is in PLAN.md, and each rung's revival change for the skill writer. -->

# Climb batch 26: the gather's record

Written at the gather stage of climb batch 26 (2026-11-05), the batch of `explorations/coordinator/CLIMB-BATCH-26.md`, phase 4's fourth batch on a reduced scope (walk's half of row 804, the overview's NaN sentences, the code generator's local functions and the string family), on `main` from the base `4d27fbcc5571f0157b3dfda3977b63430c66d701`.

**Preconditions.** `git status --porcelain` printed nothing, and `4d27fbcc5` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0; `HEAD` was the base itself).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 4d27fbcc5571f0157b3dfda3977b63430c66d701...<branch>`. Each patch was applied on `main` with `git apply --3way --index`, its record folded and its commit made before the next.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | W, `rung-walk-vector-scalar` | `wip/rung-walk-vector-scalar` at `d0912228f` | `c41c3d2b0` |
| 2 | S, `rung-spec-nan-comparison` | `wip/rung-spec-nan-comparison` at `3c4e93529` | `3eabf8435` |
| 3 | L, `rung-codegen-local-functions` | `wip/rung-codegen-local-functions` at `d34cfaf08` | `d96242f0a` |
| 4 | T, `rung-string-natives` | `wip/rung-string-natives` at `e43230890` | `93884be8d` |
| | the rows' closes | | `9e8acf425` |

## The order the rungs were applied in

W, S, L, T, the manifest's order.
- No rung lands only with another (`landsOnlyWith` empty for all four), so the first rule orders nothing.
- No two rungs' net changes share a file: `git diff --name-only 4d27fbcc5571f0157b3dfda3977b63430c66d701...<branch>` for the four branches, sorted together, printed no line twice (`sort | uniq -d` printed nothing). So the second rule orders nothing, and the rungs keep the manifest's order.
- The gather's own edits share files: `Specification/appendices/changes.tex` (W's Effect sentences at the entry of P-157 and P-146's entry; S's new entry; T's Effect of the native-binding entry), `FACTS.md`, the ledger and `PLAN.md`. W's correction of `changes.tex` adds six lines near its line 2960, before every line that S and T cite there; the records folded name sections, not those lines, and the rungs' REPORT.md and SKEPTIC.md keep the lines of their own branches. Rung L's 228 lines of `CodeGen.java` moved row 497's citation of `generateTaskCompute`, re-anchored by symbol in its rewrite (now `CodeGen.java:5014`).

## Conflicts

None. Every hunk of the four patches applied cleanly ('Applied patch to ... cleanly.' for each modified file; the new files by direct application).

## The tests on the merged tree

In the main tree at `93884be8d`, after `ant compileAll` ('BUILD SUCCESSFUL', 'Total time: 40 seconds', 'Caches /home/user/fortress/default_repository/caches started again, empty') and the library order (five compiles, `rc=0` each, the five jars in `bytecode_cache/`):
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/gather/b26-h1` on the batch's 20 walk tests with the five `.test` files of the refusals and the `XXX` test (W's seven, S's `ComparisonAtNaNWalk` and `TupleOrderBounds`, L's five `LocalFunction*Walk` guards, T's six):
  `# harness-one 2026-11-05T21:45:22Z; tree 93884be8d; nproc=4; load 2.04 0.94 0.96; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled`
  ` OK Saw expected refusal at load`; ` Saw expected failure: loaded and ran, not refused at load`
  `OK (20 tests)`
  (A first call, given the `.fss` files without the five `.test` files, read the four refusal tests and the `XXX` test as plain programs, 'Tests run: 20,  Failures: 5'; the call above names them.)
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh gather26 ProjectFortress/compiler_tests` on L's five `LocalFunction*Compiled` run tests and three `XXXLocalFunction*Compiled` tests, S's `NativeHelperFamilyFloatCompiled` and `NativeHelperFamilyRR32Compiled`, and T's `NativeHelperFamilyStringCompiled`:
  `# junit.sh gather26 2026-11-05T21:45:45Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.72 0.94 0.96; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; tree 93884be8d`
  `OK (19 tests)`
- `bash tmp/run-demos.sh tmp/gather/b26-demos`, the demo driver as `compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", gives it, from 21:46:16Z to about 22:17Z, `FORTRESS_THREADS=1`, nproc 4, beside the specification's build for its first minutes:
  `demos: 52 run, 52 reached their end`
  Among them `BiCGSTAB` ('elapsed time 75485435625 ns ( 75.485435625 s)'), `npbft` ('  Checksum 1 : 570.4182371381474+385.43365014877793i') and `trips` ('{[trip 3 4 5],[trip 5 12 13],[trip 7 24 25],...').
- The specification, built once on `main`'s text after the last edit under `Specification/` (`93884be8d`): `cd Specification/fortress && ./ant genSource && ./ant tex`, 'BUILD SUCCESSFUL' twice ('Total time: 45 seconds', 'Total time: 40 seconds'); the count of reference, label and undefined-control-sequence warnings in `fortress.log` printed 0; the PDF copied to `/home/user/fortress/tmp/gather/fortress-batch-26.pdf` (its text holds '306 of the 449' and 'these four operators returns false if either argument is a NaN, and CMP returns Unordered.'); the build's files removed with `git clean -fXq -- Specification`.
- Neither the count stage nor the distance stage was run here: rung T ran both once on its tree ('#total 0', 'DISTANCE SAME   0', against climb batch 25's landed 0 and 0), and the gate runs both on the merged tree, with the suites and `ant testSpecData`.

### Text mismatches

None. Rung S's text names no behaviour that W, L or T changes. The gather's three corrections of `Specification/appendices/changes.tex` state what the merged code does, each clause checked against its code: in the Effect of the P-157 entry, walk now loads and runs a program's generic operators between an array of a number type and a number beside a self-typed trait's operator, reading the pair as two own generics where the operator has no static parameters of its own (`OverloadedFunction.java`, `traitMethod`, `traitMethodPairValid`) and `self` as the trait met with its self-type parameter for a trait whose parameter is bounded by the trait at it (`selfTypeParameter`), and loads an object that breaks P-146's extender rule (row 893, also named in P-146's entry's Effect); in the Effect of the native-binding entry, 306 of 449 bindings name a helper (`grep -o 'builtinPrimitive("com.sun.fortress.nativeHelpers'` over `Library/*.fss` and `ProjectFortress/LibraryBuiltin/*.fss` printed 305, with `natLineSeparator`'s string on its own line at `Library/FlatString.fss:26`), the string family listed, 143 on glue, a helper parameter declared `String` refused at load (`StaticNativeApp.java:180`, 'no Java type carries the declared type of parameter'), and `FlatString` carried by its declaring component (`javaForSelf(FType)`, `declaringComponent`). No binding of the library takes a parameter declared `String`: the one such line, `throwError(a:String)` at `Library/FortressLibrary.fss:4647`, is inside a comment.

## Rows opened

| Row | Rung | Claim |
|---|---|---|
| 893 | W's skeptic (NEW-W-1) | under walk an object that extends a self-typed trait at a type it is not a subtype of loads, and a call that the trait's operator and a generic array operator both fit runs one of them |
| 894 | W's skeptic (NEW-W-2) | the compiled checker's `checkFancyRule` refuses a generic function inside a self-typed trait's functional method's declared domain whose return type holds, which walk loads; `CONTESTED` |
| 895 | T (NEW-T-1) | checked against the interpreter's prelude, a binding that names any helper of `nativeHelpers/systemOps` stops its component with 'FortressBuiltin.StringVector is undefined.' |

Rows rewritten: 440 (S: its claim names `<=` and `>=`, its notes cut, the note not fitting), 304 (L: narrowed to the three forms still refused), 497 and 76 (L's notes, each refused for length by `note` and so rewritten with the notes cut; 497's `generateTaskCompute` re-anchored), 846 (T: narrowed to a program's glue binding over `String`, its claim cut to the template's 300 characters), 872 and 368 (T's notes, each refused for length and so rewritten).

## Rows closed

In `9e8acf425`, each after its test passed on the merged tree (above): 804 by `c41c3d2b0` (W), test `ExclusionVectorScalarWalk`; 672 (`CONTESTED`) by `3eabf8435` (S), test `ComparisonAtNaNWalk`, settled by P-159. `python3 explorations/coordinator/tools/ledger.py landing-check 4d27fbcc5571f0157b3dfda3977b63430c66d701` then printed 'ledger.py landing-check: 4d27fbcc5..HEAD: no finding'.

## Each rung

- **W** (`c41c3d2b0`): F-318 added; F-277 and F-252 corrected (F-252's title widened to the functional method, the skeptic's item); rows 893 and 894 added from the skeptic's rows, their placeholders replaced in REPORT.md and SKEPTIC.md; the Effect sentences of `changes.tex` on row 804 rewritten and row 893 named in P-146's entry's Effect. Skeptic's fix `171655095`: the Return Type Rule branches' tests (`GenericBesideTraitMethodInsideWalk`, `GenericInsideTraitMethodReturnRuleWalk`), the rows' tests (`XXXSelfTypeExtenderOtherTypeWalk`, `GenericInsideTraitMethodWalk`), two sentences made false added. No contested ruling. Left by the skeptic for the gather: the two rows (done) and `interpreter.md:43` with F-252's title (F-252 done; the skill line left, gather.1).
- **S** (`3eabf8435`): F-319 added; row 440 rewritten; its decision record landed. No skeptic fix, no ruling.
- **L** (`d96242f0a`): F-320 added; F-34 (38 declarations in 10 kinds) and F-181 corrected; rows 304, 497 and 76 rewritten; `PLAN.md`'s phase 4 lines on the code generator's count and C4's local functions corrected. No skeptic fix, no ruling.
- **T** (`93884be8d`): F-321 added; F-299 (306 of 449, the family, the carriers), F-32 (143) and F-307 corrected; rows 846, 872 and 368 rewritten; row 895 added, its placeholder replaced in REPORT.md and SKEPTIC.md; the Effect of the native-binding entry of `changes.tex` rewritten; `PLAN.md`'s natives lines corrected. Skeptic's fix `4eebb9a45`: row 846's home-3 guard `NativeGlueNonFlatStringWalk`, the rope test's one comment line, F-307 and `PLAN.md:49` among the sentences made false. No ruling.

## Files written from the journal

None. Every branch carried its REPORT.md, record.md and SKEPTIC.md, and no rung had a repair round.

## The rungs that did not land

None: all four were approved and landed.

## Handover lines

- **W** (`rung-walk-vector-scalar`, `c41c3d2b0`): Rung W landed walk's half of row 804 (P-160's first step): walk reads an own generic beside a self-typed generic trait's functional method on their declared domains, `self` as `C[\X\] & X` at the meet; row 804 closes on `ExclusionVectorScalarWalk`; with `Number`'s clause removed in a scratch copy, the four programs load; P-160's second step is next.
- **S** (`rung-spec-nan-comparison`, `3eabf8435`): Rung S (climb batch 26): the operators overview's two comparison sentences revised to the rationals chapter's reading, a NaN or 0/0 comparing `false` and the rational infinities ordered (P-159), with Appendix I's entry "A comparison at a NaN or at the rational indefinite" and the decision record; row 672 closes on `ComparisonAtNaNWalk`; row 440 rewritten to name `<=` and `>=`; the later restart's copy (`Documentation/.../operator-overview.tick:274-278`) still says the raise.
- **L** (`rung-codegen-local-functions`, `d96242f0a`): Rung L: the code generator compiles local functions as closures (`dbf4825e0`), recursive and mutually recursive without a mutable cell; F-34 becomes 38 refusals in 10 kinds with all nine `LetFn` declarations emitting; row 304 narrows to static parameters of a local function's own, overloading within a block and `atomic`, each with its `XXX` test.
- **T** (`rung-string-natives`, `93884be8d`): Rung T landed on `wip/rung-string-natives` (`15d81c1c1`, `19e9dbda5`, `8b6fca9b5`): the string family's 18 bindings on helpers (143 glue bindings left), walk's loader carrying the library's `FlatString` as `self` and refusing a helper parameter declared `String`; `ant testSystem` 743 tests, 0 failures; count 0, distance 0; row 846 narrowed to a program's glue binding over `String`; row 895 for `systemOps`, which `System`'s two natives still name.

## Points to report

None holds the push; each is reversible and landed. Each rung's skeptic confirmed its worker's list, so each point stands once here.
- **W**: methods changed in `OverloadedFunction.java`, `validOnDeclaredDomains` (`:772-779`), `domainsExcludeTogether` (`:1081-1092`), `Apart.of` (`:1433-1435`), and new `traitMethod` (`:814-817`), `traitMethodPairValid` (`:826-833`), `selfTypeParameter` (`:845-867`), imports `:32`, `:39`; `excludesAtMeet` and `interpreter/evaluator/types/` unchanged. The promoted test, the library's shape and the guard: `harness-one.sh` on the base 'Tests run: 3,  Failures: 2' (the guard 'OK Saw expected refusal at load'), after 'OK (3 tests)'; the guard's program refused by the compiled checker too, 'Invalid overloading of PLUS in component ExclusionVectorScalarOverlapWalk', rc=255; walk's guard message moved to 'fails the Meet Rule'. The scratch measure with `Number`'s clause removed: 'BooleanOps rc=0', 'ArrayScalarExtension rc=0', 'ArrayOperatorsBesideLibrary rc=0', 'extendNumber rc=0', no refusal; the clause restored (`Library/FortressLibrary.fss:381`, `Library/FortressLibrary.fsi:289`). `ant testSystem` 743 tests, 0 failures, no verdict changed, rows 713, 779, 780 and 786 to 788 unmoved. Sentences made false: `changes.tex:2960-2964` (corrected), F-277 and F-252's title (corrected), the skill's `interpreter.md:43`, `:53` and `revival-changes.md:43` (left, gather.1). No file beyond those named; no edit of `Library/` or of the checker (the skeptic's four tests are under `ProjectFortress/tests/`).
- **S**: the revised sentences and the callout (`Specification/basic/operators/opr-overview.tex:284-300`); the Appendix I entry with row 440's departure (`Specification/appendices/changes.tex`, "A comparison at a NaN or at the rational indefinite", `:4550-4622` on its branch, six lines lower on `main`); the preamble checked and unchanged (`Specification/fortress/preamble.tex:54-62`). The walk test on the base's code ' OK (time = 596ms)', last 'OK (6 tests)'; the compiled asserts, `ONE_JVM=1 junit.sh nan`, 'OK (4 tests)'. The specification's build: 'BUILD SUCCESSFUL' twice, the warnings count 0. Sentences made false: `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:274-278` (for the curator, S.worker.1), row 672 (closed), `PLAN.md`'s climb batch 13 entry on row 672 (gather.2).
- **L**: in `CodeGen.java`, new `forLetFn` (`:3580-3642`), `localFunctionArrowType` (`:3646`), `localFunctionClosure` (`:3666-3729`), the nested `LocalFunctionSiblingVar` and `LocalFunctionSelfVar` (`:3733-3773`), `localFunctionOrNull` and the field `localFunctionNames` (`:3831-3842`); changed `forFnRef` (`:3845-3852`) and `for_RewriteFnApp` (`:6797`); self as `this`, siblings as fields set at `:3627-3636`; no class file added. `junit.sh` before 'Tests run: 10,  Failures: 10,  Errors: 0', after 'OK (53 tests)'; the walk guards 'OK (5 tests)' on the base and after. The code generator's table on its tree: 'refused declarations 38 | emitted (OK lines) 703 | component failures 0', 'kinds 10'; all nine `LetFn` declarations have '@@CG OK' lines. The five `LocalFunction*Compiled` run tests red to green; no track run; row 497 not met. Sentences made false: row 304 (rewritten), F-34 and F-181 (corrected), `PLAN.md:10`, `:56`, `:93` (corrected), the skill's `compiler.md:41` (gather.1), `coordinator/map/compile-path-walkthrough.md:469`, `:475-476` and `coordinator/map/spec-to-implementation.md:201` (gather.2).
- **T**: in `StaticNativeApp.java`, `javaForParameter` (`:64-72`), the reworded comment of `javaForSelf(String)` (`:96-102`), `javaForSelf(FType)` (`:122`), `declaringComponent` (`:136`), `find(String, Applicable, FType)` (`:163`), the step's call (`:178`); `NativeApp.java:201`; it differs from the probe's `shadow.patch` by `javaForParameter` and the comment. 18 bindings moved, 7 onto 6 existing helpers and 11 onto new ones, in `stringOps`, `simpleConcatenate`, `simplePrintln` and `systemOps`, four classes the one library names for the first time (`Library/FlatString.fss:25-101`, `Library/FortressLibrary.fss:4615`, `:4628`, `:4635`, `:4640`, `Library/System.fss:41`, `:51`). Tests on the base failing (`harness-one.sh` 20:22:48), `FlatString`'s methods' test stopped with the strings moved before the loader change ('no Java type carries FlatString, the type of self.'), after 'OK (6 tests)'; the compiled guard 'OK (2 tests)'. The count and the distance on its final tree: '#total 0' and 'DISTANCE SAME   0', the count in 152 s; a site that came on the first distance run, 'FortressBuiltin.StringVector is undefined.' at `Library/FlatString.fss`, traced to `natLineSeparator` naming `systemOps`, gone after `8b6fca9b5` (row 895). The last step taken: a helper parameter declared `String` refused at load (`StaticNativeApp.java:70`, `:178`), changing `NativeHelperNonFlatStringWalk` to a refusal test and `NativeHelperBindingWalk.fss:3`, `:10-11`, `:17`. Values that move: `javaIndexOf(char(128512))` in `"a" || char(128512).asString || "b"` 1 on the base, -1 after, as the compiled answer; the five at a `CatString`, `SubString` and `EmptyString` read the characters; `getProperty` at an `EmptyString` name now raises 'key can't be empty'; `ant testSystem` 743, 0 failures, only `NativeHelperNonFlatStringWalk` changing kind. Row 846 narrowed; rows 877 and 878 unmoved. Sentences made false: `changes.tex:4499-4507` (corrected, with the Effect's counts), F-299, F-32, F-307 (corrected), `PLAN.md:10`, `:46`, `:47`, `:49` (corrected), the skill's `interpreter.md:95`, `:99`, `:102`, `:107`, `:116` (gather.1). Files beyond those named: `ProjectFortress/tests/NativeHelperBindingWalk.fss:3` (an import), the line separator's helper in `stringOps.java:72` not `systemOps.java`, and the skeptic's `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss`.

## Items for the curator, and where each is in `PLAN.md`

One asks for an answer before work on the path goes on and is under "Pavol's answers, in the order they are needed", in a new group "Before the switch-over's checker reads `System`"; the rest are under "Off the path, parked", in the new group "Climb batch 26, listed for his review".
- T.worker.1 and T.skeptic.1 (row 895): item 64, "T.worker.1 and T.skeptic.1 of climb batch 26's rung T (row 895): `System`'s `getEnvironment` and `getProperty` ..." (`PLAN.md:148`).
- W.skeptic.1 (row 894): "W.skeptic.1 of climb batch 26's rung W (row 894, `CONTESTED`): is `checkFancyRule` ..." (`PLAN.md:645`).
- W.skeptic.2 (row 893): "W.skeptic.2 of climb batch 26's rung W (row 893): should walk's load check apply P-146's extender rule ..." (`PLAN.md:646`).
- S.worker.1 and S.skeptic.1: "S.worker.1 and S.skeptic.1 of climb batch 26's rung S: `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:274-278` ..." (`PLAN.md:647`).
- S.worker.2 and S.skeptic.2: "S.worker.2 and S.skeptic.2 of climb batch 26's rung S, told, not asked: row 440's change ..." (`PLAN.md:648`).
- T.worker.2 and T.skeptic.2: "T.worker.2 and T.skeptic.2 of climb batch 26's rung T (fork 21, taken) ..." (`PLAN.md:649`).
- T.worker.3 and T.skeptic.3: "T.worker.3 and T.skeptic.3 of climb batch 26's rung T (fork 19): does review-queue item 332 cover the pair ..." (`PLAN.md:650`).
- gather.1: "gather.1 of climb batch 26, told, not asked: the sentences of the `fortress-repo` skill that the batch made false ..." (`PLAN.md:651`).
- gather.2: "gather.2 of climb batch 26, told, not asked: sentences outside the rungs' files that the gather left for the coordinator's routing ..." (`PLAN.md:652`).

## Left for the coordinator and the skill writer

- gather.1 (`PLAN.md:651`): the skill's sentences made false, which the batch does not write (the brief: nothing under `.claude/`), rung W's skeptic's `interpreter.md:43` among them: `.claude/skills/fortress-repo/references/interpreter.md:43`, `:53`, `:95`, `:99`, `:102`, `:107`, `:116`; `references/revival-changes.md:43`; `references/compiler.md:41`.
- gather.2 (`PLAN.md:652`): `coordinator/map/compile-path-walkthrough.md:469`, `:475-476` and `coordinator/map/spec-to-implementation.md:201` (a local function refused); `PLAN.md`'s items 62 and 63 (built by rung T) and its climb batch 13 entry on row 672 (closed), for the routing.
- `POSITIONS.md`'s P-159 says the two sentences "are to be revised"; they now are. POSITIONS is the curator's, and the gather did not edit it.
- The handover lines are in this file only; the per-rung commits carry no handover file, since this record is written once, last.

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, in the order the rungs landed, with the rows' numbers in place of the placeholders (none of the four held one).

### W (`rung-walk-vector-scalar`, `c41c3d2b0`)

**The change.** The team's walk refused, at load, a generic function beside a functional method of a generic trait wherever no single pair of their parameter types excluded each other, with the message 'with generic type, at least one pair of parameters must have excluding types' (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:571-583`, `describeOverloadingFailure`). The tree's walk now reads such a pair, where the method declares no static parameters of its own, on the two declared domains by the No Duplicates, Return Type and Meet Rules, with the exclusion of the two domains read whole by existential reduction and the self parameter of a self-typed trait read there as the trait met with its self-type parameter; a program's generic `+` between an `Array[\T,I\]` and a `T` bounded by a number trait and `AdditiveGroup[\T\]`, beside `AdditiveGroup`'s own `+`, loads and each call runs the declaration its arguments select (`ProjectFortress/tests/ExclusionVectorScalarWalk.fss`, `ExclusionArrayScalarLibraryShapeWalk.fss`); a pair whose domains overlap with no cover is refused as failing the Meet Rule (`ExclusionVectorScalarOverlapWalk.fss`). The reason: the specification reads exclusion of declarations with static parameters by existential reduction (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters"), and the compiled checker accepts and runs this pair, reading `self` as `C[\X\] & X` and the parameters within their bounds; walk's refusal was the measured failure 'with generic type, at least one pair of parameters must have excluding types' on `XXXExclusionVectorScalarWalk.fss`.

**Provenance.** Row 804, walk's half; P-160's first step, following P-157 and P-152; climb batch 26, rung W.

### S (`rung-spec-nan-comparison`, `3eabf8435`)

**The change.** The team's specification, `Specification-1.0-frozen/basic/operators/opr-overview.tex:274-278`, says that a comparison of rational values throws `RationalComparisonError` if either argument is 1/0 or 0/0, and that a comparison of floating-point values throws `FloatingComparisonError` if either argument is a NaN; its rationals chapter says instead that 0/0 compares `false` "for compatibility with floating-point arithmetic" and that the infinities are ordered (`Specification/basic-lib/numbers.tex:372-378`), and the team's walk and compiler answer `false` and never raise (`Library/FortressLibrary.fsi:1187`, `Library/CompilerLibrary.fsi:99` declare the error; nothing throws it). The tree's specification now says that `<`, `<=`, `>` and `>=` return `false` at a NaN or at 0/0, that `CMP` returns `Unordered` at a NaN, and that -1/0 lies below and 1/0 above every finite rational (`Specification/basic/operators/opr-overview.tex:284-291`); walk and the compiled helpers do so, shown by `ProjectFortress/tests/ComparisonAtNaNWalk.fss` and the NaN asserts of `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss` and `NativeHelperFamilyRR32Compiled.fss`. Walk still answers `true` for 0/0 `=`, `<=` and `>=` 0/0 (`Library/FortressLibrary.fss:597-607`). The reason: both implementations and the rationals chapter already gave `false`; Java, Swift, Python, Julia and Haskell answer `false`; a NaN test in software costs 15 to 20 percent of a comparison on unboxed doubles in Java (`explorations/perf-probes/nan-check-cost/REPORT.md:95`).

**Provenance.** Row 672 (CONTESTED); the curator's answer P-159, the review `explorations/reviews/nan-comparison-2026-11-05.md`, option (a), with the rational twin taken; climb batch 26, rung S, forks 5, 6 and 11.

### L (`rung-codegen-local-functions`, `d96242f0a`)

**The change.** The team's code generator refuses every local function: `CodeGen.defaultCase` throws 'Can't compile LetFn' for the block that declares one (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1672-1674` at 4d27fbcc5), and `forFnDecl` refuses a function inside a block, "no local functions" (`:3015-3025`). The tree now compiles a local function as a closure of its own class, made as a function expression's, recursive and mutually recursive within its block, called and passed as a value (`compiler_tests/LocalFunctionCallCompiled`, `LocalFunctionValueCompiled`, `LocalFunctionRecursiveCompiled`, `LocalFunctionCaptureCompiled`, `LocalFunctionGenericContextCompiled`). It still refuses a local function with static parameters of its own, two of one name in a block, and `atomic` (`XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled`, `XXXLocalFunctionAtomicCompiled`). The reason: the specification allows local functions with the syntax of top-level ones, overloaded and mutually recursive within their scope (`Specification/basic/functions.tex`, "Local Function Declarations"); walk binds each as a closure in the block's environment (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildLetEnvironments.java:55-81`); and the interpreter's library declares local functions in nine declarations that the code generator refused after the checker passed them (`codegen.sh` on the base: '9  Can't compile LetFn  [FortressLibrary 7, RangeInternals 2]').

**Provenance.** Row 304 and F-34; Question 1 of climb batch 26's record, at its default (a), a closure of its own class, with forks 8 and 9 (the scope, and the group without a mutable cell); climb batch 26, rung L.

### T (`rung-string-natives`, `93884be8d`)

**The change.** The team's walk bound `printThreadInfo`, `printWithThread`, `printlnWithThread` (`Library/FortressLibrary.fss:4628-4632` at 4d27fbcc5) and `getEnvironment`, `getProperty` (`Library/System.fss:40`, `:45` at 4d27fbcc5) over `String` to glue classes that take `v.getString()` (`interpreter/glue/prim/Util.java:286`), so at a string made by concatenating two long strings they printed or looked up the name `CatString`. The tree declares each as a native over `FlatString` beside an overload over `String` that flattens, so each reads the characters: `ProjectFortress/tests/NativeHelperStringRopeWalk.fss`. The team's `FlatString.javaIndexOf` searched for the low 16 bits of a character (`interpreter/glue/prim/FlatString.java:180-184`); the tree's searches for its code point, so past U+FFFF the answer moves (1 to -1 in the measured string). The reason: a glue class cannot run on the compiled path (F-32), the natives move onto helpers that both paths call (P-58), and the measured failure at a rope (row 846; the base's run of `NativeHelperStringRopeWalk`, 'FAIL: J1/0:? =/= ...; getEnvironment at a rope name').

**Provenance.** Review-queue items 310 and 340, at the Fable judge's default inside the strings review's recommendation (`explorations/reviews/string-natives-2026-11-05.md`, section 8), with the judge's three refinements; climb batch 26, rung T; on the curator's review list.
