# Runs, c-run4's probe

The tree: main at 9f2e19135, clean (`git status --porcelain --untracked-files=no` empty); its only commits since the base c124c6b65 touch the record, not `ProjectFortress/` or `Library/`. `bin/fortress explorations/claude_demo.fss` printed `SUM[i <- 1#100] i = 5050`, rc=0. Every call: the skill's setup lines, `flock tmp/ledger-pass-jvm.lock nice -n 19 timeout -k 10 200`. Walk runs used `FORTRESS_CACHES=tmp/ledger-pass/c-run4/run/caches`; compiled and checker runs used `probe/ccaches`, a copy of `default_repository/caches`. Programs and full outputs are under `probe/`.

## Row 377 (compiled)
- Program: `probe/r377/Sk2OldNew.fss`, from `git show ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss`.
- Command: `cd probe/r377 && bin/fortress compile Sk2OldNew.fss`, then `bin/fortress run Sk2OldNew`.
- Output: `Sk2OldNew.fss:7:13-33:4: Error trying to close method scope.`; `at ...CodeGen.generateActualMethodCode(CodeGen.java:2874)`; `Caused by: java.lang.ArrayIndexOutOfBoundsException: Index -1 out of bounds for length 0` `at ...CodeGenMethodVisitor.visitMaxs(CodeGenMethodVisitor.java:99)`; run: `Could not load Sk2OldNew`.
- Exit: compile 1, run 1.
- Narrowing, one line dropped each time (`probe/r377/drop-{void,tuple,arrow,Nothing,None}/`): each still `Error trying to close method scope.`, exit 1.

## Row 100 (walk)
- Program: `probe/r100/g22.fss`, from `git show e879b6a44^:explorations/gap-ledger-probes/g22.fss` (component `g22`, so the file keeps that name).
- Command: `cd probe/r100 && bin/fortress g22.fss`.
- Output: `g22.fss:7:1-12:2: Object Z does not define an abstract method declared in type ZeroIndexed:` `/home/user/fortress/Library/FortressLibrary.fss:2055:5-43: _[_](Range[\ZZ32\]):ZeroIndexed[\RR64\]`; no `z[1] =` line.
- Exit: 1.

