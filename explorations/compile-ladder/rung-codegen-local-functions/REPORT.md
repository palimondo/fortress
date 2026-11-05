# Rung L: the code generator's local functions (row 304)

- problem: the code generator refused 47 declarations of the fourteen components under the switch-over's setting, 9 of them 'Can't compile LetFn' (F-34; the planner's `codegen.sh` run, `explorations/coordinator/CLIMB-BATCH-26.md:310-390`); row 304, `explorations/fortress-gap-ledger.md:820`
- spec: `Specification/basic/functions.tex:578-598`, "Local Function Declarations"
- precedent: `CodeGen.forFnExpr`, a function expression's closure class (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3503-3567` at 4d27fbcc5), and walk's binding of the group in one environment (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildLetEnvironments.java:55-81`)
- deviation: a closure reaches itself as its own `this` and its siblings through non-final fields set once after the group is made, where `forFnExpr`'s captured fields are final and set in the constructor (`CodeGen.java:3617-3636`, `:3733-3773`); the specification's overloaded and generic local functions stay refused (`CodeGen.java:3588-3592`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`

## 1. What changed and why

One file of code, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (line numbers at `dbf4825e0`, the same at the head):

- `forLetFn` (`:3580-3642`), new: the visitor's case for `LetFn`, which reached `defaultCase` (`:1675-1677`, unchanged) and its 'Can't compile LetFn' before. It refuses the forms of fork 8 (`:3586-3601`), binds each name of the group to a local of the function's arrow type in a child `CodeGen` (`:3606-3615`), makes each closure and stores it (`:3617-3625`), ties the group (`:3627-3636`): each closure's sibling fields are set from the locals, with a `CHECKCAST` to the closure's class, and then compiles the block's body in that environment (`:3638`).
- `localFunctionArrowType` (`:3646-3656`), new: the arrow type from the declared parameter types to the return type, written or inferred by the checker (`scala_src/typechecker/impls/Decls.scala:198-232` fills an omitted return type in the `FnDecl` it hands on), so `untyped`'s `plus` and the library's `row` and `plane` compile.
- `localFunctionClosure` (`:3666-3729`), new: the closure class, line for line `forFnExpr`'s (its class name from the declaration's span, its free static parameters as the class's, F-135; its free variables from `getFreeVars`; `generateFnExprInit`, `apply` with slot 0 reserved, `constructWithFreeVars`), except that the free variables that are members of the group are not constructor arguments: the function itself is `LocalFunctionSelfVar` (`:3758-3773`, pushes `this`), and each sibling is `LocalFunctionSiblingVar` (`:3733-3755`, a public non-final field of the closure class, read with `GETFIELD`).
- `localFunctionOrNull` (`:3835-3842`), new, with the field `localFunctionNames` (`:3831`, made at `:396`, shared by copies at `:375`): a `FnRef` is a reference to a local function when it has no static arguments and every one of its names is the unambiguous name of a local function that `forLetFn` bound (`:3608`). Checked by the unambiguous name, not by the bare name, so that a top-level function's `FnRef` never takes a stale lexical entry of the same bare name.
- `forFnRef` (`:3845-3852`): a local function's reference pushes its closure, before the `fnRefIsApply` branch; the team's 'Haven't figured out references to local/parameter functions yet' stays for every other name.
- `for_RewriteFnApp` (`:6797`): a call whose function is a local function's `FnRef` takes the higher-order path, the closure pushed and `apply` called through its arrow interface (`generateHigherOrderCall`). The call reaches the code generator as a `_RewriteFnApp` whose function is a `FnRef` with the local function's unambiguous name (seen in a debugging print during development, since removed: 'LOCALFN? add names=[_|ProjectFortress|compiler_tests|LocalFunctionCallCompiled.fss:9:5-41] -> VarCodeGen[localVar] add:ZZ32->ZZ32').
- The import of `LetFn` (`:108`).

The block guard of `forFnDecl` (`!inABlock`, `:3025`) is unchanged: the new case never calls `forFnDecl` for a local function, so the guard refuses nothing that the case compiles (decision 4).

## 2. The tests: the failing run and the passing run

Compiled run tests, each `tests=`, `link`, `run`, `run_out_contains=PASS`, written first and committed at `17c91b6e9` before the edit:
`compiler_tests/LocalFunctionCallCompiled`, `LocalFunctionValueCompiled`, `LocalFunctionRecursiveCompiled`, `LocalFunctionCaptureCompiled`, `LocalFunctionGenericContextCompiled`; their walk guards, the same programs, `tests/LocalFunctionCallWalk`, `LocalFunctionValueWalk`, `LocalFunctionRecursiveWalk`, `LocalFunctionCaptureWalk`, `LocalFunctionGenericContextWalk`.

The failing run, on the base's code before the edit was first built (2026-11-05T20:21:05Z; the first build of the edit started after it):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh before ProjectFortress/compiler_tests LocalFunctionCallCompiled.test LocalFunctionValueCompiled.test LocalFunctionRecursiveCompiled.test LocalFunctionCaptureCompiled.test LocalFunctionGenericContextCompiled.test
    . link ProjectFortress/compiler_tests/LocalFunctionCallCompiled 
     UNEXPECTED exception 
        Can't compile LetFn at ProjectFortress/compiler_tests/LocalFunctionCallCompiled.fss:9.5
    Tests run: 10,  Failures: 10,  Errors: 0

Three of the files then took more assertions (zero and three parameters, a function expression and a nested local function calling a sibling, a generic mutually recursive pair). Those three were run again on the old code, through the base build, before the passing run (2026-11-05T20:31:54Z):

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base26 <tree>/tmp/rung-codegen-local-functions/old-caches junit <tree>/ProjectFortress/compiler_tests/LocalFunctionCallCompiled.test <tree>/ProjectFortress/compiler_tests/LocalFunctionValueCompiled.test <tree>/ProjectFortress/compiler_tests/LocalFunctionGenericContextCompiled.test
        Can't compile LetFn at /home/user/fortress-codegen-local-functions/ProjectFortress/compiler_tests/LocalFunctionCallCompiled.fss:9.5
    FAILURES!!!
    Tests run: 6,  Failures: 6,  Errors: 0

The walk guards pass on both: on the base, `harness-one.sh tmp/rung-codegen-local-functions/h1 ProjectFortress/tests/LocalFunction{Call,Value,Recursive,Capture,GenericContext}Walk.fss` printed 'OK (5 tests)' (tree 4d27fbcc5); the three extended ones on the base build's harness, 'OK (3 tests)' (tree a3252d568, the base build); after the edit, 'OK (5 tests)'.

The passing run, the last after the last change of code, in one JVM, with the guards that the brief keeps:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests LocalFunctionCallCompiled.test LocalFunctionValueCompiled.test LocalFunctionRecursiveCompiled.test LocalFunctionCaptureCompiled.test LocalFunctionGenericContextCompiled.test XXXLocalFunctionGenericCompiled.test XXXLocalFunctionOverloadedCompiled.test XXXLocalFunctionAtomicCompiled.test LocalFunctionSiblingCall.test LocalFunctionSiblingInLoop.test XXXLocalFunctionRecursiveUntypedReturn.test XXXLocalFunctionUntypedParam.test XXXLocalFunctionUntypedParamAndReturn.test XXXLocalFunctionUntypedParamInLoop.test XXXNativeHelperLocalFunctionCompiled.test ForbidClauseCompiled.test TestModifierCompiled.test ExtendsGenericAtAnyCompiled.test NatRtClosure.test Compiled7.test Compiled70.test Compiled90.test ArrowClauseBindRungG.test TaskArmLocalSlotLink.test XXXTaskArmLocalSlot.test XXXVarargsFunctionExpressionUse.test XXXInferLambdaArg.test
    OK (53 tests)

The five run tests ran directly at `FORTRESS_THREADS=1` too (`bin/fortress compile`, `bin/fortress run`), each 'PASS'; the suite's run is at four threads. `LocalFunctionCaptureCompiled` assigns a captured mutable local through the existing cell code, unchanged, so no atomic runs (fork 12).

The XXX tests (fork 8), each a compile test with `compile_exception_contains`, since the checker passes each program and the new case's wall stops it: `XXXLocalFunctionGenericCompiled` ('Can't compile a local function with static parameters of its own yet'), `XXXLocalFunctionOverloadedCompiled` ('Can't compile overloaded local functions yet'), and `XXXLocalFunctionAtomicCompiled` ('Can't compile a local function with this modifier yet'). On the base the first two compiled through the checker and stopped at 'Can't compile LetFn' (direct `bin/fortress compile`). The first was shown through the harness both ways: as it is, `junit.sh xxx1 ... XXXLocalFunctionGenericCompiled.test` printed ' OK Saw expected exception', 'OK (1 test)'; with its generic `ident` replaced for one run by `ident(x: ZZ32): ZZ32 = x`, then restored (`cmp` clean), `junit.sh xxx1red` printed ' Saw failure, but did not satisfy compile_exception_contains; expected', 'FAILURES!!!', 'Tests run: 1,  Failures: 1,  Errors: 0'.

The checker's local-function tests keep their verdicts: `LocalFunctionSiblingCall`, `LocalFunctionSiblingInLoop`, `XXXLocalFunctionRecursiveUntypedReturn` (the checker's reference-cycle refusal), and `XXXNativeHelperLocalFunctionCompiled` (row 865), still refused by the checker before the case, in the run above.

