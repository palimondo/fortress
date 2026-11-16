<!-- Climb batch 32, rung C (rung-static-argument-inferred): the skeptic's check of the rung, its one fix of the change, its corrections and its verdict. Head judged a5cd5e8cbd; code head after the fix 804445961c. -->

# Rung C: the skeptic's check

Verdict: **approved**, with one fix of the change and corrections, none contested. The head judged is `a5cd5e8cbd` (code of `e5c519a425`); the fix is `804445961c`, the corrections `4e2385049f` and `b976846c41`.

The count and distance tables in REPORT.md, section 7, are those of the worker's head. No stage was run after the fix; the gate's tables on the merged tree are the record.

## What was checked

1. **The stages.** The worker's tables under its scratch folder read as REPORT.md says: count `#total 0`, `#locations 0`, `#crash none`, 91.1 s; distance `#total 0`, `#crash none`, `#seconds 137 FortressLibrary 89`. Both started after the last change of code (`e5c519a425`, 00:19:41 UTC; the count run ended 00:33, the distance 00:36). The count stage run again here, base build and worker's head in one session, `explorations/coordinator/tools/checker-count/run.sh <out> <scratch>` from each tree: base `real 1m20.836s`, head `real 1m21.045s` (load at start 1.8 and 2.6, nproc 4, Xeon 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`); the worker's were 83.2 s and 76.2 s. The two tables are equal (`diff` prints nothing), equal to the worker's `change` table and its final table, and the two `run.txt` files are equal with each tree's path replaced by one word (33 lines each), as are the worker's.
2. **Test first.** In the worker's transcript: row 731's test failed through the harness on the base's code at 23:32:55 UTC (call `8Ex2ps`: `old-fortress.sh /home/user/fortress-base33 ... junit .../InferBigOperatorSelfBound.test`, "is not applicable to an argument of type ().", "File InferBigOperatorSelfBound.fss has 4 errors."); row 758's three tests at 23:35:20 (call `wdu1ud`: "Tests run: 5,  Failures: 5,  Errors: 0", with "java.lang.Error: No place to put inferred static args in application.: Not yet implemented"). The first edit of the checker is at 23:37:34 (call `9pnmJi`) and its first compile at 23:37:44, the first build at 23:50:40. The last run after the last change of code is 00:19:30 to 00:19:41 UTC, "OK (15 tests)"; `ant testFast` on that code: "Tests run: 1577, Failures: 0, Errors: 0", "BUILD SUCCESSFUL", "Total time: 12 minutes 7 seconds". The order holds.
3. **The diff**, line by line, against the section, P-78, P-51, P-48, P-148 and the three chapters. It does what REPORT.md says. Findings 1, 4 and 5 below.
4. **Where the fix belongs.** The precedent is the argument retry, as the report says; the rule for the reduction sits in `typedApplicationOfArg` because `typedApplication` is rung N's. The library's way for a type with static parameters is `TypeSchemaAnalyzer`, which clears them before plain subtyping (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:128-130`); a generic function's type as a value is the one place where a plain comparison meets them, which finding 1 turns on.
5. **The tests.** Each exercises its defect and cites the specification by file and section. `InferBigOperatorSelfBound.fss` had two comment lines; one is removed (`4e2385049f`).
6. **Programs of the skeptic's own**, compiled on the base's code (`old-fortress.sh /home/user/fortress-base33 <caches> compile P.fss`, then `run P`) and on the rung's build (`bin/fortress compile`, `run`, private caches), below.
7. **The three homes**: the table at the end.
8. **The ledger and the sibling sites**: `ledger.py find` / `facts-extract.sh 'ledger-find:...'` for "generic function value", "function value Any", "functional method value", "numeral block", "arrow NoClassDefFoundError": rows 758, 156, 448 bear on the rung and are in record.md; none holds findings 1 to 3 or the two defects of the base that the programs met.
9. **The report.** Its five provenance lines open on what they claim (`reductions.tex:28`, `var-ref.tex:38-39`, `Functionals.scala:1075`, `:876`, `:680-689`). Two corrections: the line of `carriesOwnStaticParams`, and the sentence that a reference was "a crash or a refusal before" (`b976846c41`).
10. **Competing declarations** of `reductionApplication`, `reductionBodyType`, `instantiatedReference`, `carriesOwnStaticParams` and of each test's component: none in `ProjectFortress/src/com/sun/fortress/`, `ProjectFortress/` or `Library/`.
11. **Loud failures made quiet.** A refusal became an accepted reduction: its instance is the expected type where the elements convert to it, else the body's type, as the revised box of `Specification/basic/expressions/reductions.tex`, section "Summations and Other Reduction Expressions", says. A crash became an instantiated reference or a refusal with a message. No program of mine got a wrong value in place of an error.

