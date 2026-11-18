<!-- Climb batch 33b's gather record, run 2 of CLIMB-BATCH-33.md: the four rungs N, W, G and R applied on main in that order, their commits, the rows opened, rewritten and closed, the merged tree's tests, the demos and the specification's build, the points to report, the items for the curator and where each is in PLAN.md, and each rung's revival change for the skill writer. -->

# Climb batch 33b: the gather's record

Written at the gather stage of climb batch 33b (2026-11-18), the second of the two runs of `explorations/coordinator/CLIMB-BATCH-33.md`, after climb batch 33, which landed rungs S, D, V, Q, I and C. The compiler's prelude declares its seven number types as value objects over hand-written payload classes (rung N); the code generator names each function expression's class apart where two share a span (rung W), compiles a varargs parameter as one immutable array under the selector (rung G), and finds a method of an imported api's trait by its api (rung R). All four were approved, N after its judge's ruling, and all four landed, on `main` from the base `c799851472afc09b66e72d37e16f5a39e614ba5f`. No rung changes a line of the model program or its helper files.

**Preconditions.** `git status --porcelain` printed nothing, and `c799851472` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0). The batch's commits start after `83e464cf63b844bdc4775b86340cfe500080f89a`, the `HEAD` the gather started from. No earlier launch had worked this stage: `main` held no commit of the batch and `tmp/gather/` no patch of it, so one launch worked it.

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff c799851472afc09b66e72d37e16f5a39e614ba5f...<branch>`. Each was applied on `main` with `git apply --3way --index`, its record folded and its commit made before the next. Every branch is left as it was.

## The landed commits

| Rung | Slug | Branch head | Commit on `main` |
|---|---|---|---|
| N | `rung-number-payload-objects` | `7169705ebb` | `75f9f2fbf4` |
| W | `rung-closure-name-once` | `59cd9995dc` | `5af98dbca4` |
| G | `rung-varargs` | `bf508f49c0` | `e9bc2ed3e3` |
| R | `rung-api-method-index` | `45a48433d6` | `90ee716db0` |

The rows' close is `49c11ccfd5`, "Close the rows climb batch 33b fixed". This record follows it, in a commit that also re-anchors the citations of rungs N and W that a later rung's hunks moved, row 995's two citations and one line of `PLAN.md` ("The rungs applied, in order", below).

## The rungs applied, in order

The order is N, W, G, R: the manifest's. No rung lands only with another (`landsOnlyWith` is empty for each). Three files are shared (`git diff --name-only c799851472...<branch>` for each branch), and in each the rungs were compared by their lowest edited line (`git diff -U0 c799851472...<branch> -- <file>`, the first hunk):

- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, by all four: N's first hunk at line 233, W's at 385, G's at 712, R's at 7126. So N, W, G, R.
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, by N, W and G: N at 18, W at 23, G at 935. So N, W, G.
- `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, by N and G: G at 186, N at 1095. So G before N.

The pair N and G is ordered both ways, by `CodeGen.java` and `NamingCzar.java` one way and by `OverloadSet.java` the other, so it keeps the manifest's order, N before G, and G's cited lines were re-anchored. Every other pair is ordered alike by each file it shares, and that order is the manifest's.

The lines that another rung's hunks moved. The hunks interleave, so each rung's lowest line being above the next one's did not keep the later rungs' hunks from moving an earlier rung's cited lines. In the `REPORT.md` and `SKEPTIC.md` of each rung, and N's `JUDGE.md`, each citation that follows a shared file's name, `CodeGen.java:N`, `NamingCzar.java:N` or `OverloadSet.java:N` with the bare `:N` listed after it, was rewritten to the line of `main` as it stands at `90ee716db0`, by a line diff of the rung's file against `main`'s: W's, G's and R's in their own commits, for the earlier rungs' hunks, and N's and W's again in this record's commit, for the later rungs' hunks. G's and R's needed no second pass: R's two hunks each replace two lines and move none. A citation marked as another commit's (the base, `a874948ac`, a blame at the base, "before this change") and a quoted line of output were left as written. What the gather folded (the FACTS entries, the ledger rows, the entries of `PLAN.md`) names members by symbol, or cites lines of `main`. The handover lines, the points to report and the revival changes below are the rungs' own words and cite the lines of each rung's branch. On `main`, for example:

- N: the RTTI's `className()` `CodeGen.java:6283-6292` is `:6296-6305`; `forVarRef`'s refusal of a number type named as a value `:7003-7007` is `:7016-7020`; `castReceiver` `:7646-7654` is `:7659-7667`; `NamingCzar.payloadObjects` `:614-622` is `:615-623`; the carried table `:588-601` is `:589-602`; `OverloadSet.emitInstanceOfNG` `:1095-1097` is `:1153-1155`.
- W: `NamingCzar.gensymArrowClassName` `:893-907` is `:963-977`; the field `closureClassNames` `CodeGen.java:4241-4244` is `:4253-4256`, made at `:409`, now `:423`, and copied at `:386`, now `:400`; the calls in `forFnExpr` `:3935` and `localFunctionClosure` `:4098` are `:3954` and `:4110`.
- G: `evalVarargsArgs` to `emitVarargsArray` `CodeGen.java:7695-7831` are `:7775-7911`; `partitionByArgCount` `:8514-8541` is `:8594-8621`; `NamingCzar.varargsParamType` `:945-951` is `:1028-1034`; `armCallsVarargsDeclaration` `OverloadSet.java:2024-2033` is `:2026-2035`.
- R: `emitBodyGivenBy`'s and `assumedReceiverCall`'s reads of the body `CodeGen.java:7126` and `:7167` are `:7205` and `:7246`; `assumedTrait` `:7067-7073` is `:7146-7152`. Its `STypesUtil.scala` lines are as on its branch.

## Conflicts

None. Every hunk of the four patches applied cleanly (`git apply --3way --index`: 'Applied patch to ... cleanly' for each file that an earlier rung had changed, `CodeGen.java` three times, `NamingCzar.java` twice and `OverloadSet.java` once among them). Rung N's patch printed one whitespace warning, 'warning: 1 line adds whitespace errors.'; nothing was changed for it.

## The tests on the merged tree

The build and every run below are of the code of `90ee716db0`, R's commit, on the main tree; the commits after it change no code.

