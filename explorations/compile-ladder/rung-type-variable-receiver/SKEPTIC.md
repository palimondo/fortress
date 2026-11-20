# Rung T, `rung-type-variable-receiver`: the skeptic's review

Climb batch 34, run 1. The worker's head was `2941e7877d`. Two launches of the skeptic worked the rung: the first (16:52 to 17:06 UTC) committed `b99f1f564b` and `121da77ed4` and ran the programs `diff1.txt` to `diff5.txt` list below, then stopped with the machine's restart; the second took over from its commits and files, ran nothing again whose output was whole, and made the fix `54c56dc6e9`, the corrections `1683793cf8` and `b13441a335`, and this file.

## Verdict

Approved, with one fix of the change (settled) and four corrections. The rung is right: the code generator reads a receiver typed by a type variable at the variable's bound that owns the generic method, the most specific where several do, and casts it there (fork T1), and the receiver object's own method runs, as walk does. One form the record claimed was not built: a method's own `where` clause on its trait's or object's static parameter. The fix builds it.

## What was checked

1. **Stages.** The report says neither ran, as the section says ("The stages. None."). `git diff --name-only 639eef1806...HEAD` lists `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` outside the paths that leave the stages unmoved by rule; the diff changes no Scala and no checker, and the stages run no code generation (F-34). No count stage was owed. The report's measure and suites are of the worker's code, `38d8a44e56`; the skeptic's fix is a later code state (below).
2. **Test first, in the worker's transcript.** The worker wrote no "Expected failure:" line in a message; the failure is the one the section names (link red, 'UNEXPECTED exception java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType', run red, 'Could not load'). Seen so on the base's code, the test uncommitted and no Java edited, at 15:37:43Z (call `ZV5iBY`, `junit.sh t1076base2`, 'Tests run: 2,  Failures: 2,  Errors: 0'), before the first edit of `CodeGen.java` at 15:38:09Z (`SF8857`) and its first build at 15:38:23Z (`A6nybT`). The last edit of code was at 15:39:07Z (`ZxKtAc`); the pass at 16:00:22Z on `38d8a44e56` (`tAcyzY`): '. run …/TypeVariableReceiverGenericMethod (1307ms) PASS', 'OK (3 tests)'. Both match `recordedFailure` and `recordedPass`.
3. **The diff, line by line.** `forMethodInvocation` takes the owner only for a `VarType` receiver of a call with static arguments (`CodeGen.java:7435` at the head); `typeVariableMethodOwner` (`:7723-7742`) reads the variable's bounds from the kind environment, keeps the trait types, and hands them to `intersectionMethodOwner` as one intersection. It does what the report says and no more; no trim found: a copy of the selection would be larger, and a shared helper would edit rung I's member. Decision 3 (only generic calls) holds: a call without static arguments on such a receiver, through either of two bounds, compiles and runs on the base's path (`SkTwoBoundsPlain`: walk `8`, `1`; compiled on the head `8`, `1`).
4. **Precedent and sibling sites.** Rung I's `intersectionMethodOwner` (row 540) is followed. The seven casts of a receiver's type to a trait type are as the report counts them, at the head's lines. One sibling the repair owed was missing: the code generator compiled a method body without static parameters of its own in its trait's or object's kind environment, without the method's `where` clause, so the owner found no bound there (finding 1). `generateGenericMethodBody` (`:2774`) already reads a generic body's own clause (F-384); the fix does the same for the other bodies.
5. **The test.** `compiler_tests/TypeVariableReceiverGenericMethod.fss` holds one comment line, is named by its topic, cites no specification in its messages, and asserts each case's value. `XXXMethodThroughTypeVariableBound` likewise; its home 2 was shown red once (`gzEGxE`, 'Saw wrong failure. compile').
6. **Programs, walk and compiled, old and new.** Listed below. The diff writes no mutable variable, field, atomic block or library state, so no thread columns: `diff.sh` runs at `FORTRESS_THREADS=1`, `junit.sh` at 4.
7. **Homes.** Row 1076: home 1. Row 1093: home 2. The `where` form of finding 1: home 1, the fix's two cases. The walk defects the programs met (findings 2 and 3) are rows 1057 and 870, whose homes stand; `record.md` carries a note for each. `SkUnion` met row 367, and `SkWhereReach`'s `typecase` row 340, both on the base too.
8. **Ledger.** `ledger-find` on `VarType`, `receiver type parameter`, `generic method receiver`: rows 1076, 1072, 540, 744, 777, 780, 922, 1057, 818, 1038. None but 1076 is moved by the change; 1072 is row 1093's sibling, as the row says.
9. **The report.** Its provenance lines, each cited line opened with `sed -n`: they say what they claim. No sentence of the specification is made false: `grep -rn '~1076' Specification --include=*.tex` prints nothing (exit 1), and no Appendix I sentence states the code generator's handling of a type-variable receiver or of a method's `where` clause in its body. The whole-suite run: `ant testFast` on `38d8a44e56`, 'BUILD SUCCESSFUL'; the fix edits the code generator only, for which `tests-running.md` asks the change's own tests and leaves the tracks to the gate.
10. **Names.** `typeVariableMethodOwner` and `whereClauseBodyCodeGen` occur only in `CodeGen.java`; `TypeVariableReceiverGenericMethod` and `XXXMethodThroughTypeVariableBound` only in their own files, in `ProjectFortress/` and `Library/`.
11. **The failure mode.** A crash becomes the receiver object's own answer, the specification's ("The value and the type of a dotted method invocation are the value and the type of the method body", `Specification/basic/expressions/method-invocation.tex`, "Dotted Method Invocations"). What stays unbuilt stays loud: no trait bound gives 'Can't find a trait among the bounds of F that has m' and no owner 'Can't find the owner of …', each a `CompilerError`.

