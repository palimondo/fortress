# Skeptic: rung L, the code generator's local functions (row 304)

Head judged: `a8b81634d` (the worker's last commit). The branch already carried `REPORT.md` and `record.md`, so no journal step was taken. No fix was needed; this file is the only commit of the skeptic.

## 1. The stages

The report says neither the count stage nor the distance stage ran (fork 13). `git diff --name-only 4d27fbcc5...HEAD` lists one path outside the free list, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: the code generator, which neither stage reaches, and which the brief gives the rung ("W, S and L run neither"). Nothing under `scala_src/` or generated for the checker changed, so no count stage was owed. The base build `/home/user/fortress-base26` is at `a3252d568`; `git diff --name-only a3252d568 4d27fbcc5` lists only paths under `explorations/`, so its code is the base's.

## 2. Test first, from the worker's transcript

- Tests written and the failing run at 20:21:04 (call `wdpSZg`), on the base's code: `junit-before` 'Can't compile LetFn at ProjectFortress/compiler_tests/LocalFunctionCallCompiled.fss:9.5', 'Tests run: 10,  Failures: 10,  Errors: 0'. The edit of `CodeGen.java` came at 20:26:06 (`ntn8Wd`) and its first build at 20:26:11 (`CYroC9`, 'BUILD SUCCESSFUL'), after that run ended (20:21:20). The walk guards in the same call: 'OK (5 tests)', tree 4d27fbcc5.
- The three files extended later were run on the old code at 20:31:54 (`VWqCXq`, `old-fortress.sh /home/user/fortress-base26 ... junit`): 'Can't compile LetFn at .../LocalFunctionCallCompiled.fss:9.5', 'Tests run: 6,  Failures: 6,  Errors: 0'.
- Last code edit at 20:28:50 (`p4YZ7U`), rebuilt at 20:28:58 (`f6LYn1`, 'BUILD SUCCESSFUL'). The final run at 20:42:32 (`xRCrAd`, tree 70734e): 'OK (53 tests)', '. run ProjectFortress/compiler_tests/LocalFunctionCallCompiled (930ms) PASS'. The only commit after the code is the atomic XXX test and the report.

The order holds.

## 3. The diff

`forLetFn` replaces the `defaultCase` refusal; `localFunctionClosure` follows `forFnExpr` (base `CodeGen.java:3503-3567`) line for line: class name from the span, free static parameters as the class's (F-135), `getFreeVars`, `createTaskLexEnvVariables`, `generateFnExprInit`, `apply` with slot 0 reserved, `constructWithFreeVars`. Group members are taken out of the constructor's free variables: self is `this` (`LocalFunctionSelfVar`), each sibling a field of the closure (`LocalFunctionSiblingVar`) set after the whole group is made and before the body runs (`CodeGen.java:3627-3636`). No mutable cell is used (fork 9). `forFnRef` and `for_RewriteFnApp` reach the closure only for a `FnRef` whose names are all unambiguous names that `forLetFn` bound, so a top-level function of the same bare name keeps its path. The walls left (static parameters of its own, two of one name, a modifier other than `io`, a contract, varargs, a missing body or return type) are each a loud `CompilerError`. `forFnDecl`'s `!inABlock` guard is unchanged and is not reached by the case (decision 4); the brief's line asks only that it not refuse what the case compiles, which holds. No checker, rewrite, library or runtime file is touched.

The failure-mode question: the rung turns 'Can't compile LetFn' into compiled code that runs, and into named walls; it makes no failure quiet. The sibling fields are null only before the tie, and no code of the block runs before it.

## 4. My programs, old against new

Under `tmp/rung-codegen-local-functions/skeptic/`. New code: `bin/fortress compile` and `bin/fortress run` of the rung's build; old code: `old-fortress.sh /home/user/fortress-base26 .../tmp/old-caches`.

`SkLoop.fss`: a local function called from a parallel `for` with an `atomic` accumulation; a block in a `while` loop making a fresh closure each pass over that pass's `k`; a local function answering a function expression that calls its sibling; an inner local function calling the outer local function recursively; two blocks of one function each declaring `h` at different types; a local function in a function expression's body; a tuple result and an `io` local function assigning a captured mutable; a local function in parallel tuple arms; a mutually recursive pair in a method of a trait generic in a type and a size, calling `size()` of self; a local function in a top-level variable's initializer.

    bin/fortress compile SkLoop.fss; FORTRESS_THREADS=1 (and =4) bin/fortress run SkLoop
    loopSum  385
    rerun  46
    maker  7
    nest  6
    twoBlocks  2hi!
    inFn  15
    misc  303
    red  91
    walk  5   -5
    topVal  8

The same values at 1 and 4 threads, and the same under walk on the new and the old code ('loopSum 385' ... 'walk 5 -5', 'topVal 8'); each is the value the program computes by hand. The doubled spaces are row 76's prelude juxtaposition. The old compiled path: 'Can't compile LetFn at .../SkLoop.fss:95.5'.

`SkEdge.fss`: a local function passing itself and a sibling passing it as values; a recursive local function that calls itself and a sibling inside a parallel `for` with `atomic`; a generic function whose sibling's type names `T` where the caller's signature does not; local functions in an object's field initializer and getter, reading a field; a local passed as a value beside a top-level function passed as a value.

    FORTRESS_THREADS=1 (and =4) bin/fortress run SkEdge
    selfValue  104
    inLoop  8
    genSib  5
    O  6   15
    shadow  17

Walk on the new code gives the same ('selfValue 104', 'inLoop 8', 'genSib 5', 'O 6 15', 'shadow 17').

`SkShadow.fss`, a local `sq` beside a top-level `sq`: both paths refuse it in the disambiguator, 'Local function sq is already declared.' (row 92's limit), so the stale-entry risk of decision 5 does not arise from shadowing.

No program found a defect.

## 5. The measure

Read from the worker's files: `tmp/rung-codegen-local-functions/cg-run.txt` ends 'kinds 10', '8  Not in the trait table: <api trait>  [RangeInternals 8]', ..., 'rc=0 seconds=271'; `grep -c LetFn cg/run.txt` gives 0; each of the nine has an '@@CG OK' line (`@@CG OK	FnDecl __bigOperator	.../Library/FortressLibrary.fss:1315:1-1319:4`, `@@CG OK	TraitDecl Matrix	.../FortressLibrary.fss:2857:1-2944:2`, `@@CG OK	ObjectDecl StridedFullParScalarRange	.../RangeInternals.fss:1483...`). The run started at 20:35:04 (`dZwQS3`), after the code's commit `dbf4825e0` at 20:34:54, and `git status` is clean, so the library was restored. The report's table is that of the worker's head.

## 6. Tests, homes, names, record

- Each test file has one comment line, cites `functions.tex`, section "Local Function Declarations" (and `also.tex`, "Parallel Do Expressions") by section, and each walk guard is its compiled test with only the component name changed.
- Homes: row 304 home 1 for the compiled forms, home 2 for the three refused forms with their XXX tests, the row rewritten in `record.md`; the varargs form is row 624's. `ledger.py find "local function"` and `find closure` show no other row the rung owes: rows 620, 621, 680 are the checker's and closed; row 865 stays refused by the checker before the case; row 315's span-named closure classes did not grow (the 'duplicate entry' kind keeps 2).
- Competing names: `forLetFn` overrides the visitor's own; the new methods, field and nested classes have no other declaration under `ProjectFortress/src/com/sun/fortress/`; the new test names have no namesake in either corpus.
- The report's citations opened: base `CodeGen.java:1672-1674` (`defaultCase`), `:3022` (`!inABlock; // no local functions`), `:3503` (`forFnExpr`), `:3634` ('Haven't figured out references to local/parameter functions yet'); head `:3580`, `:3588-3592`, `:3627`, `:3646`, `:3666`, `:3733`, `:3758`, `:3831`, `:3835`, `:3845`, `:6797`; `Decls.scala:198-232` fills an omitted return type from the body; `ExprDisambiguator.scala:657-673` binds the group; `BuildLetEnvironments.java:55-81` is walk's group. Each says what the report says.
- Sentences made false, as the report lists them, each opened: FACTS F-34 (`FACTS.md:31`) and F-181 (`:263`, "a local function among them (row 304)"); `compiler.md:41`; `PLAN.md:10`, `:56`, `:93`; `map/compile-path-walkthrough.md:469`, `:475-476`; `map/spec-to-implementation.md:201`; row 304. None of the specification. `compiler.md:75` (row 865, a helper in a local function) stays true.

## 7. Where I differ from the worker

Nowhere on the code. The report's account of the measure's arithmetic (refused down 9, emitted up 6) is a reading of the classifier, which the report marks as such; I did not run the base's `codegen.sh` again (fork 10).

## Verdict

Approved, with no fix. The report's tables are those of the worker's head; the gate runs the stages and the tracks on the merged tree.