- Built once after the fourth rung (`ant compileAll`, 'BUILD SUCCESSFUL', 'Total time: 30 seconds'; 'Caches /home/user/fortress/default_repository/caches started again, empty' and the same for `caches-one`), then the library order, the five compiles 'rc=0' and the five jars listed (`CompilerSystem.jar`, `fortress.AnyType.jar`, `fortress.CompilerAlgebra.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`).
- The batch's compiled tests, the 23 `.test` files that it adds or changes under `ProjectFortress/compiler_tests/`, with the prelude's `XXXVarargsCodeGeneration.test` and row 496's `XXXGenericBesidePlainStatic.test`, in one JVM, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged33b ProjectFortress/compiler_tests ...`: 'Tests run: 43,  Failures: 1'. The one failure is the gather's list: it left out `GenericBesidePlainStaticLink.test`, so the run step of `XXXGenericBesidePlainStatic` printed 'Could not load XXXGenericBesidePlainStatic'; the two run together, `junit.sh merged33b-496 ... GenericBesidePlainStaticLink.test XXXGenericBesidePlainStatic.test`: '. run ProjectFortress/compiler_tests/XXXGenericBesidePlainStatic (404ms) REACHED', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'. Each of the other 41 passed or was seen as its expected failure: the closing tests '. run ProjectFortress/compiler_tests/NumberObjectsCompiled (507ms) PASS', '. run ProjectFortress/compiler_tests/ComprisesMeetGenericTrait (478ms) tag(s) =  3', 'PASS', '. run ProjectFortress/compiler_tests/OverloadZZ32BesideUserTraitCompiled (274ms) PASS', '. run ProjectFortress/compiler_tests/ApiTraitOverloadCompiled (276ms) PASS', '. run ProjectFortress/compiler_tests/AsIfApiTraitCompiled (287ms) PASS', '. run ProjectFortress/compiler_tests/ConditionalReductionCompiled (560ms) PASS'; row 866's refusal 'Invalid type in extends clause: ZZ32', ' Saw expected failure'; the team's `Compiled6.bx` with its two messages, 'No such method ZZ32.foo.' and 'Objects can only extend traits.', ' Saw expected failure'; rows 1080, 1082 and 1088 and the prelude's two varargs refusals ' OK Saw expected exception'; row 1081's refusal 'The typecase clause, Shape, is unreachable.'; row 1084 'REACHED', 'NoClassDefFoundError: XXXArrowCoercionThunk$CoercionDesugarer#1', 'Saw expected failure (Exit code != 0)'.
- Rung R's skeptic's item, the prelude's `ZZ32` order at assumptions, with N applied before R: the gather's test `compiler_tests/AsIfNumberOrderCompiled.test` (R's commit), alone and in the list above: '. run ProjectFortress/compiler_tests/AsIfNumberOrderCompiled (440ms) true', 'PASS', 'OK (3 tests)'. On R's branch alone the call links and dies, 'VerifyError: Bad type on operand stack' (R's `SKEPTIC.md`, "My programs, old code against new (item 6)", program 3), so the test is a guard of the merge, not a test the base fails: on the base the program printed `true`.
- The one library's track, `ant testOneLibrary`: 'BUILD SUCCESSFUL', 'Total time: 23 seconds'; its result file 'Tests run: 14, Failures: 0, Errors: 0'. Each compile test of the batch compiles ('compile .../one_library_tests/OneLibraryConditionalReduction  OK', 'OneLibraryVarargsCount  OK', 'OneLibraryArray1  OK' and the other varargs four), row 1086's two ' OK Saw expected exception', and the three run tests 'Saw expected failure (Exit code != 0)' after 'NoClassDefFoundError: fortress/FortressLibrary$String' (row 1062).
- The walk tests of the landed rungs, the 2 `.fss` files that the batch adds under `ProjectFortress/tests/` (no `.test` file), in one call, `explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/XXXArrowCoercionFnArgument.fss ProjectFortress/tests/XXXVarargsSpreadArgument.fss` ('cache empty', `FORTRESS_THREADS=4`): ' OK Saw expected exception' for each, row 1085's 'FAIL: a ZZ32: 1 =/= a ZZ32: 3; count(1, ys...) with two elements in ys', 'OK (2 tests)', 'exit=0'.
- The 52 team demos, the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", run on the merged build from the main tree's root, `bash <driver> <scratch>`: 'demos: 52 run, 52 reached their end', 'EXIT=0'. The four rungs' code is the compiled path's (the code generator, its run time, the compiler's prelude and the checker's `STypesUtil`); the brief gives the demos to the gather, and they were run once, after the last edit of code.
- The specification, built once on `main`'s text after the last edit under `Specification/` (G's commit `e9bc2ed3e3`), `( cd Specification/fortress && ./ant genSource && ./ant tex )`: '211:BUILD SUCCESSFUL', '21494:BUILD SUCCESSFUL', '21496:EXIT=0'; the skill's warning `grep -c` over `fortress.log` printed 0; 'Output written on fortress.pdf (727 pages, 2533509 bytes)'; `pdftotext` shows the varargs Effect ending '(row 1085 of the revival's gap ledger)' and '(row 1086 of', and the `functions.tex` callout 'naming it too. Against the Fortress standard libraries, the code generator passes the arguments that no plain binding takes as one such array'. The PDF is copied to `tmp/gather/fortress-batch-33b.pdf` in the main tree, and the build's files are removed (`git clean -fXq -- Specification`).
- microGPT: no line changes (`git diff --stat c799851472 HEAD -- explorations/run-c4/src explorations/apl/mg` prints nothing); its quick checks are the commit stage's to run on the merged tree.
- The count stage and the distance stage ran on N's and R's own code (below, "Points to report"); the gate's tables on the merged tree are their check. The suites, the atomic runs and `ant testSpecData` run in the gate.

## Rows opened

Nine rows, numbered by `ledger.py add` in the order the rungs were folded; each placeholder is replaced by its number in the rung's `REPORT.md`, `SKEPTIC.md` and `JUDGE.md`, in `changes.tex`, in the FACTS entries and in the handover lines below. No test file named a placeholder.

| Row | Placeholder | Rung | Section | Status | Claim |
|---|---|---|---|---|---|
| 1080 | NEW-N-1 | N | 12 | NEGATIVE-VERIFIED | on the compiled path a tuple expression written as the argument of a function whose one parameter has type `Any` stops the code generator: `f((k, k))` for `f(x: Any)` ends 'Error trying to close method scope' |
| 1081 | NEW-N-2 | N | 12 | CONTESTED | the compiled checker refuses as unreachable a `typecase` clause whose type the selector's static type excludes, where the specification's `typecase` section names no such static error: for `x: ZZ32`, an object, a clause at a program's trait `Shape` gives 'The typecase clause, Shape, is unreachable.' |
| 1082 | NEW-N-3 | N's skeptic | 12 | NEGATIVE-VERIFIED | on the compiled path a built-in number type named as a value does not compile: `x: Object = ZZ32` stops the code generator, 'Can't compile the number type ZZ32 as a value yet', where the type, a value object without value parameters, is a singleton declaration |
| 1083 | NEW-W-1 | W's skeptic | 2 | NEGATIVE-VERIFIED | under walk a function argument whose arrow type coerces to its parameter's arrow type is not converted, and the call fails: `callWide(f: ZZ32 -> ZZ64, x: ZZ32)` on `inc(y: ZZ32): ZZ32`, 'Unification error: Closure/Constructor for callWide param 1' |
| 1084 | NEW-W-2 | W's skeptic | 2 | NEGATIVE-VERIFIED | on the compiled path a function whose arrow type of no parameters coerces to its parameter's, as `() -> ZZ32` at `() -> ZZ64`, dies when called: the coercion's function expression reads its own parameter as a top-level variable, 'NoClassDefFoundError: XXXArrowCoercionThunk$CoercionDesugarer#1' |
| 1085 | NEW-G-1 | G | 12 | NEGATIVE-VERIFIED | a spread argument to a varargs parameter, `f(1, ys...)`, is dropped on both paths: walk and the compiled path call the declaration with the arguments before it only, so `count(1, ys...)` counts 1 where `ys` holds two |
| 1086 | NEW-G-2 | G's skeptic | 12 | NEGATIVE-VERIFIED | the code generator stops with `OptionUnwrapException` on a varargs declaration beside another of its name with as many parameters, where the declaration is a trait's or object's method or has static parameters: its dispatch method does not read it by the expansion rule |
| 1087 | NEW-R-1 | R | 12 | NEGATIVE-VERIFIED | under the compiler's prelude, a matrix type `RR64[n,n]` at a declared return type crashes the compiled checker, 'Not in the trait table: CompilerLibrary.Array2': the type names an `Array2` that the prelude does not declare |
| 1088 | NEW-R-2 | R's skeptic | 12 | NEGATIVE-VERIFIED | the code generator stops at a call at an assumption of a generic trait of a method whose parameter has the trait's type parameter, as `stamp(Q asif Tagged[\String\], s asif String)` for `stamp(self, x: T)` in `Tagged[\T\]`: 'Can't find the body that Tagged[\String\] gives stamp at ...' |

Row 1085's record let the gather choose section 12 or walk's; it is in section 12, the section its writer named first. Each new row met the row template at its add, which `ledger.py add` checks; N's and R's were also linted before it, `ledger.py check --rows` failing only their number rule.

## Rows rewritten and noted

- Row 995 (N), rewritten: closed for the seven numbers, open for the other carried types; its two citations re-anchored to `main` in this record's commit (`CodeGen.java:6301`, `NamingCzar.java:589-602`).
- Row 496 (N), rewritten: its `ZZ32` spelling runs (`GenericBesidePlainZZ32`); the row narrows to the `grab` form, reproducer `XXXGenericBesidePlainStatic.test`.
- Row 1062, rewritten three times, by W's line, G's and R's, as each rung's record changed it: rows 315 and 624 no longer stand on `println`'s path, the varargs indices' `FZZ32.make` named (fork N4), the two new run tests named as failing so, and rows 866 and 942 taken out of the walls that follow; W's and G's records each gave the whole line against the base, so G's rewrite takes both changes and the gather cut its notes to the 700-character limit.
- Row 1083 (W), rewritten by the gather right after its add: its sibling NEW-W-2 is named by its number, 1084.
- Row 304 (G), rewritten as its record gave it: `forLetFn` no longer refuses varargs, row 624 out of its siblings.

Rows read and left as they are, by the rungs' records: row 941 (R; its trait's methods are `abstract`, so "The compiled path prints `d`" still holds).

## Rows closed

Nine rows, in `49c11ccfd5`, each by its rung's commit on `main` and its test, which passes on the merged tree ("The tests on the merged tree", above); then `explorations/coordinator/tools/ledger.py landing-check c799851472afc09b66e72d37e16f5a39e614ba5f` printed 'ledger.py landing-check: c79985147..HEAD: no finding'.

| Row | Rung | Commit | Test |
|---|---|---|---|
| 1003 | N | `75f9f2fbf4` | `ProjectFortress/compiler_tests/NumberObjectsCompiled.test` |
| 866 | N | `75f9f2fbf4` | `ProjectFortress/compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`, promoted to a refusal |
| 698 | N | `75f9f2fbf4` | `ProjectFortress/compiler_tests/OverloadZZ32BesideUserTraitCompiled.test`, promoted |
| 566 | N | `75f9f2fbf4` | `ProjectFortress/compiler_tests/ComprisesMeetGenericTrait.test`, promoted; the close notes that it passes under both hash modes (fork N5) |
| 315 | W | `5af98dbca4` | `ProjectFortress/one_library_tests/OneLibraryConditionalReduction.test`; the close names `ConditionalReductionCompiled.test` and `ArrowCoercionFnExprCompiled.test` |
| 624 | G | `e9bc2ed3e3` | `ProjectFortress/one_library_tests/OneLibraryVarargsCount.test`, under the selection; the close names the four other varargs tests, the prelude's refusal (`XXXVarargsCodeGeneration.test`, `XXXVarargsMethodCodeGeneration.test`) and row 1086 |
| 942 | R | `90ee716db0` | `ProjectFortress/compiler_tests/ApiTraitOverloadCompiled.test`, promoted |
| 940 | R | `90ee716db0` | `ProjectFortress/compiler_tests/AsIfApiTraitCompiled.test`, promoted |
| 1061 | R | `90ee716db0` | `ProjectFortress/one_library_tests/OneLibraryArray1.test` |

Each row closes by its rung's commit on `main`, where the rung's record named a commit of its branch (N's `b9aa895753`, W's `17f3e7b17b`, G's `888c20dd93`, R's `838c729304`). Rows 995 and 496 narrowed and stay open. No row closed on a stage's run.

## FACTS entries

Written with `record.py`, each in its rung's commit, the new entries after their section's last entry:

- F-388 (N), added under "Landed semantics": the prelude's seven number types are value objects over the run time's payload classes, one name each at run time (rows 1081 and 1082 named).
- F-379 (N), rewritten in one clause: the prelude declares the same seven as value objects (F-388), where it said that the prelude keeps its open traits (row 1003).
- F-389 (W), added under "Landed semantics": a later function expression at a span already named takes `#2`, `#3`.
- F-128 (W), rewritten as the skeptic's correction gave it: walk does not convert a function argument by the arrow coercion (row 1083); the compiled path converts one, but not to a type of no parameters (row 1084).
- F-390 (G), added under "The checker and the one library": a varargs parameter's arguments are one `ImmutableArray[\T, ZZ32\]` under the selection, refused against the prelude (rows 1085 and 1086 named).
- F-86 (G), rewritten in one sentence: the code generator refuses varargs against the compiler's library and compiles them under the selection (F-390), where it said "The code generator refuses varargs (row 624)".
- F-391 (R), added under "The checker and the one library": a method of an imported api's trait is found by its api (row 1088 named).
- F-338 (R), rewritten to the record's text: `STypesUtil.allMethods` gives an api's trait its api (F-391), where it said that the same root still stops row 940.

F-34, the code generator's measure over the one library on `d3747846c1`'s code, names rows 624 and 315 among its kinds; its numbers stay true of that code. Rung W's record gives a correction for it (on W's code 12 refused, 746 emitted, 3 kinds) and G's a count on its own (3 refused, 751 emitted, 2 kinds); no measure was run on the merged tree, so the restatement is left to the record-landing workflow, as `CLIMB-BATCH-33.md`, "For the record-landing workflow", has it. So are F-352 and F-353 there. The landing check finds no entry that states a row's status otherwise. `record.py check --base 83e464cf63`: '0 failures'.