## Findings

1. **A generic method called in a method whose `where` clause bounds its trait's or object's static parameter, on a value of that parameter, still stopped the code generator.** `object Holder[\F\](x: F)` with `held(): ZZ32 where { F extends Gen } = x.m[\ZZ32\](3)`, and the same in a trait's default method: walk prints `8`; on the worker's head the compile stops: 'Can't find a trait among the bounds of F that has m'. On the base it crashed at the cast. The header's `where` clause, of an object or a trait, worked (`SkWObjHeader`, `SkWTraitHeader`: `8`), and so did a generic method's own clause on its object's parameter (`SkWGenMethod`: compiled `8`). The checker accepts the form, and revival-changes.md lists a method's condition on its trait's static parameters among the built `where` forms (P-151). Fixed (below).

       tmp/rung-type-variable-receiver/skeptic/diff.sh SkWhereTraitParam SkTraitClosure        (on the worker's head)
       ######## SkWhereTraitParam
       == new walk
       8
       == new compile
           Can't find a trait among the bounds of F that has m node = MethodInvocation at …/SkWhereTraitParam.fss:10.42

2. **Walk, rows 1057's shape in a trait.** `m[\T\](y: T)` beside `m[\T\](y: T, z: T)` in `trait Gen`, `object S` redeclaring the second: walk stops at `g.m[\ZZ32\](1)`, 'bug! The number of parameters (2) does not match with the number of arguments (1).'; where the object redeclares neither, 'Cannot find definition for method m given receiver G' (`SkArity1`, `SkArity4`), the row's own message. The compiled path runs every shape, old and new (`7`, `10`). Same on the base: not the rung's. A note for row 1057 is in `record.md`.

       tmp/rung-type-variable-receiver/skeptic/diff.sh SkOverConcrete        (diff2.txt)
       == old walk
       ** bug! The number of parameters (2) does not match with the number of arguments (1).
       == old run
       7
       10

3. **Walk, row 870's shape in an object.** `held[\U\](u: U): ZZ32 where { F extends Gen }` in `object Holder[\F\](x: F)`: walk stops, 'ClassCastException: … FTypeObject cannot be cast to … SymbolicInstantiatedType', on the base and the head; compiled on the head it prints `8`. A note for row 870 is in `record.md`.
4. **The gather's order.** The fix makes rung T's lowest edited line of `CodeGen.java` `:3128`, below P's (`:4250` on its branch) and L's (`:4809`). The hunks do not touch: T's are at `:3125-3249` and `:7346-7660` of the base, P's at `:4250` and `:7287-7299`, L's at `:4809-4821`.
5. **The reserved point**, "a change of which declaration a dotted call reaches", is not reached. Every call that takes the worker's new path died on the base. In the bodies whose kind environment the fix extends, the calls that compiled on the base reach the same declarations: `SkWhereReach2` prints `r 20 2 20 2` compiled on the base and on the head, and walk the same; the 20 other compiled tests whose programs have a `where` clause pass on the fix.

## The fix

`54c56dc6e9`, "Skeptic's fix: a generic method called on a value of a trait's or object's static parameter, in a method whose where clause bounds it, compiles (row 1076)". Ways listed: (1) the nested codegen of a body without static parameters of its own reads the method's `where` clause, as a generic body's does (`generateGenericMethodBody`, `CodeGen.java:2774`), in `generateTraitDefaultMethod` and `generateFunctionalBody`: taken, as `whereClauseBodyCodeGen` (`:3238-3245`, called at `:3128` and `:3207`), which builds a new analyzer only where a clause is present, so other bodies keep theirs and its memos; (2) the same in `forFnDecl`, around both calls: the field `typeAnalyzer` is final, so it would need a second path; (3) `typeVariableMethodOwner` falling back to the trait that declares the checker's method: not taken, since a generic declaring trait's static arguments are its own parameters there, not the receiver's, and the cast would name them unbound; (4) only a row and an expected failure: not taken, since the form is a case of row 1076, which the rung closes.

Settled by fork T1 (`explorations/coordinator/CLIMB-BATCH-34.md:399`): "A receiver typed by a type variable is read at the variable's bound that declares or inherits the method, the most specific where several do, and cast to it". In `held()`, `Gen` is that bound, as the checker and walk read it. The fix edits two members of `CodeGen.java` that the section does not name; that is a point to report.

Its test, two cases added to the rung's own test (`WhereHolder`, an object's method; `WhereShelf`/`ShelfOfS`, a trait's default method). Expected failure, stated before the run: link red with "UNEXPECTED exception" and a `CompilerError` holding "Can't find a trait among the bounds of F that has m", run red with "Could not load". On the worker's head, before the edit (2026-11-20T17:23:23Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skwherehead ProjectFortress/compiler_tests TypeVariableReceiverGenericMethod.test
    . link ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod
     UNEXPECTED exception
    com.sun.fortress.exceptions.CompilerError:
        Can't find a trait among the bounds of F that has m node = MethodInvocation at ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod.fss:28.42
    Tests run: 2,  Failures: 2,  Errors: 0

After the fix, built (`ant compileAll`, 'BUILD SUCCESSFUL', 'Caches … started again, empty'), the library order (five jars), with the rung's XXX test and the 20 other compiled tests whose programs have a `where` clause (2026-11-20T17:25:47Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skwherefix ProjectFortress/compiler_tests TypeVariableReceiverGenericMethod.test XXXMethodThroughTypeVariableBound.test CondExtendChecker.test … XXXWhereConstraintTypeUseChecker.test
    . link ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod  OK (time = 4886ms)
    . run ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod (760ms) PASS
    . run ProjectFortress/compiler_tests/WhereBoundMethodCompiled (541ms) PASS
    . run ProjectFortress/compiler_tests/WhereBoundTraitMethodCompiled (590ms) PASS
    OK (33 tests)

Walk on the fix's test prints `PASS`, on the base's code and on the head; compiled on the head `PASS` (`diff9.txt`). The shadow patch on the fix's `CodeGen.java`: 'patch exit=0', 'javac exit=0'. The planner's measure on a scratch copy of `1683793cf8`: 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', 229 s, as on the worker's code. No whole suite: the fix edits the code generator only (`tests-running.md`, "When to run a whole suite").

## Corrections

- `b99f1f564b` (first launch): two cases the record claimed and no test asserted, a static argument inferred (`x.m(3)`) and a receiver typed by an object's static parameter; red on the base's code through the old code tool's `junit` (link 'ClassCastException' at `CodeGen.java:7404` of the base, run 'Could not load'), green on the head ('OK (3 tests)').
- `121da77ed4` (first launch): REPORT.md names those cases, and the second caller of `emitFindGenericMethodClosure`'s unguarded cast, `functionalMethodWrapper`.
- `1683793cf8`: REPORT.md and record.md name the fix, its members and its runs; their citations of `CodeGen.java` below the fix's new member move by its nine lines, to the head's; the claim of a `where` clause's bound names the method's clause; two ledger notes for the gather.
- `b13441a335`: the measure on the head.

## Where the skeptic differs from the worker's decisions

Decision 2 says the bounds come from the kind environment "so a `where` clause's bound counts"; on the worker's head it did only for the function's or the type's own clause, not for a method's clause on its type's parameter, which the code generator's kind environment did not hold (finding 1). The other six decisions stand.

## Programs: walk, compiled, old and new

Each under `tmp/rung-type-variable-receiver/skeptic/`, run by `diff.sh` (the rung's `bin/fortress` walk, compile, run; then `old-fortress.sh` on `/home/user/fortress-base40` with `tmp/old-caches`: walk, compile, run). "Old compiled" is the base's crash, 'ClassCastException: … VarType cannot be cast to … TraitType', unless said. The new column is the worker's head for `diff1` to `diff8`, the fix for `diff9` and `diff10`.

| program | form | walk (old = new) | compiled, new |
|---|---|---|---|
| SkInfer | static argument inferred, `x.m(3)` | 8 | 8 |
| SkObjParam | object's static parameter | 8, 7 | 8, 7 |
| SkMethodParam | an object method's own static parameter | 8 | 8 |
| SkSelfTyped | `T extends Cmp[\T\]` | 9 | 9 |
| SkTraitParam | a trait's static parameter, `getx().m` | 8 | 8 |
| SkReturnsVar | the method returns its static parameter | 6, ab | 6, ab |
| SkTwoUnrelated | two unrelated bounds, both declare `m` | 3 | 3 |
| SkOverloaded | `m` overloaded by arity, through a bound | walk stops (row 1057) | 7, 10 |
| SkOverConcrete | the same at a trait-typed receiver | walk stops (row 1057) | 7, 10 (old compiled 7, 10) |
| SkReach | calls that compiled on the base | 8 7 8 7 3 1 3 | 8 7 8 7 3 1 3 (old the same) |
| SkClosure | a function expression, an untyped one, a local function | 6, 7, 8 | 6, 7, 8 |
| SkUnion | a union receiver | 7, 8 | refused, row 367 (old the same) |
| SkTypecaseVar | a `typecase` binder over a type variable | 108, 7 | 108, 7 |
| SkTwoBoundsPlain | non-generic calls through either of two bounds, and a generic one | 8, 1, 18 | 8, 1, 18 |
| SkTupleArg | a pair parameter; two parameters | 8, 9 | 8, 9 |
| SkWhereTwo | two `where` bounds; an `extends` and a `where` bound | 8, 8 | 8, 8 |
| SkConcreteArgBound | `F extends Src[\ZZ32\]`; with another bound | 15, 26 | 15, 26 |
| SkSymbolicArg | the variable as the static argument; as the result | 8, 2, true | 8, 2, true |
| SkArity1 to SkArity4 | arity overloads without type variables | stops (row 1057) but SkArity3: 7, 10 | 7 9, 7 9, 7 10, 9 7 (old the same) |
| SkCross | the bound from an imported api | 8, 7, 8 | 8, 7, 8 |
| SkTraitClosure | a trait's parameter in a function expression and a local function | 8, 8 | 8, 8 |
| SkWObjHeader, SkWTraitHeader | a type header's `where` clause | 8; 8 | 8; 8 |
| SkWGenMethod | a generic method's clause on its object's parameter | stops (row 870) | 8 |
| SkWhereTraitParam | a method's clause on its object's parameter | 8 | worker's head: 'Can't find a trait among the bounds of F that has m'; fix: 8 |
| SkWTraitMethod | a trait method's clause on its trait's parameter, dotted and functional | 8, 8 | worker's head: the same refusal; fix: 8, 8 |
| SkWhereReach2 | calls that compiled on the base, in `where` bodies | r 20 2 20 2 | r 20 2 20 2 (old the same) |
| TypeVariableReceiverGenericMethod | the rung's test, with the fix's cases | PASS | PASS |

## Points to report

- The owner as found: the bound below the others where several have the method, the one that has it where one of two does, cast with `checkcast` (`CodeGen.java:7723-7742`, `:7433-7438`); a method's `where` clause counts with the fix.
- Row 1076's test, failing on the base and passing after; walk's answers; the measure, 0 refused and 754 emitted, on the worker's code and on the head.
- The shadow patch applies to the worker's `CodeGen.java` and to the fix's.
- A file edited beyond those named: the fix edits `CodeGen.java`'s `generateTraitDefaultMethod` (`:3128`) and `generateFunctionalBody` (`:3207`) and adds `whereClauseBodyCodeGen` (`:3238-3245`), members the section does not give rung T and that neither L nor P names.

## Contested fixes

None.
