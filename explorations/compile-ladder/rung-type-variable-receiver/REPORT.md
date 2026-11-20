# Rung T, `rung-type-variable-receiver`: a generic method called on a receiver typed by a type variable, on the compiled path (row 1076)

- problem: F-34's measure counts one refused declaration of the fourteen components, `__bigOperator2`, whose call `xs.generate[\L1\](…)` on `xs: F`, `F extends Generator[\E\]` (`Library/FortressLibrary.fss:1675`) stops the code generator at the cast `TraitType rt_tt = ((TraitType)receiverType)` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7404` on the base); row 1076.
- spec: `Specification/basic/expressions/method-invocation.tex:47-48` (the receiver is bound to the method's `self`; the value and type of the call are the method body's, `:60-62`), with `Specification/basic/trait-parameters.tex:47-53` (a type parameter's `extends` clause bounds it).
- precedent: rung I's `intersectionMethodOwner` and its use in `forMethodInvocation` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7354-7357`, `:7616-7646`), row 540.
- deviation: the owner is chosen by calling `intersectionMethodOwner` on the variable's bounds read as the conjuncts of one intersection, not by a copy of its selection (`CodeGen.java:7664-7666`).
- deviation: the bounds are read from the kind environment, so a `where` clause's bound counts (`CodeGen.java:7658`); a bound that is itself a type variable is not opened (`CodeGen.java:7661`), since the checker refuses that form (NEW-T-1).
- deviation: a body without static parameters of its own is compiled with its own `where` clause in the kind environment, as a generic body is (`CodeGen.java:2774`), so a method's clause on its trait's or object's static parameter counts too (`whereClauseBodyCodeGen`, `CodeGen.java:3238-3245`, called at `:3128` and `:3207`; the skeptic's fix, `54c56dc6e9`).
- deviation: only a call with static arguments takes the owner (`CodeGen.java:7360`); a call without them keeps the base's path for a type-variable receiver, `methodCall` on the `VarType` (`CodeGen.java:641`), where rung I's owner is taken for every intersection receiver.
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (the team's file; the cast is the team's, `CodeGen.java:6067` and `:6211` at `a874948ac`).

## What changed and why

The code generator's branch of `forMethodInvocation` for a dotted call with static arguments cast the receiver's static type to `TraitType` (`CodeGen.java:7404` on the base, and again in `emitFindGenericMethodClosure`, `:7714` on the base). Where the receiver's static type is a type variable, as `x.m[\ZZ32\](3)` with `x: F` and `F extends Gen`, the type is a `VarType` and the compile dies: 'java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType'. Every such call died there on the base: the cast precedes any emission in that branch (`:7387-7404` on the base).

The change (`CodeGen.java:7358-7363`, `:7648-7667`), as fork T1 says: where the receiver's type is a type variable and the call has static arguments, `forMethodInvocation` asks the new member `typeVariableMethodOwner` for the variable's bound that declares or inherits the method, the most specific where several do, and from there the call is compiled as for a receiver of that bound's type: the receiver is cast to it (`castReceiver`), the closure is looked up through it, and the receiver's static argument of the generic method closure is that bound. `typeVariableMethodOwner` reads the variable's bounds from the code generator's kind environment (`typeAnalyzer.env().staticParam`), which holds a parameter's `extends` clause and the bounds a `where` clause adds (`KindEnv.constraintBounds`, `scala_src/typechecker/staticenv/KindEnv.scala:147-162`), keeps those that are trait types, and lets `intersectionMethodOwner` choose among them as among an intersection's conjuncts: the bounds that have the checker's chosen declaration, the one that lies below every other, else the first.

The object's own method still runs: the call is an interface call of the closure finder on the bound's interface, which the object's class implements. In the test, `S` redeclares `m`, and `inherited[\S\](S)` and `bothBounds[\S\](S)` answer 8, `S`'s own body, as walk does.

The skeptic's fix (`54c56dc6e9`) puts a method's own `where` clause into the kind environment of its body where the method has no static parameters of its own (`whereClauseBodyCodeGen`, `CodeGen.java:3238-3245`, called by `generateTraitDefaultMethod` and `generateFunctionalBody` at `:3128` and `:3207`), as `generateGenericMethodBody` does for a generic body (`:2774`). Without it, `held(): ZZ32 where { F extends Gen } = x.m[\ZZ32\](3)` in `object WhereHolder[\F\](x: F)`, and the same call in a trait's default method, stopped the code generator: 'Can't find a trait among the bounds of F that has m' (`SKEPTIC.md`).