## The programs and what they showed

The scaffold is the test's: `BIG LAST`, `Upto`, `__bigOperator` and `__generate`, with `note` recording each element's run-time type. With the bound `Equality[\T\]` (the base refuses every line, "is not applicable to an argument of type ()"), `bin/fortress compile SkSelf.fss && bin/fortress run SkSelf`, at one thread and at four, the same output:

    n2 6 ran: ZZ32 ZZ32 ZZ32 ZZ64 ZZ32 ZZ32 ZZ32 ZZ64
    c 9 ran: ZZ64 ZZ64 ZZ64
    e 9 ran: ZZ32 ZZ32 ZZ32
    g2 5 ran: ZZ64 ZZ64 ZZ64
    m 9 ran: ZZ64 ZZ64 ZZ64

`n2` is a nested reduction declared `ZZ64`: the outer runs at `ZZ64`, the inner at its body's `ZZ32`. `c` is a branch of an `if`, `g2` a numeral body under `ZZ64`, `m` an assignment, `e` an argument of `takes64(x: ZZ64)`: the body's type, as the report says. A block's last expression, a method's and a function's return type, an operand and an untyped binding answer as the report's table gives.

The same program with the bound `Number`, and with `Any`, on the base and on the rung: the outputs are equal line for line (`diff` prints nothing), `ran` included, so no reduction that the base accepted runs at another instance. There `e` runs at `ZZ64` on both: a plain-bounded big operator as an argument takes the parameter type through the retry, and a self-bounded one its body's type. Both follow the list of contexts as written; the difference is for the curator (below).

Refusals, the self-bounded scaffold on the rung: `e1: String = BIG LAST[...] (3 j)` "Right-hand side has type ZZ32, but declared type is String."; `e4: ZZ32 = BIG LAST[...] z64` "Right-hand side has type ZZ64, but declared type is ZZ32."; a body `println("x")` and a body `j + "a"` both "is not applicable to an argument of type ()." (finding 4).

References, `SkFn.fss` on the rung after the fix, one thread and four: a declared return type, a generic higher-order function with its other argument fixing the instance, two instances of one function in one expression, a branch of an `if`, a tuple of a reference and a number at a parameter of tuple type: "1 q 7 tw x 5 11 2 1 1 2 PASS". On the base the same file stops, "F is not in the kind env [][][]". Refusals with messages and no crash: a bound not met (`useStr(cnt)`, `cnt[\F extends Number\]`), "is not applicable to an argument of type Box[\F\]->ZZ32."; `Any -> ZZ32` expected; `ZZ32 -> ZZ64` expected of `same`; two overloads of the receiving function, refused for both; `x: ZZ32 = count`, "Right-hand side has type Box[\F\]->ZZ32, but declared type is ZZ32."

Walk is not changed by the rung and refuses the references as row 156 gives, "Unification error: Closure/Constructor for useG param 1 ..."; that half is rung F's.

## Findings

### 1. A defect of the change, fixed: the same name (commit `804445961c`)

