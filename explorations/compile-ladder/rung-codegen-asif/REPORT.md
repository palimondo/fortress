# Rung G, rung-codegen-asif: the code generator's type assumption (row 818)

- problem: the code generator has no case for `AsIfExpr` and stops in `defaultCase`, 'Can't compile AsIfExpr' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1675-1677` at `ed8652dc0`); it refused 7 declarations of the one library at 13 sites (row 818; `explorations/perf-probes/codegen-distance/REPORT.md:147`)
- spec: `Specification/basic/expressions/type-annotation.tex:32-53`, "Type Assumption"
- precedent: the static call of a trait's body through its `DefaultTraitMethods` class, `self` first, in `generateForwardingFor` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:781-874` at `ed8652dc0`); an overload's own body under its `?`-tagged name, `nonCollidingSingleName` (`CodeGen.java:3784-3790` at `ed8652dc0`)
- deviation: a dispatched call with an assumption at only some dispatched arguments is refused, where the specification gives it a meaning (fork G2); an assumption at a call of another component's overloaded function, and at a functional method whose `self` is not first, are refused with messages of their own (`CodeGen.java:6568`, `:6579`); none from the precedent's spelling
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:62-6990`

## 1. What changed and why

The specification: "The value of the expression is the value of the subexpression. ... A type assumption considers both the static and the dynamic type of the value of the expression to be the specified type for the purposes of the immediately enclosing function, method, or operator invocation or field access", "a richer version of type assumption operations such as `super` in the Java Programming Language" (`type-annotation.tex`, "Type Assumption"). The code generator now compiles the assumption in the three places the batch's forks G1 and G2 give, all in `CodeGen.java` at `3c3839fb6`:

- `forAsIfExpr` (`:6419`), new: an assumption that no call takes is the subexpression's value, cast to `T`'s Java type by `conditionallyCastParameter`.
- `forMethodInvocation` (`:6594`), at a receiver `(e asif T).m(args)`, getters among them: `assumedReceiverCall` (`:6536`) emits the static call of the body that `T` gives `m`, declared in `T` or inherited by it. `methodsNamed` (`:6456`) reads `STypesUtil.allMethodsNotIdenticallyCovered(T)`, `emitBodyGivenBy` (`:6500`) keeps the bodies whose parameters (after `self`) have the call's JVM signature, takes the one whose trait lies below the others', and emits `INVOKESTATIC <trait>$DefaultTraitMethods.<name>` with `staticBodySig` (`:6475`), the signature that `generateForwardingFor` gives the same static method. Where `T` gives `m` no body, the virtual call as before. In the plain branch, a dotted call of an overloaded method with an assumed argument is refused, since its receiver dispatches (`:6713`).
- `forFunctionalRef` (`:3927`, the call at `:4036-4040`), fed by `forOpExpr` (`:5168`, `:5178-5183`) and `for_RewriteFnApp` (`:6983`, `:7014-7019`) through the field `callArgsForAssumption` (`:6417`): `assumedArgumentsCall` (`:6557`). For a top-level function or operator whose call goes to a dispatch method (its name and signature in `topLevelOverloadedNamesAndSigs`), a call whose every argument is an assumption calls the resolved declaration's own body, `NamingCzar.mangleAwayFromOverload(name)`; a partial one is refused. For a functional method (an `ArrowType` with a `MethodInfo`), a call whose every argument is an assumption calls the static body that the assumed trait gives at `self`'s position; a partial one is refused. A call of one declaration, which no dispatch reaches, takes the values unchanged.

The messages: 'Can't compile a dispatched call whose arguments are not all type assumptions' (`:6413`, raised at `:6542`, `:6565`, `:6587`, `:6713`); 'Can't compile a type assumption at a functional method whose self is not its first parameter yet' (`:6568`); 'Can't compile a type assumption at a call of an overloaded function of another component yet' (`:6579`); 'Can't find the body that T gives m at (...)' (`:6513`), a guard that no test reaches.

## 2. The tests, failing and passing

The tests:
- `ProjectFortress/compiler_tests/AsIfCallsCompiled.fss` and `.test` (`link`, `run`, `run_out_contains=PASS`): traits `Named` (getter `name`, `greet`, functional `tag`, `opr PLUS`, overloaded `pick`), `Titled extends Named`, generic `Shown[\T\]` and `Listed[\T\] extends Shown[\T\]` whose getter reads `(self asif Shown[\T\]).caption`, objects `Leaf extends Titled` (overriding `name`, `greet`, `tag`, `PLUS`) and `Digits`; overloads `who` and `opr ODOT` at `Named` and `Leaf`; 22 assertions: own bodies beside assumed ones, an inherited body through the assumption, the overload at `Named`, an assumption bound to a name, passed to a function of one declaration, on a tuple and as an `if` branch's value.
- `ProjectFortress/compiler_tests/XXXAsIfPartialCallCompiled.fss` and `.test` (`compile`, `compile_exception_contains=` the message): `pair(Leaf asif Named, Leaf)` over overloads at `(Named, Named)` and `(Leaf, Leaf)`.
- `ProjectFortress/tests/AsIfCallsWalk.fss`: the first program under walk, without the four lines walk departs on, a guard on both.
- `ProjectFortress/tests/XXXAsIfBoundWalk.fss`, `XXXAsIfTupleWalk.fss`, `XXXAsIfOverloadedMethodWalk.fss`: walk's three departures (section 7).

The failing run, on the base's code, before the edit was first built (the build started 07:47):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests AsIfCallsCompiled.test XXXAsIfPartialCallCompiled.test   # 2026-11-07T07:45:21Z, tree ed8652dc0
    . link ProjectFortress/compiler_tests/AsIfCallsCompiled
     UNEXPECTED exception
        Can't compile AsIfExpr at ProjectFortress/compiler_tests/AsIfCallsCompiled.fss:24.17
    Tests run: 3,  Failures: 3,  Errors: 0

The tests grew after that run (the functional method, the operators, the generic traits, the tuple, the `if`, `pick`); their final text was run on the old code through the harness, after the edit was built only in this tree:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base27 <tree>/tmp/rung-codegen-asif/old-caches junit <tree>/ProjectFortress/compiler_tests/AsIfCallsCompiled.test <tree>/ProjectFortress/compiler_tests/XXXAsIfPartialCallCompiled.test   # 2026-11-07T07:59
        Can't compile AsIfExpr at .../AsIfCallsCompiled.fss:30.51
        Can't compile AsIfExpr at .../XXXAsIfPartialCallCompiled.fss:18.21
    Tests run: 3,  Failures: 3,  Errors: 0

    FORTRESS_HOME=/home/user/fortress-base27 /home/user/fortress-base27/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-codegen-asif/old-harness <tree>/ProjectFortress/tests/AsIfCallsWalk.fss ...XXXAsIfBoundWalk.fss ...XXXAsIfTupleWalk.fss ...XXXAsIfOverloadedMethodWalk.fss   # 2026-11-07T07:59:47Z
    . interpret .../XXXAsIfBoundWalk
    FAIL: J5/0:Named =/= J4/0:Leaf; a bound assumption is the value, whose getter dispatches
     OK Saw expected exception
    OK (4 tests)

The passing runs, after the last change of code (the build of 07:59-08:00, then the library order):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests AsIfCallsCompiled.test XXXAsIfPartialCallCompiled.test   # 2026-11-07T08:02:22Z
    . run ProjectFortress/compiler_tests/AsIfCallsCompiled (493ms) PASS
    OK (3 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-codegen-asif/h1 ProjectFortress/tests/AsIfCallsWalk.fss ProjectFortress/tests/XXXAsIfBoundWalk.fss ProjectFortress/tests/XXXAsIfTupleWalk.fss ProjectFortress/tests/XXXAsIfOverloadedMethodWalk.fss   # 08:02:27Z
    OK (4 tests)

The `XXX` tests shown red on a deliberate fix, through the harness, then restored (08:02:53Z): `XXXAsIfPartialCallCompiled` with its partial call removed, '1) .../XXXAsIfPartialCallCompiled(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'; `XXXAsIfBoundWalk` with its three expected strings set to `Named`, walk's answers, 'Expected failure or exception, saw none. InterpreterTest ...XXXAsIfBoundWalk', 'Tests run: 1,  Failures: 1'.

Suites: none. The edit is the code generator's only, so the tracks are the gate's (the skill's `tests-running.md`, "When to run a whole suite"; fork 2). No transaction, mutable state or class loader is touched, so no atomic runs.

## 3. Where the fix belongs, and the precedent search

The feature's map row (`explorations/coordinator/map/spec-to-implementation.md:259`) gives the code generator's cell as "desugared away by `desugarer/TypeAscriptionDesugarer.java:21`"; that desugarer handles `AsExpr` only (`compiler/desugarer/TypeAscriptionDesugarer.java:16-21`), and `grep -rln AsIfExpr compiler/ scala_src/` names only `CodeGen.java`, the generated `FortressAst.scala` and the checker's `Misc.scala`. So the assumption reaches the code generator, and the fix is there. No earlier change repaired this wall; the ledger holds no other `asif` row (`ledger.py find asif`: rows 248 and 818). The emission follows the code generator's own forms: the static body through `DefaultTraitMethods` is the call that `generateForwardingFor` emits for a forwarder (one site, `CodeGen.java:867` at the base), and the resolved overload's body is the name that `nonCollidingSingleName` gives it where its name and signature are a dispatch method's (`:3784-3790`; javap of a probe's jar: `who(Named)` the dispatch method and `who?(Named)` the body, `who(Leaf)` the other body). The ways the language offers, and the one taken, are fork G1's and G2's (section 9).

## 4. What the specification settles

All of the compiled answers: the value of the subexpression (a bound assumption, a tuple, an `if` branch), the assumed type for the immediately enclosing invocation (a receiver's body, the overload at the assumed types). It also gives the partial call a meaning, which the code generator does not yet build. The specification says nothing of the code generator, so no sentence of it changes.

## 5. Programs run old against new; the ladder

- The team's `compiler_tests/Compiled80.fss` (a `typecheck` test of `AfterTypeChecking.test`), `run():() = f(anA() asif A)` over `f` at `O`, `A` and `P`: the old code, 'Can't compile AsIfExpr at .../Compiled80.fss:26.19'; the change, compiled and run with a private copy of the tree's caches, prints `A`.
- The change's own ladder subset, after the edit only: the two files whose first error in the baseline's `raw/` or `ladder.tsv` names the assumption, `tests/rshiftbug.fss` (`codegen`, 'Can't compile AsIfExpr', `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`) and `tests/asifTest.fss` (`disambiguate`). The drivers copied under `tmp/rung-codegen-asif/ladder/` (`run-subset.sh`, `classify.py`) printed `tests	rshiftbug.fss		pass	2` and `tests	asifTest.fss		disambiguate	1	ImmutableArray`. So `rshiftbug.fss`, whose `(StandardEmbedding asif TreeEmbedding).parent(4)` expects 2, moves UP from `codegen` to `pass`; `asifTest.fss` stays at `disambiguate`, at a name of the prelude. Neither is in the gate's 85-program pass list, so the newest landed `ladder.tsv` holds neither.
- Probes under the compiler's prelude, scratch: `(Ob asif Shown[\ZZ32\]).caption` over a generic trait printed `Shown`; `Leaf.pick(Leaf asif Named)` and `(Leaf asif Named).pick(Leaf)` over an overloaded `pick` both stop with the partial call's message; `(Leaf asif Named).pick(Leaf asif Named)` prints `Named pick Named`.

## 6. The stages

Neither ran. The paths the change adds or edits (`git diff --name-only ed8652dc0`): `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/compiler_tests/AsIfCallsCompiled.fss`, `.test`, `ProjectFortress/compiler_tests/XXXAsIfPartialCallCompiled.fss`, `.test`, `ProjectFortress/tests/AsIfCallsWalk.fss`, `XXXAsIfBoundWalk.fss`, `XXXAsIfOverloadedMethodWalk.fss`, `XXXAsIfTupleWalk.fss`, and this folder. `CodeGen.java` is outside the brief's list of paths that neither stage can see, but the rung's section and fork 3 give it as `STAGE_BLIND`: the count stage and the distance stage run the checker and no code generation. No change reaches the checker, `OverloadSet` or the trait table.

## 7. Defects, each with its home

- The code generator compiled no assumption (row 818): home 1 for the compiled forms, `AsIfCallsCompiled`; home 2 for the partial call, whose meaning the specification gives, `XXXAsIfPartialCallCompiled`, with row 818 rewritten to it (record.md).
- Walk keeps an assumption on a bound value and on an `if` branch's value, so later calls dispatch at the assumed type (row 919): home 2, `tests/XXXAsIfBoundWalk.fss`. A probe: `n = Leaf asif Named`; `println(n.name)`, `println(who(n))` printed `Named`, `Named`. A parameter drops the wrapper: `caption(Leaf asif Named)` printed `caption Leaf`.
- Walk cannot take apart a tuple under an assumption, "RHS does not yield a tuple" (`interpreter/evaluator/BuildLetEnvironments.java:106`) (row 920): home 2, `tests/XXXAsIfTupleWalk.fss`.
- Walk cannot call an overloaded method on an assumed receiver, 'Unexpected method value {...}:OverloadedFunction when invoking method pick given receiver (Leaf asif Named)' (`interpreter/evaluator/values/DottedMethodApplication.java:106`) (row 921): home 2, `tests/XXXAsIfOverloadedMethodWalk.fss`.
- Not a defect: walk refuses at load a top-level `opr TIMES(a: Named, b: Named)` beside the library's `MultiplicativeRing` `BY`, 'with generic type, at least one pair of parameters must have excluding types'; `Named` does not exclude `MultiplicativeRing`, so the Meet Rule asks for a cover, and the tests use `opr ODOT`.

## 8. Sentences the change makes false

- `explorations/coordinator/FACTS.md:31`, F-34: "Each kind left has a ledger row or a plan line, among them varargs (row 624), `asif` (row 818) ...": the `asif` kind is now the partial call only, and the 38 refusals are not measured again.
- `explorations/fortress-gap-ledger.md:887`, row 818's claim and notes: rewritten in record.md.
- `explorations/perf-probes/codegen-distance/REPORT.md:169`, "The code generator has no visitor for `AsIfExpr`", and `:239`, "the code generator has no case for `AsIfExpr`".
- `explorations/coordinator/map/spec-to-implementation.md:259`, the code generator's cell, "desugared away by `desugarer/TypeAscriptionDesugarer.java:21`": false for `asif` already on the base; the code generator now compiles it.
- The skill's `compiler.md` does not list the assumption among the code generator's refusals (`grep -rn asif .claude/skills/` prints nothing), so none of its sentences is false; the gather may add the partial call to "What the compiled path cannot compile yet".
- The specification and its Appendix I: none (`grep -n 'asif\|AsIf' Specification/appendices/changes.tex` prints nothing).

## 9. Decisions, each with the ways not taken

1. At a receiver, the static body of the assumed trait (fork G1). Not taken: a run-time wrapper as walk's `FAsIf`, which every dispatch would have to unwrap; a cast and the virtual call, which runs the override. Evidence: javap of a probe's jar, `public static fortress.CompilerBuiltin$String name(AsIfNoProbe$Named);` in `AsIfNoProbe$Named$DefaultTraitMethods`, and `Titled$DefaultTraitMethods extends Named$DefaultTraitMethods`.
2. The body chosen by the JVM signature of the call's parameters after `self`, from `allMethodsNotIdenticallyCovered`, the lowest trait among the matches. Not taken: `allMethods`, which keeps an overridden body beside its override; matching by Fortress types through the type analyzer, which the code generator's own forwarding does not do.
3. A call with every dispatched argument an assumption calls the resolved declaration's own body (fork G2), by the `?`-tagged name where its name and signature are a dispatch method's. Not taken: a new dispatch method that fixes some positions; the assumption ignored, which gives the override.
4. The partial call refused (fork G2), also at a dotted call of an overloaded method. Not taken: compiling it as the resolved declaration where no other declaration is applicable at the assumed positions, which would compile `String.fss:67`, `:69` (forCurator).
5. An assumption at a call of another component's overloaded function refused, with its own message. Not taken: reading that component's dispatch sets, which `generateTopLevelOverloads` builds only for this component (`CodeGen.java:1861`).
6. An assumption at a functional method whose `self` is not first refused, with its own message: the static body takes `self` first and the arguments stand in call order on the stack. Not taken: reordering the stack.
7. The arguments reach `forFunctionalRef` through a field that `forOpExpr` and `for_RewriteFnApp` set around the callee's visit, so that the emission stays in `forFunctionalRef`, as the brief names it. Not taken: the whole decision in each caller, which would duplicate the name and signature resolution there.
8. The walk guard leaves out the four assertions walk departs on, and three `XXX` tests hold them (home 2). Not taken: assert walk's answers, which the specification contradicts.
9. The tests' operator `ODOT`, not `TIMES`, which the library's `MultiplicativeRing` `BY` claims under walk (section 7).
10. `forAsIfExpr` beside `forMethodInvocation`, far from `forObjectDeclPrePass` (rung E) and `dumpMethodChaining` (rung T): the nearest edit of the change is `forFunctionalRef` at `:4036`.

## 10. Points to report

- The methods of the code generator changed: `forMethodInvocation` (`:6594`; the receiver's static body, the virtual call where `T` gives none, a refusal at `:6713`), `forFunctionalRef` (`:4036-4040`; the resolved declaration, or the partial call's refusal), `forOpExpr` (`:5178-5183`) and `for_RewriteFnApp` (`:7014-7019`), which only pass the call's arguments; new: `forAsIfExpr` (`:6419`, the value at `T`), `assumedReceiverCall`, `assumedArgumentsCall`, `emitBodyGivenBy`, `staticBodySig`, `methodsNamed`, `methodIsOverloaded`, `assumedTrait`, `callArgList`, `assumptionCount`, `sigParams`, the field `callArgsForAssumption` and the constant `ASSUMPTION_PARTIAL_CALL` (`:6407-6592`), and the import of `AsIfExpr` (`:65`). `for_RewriteFnApp` is a file's method beyond the three the brief names.
- The forms that compile and the form that stays refused: section 1.
- The tests before and after: section 2.
- Every sentence made false: section 8.
- No file beyond those named; no edit of the checker, `forObjectDeclPrePass`, `dumpMethodChaining` or `OverloadSet`.
- A ladder move UP: `tests/rshiftbug.fss`, `codegen` to `pass` (section 5).