## Each rung: the skeptic's fixes and rulings, and the gather's corrections

### Rung N, `rung-number-payload-objects` (`75f9f2fbf4`)

The skeptic's fixes, each a commit of the rung's branch, folded into the rung's commit on `main`:

- `eabbfc918b` defect: `CodeGen.forVarRef` emitted `GETSTATIC` of the singleton field `ONLY` for a reference to an imported object, and a payload object's class has no such field, so `x: Object = ZZ32` compiled on the worker's head and its run died, 'NoSuchFieldError: Class fortress.CompilerBuiltin$ZZ32 does not have member field ...FZZ32 ONLY', where the base's checker refused it, 'Variable 'ZZ32' not found.'. The code generator now refuses it, 'Can't compile the number type ZZ32 as a value yet' (row 1082).
- `4fcd929432` correction: the test's citation of a `basic-floats.tex` that does not exist, now `Specification/basic-lib/numbers.tex`, "Rational Numbers"; and row 1082 added to the record.
- `b035da3f63` correction: five citations of `CodeGen.java` that the fix moved.

Contested rulings: one. The skeptic contested; the judge (`JUDGE.md`) upheld `eabbfc918b`: the payload objects have no `ONLY` field, so without the fix a program the base refused compiles and dies, and the fix is the code generator's own 'Can't compile ... yet' wall, which decides no value. The value a number type's name denotes is left to the curator (`PLAN.md`, the entry of N.skeptic.1, N.judge.1 and N.judge.2).

Left for the gather by the skeptic, and what was done:

- The skill's sentence in `references/revival-changes.md`, "Numbers", "The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866).", becomes false. **Not written here:** the batch writes no skill text; it is listed for the skill writer below.
- `references/compiler.md`, "What the compiled path cannot compile yet", could gain the new wall, a built-in number type named as a value (row 1082). **Not written here**, listed below.
- Add NEW-N-3 to the ledger, section 12, from the record. **Done:** row 1082, linted ('1 rows, 1 fail the template; ... number 1' before its add).

The gather's notes: rows 995 and 496 rewritten and rows 1080 to 1082 added as the record gave them; F-379's clause on the open traits rewritten.

### Rung W, `rung-closure-name-once` (`5af98dbca4`)

The skeptic's fixes, folded into the rung's commit on `main`:

- `9b8bdb53c0` correction: `REPORT.md`'s citations of the probe's row 315 paragraph (`plan-33/PROBES.md:113`) and of the sugar sentence (`Specification/advanced/subscripting.tex:90-91`).
- `e9ba4a5eae` correction: row 315's second site, a binding `if`'s else part that is a reduction, thunked at its own span (`PreDisambiguationDesugaringVisitor.java:380`), added to the selector's test as `orSum`, with record finding 8, the FACTS entry and the close note.
- `c5eaf263c8` correction: row 315's third site, an arrow coercion's wrapper around a function-expression argument (`CoercionDesugarer.scala:184`), as `compiler_tests/ArrowCoercionFnExprCompiled`; and two gaps beside it, each an expected failure and a row: `tests/XXXArrowCoercionFnArgument` (row 1083) and `compiler_tests/XXXArrowCoercionThunk` with `ArrowCoercionThunkLink` (row 1084); record findings 9 to 11 and a correction of F-128.