A generic function named as a value inside a generic declaration whose static parameter has the same name was not instantiated. On the worker's head, for

    count[\F extends Object\](b: Box[\F\]): ZZ32 = 1
    useG[\G extends Object\](g: Box[\G\] -> ZZ32, b: Box[\G\]): ZZ32 = g(b)
    outer[\F extends Object\](b: Box[\F\]): ZZ32 = useG[\F\](count, b)

`bin/fortress compile` exits 0 and `bin/fortress run` prints

    java.lang.NoSuchMethodError
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 SkCapA.count(SkCapA$\=Box?...FZZ32?)'

and the same with `useG(count, b)`. With `outer[\H extends Object\]` the rung instantiates the reference and the run prints 1 (the base: "F is not in the kind env [H -> KindBinding(H,H extends Object)][][]"). The base's code accepts the same-name program too and dies the same way, so the rung does not make it worse; but it is row 758's own form, and the model's (`rows(rmsn, x)` inside a declaration generic in the same `nat n`), so the repair owes it.

Cause, two parts. `carriesOwnStaticParams` asked only whether the kind environment holds the name, so `count`'s `F` passed for the enclosing `F` and the first pass accepted the call by the names alone. And the memo of normalized arrow types was keyed by domain, range, effect and `io` without the static parameters (`normalizeArrowTypeMemo`), so the plain arrow type `Box[\F\] -> ZZ32` of the parameter normalized to the generic function's type, written alike, which then made the instantiation's own constraint false.

Ways listed: (a) an arrow type that carries any static parameter of its own is never compared, whatever the environment; (b) one of its own counts as unbound where the environment holds the name for another declaration's parameter, told by the parameter's span; (c) in `Functionals.scala`, type an accepted call's uninstantiated reference again. Taken: (b), with the memo's key. (a) also changes a function named inside its own body, which no program here needed; (c) cannot work while the retry's test of sameness compares the two types by the names. A lifted static parameter, a trait's on its functional method, is left as it was.

The fix is settled by the rung's section, step 2: "A reference to a generic function, where an arrow type is expected (an argument at a parameter of arrow type, a typed binding), is instantiated by that arrow type", and by `Specification/basic/inference.tex`, section "The Static Arguments of a Call", the paragraph on a reference to a generic function.

Test: `compiler_tests/GenericFunctionAsValueSameNameCompiled` (a written and an inferred static argument of the receiving function, and a `nat` parameter). Failing on the worker's head, 02:53:42 UTC, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sk1 ProjectFortress/compiler_tests GenericFunctionAsValueSameNameCompiled.test`:

    . run ProjectFortress/compiler_tests/GenericFunctionAsValueSameNameCompiled (815ms) java.lang.NoSuchMethodError
    Failed to satisfy run_out_contains; expected
    Tests run: 3,  Failures: 1,  Errors: 0

Passing after the build of the fix, the same script on that test, the rung's four tests, the two guards, `XXXNatUnknownSizeFnValue` and the two new pairs below: "OK (22 tests)".

Before the build, the fix was audited in a scratch copy on the distance stage's driver over its fourteen components (an instrumented run, not the stage): on the worker's head no plain comparison in the library meets an arrow type with static parameters (0 events in 14 components), and with the fix compiled ahead of the build the driver's output equals the worker's stage output line for line but the seconds (1022 lines). The whole suite the fix reaches, `ant testQuick`, once, on the code of `804445961c`: "BUILD SUCCESSFUL", "Total time: 8 minutes 17 seconds", `CompilerJUTest` "Tests run: 1584, Failures: 0, Errors: 0", `LibraryJUTest` 86 and `OtherCompilerJUTest` 263 with none failed.

### 2. A reference at a type that is no arrow type is accepted and dies at run time (row 1012)

`p(count)` for `p(x: Any): ZZ32`: `compile` exits 0 on the base and on the rung, and `run` prints "java.lang.NoClassDefFoundError", "Caused by: java.lang.NoClassDefFoundError: F$RTTIc". The rung's new paragraph makes it a static error. Not repaired here: the reference's arm cannot tell it from an applicand, as the worker's decision 8 says of the untyped binding. Corrections: a sentence in the box of `inference.tex` and in the Effect of Appendix I's "The contexts that give a call an expected type" (`4e2385049f`), and the row. No gated test can pass while it shows.

