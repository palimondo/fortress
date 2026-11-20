# Rung P of climb batch 34: a call with a type assumption at some of its dispatched arguments, on the compiled path (row 818)

- problem: compiled under the selector, the one library's `String` stops at `Library/String.fss:67:41-66`, 'Can't compile a dispatched call whose arguments are not all type assumptions' (`explorations/compile-ladder/plan-34/probes/rehearsal.md:37`, wall 1; row 818)
- spec: `Specification/basic/expressions/type-annotation.tex:45-48` (an assumption gives "the immediately enclosing function, method, or operator invocation" both the static and the dynamic type it names); `Specification/basic/overloading.tex:302-311` (the declarations applicable at run time, the most specific chosen)
- precedent: walk's assumption, which wraps only the assumed value and dispatches the others on their run-time types (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:109-116`); the code generator's own dispatch methods (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2134`, `generateAnOverloadDefinition`) and its call whose every argument is an assumption (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7295-7298`); the class name by span of a function expression (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:971-977`)
- deviation: a call of a functional method, at an assumed receiver, or with an assumption at a dotted call's argument stays refused with the old message (`CodeGen.java:7265`, `:7242`, `:7518`); a generic declaration at or below the resolved one is refused with a new message (`CodeGen.java:7301-7302`, `:7333`); a dispatch over a proper part of the resolved declaration's set is a class of its own per call site (`CodeGen.java:7340-7351`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`

One launch worked the rung. Branch `wip/rung-partial-assumption`, cut from `639eef1806`; seeded from `/home/user/fortress-base40` by `seed-worktree.sh` (exit 0). Commits: `e9b92aad8d` (the two tests, failing on the base), `a95eb01926` (the fix and the four expected failures).

## What changed and why

A type assumption `e asif T` gives the call around it the static and the dynamic type `T` at `e` (`type-annotation.tex:45-48`). Walk does so by wrapping only the assumed value (`Evaluator.java:109-116`), so the other arguments dispatch on their own run-time types. The code generator compiled an assumption at a receiver and at a call whose every dispatched argument is one; at some arguments and not all it threw `ASSUMPTION_PARTIAL_CALL` (base `CodeGen.java:7290`), and the one library's `String` has that form twice (`Library/String.fss:67`, `:69`).

Now, for a call of an overloaded function or operator of the component whose resolved declaration has a dispatch method (`CodeGen.java:7291-7294`, in `assumedArgumentsCall`), `partiallyAssumedCall` (`CodeGen.java:7304-7353`) does fork P1:

1. It rebuilds the component's overload set of the name at the call's number of arguments and splits it as the component's start does (`topLevelOverloadSet`, `CodeGen.java:7355-7366`), and finds the member whose JVM signature is the resolved one's (`OverloadSet.memberWithSignature`, `OverloadSet.java:2284-2289`).
2. The declarations the call can reach (`OverloadSet.membersUnderAssumptions`, `OverloadSet.java:2300-2333`): the members at or below the resolved declaration (`membersAtOrBelow`, `:2291-2298`) whose parameter at each assumed position takes the assumed type (`TypeAnalyzer.lteq`), and whose parameter at each other position the argument's static type does not exclude (`TypeAnalyzer.definitelyExcludes`), the resolved one always among them. The resolved declaration is applicable at every run of the call, so the most specific applicable declaration of a run is at or below it (`overloading.tex:309-311`, with the overloading rules' guarantee of a most specific one): no member outside this part can be chosen.
3. What is emitted (`CodeGen.java:7334-7352`): one reached, the static call of its body, `NamingCzar.mangleAwayFromOverload(name)` at the resolved signature, as the call whose every argument is an assumption does; every member of the resolved declaration's dispatch method reached, a call of that dispatch method; else a dispatch method among the reached members alone, which `OverloadSet.generateDispatchAmong` (`OverloadSet.java:2335-2364`) writes with the set's own machinery (`makeSubset`, `splitInternal`, `generateAnOverloadDefinitionInner`), into a class of its own named `<component>$asif@<span>` with an ordinal on a repeat, as a function expression's class is named, through the component's shared set of class names (`closureClassNames`, whose comment now says so, `CodeGen.java:4251-4256`). Its arms test the arguments' run-time types, the most specific member first, the resolved one last and untested, each arm calling its member's own body, mangled where the member heads a part of the whole set, as the component's own dispatch methods do (`AmongApis.invokeParticularMethod`).
4. A member at or below the resolved one with static parameters: refused, 'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet' (`CodeGen.java:7301-7302`, `:7333`).