Contested rulings: none.

Left for the gather by the skeptic, and what was done:

- Add rows NEW-W-1 and NEW-W-2 in section 2, and put each number in place of its placeholder in the other row's notes and in the F-128 correction. **Done:** rows 1083 and 1084; row 1084 added with 1083 in its notes, row 1083 rewritten with 1084 in its notes; F-128 rewritten naming both.
- When counting the gate: rung W's tests add 4 compiler-track cases (`ArrowCoercionFnExprCompiled` 2, `ArrowCoercionThunkLink` 1, `XXXArrowCoercionThunk` 1) and 1 testSystem file (`XXXArrowCoercionFnArgument`), beside the worker's 2 compiler cases and 2 onelibrary cases. **For the gate**, listed below.

The gather's notes: row 1062 rewritten from W's line, with row 866, fixed by N, taken out of its walls; F-389 added. F-34's correction is left to the record-landing workflow (above).

### Rung G, `rung-varargs` (`e9bc2ed3e3`)

The skeptic's fixes, folded into the rung's commit on `main`:

- `2f4729d94b` defect: `evalVarargsArgs` passed a single tuple-typed argument whole wherever the tuple's type was a subtype of the varargs type, so `tally(t)`, for `tally(x: Any, y: Any, rest: Any...)`, crashed the code generator with `NegativeArraySizeException: -1`, and `countAny(t)`, for `countAny(xs: Any...)`, made an array of one where the checker (`TypeAnalyzer.scala:328-329`) and walk read two elements. It now passes the elements.
- `2039463906` correction: the overloaded forms that still stop, a varargs method or a generic varargs function beside another declaration of its name with as many parameters, `OptionUnwrapException`, as on the base: two `XXX` tests, row 1086, a sentence in row 624's close note and one in the Effect of the `revival-varargs` entry (`changes.tex:4058-4061`).
- `847f447f0f` correction: the FACTS hand-over in the record names row 1086's forms and tests.

Contested rulings: none.

Left for the gather by the skeptic, and what was done:

- `Specification/appendices/changes.tex:4057` and `:4060` cited NEW-G-1 and NEW-G-2 by their placeholder names. **Done:** 'row~1085 of the revival's gap ledger' and 'row~1086 of the revival's gap ledger', as the entry's other citations read; the built PDF shows both ("The tests on the merged tree").

The gather's notes: rows 1085 and 1086 added, row 304 rewritten as the record gave it, row 1062 rewritten from W's line with G's changes (above), row 624's note given in its close; F-390 added and F-86 rewritten. `REPORT.md`, "Sentences of the specification made false", names `Specification/fortress/preamble.tex:84`, "varargs parameters in compiled code" among the features not yet supported, as still true and left for the gather: it stays, since no program with a varargs parameter runs on the compiled path (row 1062), as the Effect says.

### Rung R, `rung-api-method-index` (`90ee716db0`)

The skeptic's fixes, folded into the rung's commit on `main`:

- `7d3dddf4d4` correction: a gated test of the base defect that the rung repairs and no test held, `compiler_tests/ApiTraitShadowedNameCompiled`: the special arrow named an imported api's trait without its api (`STypesUtil.scala:148` at `c799851472`), so where a component declares its own trait of that simple name the compiled dispatch read the local trait and died with `StackOverflowError`.
- `efaf63f027` correction: at an assumption of a generic trait, a method with a parameter of the trait's type parameter stops the code generator ('Can't find the body that'), for a local trait on both codes and, since the rung, for an imported api's generic trait; the expected failure `compiler_tests/XXXAsIfGenericTraitParamCompiled`, row 1088, findings 6 to 8 and the FACTS qualifier.
- `1fba3c7073` correction: `REPORT.md`'s reserved point names the dispatch method that the rung changes.

Contested rulings: none.

Left for the gather by the skeptic, and what was done:

- On the merged tree, compile and run `(k asif ZZ32) < (j asif ZZ32)` for `ZZ32` values 3 and 4 and check that it prints true; a compiled test of it belongs on the merged tree. **Done:** the gather's test `compiler_tests/AsIfNumberOrderCompiled.fss` and `.test`, each with one comment line, in R's commit; it prints `true` and `PASS` on the merged tree ("The tests on the merged tree").

The gather's notes: rows 1087 and 1088 added, row 1088's `CodeGen.java:7121-7146` re-anchored to `main`'s `:7200-7225` before its add; row 1062 rewritten without row 942 among its walls; F-391 added and F-338 rewritten.

## Files written from the journal

None. Every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` held only the word committed, and no rung had a repair round (`repaired` false for each), so no command of the journal tool was run. Each `record.md` is folded and is not on `main`. Rung N's `JUDGE.md` is landed with it; no rung has a decision record.

## Not landed

None: every rung of this batch was approved, and every one landed.

## Handover lines

Each rung's line as its record gave it, its placeholders replaced by the rows' numbers; the commit on `main` is added in front. A line's own hashes are those of the rung's branch.

- **N**, `75f9f2fbf4` on `main`. Rung N (`wip/rung-number-payload-objects`): the prelude's seven number types are value objects over the run time's payload classes, one name each at run time; rows 1003, 866, 698 and 566 close, 995 and 496 narrow, 1080 and 1081 are new; the one library's seven wait, with their places named, for the rung where the first program runs on the one library (fork N4). (The skeptic's row 1082 came after the line.)
- **W**, `5af98dbca4` on `main`. Rung W landed on `wip/rung-closure-name-once`: the code generator names a function expression's class by its component and span, and a later one at a span already named with `#2`, `#3` in the order met (fork W1); row 315 closed; `compiler_tests/ConditionalReductionCompiled` (the prelude, runs, in a function, a generic and a generic trait's method) and `one_library_tests/OneLibraryConditionalReduction` (the selector, compiles) new, its run an expected failure, `XXXOneLibraryRunConditionalReduction` (row 1062); `ant testFast` green (compiler 1738, onelibrary 5); no stage (STAGE_BLIND: `NamingCzar.java`, `CodeGen.java` and the tests); the shadow patch applies; the measure on the rung's code 12 refused, 746 emitted, 3 kinds, the closure class kind gone. The skeptic: the else part of a binding `if` (the selector's test) and an arrow coercion's function expression around a function expression argument (`compiler_tests/ArrowCoercionFnExprCompiled`, which runs) held as row 315's other sites; rows 1083 (walk converts no function argument by an arrow coercion, `tests/XXXArrowCoercionFnArgument`) and 1084 (a compiled arrow coercion to a type of no parameters dies at run time, `compiler_tests/XXXArrowCoercionThunk`, with `ArrowCoercionThunkLink`).
- **G**, `e9bc2ed3e3` on `main`. Rung G landed varargs on the compiled path under the selector (row 624 closed there; the prelude's refusal names the missing `ImmutableArray`); the measure falls from 13 to 3 refused, none of varargs; a spread argument is dropped on both paths (row 1085, an expected failure under walk).
- **R**, `90ee716db0` on `main`. Rung R landed: the code generator finds a method of an imported api's trait by its api (`STypesUtil.gatherMethods` by the table's name, the special arrow by its self type) and runs an assumed api trait's body (`hasBodyInItsTrait` at two calls of `CodeGen.java`); rows 942, 940 and 1061 close, `OneLibraryArray1` compiles under the selection, no compiled test reaches the trait table's prelude search, count `#total 0` and distance `0` unchanged; report in `explorations/compile-ladder/rung-api-method-index/`.

## Points to report

Every point that a landed rung reached, as its worker and then its skeptic listed it, with its evidence; the lines cited are those of the rung's branch ("The rungs applied, in order" gives where they are on `main`), and a placeholder is replaced by its row's number. None holds the push: no step was taken that cannot be undone or that acts against a decision on record (`holdsPush` and `cannotBeUndone` false for each). The reserved points among them that change what a program does or accepts are filed for his review ("Items for the curator", below).