## The test, its failure, the fix, the pass

The test, `ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod.fss` with `.test` (`link`, `run`, `run_out_contains=PASS`): the planner's `VarRecv` shape and five more cases, each asserted: a bound that declares the method, a bound that inherits it, one of two bounds that declares it, two bounds that both have it (one below the other), a bound that names another static parameter (the library's shape, `Src[\E\]`), and a `where` clause's bound. The skeptic added two more, a call whose static argument is inferred and a receiver typed by an object's static parameter (`SKEPTIC.md`, commit `b99f1f564b`). Its fix added two more: a method's `where` clause that bounds its object's static parameter, and one that bounds its trait's (`54c56dc6e9`).

Expected failure, as stated before the first run: the link step red with "UNEXPECTED exception" and the `ClassCastException` above, the run red with "Could not load TypeVariableReceiverGenericMethod". The run on the base's code, after the `where` case was added and before any Java was edited (2026-11-20T15:37:43Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh t1076base2 ProjectFortress/compiler_tests TypeVariableReceiverGenericMethod.test
    . link ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod
     UNEXPECTED exception
    java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType (com.sun.fortress.nodes.VarType and com.sun.fortress.nodes.TraitType are in unnamed module of loader 'app')
    F. run ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod (136ms) Could not load TypeVariableReceiverGenericMethod
    Tests run: 2,  Failures: 2,  Errors: 0