## Row 221 (walk)
- Program: `explorations/apl/rung-1/r13_generator.fss`, as in the tree.
- Command: `cd explorations/apl/rung-1 && FORTRESS_SOURCE_PATH=../base:.:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library bin/fortress walk r13_generator.fss`.
- Output: `explorations/apl/base/AplCore.fss:52:56-78: Unification error: Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr at .../AplCore.fss:61.15 ZZ32->RR64`.
- Exit: 1.
- One change, `probe/r221fill/FillFn.fss` (AplCore's `aplVec` alone): the same message, exit 1, with the run's caches and with a copy of the default caches; the function form is `tabulate` since f3b62bc83 (`Library/FortressLibrary.fss:2247`).
- One change, `probe/r221tab/` (the base and the program copied, the function-form `fill` calls renamed `tabulate`): prints `|v|                 = 5`, then `AplCore.fss:42:11-21: Failed to find any matching overload, args = (1.0,4: ZZ64)` (juxtaposition). Exit 1.

## Row 694 (checker and walk)
- Program: `probe/r694/OverrideCoerceChoice.fss`, as the question gives it.
- Command: `bin/fortress typecheck OverrideCoerceChoice.fss`; `bin/fortress walk OverrideCoerceChoice.fss`.
- Output: `OverrideCoerceChoice.fss:12:21-28: Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (IntLiteral, IntLiteral) only by coercion, none is more specific than every other: (ZZ32, ZZ32)->String; (Number, ZZ32)->String.` `File OverrideCoerceChoice.fss has 1 error.`; walk prints `B`.
- Exit: typecheck 255, walk 0.

## Row 547 (compiled checker, harness)
- Program: `probe/r547/SkFnBetween.fss` and `.test` (`tests=SkFnBetween`, `compile`, `compile_err_contains=Invalid overloading of choose in trait M`), beside copies of `compiler_tests/CoverageReturnGood.fss` and `.test`; written in the probe folder, not in `compiler_tests/`, and run with `fortress junit` directly in place of `junit.sh`, whose cache clean-up removes entries from `default_repository/caches`.
- Commands, from `ProjectFortress/`, `FORTRESS_THREADS=4`: `../bin/fortress junit probe/r547/SkFnBetween.test`; `../bin/fortress junit probe/r547/CoverageReturnGood.test probe/r547/SkFnBetween.test` (one JVM).
- Output, alone: `Invalid overloading of choose in trait M: (S & {U, V})->LeftResult @ ...SkFnBetween.fss:15:3-34 and (T & {V, W})->RightResult @ ...:12:3-36`. After: `compile .../CoverageReturnGood OK`, `link ... OK`, then the same `Invalid overloading of choose in trait M` for `SkFnBetween`, then `run .../CoverageReturnGood ... PASS`.
- Exit: 0 both (the harness marks `SkFnBetween` FAIL in both, since a test whose name lacks `XXX` fails on any refusal, `FileTests.java:382-385` and `:418`; the verdict read is the refusal message).

## Row 555 (walk)
- Program: `probe/r555/RpFJoin.fss`, as the question gives it.
- Command: `cd probe/r555 && bin/fortress RpFJoin.fss`.
- Output: `RpFJoin.fss:13:21-36: Unification error: RpFJoin.fss:11:15-20: Cannot unify Any(class com.sun.fortress.interpreter.evaluator.types.FTypeTop) with Cmp[\T\](class com.sun.fortress.nodes.TraitType) abm=T=(Any,Any)`; no refusal at load.
- Exit: 1.

## Row 432 (walk)
- Programs: `probe/r432/B1.fss` to `B5.fss`, one expression each. As the question wrote them, without `import List.{...}`, each stopped `Operator <|_|> is not defined.` (B4: `Operator BIG <|_BIG |> is not defined.`), exit 255; then one change, `import List.{...}` added, as the old probe `rung-flat-tower/bare-sum.sh` wrote it.
- Command: `cd probe/r432 && bin/fortress Bi.fss`.
- Output: B1 `SUM <|1, 2, 3|>`, B2 `PROD`, B4 `SUM <| n^2 | n <- 1#3 |>`, B5 `BIG MAX`: `Failed to find any matching overload, args = (ArrayList[\Int\])`; B3 `SUM <|1.5, 2.5|>`: `args = (ArrayList[\FloatLiteral\])`.
- Exit: 1 each.

## Row 817 (compiled checker's driver)
- Program: `ProjectFortress/demos/trips.fss`.
- Command: `explorations/compile-ladder/rung-team-demos/REPORT.md`, "The checker's driver over one demo", step 3, with `S=probe/r817` and an empty `$S/caches`; steps 1 and 2 not run (a probe builds nothing): the shadow classes and `DistanceMulti` are those the newest gate's distance stage compiled, `tmp/gate-batch-26/distance/shadow-classes` and `classes` (compiled 2026-11-05 22:19, after the last commit to `ProjectFortress/src`, 93884be8d at 21:43; no source change from a12ab5c60 to the base).
- Output: `@@SC STAGE component trips acyclic errors=0`; `@@SC STAGE component trips typecheck errors=18`; seven `generator ... (String, ZZ32, ZZ32->List.List[\trip\])->generator is not applicable to an argument of type (String, IntLiteral, ZZ32->List.List[\Any\])`, eight `__generate`, `seq` at `:303`, `AnyMaybe` at `:82`, `Cannot assign to immutable variable: approx` at `:76`; `Missing parameter type for` trips, xs, ps; `TryChecker returned an untyped expr` at `:286`; `@@SC CRASH component trips overloading edu.rice.cs.plt.tuple.OptionUnwrapException` at `OverloadingChecker.scala:129`; `### done ProjectFortress/demos/trips.fss rc=0 seconds=56`.
- Exit: 0.
- Not the driver: `bin/fortress typecheck trips.fss` checks against the compiler's prelude and stops on 21 undefined names in the library's apis (`ImmutableArray is undefined.`), exit 255; it does not bear on the row.

## Row 691 (compiled)
- Program: `probe/r691/ExtraArgsGeneric.fss`, as the question gives it.
- Command: `cd probe/r691 && bin/fortress compile ExtraArgsGeneric.fss && bin/fortress run ExtraArgsGeneric`.
- Output: compile prints nothing; run prints `1011`.
- Exit: 0, 0.

## Row 751 (checker and walk)
- Program: `probe/r751/ApplyTwoOpen.fss`, as the question gives it.
- Command: `bin/fortress typecheck ApplyTwoOpen.fss`; `bin/fortress ApplyTwoOpen.fss`.
- Output: typecheck prints nothing; walk: `ApplyTwoOpen.fss:12:21-28: Unification error: ...:10:20-32: Cannot unify ZZ32->NatParamT(...FTypeArrow) with FortressLibrary.ZZ32->Nt[\n\](...ArrowType) abm=()`.
- Exit: typecheck 0, walk 1.

## Row 255 (walk, optional)
- Program: `explorations/apl/rung-6/w02_lib.fss`, as in the tree.
- Command: `cd explorations/apl/rung-6 && FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library" bin/fortress w02_lib.fss`.
- Output: `Overloading of BY(self:(FortressLibrary.RR64 & ...),b:FortressLibrary.RR64) ... (FortressLibrary.fss:462:5-64) and BY(a:FortressLibrary.RR64,b:FortressLibrary.RR64) ... AplCore.fss:1209:1-1211:80 fails because their parameter lists have the same types`.
- Exit: 1.

## Row 210 (walk, optional)
- Program: `probe/r210/q11_nlform.fss`, `q11_g.fsi`, `q11_g.fss`, from `git show 1ee3b0bc5^:explorations/apl/v1-probes/...`.
- Command: `cd probe/r210 && FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:..." bin/fortress q11_nlform.fss`.
- Output: `c1. aply 2 3 ⍴ ⍳ 6, nothing to leave by     -> (2 3 ⍴ (⍳ 6))`; `c2. aply 1 2 / 3 4 on two lines             -> 1 2 3 4`.
- Exit: 0.