### Rung N

The worker's:

- **The design as built: the payload classes, the table of payload objects, what the code generator writes for such an object, how Java code makes a value, and the one name that every place gives a payload object's type.** `explorations/compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built"; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4930-5076`, `:6283-6292`; `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:614-622`; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/LibraryNames.java:30-32`
- **Each place that names a payload object's type, by file and member, and the name it gives.** `REPORT.md`, "Each place that names a payload object's type" (twelve rows: `NamingCzar.java:588-601`, `CodeGen.java:6276` and `:6283-6292`, `OverloadSet.java:1095-1097`, `CodeGen.java:645-649` and `:7641-7649`, `MethodInstantiater.java:137-141`, `RTHelpers.java:35-41`)
- **Row 866's and row 698's tests promoted; the team's `Compiled6.bx` with its second message; row 566's test under two hash modes; each new test failing on the base and passing after.** `ProjectFortress/compiler_tests/XXXNumberTypeExtendRefusedCompiled.test:3`, `OverloadZZ32BesideUserTraitCompiled.test:1-4`, `XXX6bx.test:13-19`, `ComprisesMeetGenericTrait.test:1-4`; `junit.sh` base 'Tests run: 6,  Failures: 3'; `old-fortress.sh junit` 'Tests run: 4,  Failures: 2'; `junit.sh` final 'OK (13 tests)'
- **A team test changed (reserved): `XXX6bx.test` takes its second message, 'Objects can only extend traits.'** `ProjectFortress/compiler_tests/XXX6bx.test:16-18`
- **The whole compiled tracks, and walk's suite: every test that failed after the change, with its cause.** `ant testFast` on `b9aa895753`: compiler 1,739 tests, 1 failure, `XXXGenericBesidePlainZZ32` ('Did not see expected failure'), row 496's `ZZ32` spelling repaired by the one name, promoted in `6465bd6678`; library 86/0, othercompiler 263/0, misc 0, onelibrary 3/0; `ant testSystem` 'BUILD SUCCESSFUL', 876 tests, 0 failures
- **The one library's seven number objects are left out (fork N4): each place where their entries would go, by file and member.** `NamingCzar.java:614-622` (`payloadObjects` rows), `LibraryNames.java:30-32` (`numberObjectClass`), `NamingCzar.java:588-601` (the carried table, keyed by `fortLib`) and `runtimeSystem/Naming.java:298-302`; `REPORT.md`, "The one library's seven"
- **The two stages' tables on the final tree against the comparand.** `checker-count/run.sh` on `6465bd6678`: '#total 0', diff with `explorations/compile-ladder/climb-batch-33/gate/checker-count.txt` prints nothing; `distance/run.sh`: `compare.sh` 'DISTANCE SAME   0', '#shadow every shadow edit matched the tracked sources'; `errors.tsv` header only
- **Each sentence of the specification and of Appendix I's Effects that the change makes false: none.** grep over `Specification/` (`REPORT.md`, "Sentences of the specification made false"): only `Specification/appendices/changes.tex:1842` and `:5051`, quoted originals' line numbers
- **A line of the model program or of its helper files that the change needs: none.** `git diff --name-only c799851472 HEAD` names no file under `explorations/run-c4/` or `explorations/apl/`
- **A file edited beyond those named.** `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ArrayStoreJUTest.java:65-66`; `ProjectFortress/compiler_tests/GenericBesidePlainZZ32.test:1-4`, `XXXTupleArgumentAtAnyCompiled.test:1-3`, `XXXTypecaseArmExcludedRefused.test:1-3`
- **A program that ran and is now refused, beyond row 866's form (reserved): a `typecase` clause at a program's trait over a `ZZ32` selector is refused as unreachable.** `ProjectFortress/compiler_tests/XXXTypecaseArmExcludedRefused.test:3` ('The typecase clause, Shape, is unreachable.'); on the base's code the same program compiled and printed 'integer' (`old-fortress.sh run ArmBesideNumber`); row 1081

The skeptic's:

- **The design as built**, as above. `REPORT.md`, "The design as built"; `NamingCzar.java:614-622`; `LibraryNames.java:30-32`; `CodeGen.java:6283-6292`
- **Each place that names a payload object's type**, the worker's twelve rows plus one place added by the skeptic: `CodeGen.forVarRef` refuses a payload object's name as a value, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7003-7007` (`eabbfc918b`)
- **Row 866's and row 698's tests promoted; `Compiled6.bx` with its second message; row 566's test under two hash modes; each new test failing on the base and passing after.** `XXXNumberTypeExtendRefusedCompiled.test:3`; `OverloadZZ32BesideUserTraitCompiled.test:1-4`; `XXX6bx.test:13-19`; `ComprisesMeetGenericTrait.test:1-4`; `junit.sh` base printed 'Tests run: 6,  Failures: 3'; `junit.sh` skeptic-fix printed 'OK (15 tests)'
- **A team test changed (reserved): `XXX6bx.test` takes its second message, 'Objects can only extend traits.'** `ProjectFortress/compiler_tests/XXX6bx.test:16-18`
- **The whole compiled tracks, and walk's suite.** `ant testFast` on `b9aa895753`: compiler 'Tests run: 1739, Failures: 1' (`XXXGenericBesidePlainZZ32`, repaired by the one name and promoted); library 86/0; othercompiler 263/0; misc 0 failures; onelibrary 3/0. `ant testSystem`: four shards, 222+216+222+216, 0 failures. The skeptic's fix is in the code generator only; by `tests-running.md:75` the whole tracks are left to the gate.
- **The one library's seven number objects are left out (fork N4).** `NamingCzar.java:614-622` (`payloadObjects`); `LibraryNames.java:30-32` (`numberObjectClass`); `NamingCzar.java:588-601` (the carried table) and `runtimeSystem/Naming.java:298-302`; `REPORT.md`, "The one library's seven"
- **The two stages' tables on the final tree against the comparand.** On `6465bd6678` (the worker's final code): the count's diff against `explorations/compile-ladder/climb-batch-33/gate/checker-count.txt` printed nothing ('#total 0'); `distance/compare.sh` printed 'DISTANCE SAME   0'. The skeptic's fix came after; the gate's tables on the merged tree are the record.
- **Each sentence of the specification and of Appendix I's Effects that the change makes false: none.** `Specification/appendices/changes.tex`, entries `revival-object-kinds` (`:4175-4250`) and `revival-numbers` (`:564-620`), say nothing of the prelude's number types as traits; `Specification/basic-lib/basic-integers.tex:105` calls `ZZ` 'the trait', which describes the language, not a path
- **A line of the model program or of its helper files that the change needs: none.** `git diff --name-only c799851472 HEAD` names no file under `explorations/run-c4/` or `explorations/apl/`
- **A file edited beyond those named.** `ArrayStoreJUTest.java:65-66` (the worker's); the tests `GenericBesidePlainZZ32*`, `XXXTupleArgumentAtAnyCompiled*`, `TypecaseArmExcludedRefused.fss`, `XXXTypecaseArmExcludedRefused.test`, and the skeptic's `XXXNumberTypeAsValueCompiled.fss` and `.test`
- **A program that ran and is now refused, beyond row 866's form (reserved).** `XXXTypecaseArmExcludedRefused.test:3` ('The typecase clause, Shape, is unreachable.'); on the base the program compiled and printed 'integer'; row 1081

### Rung W

The worker's:

- **Which two nodes share the span, by the desugaring that makes each: the thunk `fn () => e` that `cleanupOpExpr` makes of the conditional operator's right operand at its span, and the reduction's outer closure `fn (reduction, unit) => __generate(...)` that `DesugarerUtil.visitGenerators` makes at the reduction's span.** `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:301-304`, `:333`, `:457`; `ProjectFortress/src/com/sun/fortress/nodes_util/DesugarerUtil.java:194-197`; trace 'forFnExpr className = AndRange$fn@3:56-79 desc = AbstractArrow??,...FBoolean?' then '... desc = AbstractArrow?Tuple?fortress/FortressLibrary$Reduction?...'
- **The naming as built: the thunk, met first, keeps today's name; the reduction's closure is `...#2`; the ordinal follows the order `forFnExpr` and `localFunctionClosure` are entered for the component (tree order), the set is per component and never iterated; same names and bytes under `-XX:hashCode=0`.** `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:893-907`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:386`, `:409`, `:3935`, `:3970`, `:4098`, `:4244`; zipfile comparison 'entries whose bytes differ between the modes: 0 []'
- **Row 315's test under the selector, failing on the base and passing after; its run test an expected failure until the one library compiles whole.** `ProjectFortress/one_library_tests/OneLibraryConditionalReduction.test:1`, `ProjectFortress/one_library_tests/XXXOneLibraryRunConditionalReduction.test:1`; `old-fortress.sh junit` -> 'duplicate entry: OneLibraryConditionalReduction$\=fn@6\!56-79.class'; `ant testFast` onelibrary 'Tests run: 5, Failures: 0'
- **The files edited, for STAGE_BLIND: `NamingCzar.java` and `CodeGen.java` and the tests; a file edited beyond those named: `CodeGen.java`'s field and two constructor lines beyond its two calls, and a test in `compiler_tests/` beside the selector's track.** `CodeGen.java:386`, `:409`, `:4241-4244`; `ProjectFortress/compiler_tests/ConditionalReductionCompiled.fss:1`; `explorations/coordinator/tools/distance/DistanceMulti.java:41-43` (the stages stop at TYPECHECK)

The skeptic's:

- **Which two nodes share the span (the worker's account holds); two more desugarings do the same: a binding `if`'s else part, and an arrow coercion's wrapper.** `PreDisambiguationDesugaringVisitor.java:301-304`, `:333`, `:380`; `DesugarerUtil.java:194-197`; `ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala:184`
- **The naming as built: the expression met first keeps today's name, later ones take `#2`, `#3` in tree order, and the set is per component and never iterated.** `NamingCzar.java:901-907`; `CodeGen.java:386`, `:409`, `:3935-3936`, `:4098-4099`, `:4244`; SkThree's jar on the rung's code: `fn@9:45-65`, `#2`, `#3`
- **Row 315's test under the selector, failing on the base and passing after; its run test an expected failure; it now also holds the binding `if`'s else part.** `ProjectFortress/one_library_tests/OneLibraryConditionalReduction.fss:6`, `:17`; `FORTRESS_LIBRARY=one old-fortress.sh ... junit` -> 'duplicate entry: OneLibraryConditionalReduction$\=fn@6\!64-81.class'; on the head 'OK (2 tests)'
- **The files edited, for STAGE_BLIND; a file edited beyond those named.** The worker's: `CodeGen.java`'s field and two constructor lines, and `compiler_tests/ConditionalReductionCompiled`. The skeptic's, tests only: `compiler_tests/ArrowCoercionFnExprCompiled.fss` and `.test`, `compiler_tests/XXXArrowCoercionThunk.fss`, `ArrowCoercionThunkLink.test`, `XXXArrowCoercionThunk.test`, and `tests/XXXArrowCoercionFnArgument.fss`, which is outside the section's test track. `ProjectFortress/compiler_tests/ArrowCoercionFnExprCompiled.fss:1`; `ProjectFortress/compiler_tests/XXXArrowCoercionThunk.fss:1`; `ProjectFortress/tests/XXXArrowCoercionFnArgument.fss:1`; `CodeGen.java:386`, `:409`, `:4241-4244`
- **Two new ledger rows from the skeptic's measurements, rows 1083 (walk converts no function argument by an arrow coercion) and 1084 (a compiled arrow coercion to a type with no parameters dies when called), and a correction of F-128.** The rung's `record.md:35`, `:51`, `:53` (folded: rows 1083 and 1084, F-128)
- **Reserved: a class name that a test or a tool reads. None changes:** programs that compiled before give equal jars by name and by byte on the old and the new code, and no test or tool reads `fn@`. `python3 -I cmpjars.py SkNames LocalFunctionGenericContextCompiled` -> 'SkNames: old 16 entries, new 16 entries; names equal: True; entries whose bytes differ: 0'; `grep -rln 'fn@' ProjectFortress/*tests* ProjectFortress/tests explorations/coordinator/tools bin` prints nothing
- **Reserved: a model line. None:** the diff lists no file of the model program, which runs only under walk, and does not touch walk's code. `git diff --name-only c799851472afc09b66e72d37e16f5a39e614ba5f...HEAD | grep -i 'microgpt\|run-c4\|apl/mg'` prints nothing

### Rung G

The worker's:

- **The convention as built: the JVM parameters of a varargs declaration, where the array is made, at a call and in a dispatch method, and how a call of each arity reaches the varargs declaration.** `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7695-7831`; `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2024-2033`; `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:945-968`; `javap -c -p` of `OneLibraryVarargsOverloaded`: '251: invokestatic #201 // Method fortress/FortressLibrary.assert:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)...'
- **Row 624's test under the selector, failing on the base and passing after; the run test, an expected failure until the one library compiles whole; the bytecode of one call, with the array made and filled.** `ProjectFortress/one_library_tests/OneLibraryVarargsCount.test:1`; `ProjectFortress/one_library_tests/XXXOneLibraryRunVarargs.test:1`; `javap` of `OneLibraryVarargsCount$task0`: '40: getstatic ... __immutableFactory1?...ZZ32,0,3?? ... 58: invokeinterface ... ImmutableArray?...init ... 96: invokestatic ... OneLibraryVarargsCount.count'
- **The prelude's two expected-failure tests: unchanged, or their message.** `ProjectFortress/compiler_tests/XXXVarargsMethodCodeGeneration.test:3` (`OptionUnwrapException` -> 'declares no ImmutableArray, the type of a varargs parameter'); `XXXVarargsCodeGeneration.test` unchanged; `junit.sh prelude ...` 'OK (13 tests)'
- **The measure on a scratch copy of the final tree: how many of the refused declarations remain, and what stops `Generator2` and `CatString` behind varargs.** `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh /home/user/fortress-varargs-measure <out>`: 'refused declarations 3 | emitted (OK lines) 751 | component failures 0'; `Generator2` and `CatString` '@@CG OK', nothing behind varargs (run on `888c20dd93`)
- **Whether the distance stage's shadow patch still applies to the rung's `CodeGen.java`.** `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>/shadow-src && python3 .../add-patch.py <scratch>/shadow-src`: 'shadow-patch+add-patch exit=0'
- **The files edited, for STAGE_BLIND; a file edited beyond those named.** `git diff --name-only c799851472 HEAD`: `NamingCzar.java`, `OverloadSet.java`, `codegen/CodeGen.java`, the tests, `functions.tex`, `changes.tex`, `rung-varargs/REPORT.md` and `record.md`; no file beyond those named. `CodeGen` members beyond the four named: `addParam` `:712`, `generateFunctionalBody` `:3166`, `addParams` `:3296`, `localFunctionArrowType` `:4050`, `forFunctionalRef` `:4435-4443`, `partitionByArgCount` `:8514-8541`

The skeptic's:

- **The convention as built**, as above; a single tuple-typed argument passes its elements (`CodeGen.java:7701-7707`, fix 1); the overloaded method and generic forms stop the code generator (row 1086). `CodeGen.java:7695-7831`; `OverloadSet.java:2018-2034`; `NamingCzar.java:945-968`
- **Row 624's test under the selector, failing on the base and passing after; the run test an expected failure; the bytecode of one call.** `OneLibraryVarargsCount.test:1`; `XXXOneLibraryRunVarargs.test:1`; `javap` of `VaBasic.run`: '__immutableFactory1?...ZZ32,0,3...' then 'FZZ32.make', 'aload_3', 'init', and so on for the indices 0, 1, 2
- **The prelude's two expected-failure tests.** `XXXVarargsMethodCodeGeneration.test:3` now expects 'declares no ImmutableArray, the type of a varargs parameter'; `XXXVarargsCodeGeneration.test` is unchanged
- **The measure.** It ran on `888c20dd93`: 'refused declarations 3 | emitted (OK lines) 751 | component failures 0', and nothing stops `Generator2` or `CatString` behind varargs. Neither `4526151e00` nor `2f4729d94b` reaches the fourteen components: they declare no overloaded generic varargs name, and their single-argument calls of `assert` and `deny` take Boolean values (`Library/String.fss:443`, `Library/FortressLibrary.fss:322`)
- **Whether the distance stage's shadow patch still applies.** `shadow-patch.py` and `add-patch.py`, run on `2f4729d94b`'s `CodeGen.java`: 'shadow-patch+add-patch exit=0'
- **The files edited, for STAGE_BLIND; a file edited beyond those named.** The worker's list, plus the skeptic's: `CodeGen.java`, `one_library_tests/OneLibraryVarargsCount.fss`, `one_library_tests/XXXOneLibraryVarargs{MethodOverloaded,GenericOverloaded}.{fss,test}`, `Specification/appendices/changes.tex`, and `rung-varargs/{REPORT,record,SKEPTIC}.md`. One file is beyond those the section names: `Specification/appendices/changes.tex:4046-4062`, the Appendix I entry of the `functions.tex` callout

The rung's reserved points, a model line and a change of which declaration a call reaches, were not reached (`REPORT.md`, "Points to report"; `SKEPTIC.md`, "My programs", `VaReserved`).

### Rung R

The worker's:

- **The root as found: where an entry loses its api, by file and member, and what now carries it.** `STypesUtil.scala:1652` at `c799851472` (`gatherMethods` named own declarations by `ti.ast.getHeader.getName`) now `:1666` (`tt_name`); `STypesUtil.scala:148` (the special arrow named `f.declaringTrait`) now named by `nameBySelfType` `:150-163`
- **Rows 942 and 940: each expected-failure test promoted; row 1061's test under the selector; each failing on the base and passing after.** `ProjectFortress/compiler_tests/ApiTraitOverloadCompiled.test`, `AsIfApiTraitCompiled.test`, `ProjectFortress/one_library_tests/OneLibraryArray1.test`; `junit.sh` base 'Tests run: 9,  Failures: 9'; one-library base 'Not in the trait table: Array1'; `junit.sh` final 'OK (23 tests)'; one-library 'OK (4 tests)'
- **The trait table's search by the prelude's names: whether any test still reaches it after the repair.** `TraitTable.scala:79-100` instrumented; Shell `junit` over `compiler_tests`, `other_compiler_tests`, `library_tests`, `parser_tests` and `one_library_tests` on `838c729304`: 'OK (2092 tests)', 'OK (4 tests)', no `@@TRAITTABLE-SEARCH` line; positive control with the base's `STypesUtil`: '1 @@TRAITTABLE-SEARCH codegen CompilerAlgebra Equality in SearchControl'
- **Whether the distance stage's shadow patch still applies to the rung's `CodeGen.java`.** `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>`: exit 0; `add-patch.py` exit 0; distance run '#shadow every shadow edit matched the tracked sources'
- **The two stages' tables on the final tree against the comparand, and the checker's timing.** count on `838c729304`: diff with `explorations/compile-ladder/climb-batch-33/gate/checker-count.txt` empty, `#total 0`; `compare.sh` 'DISTANCE SAME   0', `errors.tsv` and `distance-sites.tsv` header only; checker-count base 'real 1m28.673s' (load 10.15), change 'real 1m15.581s' (load 0.85), tables and `run.txt` equal
- **A file edited beyond those named: `CodeGen.java` edited in two members beyond `methodsNamed`, `emitBodyGivenBy` and `assumedReceiverCall` (members neither N nor G names; no hunk of their branches there).** `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7126`, `:7167`
- **Reserved point, a change of which declaration a call reaches: a compiled call at a type assumption of an imported api's trait, on an object that overrides the method, ran the object's body on the base and runs the trait's after, as walk and the specification give.** `CodeGen.java:7126`, `:7167`; OneTagProbe base 'functional at P asif S: pd' / rung and walk 'functional at P asif S: sd'; test `ProjectFortress/compiler_tests/AsIfApiTraitOverrideCompiled.test`; `type-annotation.tex:45-54`

The skeptic's:

- **The root as found.** `STypesUtil.scala:1652` at `c799851472` (`gatherMethods` named its own declarations by `ti.ast.getHeader.getName`) is now `:1666` (`tt_name`). `STypesUtil.scala:148` (the special arrow named `f.declaringTrait`) now names the trait through `nameBySelfType`, `:150-163`.
- **Rows 942 and 940: each expected-failure test promoted; row 1061's test under the selector; each failing on the base and passing after.** `ProjectFortress/compiler_tests/ApiTraitOverloadCompiled.test`, `AsIfApiTraitCompiled.test` and `ProjectFortress/one_library_tests/OneLibraryArray1.test`. On the base: 'Tests run: 9,  Failures: 9'. After: 'OK (23 tests)' and 'OK (4 tests)'.
- **The trait table's search by the prelude's names.** The worker's instrumented run reached the search in none of its 2092 tests plus 4 one-library tests. Its positive control, with the base's `STypesUtil`, printed '1 @@TRAITTABLE-SEARCH codegen CompilerAlgebra Equality in SearchControl' (`REPORT.md`, "The trait table's search by the prelude's names").
- **Whether the distance stage's shadow patch still applies.** The worker's `shadow-patch.py` and `add-patch.py` runs both exited 0. The distance run printed '#shadow every shadow edit matched the tracked sources'.
- **The two stages' tables on the final tree against the comparand, and the checker's timing.** Count against `explorations/compile-ladder/climb-batch-33/gate/checker-count.txt`: diff empty, '#total 0'. Distance: `compare.sh` 'DISTANCE SAME   0'. The skeptic's count runs: base build 'real 1m3.889s', head 'real 1m4.480s', tables and normalized `run.txt` equal. The worker's: 88.7 s and 75.6 s.
- **A file edited beyond those named: `CodeGen.java` in `emitBodyGivenBy` and `assumedReceiverCall`, beyond `methodsNamed`.** `CodeGen.java:7126`, `:7167`. No hunk of the N, G or W branches is at these lines.
- **Reserved point: a change of which declaration a call reaches. At a type assumption of an imported api's trait, the trait's body now runs over an object's override; at the prelude's `String`, its placeholder body now runs.** `CodeGen.java:7126`, `:7167`, with the worker's OneTagProbe: 'pd' on the base, 'sd' after. The skeptic's SkPreS1, `("ab" asif String) < ("cd" asif String)`: 'S1: true' on the old code, 'S1: false' on the new, the false coming from `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:393`.
- **Reserved point: a change of which declaration a dispatch method reaches. Beside a local trait of the api trait's simple name, the compiled dispatch of `tag(O, L)` now reaches the api trait's body, where the base recursed.** `STypesUtil.scala:148-163` (`nameBySelfType`). `ProjectFortress/compiler_tests/ApiTraitShadowedNameCompiled.test`: on the base, '. run ... java.lang.StackOverflowError'; on the head, 'OK (3 tests)'.

## Items for the curator, and where each is in `PLAN.md`

Seven items came with the brief, and the gather adds none of its own. None asks for an answer before work on the path can go on: each is reversible, built at its default, and parked. So all are under "Off the path, parked", in the new group "Climb batch 33b, listed for his review", made after climb batch 33's group; items on one point make one entry, and each entry was written in the commit of the rung that raised it. The reserved points that change what a program does or accepts are filed there too, one entry per rung, at the default as landed: N.reserved.1 and N.reserved.2 (N's commit), R.reserved.1 to R.reserved.3 (R's commit). An entry is named here by its opening words.

| Ids | Section of `PLAN.md` | Entry |
|---|---|---|
| N.worker.1, N.skeptic.2 | Off the path, parked | "N.worker.1 and N.skeptic.2 of climb batch 33b's rung N (row 1081, CONTESTED)": should the compiled checker refuse as unreachable a `typecase` clause whose type the selector's static type excludes? |
| N.skeptic.1, N.judge.1, N.judge.2 | Off the path, parked | "N.skeptic.1, N.judge.1 and N.judge.2 of climb batch 33b's rung N (row 1082)": what does a built-in number type's name denote as a value, and row 1082's status |
| G.worker.1 | Off the path, parked | "G.worker.1 of climb batch 33b's rung G": should fork N4's rung list the varargs indices among its sites? |
| G.worker.2 | Off the path, parked | "G.worker.2 of climb batch 33b's rung G (row 1085), told": a spread argument is dropped on both paths, and its repair has no rung |
| N.reserved.1, N.reserved.2 | Off the path, parked | "Rung N of climb batch 33b, its reserved points": the team's `Compiled6.bx` takes a second message; a `typecase` clause at a program's trait over a `ZZ32` is refused (its question is the first entry) |
| R.reserved.1, R.reserved.2, R.reserved.3 | Off the path, parked | "Rung R of climb batch 33b, its reserved points": the api trait's body over an object's override; the prelude `String`'s placeholder `<`, now `false`; the dispatch beside a local trait of the same simple name |

### The gather's own points

None. No text mismatch was found between one rung's specification text and another rung's code: the batch's only specification edits are rung G's `functions.tex` callout and its Appendix I entry, with the gather's two row numbers in it, and no other rung's code reaches what they state; N, W and R report no sentence made false.

### Not put into `PLAN.md`

None.

## Left for the coordinator and the skill writer

- The skill is not written here. Its sentences that the batch makes false, for the skill writer, beside those that `CLIMB-BATCH-33.md`, "For the skill writer", lists after run 2: rung N's two, `references/revival-changes.md`, "Numbers" (quoted above, rung N's skeptic), and `references/compiler.md`, "What the compiled path cannot compile yet", which can gain the wall of row 1082, a built-in number type named as a value, 'Can't compile the number type ZZ32 as a value yet'; and rung G's sentence to add there, that against the prelude a varargs declaration is refused, since the prelude has no array type, and under the selector it compiles.
- The record-landing workflow: F-34's count after W and G (no measure on the merged tree), F-352, F-353 and P-33, as `CLIMB-BATCH-33.md`, "For the record-landing workflow", lists them after run 2.
- The gate's count: rung W's tests add 4 compiler-track cases and 1 testSystem file (`XXXArrowCoercionFnArgument`) beside the worker's 2 compiler cases and 2 onelibrary cases (W's skeptic); rung N removes `ObjectExtendsZZ32CompiledLink.test` and the `XXX` pairs it promotes, and adds its own; G's tests are in the onelibrary track but for `XXXVarargsMethodCodeGeneration.test`'s new message; the gather adds `AsIfNumberOrderCompiled.test` (3 compiler-track cases).
- `PLAN.md`'s line on the code generator over the one library names F-34's kinds, the closure class written twice (row 315) and varargs (row 624) among them (W's record); the coordinator's to bring in line, with the first section of the plan.
- The count stage and the distance stage ran on N's and R's own code only; the gate's tables on the merged tree are the check for the four rungs together. The onelibrary track ran on the merged tree here ('Tests run: 14, Failures: 0').

## Revival changes, for the skill writer

One subsection for each landed rung: its "Revival change" section as its record gave it, both parts word for word, or its line "Revival change: none" with the reason. No placeholder stood in them. The lines cited are those of the rung's branch, or of the commit that the text names.

### Rung N, `rung-number-payload-objects`: the prelude's seven number types as value objects over payload classes

**The change.** The team's compiler prelude declared `ZZ32` and its six siblings as traits, `trait ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] } excludes { ZZ64, RR32, RR64 }` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:201` at `a874948ac`), each carried by a hand-written class that extends the trait's generated class, `public final class FZZ32 extends fortress.CompilerBuiltin.ZZ32.DefaultTraitMethods` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14` at `a874948ac`). The tree declares each a `value object` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`), whose class the code generator writes over the hand-written payload class `FZZ32`, now abstract over `FValue`. So on the compiled path a program's object below a number type is refused at the compile, 'Invalid type in extends clause: ZZ32' (`ProjectFortress/compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`); an overloading at `ZZ32` beside one at a program's trait is valid (`ProjectFortress/compiler_tests/OverloadZZ32BesideUserTraitCompiled.test`); a `typecase` clause at a program's trait over a `ZZ32` is refused as unreachable (`ProjectFortress/compiler_tests/XXXTypecaseArmExcludedRefused.test`); and a static argument inferred from a number's run-time type names the class that compiled code names (`ProjectFortress/compiler_tests/ComprisesMeetGenericTrait.test`). The reason: an object trait type cannot be extended and excludes every type that is not its supertype (`Specification/basic/types-vals-vars.tex:285-288`); and on the team's form, `object MyNum extends ZZ32 end` compiled and its run died, 'IncompatibleClassChangeError: class ...$MyNum can not implement ...FZZ32, because it is not an interface', while a generic dispatch over `V[\ZZ32\]` died casting to `V⟦fortress|CompilerBuiltin%ZZ32⟧`, a second name of the type.

