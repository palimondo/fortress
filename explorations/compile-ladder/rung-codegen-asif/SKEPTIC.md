# Rung G, rung-codegen-asif: the skeptic's verdict

Head judged: `e5ed1fc01` (the worker's). Head after: the commit of this file. Verdict: approved, with one fix of the change and one correction of the record, none contested.

## What was checked

- The report and record were already on the branch (`e5ed1fc01`), so no file was written from the run's journal.
- Stages: the report says neither ran. `git diff --name-only ed8652dc0...e5ed1fc01` lists `CodeGen.java` beside the tests and this folder. `CodeGen.java` is outside the generic list of stage-blind paths, but the rung's section ("The stages. Neither: you change only the code generator") and fork 3 (`explorations/coordinator/CLIMB-BATCH-27.md:500`) settle it as `STAGE_BLIND`; the report names it (section 6). No checker, `OverloadSet` or Scala edit. The report's tables are those of the worker's head: there are none.
- Test first, in the worker's transcript: the base run `junit.sh base` (call `zDeWYi`, 07:45:20) printed 'Can't compile AsIfExpr at ProjectFortress/compiler_tests/AsIfCallsCompiled.fss:24.17' and 'Tests run: 3,  Failures: 3,  Errors: 0', before the first build (`7246mo`, `nohup ... ant compileAll` at 07:49:41). The tests' final text ran on the old code through `old-fortress.sh ... junit` (`CbMYK6`, 07:58:59): 'Tests run: 3,  Failures: 3'. The walk files ran on the old code at 07:59:47 (`82s1fn`): 'OK (4 tests)'. The pass (`6NLdhs`, 08:02:21) followed the last build (`Ec5XCA`, 08:00:10): 'OK (3 tests)'. No code edit after it. The record holds.
- The diff against forks G1 and G2 (`CLIMB-BATCH-27.md:584-585`) and `type-annotation.tex`, "Type Assumption": the receiver form, the all-assumed call and the value form do what the report says, except at calls that carry static arguments (finding 1).
- Precedent: `generateForwardingFor`'s static call (`CodeGen.java:867` at `ed8652dc0`, INVOKESTATIC through the springboard) and `nonCollidingSingleName` (`:3784-3790` at the base) are as cited. `TypeAscriptionDesugarer` handles `AsExpr` only (`compiler/desugarer/TypeAscriptionDesugarer.java:20-23`), so the map row's cell is wrong for `asif`, as the report says.
- The provenance lines and the cited lines of sections 3 and 8 were opened with `sed -n`; each says what the report claims.
- Competing names: `grep -rln 'XXXAsIfGeneric\|refuseGenericAssumption\|ASSUMPTION_GENERIC_METHOD\|AsIfCalls'` over `ProjectFortress/src`, the test folders: only the rung's own files.
- No mutable variable, field, `atomic` block or library state in the diff, so no runs at one and four threads.

## Programs, old against new

Under `tmp/rung-codegen-asif/skeptic/p/`, compiled and run on the rung's build (`e5ed1fc01`) and on the old code (`old-fortress.sh /home/user/fortress-base27 ... compile`/`run`), and under walk on the old code (walk is unchanged by the rung):

| program | walk (old) | compiled, old | compiled, worker's head | compiled, after the fix |
|---|---|---|---|---|
| `GenMeth`: `(Leaf asif Named).gm[\String\]("a")`, generic method overridden in `Leaf` | 'Unexpected Selection result in Juxt of FnRef of Selection' | 'Can't compile AsIfExpr' | `Leaf gm` | 'Can't compile a type assumption at the receiver of a generic method yet' |
| `GenFn`: `gw[\String\](Leaf asif Named, "a" asif String)` over overloads at `Named` and `Leaf` | `Named gw` | 'Can't compile AsIfExpr' | `Leaf gw` | 'Can't compile a type assumption at a call of an overloaded generic function yet' |
| `GenTraitFn`: `fcap(Digits asif Shown[\ZZ32\])`, functional method of a generic trait | `Shown fcap` | 'Can't compile AsIfExpr' | `Digits fcap` | `Shown fcap` |
| `FnMethArg`: `tagn(Leaf asif Named, 3)`, functional method overridden in `Leaf` | `Named tagn` | 'Can't compile AsIfExpr' | 'Can't compile a dispatched call whose arguments are not all type assumptions' | the same |
| `MethArgOnly`: `Leaf.one(Leaf asif Named)`, `(Leaf asif Named).one(Leaf)` | `one Leaf`, `one Leaf` | 'Can't compile AsIfExpr' | `one Leaf`, `one Leaf` | the same |

## Findings

1. **A defect of the change: at a call with static arguments the assumption was dropped, and the override ran.** `forFunctionalRef` skipped `assumedArgumentsCall` whenever `decoration.length() > 0` (`CodeGen.java:4038` at `e5ed1fc01`), which a functional method of a generic trait always has (its trait's static arguments); `for_RewriteFnApp` sends a call with written static arguments through a closure (`useClosure`), which dispatches; and `forMethodInvocation`'s generic-method branch took the receiver's value and called the virtual method closure. So `GenMeth`, `GenFn` and `GenTraitFn` above compiled to the override's answer, where the old code refused loudly. Forks G1 and G2 name that answer as the way not taken ("a cast and the virtual call, which runs the override", "the assumption ignored at run time, which gives the override", `CLIMB-BATCH-27.md:584-585`). Fixed in `dad6b664d`; below.
2. **`FnMethArg` stays refused, a reading I leave as the worker's.** The compiled path dispatches a functional method that an object overrides through a top-level overload set over every argument, so the worker's reading that every argument of such a call is dispatched holds on this path; the refusal is loud and its message names it. Not a fix.
3. **A walk defect the rung's tests did not reach: row 922** (finding 1's `GenMeth` under walk). Home 2: `ProjectFortress/tests/XXXAsIfGenericMethodWalk.fss`; row in `record.md`.
4. **The library holds `asif` sites beyond the section's 15.** `grep -n ' asif ' Library/*.fss` also prints `Library/ChunkedSparseArray.fss:124` (`csa(reflect(n),t asif T)`) and `Library/FortressAstUtil.fss:31`, `:36`, components outside the distance stage's fourteen. Neither is measured; `csa` with a generic callee is of the kind finding 1's fix refuses if it is overloaded.
5. **Failure mode.** The worker's change turned a loud refusal ('Can't compile AsIfExpr') into a quiet wrong value at the three generic forms of finding 1; the fix turns two back into loud refusals and gives the third the specification's value. Elsewhere the rung's refusals stay loud.