### 3. Two defects of the base's code that the programs met (rows 1013 and 1014)

Neither is the rung's; both are the same on the base and on the head. A functional method of a generic trait named as a value inside the trait links and dies, `NoSuchMethodError` (`compiler_tests/XXXFunctionalMethodValueGenericTraitCompiled`, with `FunctionalMethodValueGenericTraitCompiledLink`). A numeral that ends a block after a local declaration, in a function declared to return `ZZ32`, links and dies, "NoClassDefFoundError: fortress/CompilerBuiltin$v" (`compiler_tests/XXXNumeralEndsBlockAfterDeclarationCompiled`, with its link test). The second pair was shown through the harness both ways: as it is, "Saw expected failure (Exit code != 0)", "OK (4 tests)" with the first pair; with the numeral replaced by `k + 1` for one run, "FAILURES!!!", "Tests run: 2,  Failures: 1,  Errors: 0".

### 4. A type error in the body is reported as the big operator's refusal (row 1015)

`e = BIG LAST[j <- Upto(3)] (j + "a")` over the self-bounded big operator: "Could not check call to operator BIG LAST - [\T extends CompilerAlgebra.Equality[\T\]\]()->Red[\T\] is not applicable to an argument of type ()." and nothing of `+`; with the bound `Number` the message holds "Could not check call to operator +". The body is read in a try checker. It is the base's message for every such reduction, so nothing is lost; it is the message a writer of the model will now meet for any error inside a `SUM`. Recorded, not repaired.

### 5. Smaller points, no change made

- `CoercionOracle.scala:293` refuses a coercion between arrow types where either carries any static parameter, a lifted one too, which is wider than its comment. No program showed a difference: a functional method of a generic trait at an arrow type with another range is refused on the base and on the rung alike.
- A reduction not accepted as written is checked up to four times (as written, at the expected type, for its body's type, at the body's type), and a nested one again inside each. The count stage does not see it, since the library writes its arguments; a model line with nested unwritten sums would.
- The two refusals are `XXX`-named `.test` files over plain components, the folder's form for a refusal that is right (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`).
- The specification was not built after the two added sentences; the gather builds it once.

## Where I differ from the report

- Section 9, last paragraph: a reference instantiated by the rung was not always "a crash or a refusal before"; in the same-name form it was an accepted call that died at run time. Corrected in place.
- Decision 6 stands as the worker made it; finding 1 narrows what "binds" means in it.

## The homes

| defect | home | where |
|---|---|---|
| a generic function as a value inside a generic declaration that names its static parameter the same | 1 | `compiler_tests/GenericFunctionAsValueSameNameCompiled`, commit `804445961c` |
| a reference whose expected type is no arrow type, accepted and dead at run time | 3, row only: no gated test passes while it shows | row 1012 |
| a functional method of a generic trait as a value dies at run time | 2 | `compiler_tests/XXXFunctionalMethodValueGenericTraitCompiled`, row 1013 |
| a numeral ends a block after a declaration and the run dies | 2 | `compiler_tests/XXXNumeralEndsBlockAfterDeclarationCompiled`, row 1014 |
| a body's type error reported as the big operator's refusal | 3, row only: the specification is silent on the message | row 1015 |
| the worker's eight | as REPORT.md, section 11 | checked: each test or row is on the branch |

## For the curator

- A reduction as a call's argument: a plain-bounded big operator runs at the parameter's type (the retry, on the base too) and a self-bounded one at its body's type, since the call is accepted without the retry. `takes64(BIG LAST[j <- Upto(3)] (3 j))`: `ZZ64 ZZ64 ZZ64` with the bound `Number`, `ZZ32 ZZ32 ZZ32` with `Equality[\T\]`. Should `SUM` as an argument at a wider parameter sum in the parameter's type?
- The worker's four questions stand as it put them.