**Provenance.** P-178 (each built-in number type one `value object`, both paths before the switch-over) and P-37's second exception; its detail, the carriers' review's way D over way C, form 2 (`explorations/reviews/carriers-ways-2026-11-13.md`); the batch's forks N1 to N6; climb batch 33b, rung N; rows 1003, 866, 698, 566, 995 and 496.

### Rung W, `rung-closure-name-once`: one class name for each function expression where two share a span

Revival change: none. The change makes valid programs compile that the team's code generator stopped on, and names no rule of the language: the specification makes `x OP: y` sugar for `x OP (fn () => y)` (`Specification/advanced/subscripting.tex:90-91`) and names no class of a function expression; walk makes no class of one. Only the JVM name of a second function expression at a span, `...#2`, is new.

### Rung G, `rung-varargs`: a varargs parameter compiled as one immutable array, under the selector

**The change.** The team's code generator refused every function and method with a varargs parameter and every call of one: `NamingCzar` threw 'Can't compile VarArgs yet' for a domain with a varargs part (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1307`, `:1317`, `:1457`, `:1568` before this change), and `OverloadSet.getSignature` left "some fiddliness with varargs that has to be sorted out" (`OverloadSet.java:615` before this change). The tree now compiles one against the interpreter's library: the arguments that no plain parameter takes are one `ImmutableArray[\T, ZZ32\]`, which `__immutableFactory1` makes and the caller fills in order, at the call or, where another declaration of the name takes as many arguments, in the dispatch method's branch for the varargs declaration (`one_library_tests/OneLibraryVarargsCount.test`, `OneLibraryVarargsOverloaded.test`). Against the compiler's own library the declaration stays refused, the message naming the missing type (`compiler_tests/XXXVarargsMethodCodeGeneration.test`). The reason: the specification binds the parameter to those arguments in order (`Specification/basic/functions.tex`, "Function Applications"), its revision gives the type (`functions.tex`, the `revival-varargs` box), the checker binds the parameter at that type (`Types.java:143-146`), and walk builds the same value (`interpreter/evaluator/values/NonPrimitive.java:224-251`); a dispatch method reads a varargs declaration by the expansion rule (`Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters").

**Provenance.** Row 624 and F-86; forks G1 (the JVM form), G2 (where the array is made), G3 (a spread argument not built), G4 (the prelude refused, P-37) and G5 (the run test an expected failure), each at its default; climb batch 33b, rung G.

### Rung R, `rung-api-method-index`: a method of an imported api's trait found by its api

Revival change: none. The change repairs the code generator toward what the specification (`traits.tex`, "Method Declarations"; `type-annotation.tex`, "Type Assumption"; `apis.tex`, the matching definition) and walk already say and do; the team's compiled path stopped on these programs with an internal error, and no rule of the language changes.