## 3. Where the fix belongs, and the precedent search

The place: the code generator, the one phase that refused (F-34; `explorations/coordinator/map/compile-path-walkthrough.md`, "5. Code generation", whose table names `forFnDecl`'s block guard; `map/spec-to-implementation.md:201`, "no `forLetFn`"). The checker already types the group (F-233), the disambiguator binds it (`scala_src/disambiguator/ExprDisambiguator.scala:657-673`), and the desugarers pass it through.

The precedent: no change repaired local functions before. The code generator makes a class over captured free variables at two sites at the base, `forFnExpr` (`CodeGen.java:3540`) and the task classes of `delegate` (`:4854`), both through `createTaskLexEnvVariables` and `constructWithFreeVars`; the new case is the third, and follows `forFnExpr`, whose closure the planner's probe ran capturing a parameter, a local, a mutable local, a field, a generic function's `T` value and a size-generic trait's `self` (the brief's section 4). Walk's precedent is the group in one environment, each function a closure in it (`BuildLetEnvironments.java:55-81`).

## 4. What the specification settles

`functions.tex`, "Local Function Declarations": local functions have the syntax of top-level ones, not operators, without `private` and `test`, may be `atomic` or `io`, and in one scope may be overloaded and mutually recursive. So a generic local function, an overloaded group and an `atomic` one are the specification's, and their refusal is a defect deferred with an `XXX` test (home 2). No sentence of the specification describes the code generator.