The disassembled dispatch of `trio(a asif Named, n)` (`javap -c` of `AsIfPartialDispatchCompiled$\=asif@39\!12-14.class`, compiled by hand into a private caches folder):

```
public static fortress.CompilerBuiltin$String trio(AsIfPartialDispatchCompiled$Named, AsIfPartialDispatchCompiled$Named);
     7: aload_1
     8: instanceof    #11                 // class AsIfPartialDispatchCompiled$Leaf
    22: invokestatic  #17                 // Method AsIfPartialDispatchCompiled."trio?":(...Named;...Leaf;)...
    34: invokestatic  #19                 // Method AsIfPartialDispatchCompiled."trio?":(...Named;...Named;)...
```

`trio(Leaf, Leaf)` and `trio(Leaf, Named)`, which do not take `Named` at the assumed first argument, are not among its arms.

## The tests: failing on the base, passing after

- `compiler_tests/AsIfPartialCallCompiled.fss` and `.test`: `XXXAsIfPartialCallCompiled` promoted (`git mv`, component renamed, `.test` now `link`, `run`, `run_out_contains=PASS`); the program is otherwise unchanged: `pair(Leaf asif Named, Leaf)` over `pair` at `(Named, Named)` and `(Leaf, Leaf)` answers `Named, Named`.
- `compiler_tests/AsIfPartialDispatchCompiled.fss` and `.test`, new: the case of fork P1, `pair(a asif Named, n)` with `pair` at `(Named, Named)` and `(Named, Leaf)`, `a = Leaf(1)`, `n: Named = Leaf(2)`, answers `Named, Leaf`; with `trio` at the four pairs of `Named` and `Leaf`, the call at an assumption reaches only the two at `Named` (a generated dispatch), at the first or the second argument, with a `Leaf` or a `Twig` for the other; one left where the other argument's static type is `Leaf`, or is the object `Twig`, which `Leaf` excludes; an operator; the call inside an object's method and inside a function expression.

Expected failure, stated before the run: each link test fails with ' UNEXPECTED exception com.sun.fortress.exceptions.CompilerError: ...: Can't compile a dispatched call whose arguments are not all type assumptions', at `AsIfPartialCallCompiled.fss:18:12-14 ... node = pair` and at the dispatch test's first partial call, expected `:29:28-31 ... node = trio`; each run test 'Could not load ...'; 'Tests run: 4, Failures: 4'. The run on the base's code, before the edit was first built (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh p34base ProjectFortress/compiler_tests AsIfPartialCallCompiled.test AsIfPartialDispatchCompiled.test`, 2026-11-20T15:00:06Z, tree `639eef1806` with the tests only):

```
ProjectFortress/compiler_tests/AsIfPartialCallCompiled.fss:18:12-14:
    Can't compile a dispatched call whose arguments are not all type assumptions node = pair
ProjectFortress/compiler_tests/AsIfPartialDispatchCompiled.fss:29:28-30:
    Can't compile a dispatched call whose arguments are not all type assumptions node = trio
F. run ProjectFortress/compiler_tests/AsIfPartialCallCompiled (177ms) Could not load AsIfPartialCallCompiled
Tests run: 4,  Failures: 4,  Errors: 0
```

It failed as stated; the span prints `28-30` where I wrote `28-31`, the span's printed end being the last column but one, as `18:12-14` for the four letters of `pair` shows.

Walk's answer, on the base (`bin/fortress walk` of each program, copied to a scratch folder): `AsIfPartialCallCompiled` and `AsIfPartialDispatchCompiled` each print `PASS` and exit 0, so walk gives every value the two tests assert; so do the four expected failures below.

The passing run, the last after the last change of code (`ONE_JVM=1 .../junit.sh p34final ProjectFortress/compiler_tests AsIfPartialCallCompiled.test AsIfPartialDispatchCompiled.test XXXAsIfPartialGenericCompiled.test XXXAsIfPartialMethodCompiled.test XXXAsIfPartialReceiverCompiled.test XXXAsIfPartialDottedArgCompiled.test AsIfCallsCompiled.test XXXAsIfGenericFunctionCompiled.test XXXAsIfGenericMethodCompiled.test XXXAsIfGenericTraitParamCompiled.test AsIfNumberOrderCompiled.test AsIfApiTraitCompiled.test AsIfApiTraitOverrideCompiled.test`, 2026-11-20T15:10:23Z, the code of `a95eb01926`):

```
. run ProjectFortress/compiler_tests/AsIfPartialCallCompiled (281ms) PASS
. run ProjectFortress/compiler_tests/AsIfPartialDispatchCompiled (418ms) PASS
OK (22 tests)
```