## The fix, `dad6b664d` (settled)

- Ways: implement the generic forms (a generic method's static body under `DefaultTraitMethods`, and the closure of one overload of a generic set), which is a new emission of generic closures, larger than a repair; refuse them, as fork G2 leaves its hard case "refused and recorded" (`CLIMB-BATCH-27.md:585`); taken: the functional method of a generic trait, whose static body the assumed instance's `DefaultTraitMethods` class already holds (the worker's own `(Digits asif Shown[\ZZ32\]).caption` reaches the same class), now goes through `assumedArgumentsCall`; the other two are refused, each with its own message, through a new `refuseGenericAssumption` and a check at the head of `forMethodInvocation`'s generic branch.
- Settled by fork G1 and G2 (`explorations/coordinator/CLIMB-BATCH-27.md:584-585`): the override is the way not taken, and the hard case stays refused with a message of its own.
- Tests: `AsIfCallsCompiled` gains `fcap(Digits)` and `fcap(Digits asif Shown[\ZZ32\])`, its walk guard `AsIfCallsWalk` the same two; new `XXXAsIfGenericMethodCompiled`, `XXXAsIfGenericFunctionCompiled` (compile, `compile_exception_contains=` each message), and walk's `XXXAsIfGenericMethodWalk`.
- Failing on the worker's head, before the edit (09:07:29Z): `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh head ProjectFortress/compiler_tests AsIfCallsCompiled.test XXXAsIfPartialCallCompiled.test XXXAsIfGenericMethodCompiled.test XXXAsIfGenericFunctionCompiled.test`:

      2) ProjectFortress/compiler_tests/XXXAsIfGenericMethodCompiled(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
      3) ProjectFortress/compiler_tests/XXXAsIfGenericFunctionCompiled(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
      Tests run: 5,  Failures: 4,  Errors: 0

  (that run's `AsIfCallsCompiled` stopped at a `tagn` assertion since dropped, finding 2); with the final text, the worker's code generator compiled into a scratch class folder ahead of the build, `cd ProjectFortress && java ... -cp "<head classes>:$CP" com.sun.fortress.Shell junit compiler_tests/AsIfCallsCompiled.test` (09:15:42Z):

      . run compiler_tests/AsIfCallsCompiled (400ms) FAIL:  Digits fcap =/= Shown fcap; the functional method that a generic supertrait gives
      Tests run: 2,  Failures: 1,  Errors: 0

  On the old code, the walk files: `FORTRESS_HOME=/home/user/fortress-base27 .../harness-one.sh <tree>/tmp/rung-codegen-asif/skeptic/old-harness <tree>/ProjectFortress/tests/AsIfCallsWalk.fss <tree>/ProjectFortress/tests/XXXAsIfGenericMethodWalk.fss` (09:07:48Z): 'OK Saw expected exception', 'OK (2 tests)'.
- Built once (`ant compileAll`, 'BUILD SUCCESSFUL', 'Caches ... started again, empty', then the library order, `EXIT=0`). Passing (09:17:32Z): `ONE_JVM=1 .../junit.sh after ProjectFortress/compiler_tests AsIfCallsCompiled.test XXXAsIfPartialCallCompiled.test XXXAsIfGenericMethodCompiled.test XXXAsIfGenericFunctionCompiled.test`: '. run ProjectFortress/compiler_tests/AsIfCallsCompiled (333ms) PASS', 'OK (5 tests)'; `harness-one.sh` on `AsIfCallsWalk.fss` and the four walk `XXX` files: 'OK (5 tests)'.
- The first new `XXX` test red on a deliberate change, restored after (09:17:54Z): `XXXAsIfGenericMethodCompiled` with its assumed call removed, 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'.
- Suites: none. The edit is the code generator's only (the skill's `tests-running.md`, "When to run a whole suite"; fork 2); the tracks are the gate's.

## The correction, `60c468612`

`record.md`: row 818's new line and the FACTS entry name the two new refusals; row 922 added (lint: the number rule only, as the worker's rows).

## Where I differ from the report

- Section 1 and the summary say the code generator compiles the assumption "anywhere else" as the value and at every all-assumed dispatched call; at the three generic forms it ran the override (finding 1), now fixed or refused.
- Section 8 should add: the new refusals for the gather's sentence on what the code generator refuses, if it adds the partial call to the skill's `compiler.md`.

## Points to report

- The methods changed by the fix: `forFunctionalRef` (`assumedArgumentsCall` called with the static-argument flag), `assumedArgumentsCall`, new `refuseGenericAssumption`, `forMethodInvocation`'s generic branch, `for_RewriteFnApp`'s closure branch, and the constant `ASSUMPTION_GENERIC_METHOD`, all in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`; no edit of `forObjectDeclPrePass`, `dumpMethodChaining`, the checker or `OverloadSet`.
- The forms now refused, with their messages: 'Can't compile a type assumption at the receiver of a generic method yet', 'Can't compile a type assumption at a call of an overloaded generic function yet'.