(The same failure was seen once before at 15:35:10Z, without the `where` case.) The pass, the last run after the last change of code, on the head `38d8a44e56` (2026-11-20T16:00:22Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh t1076final ProjectFortress/compiler_tests TypeVariableReceiverGenericMethod.test XXXMethodThroughTypeVariableBound.test
    . link ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod  OK (time = 6831ms)
    . run ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod (1307ms) PASS
    OK (3 tests)

Walk's answer, on the base's code, from `tmp/`: `bin/fortress walk VarRecv.fss` (the planner's `explorations/compile-ladder/plan-34/probes/programs/VarRecv.fss`) printed `7`, exit 0; `bin/fortress walk TypeVariableReceiverGenericMethod.fss` printed `PASS`, exit 0. Compiled on the change, `bin/fortress compile VarRecv.fss` then `bin/fortress run VarRecv` printed `7`.

## The owner as found, and the cast

`javap -c` of the test's generic function templates (compiled on `38d8a44e56`) shows the cast and the closure's receiver argument in each case:

    bothBounds  (F extends { Gen, Sub }):    checkcast TypeVariableReceiverGenericMethod$Sub; ldc "⟦TypeVariableReceiverGenericMethod$Sub,…FZZ32⟧"
    oneOfTwo    (F extends { Named, Gen }):  checkcast TypeVariableReceiverGenericMethod$Gen; ldc "⟦TypeVariableReceiverGenericMethod$Gen,…FZZ32⟧"
    inherited   (F extends Sub):             checkcast TypeVariableReceiverGenericMethod$Sub; ldc "⟦TypeVariableReceiverGenericMethod$Sub,fortress/CompilerBuiltin$String⟧"
    genericBound (F extends Src[\E\]):       checkcast "TypeVariableReceiverGenericMethod$Src⟦E⟧" (the static argument symbolic, hashed at run time)
    whereBound  (where { F extends Gen }):   checkcast TypeVariableReceiverGenericMethod$Gen

Where several bounds have the method, the one below the others is chosen (`Sub` over `Gen`); where one of two has it, that one (`Gen`, not `Named`).

## Where the fix belongs, and the precedent

The map's row for the dotted call (`explorations/coordinator/map/spec-to-implementation.md:262`) puts the code generator's part in `CodeGen.forMethodInvocation`; the checker accepts the call (`Functionals.scala`), and walk runs it (`Evaluator.forMethodInvocation`), so the fix is the code generator's alone. The precedent is rung I's: a receiver whose static type is an intersection is read at the conjunct that owns the method and cast to it (`CodeGen.java:7354-7357`, `:7616-7646`; row 540). The other sites of `CodeGen.java` that cast a receiver's type to a trait type number 7 (`:641`, `:7419`, `:7461`, `:7468`, `:7474`, `:7519`, `:7750` on the change): four are guarded by an `instanceof` test or take a `NamedType`, which a `VarType` is (`:641` tests `VarType` first, `:7461`, `:7468`, `:7519`); `:7474` is `methodCall`'s `NamedType` cast; of the two unguarded casts, `:7419` is on the branch for static arguments, where the receiver's type is now always a trait type, and `:7750` is in `emitFindGenericMethodClosure`, which that branch calls with that type and `functionalMethodWrapper`, a generic functional method's wrapper, calls with its `self` parameter's declared trait type (`:3669`).

## What the specification settles

A dotted call binds the receiver to the method's `self` and has the value and type of the method's body (`Specification/basic/expressions/method-invocation.tex:47-48`, `:60-62`); a type parameter's `extends` clause bounds the types it takes (`Specification/basic/trait-parameters.tex:47-53`), so a value of a type variable is a value of its bound. So `x.m[\ZZ32\](3)` with `x: F`, `F extends Gen`, runs the object's own `m`, which walk does and the compiled path now does. `grep -rn '~1076' Specification --include=*.tex` prints nothing (exit 1). No sentence of the specification states the code generator's crash, and none is made false: the Appendix I entries that name generic methods (`Specification/appendices/changes.tex:2169`, `:2407-2429`, `:6570`) speak of the checker's inference and walk, not of this call.

## Programs run old against new

- `TypeVariableReceiverGenericMethod` through `junit.sh`: on the base, link red with the `ClassCastException`, run red; on the change, link and run green (above).
- `VarRecv.fss` (the planner's): compiled on the base, the same crash (`explorations/coordinator/climb-batch-34-review.md`, B8, run 3, not run again); on the change, compiled and run, `7`.
- `WhereRecv` (scratch: `whereBound[\F\](x: F): ZZ32 where { F extends Gen } = x.m[\ZZ32\](3)`): compiled on the base, 'Exception in thread "main" java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType'; walk prints `7`; on the change, compiled and run, `7`.
- `ChainRecv` and `ChainPlain` (scratch: a bound that is another type variable, `chained[\H extends Gen, F extends H\](x: F)`): on the base the checker refuses both, 'No such method F.m.' and 'No such method F.n.', and walk prints `7`. The change does not reach them: the checker refuses first (NEW-T-1).
- `ConcreteRecv` (scratch: the test's calls at trait-typed receivers, no type variable): compiled and run on the base, `PASS`; so the test fails on the base only by row 1076.

## The measure, on a scratch copy of the final tree

`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch> <out>` on a worktree seeded at `38d8a44e56` under `tmp/` (the script applies its `measure-hacks.patch` and builds it), 160 s:

    refused declarations 0 | emitted (OK lines) 754 | component failures 0
      FortressLibrary      refused   0  emitted 537
    kinds 0
    @@CG OK	FnDecl __bigOperator2	…/Library/FortressLibrary.fss:1656:1-1677:4

The before is F-34's, on the code of `ba3c7c876d`: 1 refused (`__bigOperator2`), 753 emitted, no component failure. Nothing stands behind the wall: the declaration is emitted. The measure's driver still does not compile `String` whole under the selector, so row 818's stop in `String` (rung P's) is not in this count, as F-34 says.

## Suites, stages and the ladder

- `ant testFast`, once, on `38d8a44e56`, beside the batch under `nice -n 19`: 'BUILD SUCCESSFUL', 'Total time: 10 minutes 47 seconds'; compiler 'Tests run: 1769, Failures: 0, Errors: 0', library '86, Failures: 0', othercompiler '263, Failures: 0', onelibrary '14, Failures: 0', and every misc class 'Failures: 0'. Its log has '. link …/TypeVariableReceiverGenericMethod OK', '. run …/TypeVariableReceiverGenericMethod … Passed' and '. compile …/XXXMethodThroughTypeVariableBound Saw expected failure'. The skeptic's fix is a later code state: its own tests and the compiled tests with a `where` clause ran on it (`SKEPTIC.md`); the gate runs the suites on the merged tree.
- The stages: none, as the section says: `CodeGen.java` lies outside the paths that leave both stages unmoved by rule, but the count stage and the distance stage run no code generation (F-34), so neither can move. `STAGE_BLIND`, the files the change edits: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/compiler_tests/TypeVariableReceiverGenericMethod.fss`, `.test`, `ProjectFortress/compiler_tests/XXXMethodThroughTypeVariableBound.fss`, `.test`, and this folder's `REPORT.md` and `record.md`. No file beyond those named. The skeptic's fix edits two members of `CodeGen.java` beyond those the section names, `generateTraitDefaultMethod` and `generateFunctionalBody` (`:3128`, `:3207`), and adds `whereClauseBodyCodeGen` (`:3238-3245`).
- The distance stage's shadow patch, run once on `38d8a44e56` as `run.sh` runs it (`shadow-patch.py` and `add-patch.py` into a scratch folder, then `javac` of the seven shadow sources): patch exit 0, `javac` exit 0. It still applies to this `CodeGen.java`. Run again by the skeptic on the fix `54c56dc6e9`: patch exit 0, `javac` exit 0.
- The change's own ladder subset: no file of the baseline's `raw/` or of the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-33b/gate/ladder/ladder.tsv`) has a first error that names the touched code (`VarType`, `ClassCastException`, `forMethodInvocation`, the owners). So the subset is the four pass-list programs with a dotted generic method call, `tests/XXXgenericMethod1.fss`, `XXXgenericMethod2.fss`, `XXXgenericMethod3.fss` and `genericMethod4.fss`, run with the drivers copied under `tmp/` after the edit: each `pass`, as in the newest landed `ladder.tsv`, and each output the same as the baseline's `raw/` after the `Operation took` mask.
- Names added, grepped in `ProjectFortress/src/com/sun/fortress/` and every test folder: `typeVariableMethodOwner`, `TypeVariableReceiverGenericMethod` and `XXXMethodThroughTypeVariableBound` each occur only in their own files, and so does the skeptic's `whereClauseBodyCodeGen`.
- No team demo and no microGPT check was run, as the brief says; microGPT and its helper files change no line.

## Sentences of the specification made false

None. `grep -rn '~1076' Specification --include=*.tex` prints nothing.

## Points to report

- The owner as found: the bound below the others where several have the method (`Sub` over `Gen` for `F extends { Gen, Sub }`), the one that has it where one of two does (`Gen` for `F extends { Named, Gen }`), and the cast to it, `checkcast` of the bound's class (section "The owner as found"); `CodeGen.java:7648-7667`, `:7358-7363`.
- Row 1076's test against the prelude, failing on the base and passing after (section "The test"); walk's answer `7` for `VarRecv` and `PASS` for the test; the planner's measure on a scratch copy of the final tree, 0 refused and 754 emitted, where F-34 counts 1 and 753.
- The distance stage's shadow patch still applies to this `CodeGen.java`: exit 0, and its shadows compile; also on the skeptic's fix.
- The files edited, for `STAGE_BLIND`: `CodeGen.java` and the four test files; none beyond those named. The skeptic's fix edits `CodeGen.java`'s `generateTraitDefaultMethod` and `generateFunctionalBody`, members beyond those the section names, and adds `whereClauseBodyCodeGen` (`CodeGen.java:3128`, `:3207`, `:3238-3245`).
- The section's reserved point "a change of which declaration a dotted call reaches": not reached by any call that compiled on the base, since every call that takes the new path died on the base at `:7404`; the calls it now compiles reach the receiver object's own declaration, as walk's do (`inherited[\S\](S)` and `bothBounds[\S\](S)` answer `S`'s 8). The skeptic's fix reads a method's `where` clause in its body; there the calls that compiled on the base reach the same declarations on the fix, in the compiled tests with a `where` clause and in the skeptic's program `SkWhereReach2` (`SKEPTIC.md`). A model line: none.

## Decisions

1. **The owner chosen by `intersectionMethodOwner` over the bounds read as one intersection.** Ways not taken: a copy of its selection in the new member (two copies of one rule); a shared helper factored out of `intersectionMethodOwner` (it edits a member that the rule of the rungs does not give rung T, "a new member beside `intersectionMethodOwner`"); the receiver read at `Any` with a dynamic lookup (fork T1's way not taken); the receiver left at its `VarType` for the class loader to substitute at instantiation (fork T1 casts to the bound). Evidence: fork T1 (`explorations/coordinator/CLIMB-BATCH-34.md:399`); the bounds of a type variable are an upper bound like an intersection's conjuncts.
2. **The bounds from the kind environment, not from the declaration's header.** Way not taken: the `StaticParam`'s own `extends` clause found in the enclosing header. Evidence: `KindEnv.constraintBounds` adds a `where` clause's bounds to the binding (`KindEnv.scala:147-162`), and the `where` form crashed the same way on the base (`WhereRecv`), so the test asserts it.
3. **Only a call with static arguments takes the owner.** Way not taken: every dotted call on a type-variable receiver, as rung I does for every intersection receiver. Evidence: the call without static arguments compiles and runs on the base (`SelfTypeParameterReceiverRun` calls a method on a value of a self-type parameter); changing it would change compiled calls that work, beyond the row.
4. **A bound that is itself a type variable is not opened.** Way not taken: open it recursively. Evidence: the checker refuses every method call through such a bound, 'No such method F.n.' (NEW-T-1), so no program reaches the code generator with one and no test could show the code; the new row says the owner reads only trait-type bounds.
5. **The test asserts values and prints `PASS`** with `run_out_contains=PASS`, not `run_out_contains=7`. Way not taken: the planner's program as it is with a `run_out` key. Evidence: the brief allows either; the asserts check each case's own answer.
6. **NEW-T-1's home is 2, an `XXX` compile test.** Way not taken: home 3, a plain test of today's refusal. Evidence: the specification lets a naked type variable stand in a type parameter's `extends` clause, excluding one only from a trait's or object's `extends` clause (`Specification/basic/trait-parameters.tex:71-74`), and a `where` clause's trait constraint "may include naked type variables" (`:366-368`); by subtyping, `x: F` has `Gen`'s methods; walk runs the call.
7. **The ladder subset: the four pass-list programs with a dotted generic method call**, since the gate.md rule (first errors naming the touched code) gives none. Way not taken: an empty subset. Evidence: the grep of both tables, section "Suites, stages and the ladder".

## Defects

- Row 1076, the code generator's crash on a generic method called on a receiver typed by a type variable: home 1, repaired, `compiler_tests/TypeVariableReceiverGenericMethod.test`. The row closes with `97317f1e82`.
- NEW-T-1, the checker's refusal of a method call on a value of a type variable whose bound is another type variable, 'No such method F.n.', where walk runs it: home 2, `compiler_tests/XXXMethodThroughTypeVariableBound.test`, green as an expected failure; shown red once with the bound written `F extends Gen` (2026-11-20T15:42:07Z: 'Saw failure, but did not satisfy compile_err_contains', 'AssertionFailedError: Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'), then restored, byte for byte. A new row, in `record.md`.
- The skeptic's programs met two defects of walk in shapes their rows do not name, row 1057's in a trait whose object redeclares one of two generic methods of different arity, and row 870's in a generic object's own generic method; a note for each is in `record.md`.

## For FACTS

- **A generic method called on a receiver typed by a type variable compiles.** The code generator reads such a receiver at the variable's bound that declares or inherits the method, the most specific where several do, a `where` clause's bound among them, a method's clause on its trait's or object's static parameter too, and casts it there; the receiver object's own method runs. A bound that is another type variable is not read (the checker refuses the call first, NEW-T-1). Test: `compiler_tests/TypeVariableReceiverGenericMethod`. Detail: this report, "What changed and why" and "The owner as found".
- F-34's count on this change: the measure on a scratch copy of `38d8a44e56` refuses 0 declarations and emits 754, with no component failure; `__bigOperator2` is emitted. Command: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: this report, "The measure".

## Commands worked out

- The shadow patch alone, as `explorations/coordinator/tools/distance/run.sh` runs it: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress S/shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py S/shadow-src`, then `javac -nowarn -encoding UTF-8 -cp "$CP" -d S/shadow-classes` over the seven shadow sources that `run.sh:105-112` names, `CP` from `bin/fortress_classpath` without the bytecode cache.
- A scratch worktree for the measure at the rung's head, inside the rung's `tmp/`: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base40 <tree>/tmp/rung-type-variable-receiver/measure-tree - 38d8a44e56`.

## Questions for the curator

None.