`ant testFast` once, on the code of `a95eb01926`: 'BUILD SUCCESSFUL', 'Total time: 12 minutes 17 seconds'; the compiler track 'Tests run: 1773, Failures: 0, Errors: 0', 7 more than climb batch 33b's gate (1766): the promoted test's two commands in place of one, the dispatch test's two, and four expected failures; othercompiler 263, library 86, onelibrary 14, all with no failure.

## The other forms (fork P2) and the defects

Four expected failures, each a compile test with `compile_exception_contains`, each green ('OK Saw expected exception') in the passing run above, each program giving under walk the value its assertion states:

- `XXXAsIfPartialGenericCompiled`: `gpair(a asif Named, n)` with `gpair(x: Named, y: Named)` beside `gpair[\T extends Leaf\](x: Named, y: T)`; the new message. Shown red on a deliberate fix, through the harness, then restored: with the generic declaration taken out for one run (`ONE_JVM=1 .../junit.sh p34red ProjectFortress/compiler_tests XXXAsIfPartialGenericCompiled.test`, 15:07:30Z), '1) ProjectFortress/compiler_tests/XXXAsIfPartialGenericCompiled(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile', 'Tests run: 1,  Failures: 1,  Errors: 0'.
- `XXXAsIfPartialMethodCompiled`: a functional method, `tag(Leaf asif Named, n)`; the old message, from `CodeGen.java:7265`.
- `XXXAsIfPartialReceiverCompiled`: `(Leaf asif Named).pick(n)` over an overloaded `pick`; the old message, from `CodeGen.java:7242` (`assumedReceiverCall`).
- `XXXAsIfPartialDottedArgCompiled`: `n.pick(Leaf asif Named)`; the old message, from `CodeGen.java:7518` (`forMethodInvocation`, rung T's member).

The other forms of row 818's notes are unchanged and keep their messages and tests: another component's overloaded function (`CodeGen.java:7279`), a functional method whose `self` is not first (`:7268`), a generic method on an assumed receiver (`XXXAsIfGenericMethodCompiled`) and an overloaded generic function (`XXXAsIfGenericFunctionCompiled`), both green in the passing run; `XXXAsIfGenericTraitParamCompiled` (row 1088) too.

Every defect measured, with its home (`tests-writing.md`, "How a defect is recorded"):

- The partial call of an overloaded function of the component (row 818): home 1, repaired; `AsIfPartialCallCompiled`, `AsIfPartialDispatchCompiled`.
- The partial call of a functional method, at an assumed receiver, at a dotted call's argument, and with a generic declaration below the resolved one: home 2, the specification settles each (`type-annotation.tex:45-48`); the four expected failures above; row 818 rewritten to hold them (record.md).

## `String` under the selector

`cd ProjectFortress && FORTRESS_LIBRARY=one ../bin/fortress compile ../Library/String.fss`. Before, on the base's code (15:00:34Z):

```
Exception in thread "main" com.sun.fortress.exceptions.CompilerError: 
/home/user/fortress-partial-assumption/Library/String.fss:67:41-66:
    Can't compile a dispatched call whose arguments are not all type assumptions node = concatAndBalanceIfNecessary
compile exit=1
```

After, on the code of `a95eb01926` (15:23:22Z): 'compile exit=0', and `default_repository/caches-one/bytecode_cache/String.jar`, 84,833 bytes. In it (`javap -c -cp String.jar String`), the body of `concatAndBalanceIfNecessary(String$CatString, FlatString$FlatString)` calls at both lines 'invokestatic ... Method "concatAndBalanceIfNecessary?":(Lfortress/FortressLibrary$String;Lfortress/FortressLibrary$String;)...': the body of the `(String, String)` declaration, the one declaration that takes `String` at the assumed first argument, as under walk. The jar is not run: no carrier serves it before run 2.

## Where the fix belongs, and the precedent

The feature's row of `explorations/coordinator/map/spec-to-implementation.md:259` puts `asif` in the code generator (`forAsIfExpr`, `assumedReceiverCall`, `assumedArgumentsCall`); `modules-and-phases.md`, B.7, puts the compiled dispatch in `OverloadSet`, one dispatch method per overloaded name. The precedent that compiled the other forms, `compile-ladder/rung-codegen-asif/REPORT.md`, refused the partial call and named as a way not taken the case of one declaration left (its decision 4). This rung builds that case and the case of several. No precedent repaired this defect elsewhere: the refusal's other sites in `CodeGen.java` are three (`:7242`, `:7265`, `:7518`), each another form, each left with its expected failure.

## What the specification settles

`type-annotation.tex:45-48`: the assumption gives the immediately enclosing invocation the assumed static and dynamic type at the assumed expression, and only there; `overloading.tex:302-311`: the call runs the most specific declaration applicable at run time. With the dynamic type `T` at the assumed place and the other arguments' own dynamic types, the applicable declarations are those that take `T` there and the others' values elsewhere: fork P1's set, of which the dispatch chooses. `grep -rn '~818' Specification --include=*.tex` prints nothing (exit 1). No sentence of the specification, of Appendix I or of a note says what the compiled path does with an assumption (`grep -rn -i 'asif\|type assumption' Specification --include=*.tex`, filtered for a revision, a note, a row or the compiler, prints nothing), so the change makes none false.

Sentences outside the specification that the change makes false, for the gather:

- `.claude/skills/fortress-repo/references/compiler.md:55`: "a call of a functional method or an overloaded function with an assumption at some of its arguments but not all: 'Can't compile a dispatched call whose arguments are not all type assumptions'": an overloaded function of the component now compiles; a functional method and the two dotted forms stay, and a generic declaration below the resolved one has its own message.
- `explorations/coordinator/FACTS.md:157`, F-325: "A dispatched call with an assumption beside an argument that is not one is refused", and its test `XXXAsIfPartialCallCompiled`, now `AsIfPartialCallCompiled`.
- `explorations/coordinator/FACTS.md:38`, F-34: "`String` stops at `concatAndBalanceIfNecessary`'s call ... so the real compile refuses 2": true of `ba3c7c876d`; on `a95eb01926` `String` compiles.
- `explorations/coordinator/map/spec-to-implementation.md:259`: "the partial call and the two generic forms refused".

## Programs run old against new

- `AsIfPartialCallCompiled`, `AsIfPartialDispatchCompiled`: on the base's code the link is refused (above); on the new code both print `PASS`. Under walk, on the base, both print `PASS`.
- `Library/String.fss` under the selector: refused on the base's code, compiled on the new (above).
- The reserved point, a change of which declaration a call reaches: none for a call that compiled on the base. The rung's code runs only where the base threw (`assumedArgumentsCall`, base `CodeGen.java:7290`, after the same tests at `:7288-7289`), so no call that the base compiled reaches another declaration; each newly compiled call reaches walk's declaration, by the two tests' assertions, which walk passes on the base.

## The stages, the shadow patch, the ladder

- The stages: none, as the section says ("The stages. None."): the edit is in the code generator, which neither stage runs. STAGE_BLIND files: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, and the tests under `ProjectFortress/compiler_tests/`. `OverloadSet.java` gains five members and changes none; the checker calls none of them.
- The distance stage's shadow patch, run once on `CodeGen.java` as committed in `a95eb01926` (the steps of `explorations/coordinator/tools/distance/run.sh:102-115`, into a scratch folder): `shadow-patch.py` and `add-patch.py` 'patch exit=0'; the shadow sources compile, 'javac shadows exit=0'; the driver, 'javac driver exit=0'. It still applies.
- The ladder subset (`gate.md`, "The ladder regression", the drivers copied into the worktree's scratch, `subset.txt` holding `tests/rshiftbug.fss` alone, run after the edit only): the baseline's `raw/` holds no file whose first error names an assumption; its `ladder.tsv` holds one, `tests/rshiftbug.fss`, 'codegen ... Can't compile AsIfExpr at .../rshiftbug.fss:34.27'. On `a95eb01926`: 'tests rshiftbug.fss pass 2', UP. Its assumption is at a receiver, `(StandardEmbedding asif TreeEmbedding).parent(4)`, a form that the earlier rung built and this one does not touch, so the move is not this rung's. Climb batch 33b's `ladder.tsv`, the newest landed, does not run it.

## Points to report

1. The call as compiled: the reached declarations are those at or below the resolved one whose parameters take each assumed type and whose others the static types do not exclude (`OverloadSet.java:2300-2333`); one left, a direct call of its body; the resolved declaration's whole dispatch set, that dispatch method; several else, a dispatch method among them in a class of its own per call site (`CodeGen.java:7334-7352`, `OverloadSet.java:2335-2364`).
2. Row 818's test promoted, failing on the base and passing after, walk's answer `PASS` on the base; `String` under the selector refused before and compiled after (sections above).
3. The other forms, each still refused: a functional method, an assumed receiver and a dotted call's argument with the unchanged message, now each with an expected failure; the generic declaration below the resolved one with a new message, 'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet' (`CodeGen.java:7301-7302`); the four forms of row 818's notes unchanged.
4. The distance stage's shadow patch still applies to the edited `CodeGen.java`: exit 0.
5. The files edited, for STAGE_BLIND: `CodeGen.java` and `OverloadSet.java`, both named. In `CodeGen.java`, beyond `assumedArgumentsCall` and new members beside it, one comment outside them: the field `closureClassNames` (`CodeGen.java:4251-4256`), whose set now also holds the dispatch classes' names. `forFunctionalRef`'s call (`:4469`) is unchanged. The lowest edited line of `CodeGen.java` is 4253, between L's and T's members.
6. Reserved: a change of which declaration a call reaches: none for a call the base compiled (above).

## Decisions

1. **Scope: the partial call of an overloaded function or operator of the component.** Taken: fork P1 for that form, the form of `String.fss:67`, `:69`. Not taken: building the partial form also at a functional method (`CodeGen.java:7265`), whose bodies are a trait's static springboard methods that `OverloadSet` emits no arm for and that `emitBodyGivenBy` picks one of by exact signature; and at a dotted call (`:7242`, `:7518`), whose second site is in `forMethodInvocation`, rung T's member. Evidence: `grep -n asif Library/*.fss ProjectFortress/LibraryBuiltin/*.fss` shows no partial form of these kinds in the library; each stays refused with an expected failure, and row 818 is rewritten to hold them.
2. **The set: the members at or below the resolved declaration.** Not taken: the whole overload set filtered by fork P1's two tests. The resolved declaration is applicable at every run of the call, so the declaration a run chooses is at or below it (`overloading.tex:309-311`); a member outside adds an arm that never runs and leaves the dispatch without one principal member whose signature it takes.
3. **What is emitted.** Taken: one left, its body; the resolved declaration's whole dispatch set, its dispatch method; else a new dispatch method. Not taken: a new dispatch method always (a class per call even where the existing method is the same choice); the new method in the component's own class (a nested `CodeGen`, of an object or a function expression, has no handle on that class writer without a hook at the end of `forComponent`, a member outside the rung's); tests inline at the call site (the dispatch arms of `OverloadSet.generateCall` end in `ARETURN`, and its `TypeStructure` tests carry generic and tuple types that an inline copy would repeat).
4. **The dispatch class's name: by the call's span, with an ordinal on a repeat, through `closureClassNames`.** Not taken: a name by the reached set's content shared by sites (a second registry, which needs a field copied in `CodeGen`'s copy constructor, outside the rung's members); a static counter (names that vary with what the JVM compiled before). Evidence: `NamingCzar.gensymArrowClassName` (`NamingCzar.java:971-977`) names function expressions so, with the same set.
5. **A generic declaration at or below the resolved one: refused, with a message of its own.** Not taken: reading its instances (P-157 puts a parameter's bounds in its place for the test of exclusion, not of applicability; and the dispatch's run-time inference reads the assumed argument's own value, not the assumed type, so it could choose an instance the assumption rules out); the old message, which does not say what stops the call.
6. **The static exclusion test at the other arguments, `TypeAnalyzer.definitelyExcludes`,** as fork P1 words it. Not taken: no such test; the answers are the same, and an excluded member is an arm that never runs.
7. **Row 818 rewritten, not closed.** Its claim, a partial call, still holds at a functional method and at a dotted call; the rewrite states that gap and its tests (record.md). Not taken: close it and open new rows for the forms left, which splits one defect's forms over rows.
8. **The promoted test kept as written, its name aside,** so that its failure on the base is B8's run 1, at `:18:12-14`; the new cases are in a second test.

## Revival change

Revival change: none. The compiled path now does what the specification's "Type Assumption" says (`type-annotation.tex:45-48`) and what walk does on the base (`Evaluator.java:109-116`; both tests pass under walk); the team's code generator compiled no type assumption at all ('Can't compile AsIfExpr', the 2026-09-19 baseline ladder's `tests/rshiftbug.fss`), a gap and not a rule, so no rule of the team's Fortress changes.

## For FACTS

F-325 rewritten and a fact for F-34, in `record.md`, "For FACTS".

## Commands worked out

- The shadow patch alone, from the tree's root, `S` a scratch folder: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress $S/shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py $S/shadow-src`, then the two `javac` lines of `explorations/coordinator/tools/distance/run.sh:107-115` with `CP` as `run.sh:95` makes it: it checks that the stage's text edits still apply and compile, without running the stage.
- What a call compiled to: compile the program into a private caches folder (`FORTRESS_CACHES` and a copy of `default_repository/caches`), then `javap -c` on a class file taken from the component's jar; `unzip` reads the jar's backslashes as folders, so copy the extracted file to a plain name first.