## 5. Programs run old against new; the measure

- The six planner programs are covered by the tests; `LfPlain`'s, `LfValue`'s and `LfRec`'s shapes are in `LocalFunctionCallCompiled`, `LocalFunctionValueCompiled` and `LocalFunctionRecursiveCompiled`.
- The code generator over the fourteen components, once, on this tree (fork 10), by the planner's command: every helper string on a glue string for the run (the `sed` changed 288 strings, `FortressLibrary.fss` 202 lines, `FortressBuiltin.fss` 374 lines of diff, none left), `codegen.sh` in the background, then `git checkout -- Library ProjectFortress/LibraryBuiltin` (status clean after). Its before is the planner's run on the base ('refused declarations 47 | emitted (OK lines) 697 | component failures 0', 'kinds 11', '9  Can't compile LetFn  [FortressLibrary 7, RangeInternals 2]'). After:

      explorations/compile-ladder/plan-25/probes/codegen.sh tmp/rung-codegen-local-functions/cg
      refused declarations 38 | emitted (OK lines) 703 | component failures 0
      kinds 10
        8  Not in the trait table: <api trait>  [RangeInternals 8]
        7  Can't compile AsIfExpr  [FortressLibrary 4, String 2, RangeInternals 1]
        7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
        4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
        4  Error trying to close method scope  [FortressLibrary 4]
        3  Can't compile Label  [FortressLibrary 3]
        2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
        1  ClassCastException: com.sun.fortress.nodes.IntersectionType to com.sun.fortress.nodes.NamedType  [FortressLibrary 1]
        1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
        1  Can't compile AtomicExpr  [OneShotFlag 1]
      rc=0 seconds=271

  The other ten kinds keep the base's counts exactly. Per component: FortressLibrary refused 16, emitted 489; RangeInternals 9, 102; String 5, 14; List 4, 23; Stream 1, 3; CovariantCollection 1, 24; OneShotFlag 1, 3; FlatString 1, 7; the other six none.
- The nine, each with an `@@CG OK` line in `tmp/rung-codegen-local-functions/cg/run.txt` and no other wall: `__bigOperator` (`Library/FortressLibrary.fss:1315`), `ReadableArray1` (`:2353`), `Array2` (`:2653`), `Matrix` (`:2857`), `Array3` (`:3053`), `NaiveSeqGenerator` (`:3982`), `RelationalPredicateCondition` (`:4867`), `CompactFullParScalarRange` (`Library/RangeInternals.fss:1301`), `StridedFullParScalarRange` (`:1483`). All nine emit; none stops at another wall. Refused fell by 9 and emitted rose by 6: by the classifier (`plan-25/probes/cgkinds.py`), a declaration counts once at its first `FAIL`, `PREFAIL` or `CTORFAIL` line, and the `OK` lines are counted apart, so three of the nine had an `OK` line beside their refusal on the base. That is a reading of the classifier; the base's `run.txt` is not in this tree and was not made again (fork 10). No emitted class was run.
- Row 497: not met. `LocalFunctionGenericContextCompiled` calls a local function from both arms of `do … also do … end`, and a local function that calls itself from both arms, with mutable locals declared in its body before the block (Matrix's shape), compiled and run: 'PASS'. The case declares nothing in an arm. `Matrix`'s `mma` and `mm` emit and were not run.
- The ladder subset (gate.md, "The ladder regression", own subset), the two files whose recorded first error in the baseline is 'Can't compile LetFn' (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`): `tests/funny.fss` and `tests/simplify1.fss`, neither in the gate's 85, so compared with the baseline: `funny.fss` codegen to pass, `simplify1.fss` codegen to run, both UP. `simplify1.fss` prints FAIL for row 76: under the compiler's prelude `"cat" "dog"` is "cat dog"; the same program with `joinString` at component level prints 'cat dog' and 'FAIL' too (scratch `Simp1Top.fss` against `Simp1Loc.fss`, both on this tree), so the FAIL is the prelude's, not the case's.
- Stages: neither the count stage nor the distance stage runs the code generator (fork 13), so this rung ran neither; the gate runs both. The changed path outside the free list is `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, which neither stage reaches (the count's and the distance's drivers stop before code generation).
- Probes on this tree, scratch: an `atomic` local function stops at 'Can't compile a local function with this modifier yet' (then `XXXLocalFunctionAtomicCompiled`); a local function with a varargs parameter stops at 'Can't compile VarArgs yet' (row 624), each after the checker passes it.

## 6. Sentences made false

- Row 304's claim, `explorations/fortress-gap-ledger.md:820`: rewritten in `record.md`.
- F-34, `explorations/coordinator/FACTS.md:31`: 47 declarations in 11 kinds, a local function (row 304) among the kinds; now 38 in 10.
- F-181, `explorations/coordinator/FACTS.md:263`: "the constructs that the code generator has no case for, a local function among them (row 304)".
- The `fortress-repo` skill's `references/compiler.md:41`, "What the compiled path cannot compile yet": "a local function declaration, and an object expression"; the local function now compiles except in the three forms of row 304.
- `explorations/coordinator/PLAN.md:10` and `:56`: "the code generator refuses 47 declarations in 11 kinds (F-34)", "it refuses 47 declarations of the fourteen components in 11 kinds", with row 304 among the kinds' rows; and `:93`, "C4's two local functions in `step` (row 304)", which no longer stand in the code generator's way (C4's `h` and `u` are typed, not recursive, capture a parameter: the shapes of `LocalFunctionCallCompiled`).
- `explorations/coordinator/map/compile-path-walkthrough.md:469` and `:475-476`: `forFnDecl`'s guard "so no local functions", "a local function is refused with `Can't compile LetFn`"; `explorations/coordinator/map/spec-to-implementation.md:201`: "**no `forLetFn`**", "comp absent for local functions".
- No sentence of the specification or of Appendix I.

## 7. Points to report

- Each method changed in CodeGen, and any class added beside it; how the group reaches itself: section 1. New: `forLetFn`, `localFunctionArrowType`, `localFunctionClosure`, `localFunctionOrNull`, the field `localFunctionNames` and two nested classes, `LocalFunctionSiblingVar` and `LocalFunctionSelfVar` (inside `CodeGen.java`; no file added). Changed: `forFnRef`, `for_RewriteFnApp`, both constructors (the shared field), the imports. A function reaches itself as its closure's `this`; a sibling through a non-final field of its closure, set once by the block after the group is made (`CodeGen.java:3627-3636`).
- The tests before and after through `junit.sh`, and the walk guards through the harness: section 2.
- The code generator's table on this tree, and each of the nine: section 5; all nine emit.
- Each compiled test whose verdict changes: the five new run tests (red to green); no track was run (fork 12); row 497 was not met.
- Every sentence made false: section 6.
- A file edited beyond those named, or the checker's Scala or the rewrite: none. `VarCodeGen.java` was not edited: the two new kinds of variable are nested in `CodeGen.java`.

## 8. Decisions

1. **The closure of its own class, Question 1 at (a).** Chosen: each local function a closure class made as `forFnExpr`'s. Not taken: (b), a static method lifted out of the block with its captured values passed along each call (the record's default; the brief).
2. **The group without a mutable cell (fork 9): self as `this`, siblings as fields set once after the group is made.** Not taken: a frame object holding the group, which every closure captures (one more class and one more indirection per sibling call); each closure in a compiled mutable variable's cell (F-117), which asks `BaseTask.inATransaction` at each read (`compiler.md`, "The run time"); siblings as fields of every closure including itself (one field read per recursive call, where `this` needs none). The sibling fields are not final: `TaskVarCodeGen`'s final fields can be set only in the class's constructor, and a sibling made later cannot be passed there.
3. **The two new variable kinds nested in `CodeGen.java`.** Not taken: a subclass in `VarCodeGen.java`, a file the brief does not name; a new file beside `CodeGen`, which two short classes do not need.
4. **`forFnDecl`'s block guard left as it is.** The case compiles a local function's closure itself and never calls `forFnDecl` for it, so the guard refuses nothing that the case compiles (the five run tests, the nine). Not taken: removing `!inABlock`, which would let some other path that visits a `FnDecl` in a block (none known) emit a top-level method for it without its captured variables.
5. **A reference is a local function's by its unambiguous name.** `localFunctionOrNull` asks that every name of the `FnRef` be the unambiguous name of a local function that `forLetFn` bound. Not taken: the bare original name looked up in the lexical environment, which `forLocalVarDecl` never empties (`CodeGen.java:3990-4080` at the base adds to `this.lexEnv` and leaves the entry), so a top-level function named as an earlier block's local could take a disposed slot; a check that names carry no api, which a component's own top-level functions also satisfy (their unambiguous names have none, seen in the library order's compile).
6. **The call through the higher-order path.** A `FnRef` call of a local function sets `useClosure` in `for_RewriteFnApp`, so the closure is pushed and `apply` called through the arrow interface, as for a function-valued local. Not taken: a direct `INVOKEVIRTUAL` of the closure class's `apply`, which would need the class name at every call site, inside nested closures and tasks too.
7. **The refused forms (fork 8), each with its own wall text.** Static parameters of the function's own, two of one name, a modifier other than `io` (so `atomic`), a contract, a varargs parameter ('Can't compile VarArgs yet', the existing text of row 624). Not taken: the old 'Can't compile LetFn' for all, which would hide which form stops.
8. **An `XXX` test for `atomic` too** (`XXXLocalFunctionAtomicCompiled`), beside the two the brief names: the specification allows it (`LocalFnMod`), so its refusal is home 2. Not taken: leaving it with no test, in row 304's claim only.
9. **A local function's arrow type built from its declaration**, its parameter types and the return type that the checker writes or infers. Not taken: the `FnRef`'s type at a call, which no declaration-site code has.
10. **Tests extended after the first failing run** (zero and three parameters, a nested local function and a function expression calling a sibling, a generic mutually recursive pair), and the three extended files run again on the old code through the base build before the passing run. Not taken: new test files for these, or leaving the shapes untested.
11. **No stage run; no whole track** (forks 12 and 13). The gate runs both stages and the tracks.

## 9. Defects and their homes

- Row 304, a local function on the code generator: home 1 for the forms that now compile (the five run tests); home 2 for the three that stay refused, each with its `XXX` test (`XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled`, `XXXLocalFunctionAtomicCompiled`), since the specification allows them; row 304 rewritten to them (`record.md`).
- `tests/simplify1.fss` printing FAIL under the compiled path: row 76's (string juxtaposition under the compiler's prelude), already recorded with its `XXX` test; a note for the row in `record.md`. No new row.
- A varargs local function: row 624's, already recorded.

## 10. Revival change

See `record.md`, "Revival change".
