# Rung E, climb batch 35b: the logical equivalence of two booleans in the one library (row 184)

- problem: walk stops on `t EQV f` with an InterpreterBug, '** bug! Expect all oprefs to be top level EQV' (row 184, `explorations/fortress-gap-ledger.md:399`; the planner's run, `explorations/compile-ladder/plan-35/probes/fixes-35.md:28`), and the one library declares neither `EQV` nor `NEQV`, so the compiled path loses the prelude's operator at the switch-over (`explorations/compile-ladder/plan-35/probes/fixes-35.md:48`).
- spec: `Specification/basic-lib/booleans.tex:252-263` (trait `Fortress.Core.Boolean`, `opr ≡`, EQV) and `Specification/basic-lib/Fortress.NegatedOperators.tex:25-35` (`opr ≢`, NEQV, "applies ¬ to the result of ≡").
- precedent: the one library's boolean operators, top-level over two booleans, `Library/FortressLibrary.fsi:2784-2792` and `Library/FortressLibrary.fss:4914-4922` (`opr <->` at `:2792` and `:4922`); NEQV's body follows `opr =/=(a:Any, b:Any):Boolean = NOT (a=b)`, `Library/FortressLibrary.fss:98`.
- deviation: the two are top-level operators over two booleans where the specification and the prelude declare them as functional methods of `Boolean` (`Specification/basic-lib/booleans.tex:252`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:465-466`), as fork E1 sets, `explorations/coordinator/CLIMB-BATCH-35.md:458`.
- deviation: `NEQV` is declared over two booleans where the specification declares `≢` generic over `BinaryPredicate[\T, ≡\]`, `Specification/basic-lib/Fortress.NegatedOperators.tex:25-27`; the one library has no `BinaryPredicate` (grep of `Library/FortressLibrary.fsi` finds none).
- deviation: `EQV`'s body is `if a then b else NOT b end`, the form of `XOR` (`Library/FortressLibrary.fss:4914`), not `<->`'s `a=b` (`:4922`).
- historical: `Library/FortressLibrary.fsi:2793-2794`, `Library/FortressLibrary.fss:4923-4924`.

One launch worked this rung. Base `5a595515546edc5564515d4492ff4d44b5d07153`, whose code is the base build's `0a83a70498` (`git diff --name-only 0a83a70498 5a59551554` lists only the record, the skill and `docs/`). The worktree was seeded with `seed-worktree.sh`, exit 0.

## What changed and why

Two lines in each of the one library's api and component, after `opr <->`:

    Library/FortressLibrary.fsi:2793  opr EQV(a: Boolean, b:Boolean):Boolean
    Library/FortressLibrary.fsi:2794  opr NEQV(a: Boolean, b:Boolean):Boolean
    Library/FortressLibrary.fss:4923  opr EQV(a: Boolean, b:Boolean):Boolean = if a then b else NOT b end
    Library/FortressLibrary.fss:4924  opr NEQV(a: Boolean, b:Boolean):Boolean = NOT (a EQV b)

The parser reads `EQV`, `EQUIV` and `≡` as one operator, named `EQV`, and `NEQV` and `≢` as one, named `NEQV`, by the alias table that `ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java` holds, generated from `operators.txt` beside it (`EQUIV` at `:1250`, `≡` and `≢` at `:2107-2108`). `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:301-306` maps the same names only inside a character literal (`CharLiteralContent`, from `:198`). The specification gives `≡` on booleans: "returns true if both arguments are true or both arguments are false" (`Specification/basic-lib/booleans.tex:256-258`), and `≢` as `¬` of `≡` (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`). The one library's boolean operators are top-level operators over two booleans; the two join them in that form (fork E1), and the prelude gains nothing (P-37).

Commits: `6ca6cee9f7` (the library edit, `BooleanEquivalenceWalk`, `OneLibraryBooleanEquivalence`), `b37bc43aa7` (the XXX test of 1118), and this report's.

### Why walk failed two ways on the base

`≡` is a chaining operator, so the parser builds `t ≡ t` as a `ChainExpr`. Walk turns the chain desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:286-288`, `:491-492`), and the disambiguator checks the operator of an `OpExpr` (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:498-503`) but not a chain's links. So the undeclared `≡` loads, and `forChainExpr` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:437-469`) calls `getOp` (`:893-909`), which raises the bug for the unresolved reference. `≢` is not a chaining operator: it stays an `OpExpr`, which the disambiguator refuses before the run, 'Operator NEQV is not defined.' The compiled path desugars the chain first (`ProjectFortress/src/com/sun/fortress/compiler/PreDisambiguationDesugarer.java:96-97`), so its disambiguator refuses both. In the analysed tree of a probe, not kept, the `≡` link's `OpRef` had `_lexicalDepth=-2147483648` inside a `ChainExpr`.

## The tests: the failing runs and the passing runs

### `ProjectFortress/tests/BooleanEquivalenceWalk.fss` (walk)

Eight cases: `EQV` and `≡`, `NEQV` and `≢`, over the four pairs of booleans.

The first run on the base, before any library edit, echoed:

    Expected failure: BooleanEquivalenceWalk red, Tests run: 1, Failures: 1, at its first EQV with an InterpreterBug, '** bug! Expect all oprefs to be top level EQV'

and failed another way (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-boolean-equivalence/h1 ProjectFortress/tests/BooleanEquivalenceWalk.fss`):

    # harness-one 2026-11-23T18:33:02Z; tree 5a59551554; nproc=4; ... cache empty
    tmp/rung-boolean-equivalence/h1/tests/BooleanEquivalenceWalk.fss:12:12:
        Operator NEQV is not defined.
    Tests run: 1,  Failures: 1,  Errors: 0

The cause is the one above: the `NEQV` lines are refused before the run, so the run never reaches the first `EQV`. The test is right; the expectation was corrected, and the same command, on the base and before the edit, echoed:

    Expected failure: BooleanEquivalenceWalk red, Tests run: 1, Failures: 1, refused before the run by the disambiguator with 'Operator NEQV is not defined.' at each of its four NEQV lines (12 to 15); its EQV lines, chain expressions that the disambiguator does not check, would reach walk's getOp and its InterpreterBug

    # harness-one 2026-11-23T18:34:28Z; tree 5a59551554; ... cache filled
        Operator NEQV is not defined.
    Tests run: 1,  Failures: 1,  Errors: 0

The EQV half on the base, a direct run of a probe of `println(t EQV f)` alone (`bin/fortress -debug stacktrace EqvOnlyProbe.fss`, before the edit):

    com.sun.fortress.exceptions.InterpreterBug: .../EqvOnlyProbe.fss:6:13-14:
    ** bug! Expect all oprefs to be top level EQV

The planner's run of the EQV-only program through the harness gave the same, '** bug! Expect all oprefs to be top level EQV', `Tests run: 1,  Failures: 1` (`explorations/compile-ladder/plan-35/probes/fixes-35.md:28`).

After the edit, the same harness command:

    # harness-one 2026-11-23T18:38:29Z; tree 5a59551554; ... cache empty
    PASS
     OK (time = 9151ms)
    OK (1 test)

That run is on the edit as committed in `6ca6cee9f7`; no code changed after it (`b37bc43aa7` adds tests only).

### `ProjectFortress/one_library_tests/OneLibraryBooleanEquivalence` (compile, one library)

The checker accepts `t ≡ t`, `t EQV f`, `t ≢ f` and `f NEQV f` for two booleans under `FORTRESS_LIBRARY=one`. On the base, before the edit, `FORTRESS_LIBRARY=one ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh e-base ProjectFortress/one_library_tests OneLibraryComponents.test OneLibraryBooleanEquivalence.test` echoed:

    Expected failure: OneLibraryBooleanEquivalence's compile red, its static errors 'Operator EQV is not defined.' and 'Operator NEQV is not defined.', OneLibraryComponents green; FAILURES!!! with Tests run: 2, Failures: 1

and printed (the count 15, not 2: `OneLibraryComponents.test` counts its fourteen compiles):

    . compile ProjectFortress/one_library_tests/OneLibraryBooleanEquivalence ProjectFortress/one_library_tests/OneLibraryBooleanEquivalence.fss:8:12:
        Operator EQV is not defined.
    ProjectFortress/one_library_tests/OneLibraryBooleanEquivalence.fss:10:12:
        Operator NEQV is not defined.
    Tests run: 15,  Failures: 1,  Errors: 0

After the edit, the same command (`junit.sh e-edit`, tree `6ca6cee9f7`): `. compile ProjectFortress/one_library_tests/OneLibraryBooleanEquivalence  OK (time = 52ms)`, `OK (15 tests)`, and the jar `default_repository/caches-one/bytecode_cache/OneLibraryBooleanEquivalence.jar` written. Its last run, in `ant testOneLibrary` on `b37bc43aa7`:

    [junit]  compile .../ProjectFortress/one_library_tests/OneLibraryBooleanEquivalence  OK (time = 33ms)
    [junit] Tests run: 41, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 186.653 sec
    BUILD SUCCESSFUL

The onelibrary track had 40 tests at the last landed gate (`explorations/compile-ladder/climb-batch-35/gate/summary.txt:59`); 41 is that and this test.

No run test, as the section says. But the program runs compiled under the one library, by hand, against the track's jars (`cd ProjectFortress && FORTRESS_CACHES=$FORTRESS_HOME/ProjectFortress/test-caches/fast-onelibrary FORTRESS_LIBRARY=one ../bin/fortress run OneLibraryBooleanEquivalence`): `PASS`, rc 0. `EQV`'s body calls no `=`, so the run does not meet row 994 (`=` of two booleans), and the program prints no boolean (row 1098). A question for the curator below.

### `ProjectFortress/tests/XXXUndeclaredChainOperatorWalk` (walk, expected failure, 1118)

A program whose function, never called, applies `x APPROX y`, an equivalence operator that no declaration defines; its `.test` names the refusal, `load_exception_contains=APPROX is not defined.` Shown through the harness from its gated folder (`harness-one.sh $PWD/tmp/rung-boolean-equivalence/h2 ProjectFortress/tests/XXXUndeclaredChainOperatorWalk.fss ProjectFortress/tests/XXXUndeclaredChainOperatorWalk.test`):

- As it is: `Expected failure: XXXUndeclaredChainOperatorWalk, as it is, green as an expected failure, ' Saw expected failure: loaded and ran, not refused at load', OK (1 test)`, then `loaded`, ` Saw expected failure: loaded and ran, not refused at load`, `OK (1 test)`.
- On a deliberate fix for one run, the line `farFrom(y: ZZ32): Boolean = APPROX y` added, a prefix `OpExpr` that the disambiguator does check, then removed (`cmp` with the kept copy: restored): ` Refused at load as its keys name`, `Operator prefix APPROX is not defined.`, `FAILURES!!!`, `Tests run: 1,  Failures: 1,  Errors: 0`. Red.
- An earlier key, `Operator APPROX is not defined.`, made the deliberate run red by a mismatch ('Refused at load, but did not satisfy load_exception_contains'), since the prefix use is refused 'Operator prefix APPROX is not defined.'; the key now names the refusal in either fixity.

## Row 184's own program, and the other programs

Row 184's program, `a ≡ b` for two `Pt(1)` of `object Pt(x: ZZ32)` (the planner's `P35EqvObjectWalk` but its name), on `6ca6cee9f7` (`bin/fortress EqvObjectsRow184.fss`, a private caches folder):

    com.sun.fortress.exceptions.ProgramError: .../EqvObjectsRow184.fss:7:11-15:
    Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt

A dispatch error, walk's form of a type error, in place of the InterpreterBug, as fork E1 says. The compiled path refuses the same program statically, against the one library (`FORTRESS_LIBRARY=one bin/fortress compile EqvObjectsRow184.fss`) and against the prelude alike:

    Could not check call to operator EQV
    - (Boolean, Boolean)->Boolean is not applicable to an argument of type (Pt, Pt).

The program over AplCore, in the worktree's scratch and not kept, with `FORTRESS_SOURCE_PATH` as `explorations/apl/rung-1/Rung1.fss:9-11` gives it, on the final tree: `println(≢ x)`, `println(x ≡ x)`, `println(x ≡ y)` for `x: RR64 = 3.0`, `y: RR64 = 4.0`, then `println(t EQV f)` and `println(t NEQV f)`.

- With an empty private caches folder, walk refuses at load an overload pair that is not mine: `StandardPartialOrder`'s `<` (`Library/FortressLibrary.fss:231`) beside AplCore's `<` over two `Array3` (`explorations/apl/base/AplCore.fss:1404-1405`), 'fails the Meet Rule', from `BuildTopLevelEnvironments.for_RewriteFnOverloadDecl` (`-debug stacktrace`). This is walk's cold-cache overload check (row 342), which the APL experiments record for the first component that imports `AplCore` directly (`explorations/apl/gaps.md:158`, their row 82; rows 97 and 98).
- With the same folder filled, the same command prints:

      1.0
      1.0
      0.0
      false
      true

  The first three are the base's, '1.0', '1.0' and '0.0' (the section's run before the launch); `false` is `t EQV f` and `true` is `t NEQV f`. AplCore's seven infix `≡` over `RR64`, `Vector` and `Matrix` (`explorations/apl/base/AplCore.fss:207-224`) and its prefix `≢` (`:226-228`) load beside the library's two: a prefix and an infix declaration differ in their number of parameters, and `Boolean`, a value object, excludes `RR64` and the array traits.

An undeclared chaining operator, on my tree (the edit does not reach it): `println(a APPROX b)` for two `Pt(1)` (`bin/fortress UndeclaredChainOp.fss`), rc 1, '** bug! Expect all oprefs to be top level APPROX'; compiled, against the prelude and against the one library, rc 255, 'Operator APPROX is not defined.' This is 1118.

No program ran on the old code (`old-fortress.sh`): the base's runs above are this worktree's before the library edit.

## Where the fix belongs, and the precedent

`explorations/coordinator/map/modules-and-phases.md`, B.13: walk's default library is `AnyType`, `FortressLibrary` and `FortressBuiltin`, so a top-level operator of `FortressLibrary` reaches every program, and at the switch-over the compiled path reads the same. The one library's boolean operators are its top-level `XOR`, `OR`, `AND`, `NOT`, `->` and `<->` (`Library/FortressLibrary.fsi:2784-2792`); `Boolean` itself declares no operator (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:184-186`). The two go after `<->`. No precedent repaired this defect: the one library declared no `EQV` before (grep of `Library/` and `ProjectFortress/LibraryBuiltin/` finds only the prelude's, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:465-466` and `Library/CompilerLibrary.fsi:31`). The planner's hack (`explorations/compile-ladder/plan-35/probes/fixes-35.md:59-67`) put `opr ≡(a: Boolean, b:Boolean):Boolean = a=b` in the same place.

## What the specification settles

The specification declares `≡` on booleans, and `≢` as its negation (above), so row 184's specification cell, "silent", is wrong; its rewrite cites them. A name not in scope is a static error (`Specification/basic/declarations.tex:416-419`, "Reach and Scope of Declarations"), which settles 1118: walk should refuse the program before the run. An observation, not measured: the prelude's `Library/CompilerLibrary.fss:71` declares `opr NEQV(a:Any, b:Any) = NOT (a === b)`, a strict non-equivalence under the name of `≢`, which the specification gives to `¬(≡)`; strict non-equivalence is `NSEQV` (`Specification/basic-lib/Fortress.NegatedOperators.tex:17-23`). P-37 deletes that file at the switch-over, and the one library follows the specification.

## The stages

Every path the edit adds or changes: `git diff --name-only 5a59551554` lists `Library/FortressLibrary.fsi` and `.fss`, so both stages ran, once, on `b37bc43aa7`, whose code is `6ca6cee9f7`'s; no code changed after either started.

- The count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-boolean-equivalence/checker-count-postedit.txt tmp/rung-boolean-equivalence/cc-post`, started 18:53:34Z): `diff explorations/compile-ladder/climb-batch-35/gate/checker-count.txt tmp/rung-boolean-equivalence/checker-count-postedit.txt` prints nothing, rc 0: every api 0, `#total 0`, `#crash none`, `#shadow matches the tracked StaticChecker`.
- The distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-boolean-equivalence/distance-postedit.txt tmp/rung-boolean-equivalence/dist-post`, started 18:55:01Z): `#total 0`, `#crash none`, `#seconds 115 FortressLibrary 73`. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-35/gate/distance.txt tmp/rung-boolean-equivalence/distance-postedit.txt` prints `DISTANCE SAME   0`. `dist-post/errors.tsv` holds only its header, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved.

The edit touches no Scala of the checker, so "The checker's time" does not apply.

## Suites, the ladder subset, and what was not run

- The edit is of the library only: no whole suite but `ant testOneLibrary` (above, `BUILD SUCCESSFUL`, 41 tests, 0 failures, `Total time: 3 minutes 34 seconds`).
- The ladder subset is empty. No first error in the baseline's `raw/` or the newest landed `explorations/compile-ladder/climb-batch-35/gate/ladder/ladder.tsv` names `EQV`, `NEQV`, `≡` or `≢` (`grep -rl -E 'EQV|NEQV|≡|≢' explorations/compile-ladder/baseline-2026-09-19/raw explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` and the same over the landed table print nothing), and the ladder's drivers compile against the prelude (`explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh:53-61`), which reads neither edited file.
- The demos and microGPT's checks are the gather's and the commit stage's, as the brief says. microGPT's components declare and apply no `≡` or `≢`: the APL program's `≢` is inside `apl⦇ ⦈`, which its grammar expands to `tally((r))` (`explorations/apl/mg/AplMgSyntax.fsi:255`).

## Sentences of the specification made false

None. `grep -rn '~184' Specification --include=*.tex` prints nothing; Appendix I and the two chapters hold no `\revision` or `\note{}` on `≡` or `≢` (`grep -rn -P 'revision\{|\\note\{' Specification/basic-lib/booleans.tex Specification/basic-lib/Fortress.NegatedOperators.tex` prints nothing). Outside the specification, the skill's sentence "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." (`.claude/skills/fortress-repo/references/revival-changes.md:57`) is made false; see "Revival change" in `record.md`.

## Points to report

1. The declarations as written, and their place: `Library/FortressLibrary.fsi:2793-2794`, `Library/FortressLibrary.fss:4923-4924`, after `opr <->`.
2. The tests, each failing on the base and passing after: `BooleanEquivalenceWalk` and `OneLibraryBooleanEquivalence`, above; row 184's own program after the change: 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt' under walk, 'Could not check call to operator EQV' compiled.
3. The program over AplCore on the final tree: '1.0', '1.0', '0.0', 'false', 'true' with a filled cache, the base's three first; with an empty cache, walk's known cold-cache refusal of AplCore's `<` (row 342).
4. Row 184 as rewritten: in `record.md`, then closed.
5. The onelibrary track: 41 tests, 0 failures; the count and the distance on the final tree: the same as the landed tables, 0 and 0.
6. A file edited beyond those named: `ProjectFortress/tests/XXXUndeclaredChainOperatorWalk.fss` and `.test`, a test of 1118, a defect beside row 184 that this rung measured; a test, as the section's "your tests", but not of row 184.

None holds the push.

## Decisions

1. **The form and the place: two top-level operators over two booleans, after `opr <->`** (fork E1). Ways not taken: functional methods of `Boolean`, as the specification (`Specification/basic-lib/booleans.tex:252`) and the prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:465-466`) write them, where the one library's `Boolean` declares no operator (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:184-186`); a generic `≢` over `BinaryPredicate` as `Specification/basic-lib/Fortress.NegatedOperators.tex:25-27`, which the one library has no trait for; a declaration in the prelude (P-37); a change of walk's Java (the section: "Not ... walk's Java").
2. **`EQV`'s body: `if a then b else NOT b end`**, `XOR`'s form (`Library/FortressLibrary.fss:4914`). Ways not taken: `a=b`, `<->`'s body and the planner's hack, and `a <-> b`, which call `=` on two booleans, which dies compiled under the one library (row 994, 'NoClassDefFoundError: FortressLibrary'); `a SEQV b`, a native (`:4911-4912`) where the boolean family uses none. Evidence: the program compiled against the one library runs, `PASS` (above).
3. **`NEQV`'s body: `NOT (a EQV b)`**, the specification's definition (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`) in the form of the one library's `=/=` (`Library/FortressLibrary.fss:98`). Ways not taken: `a XOR b` or `XOR`'s body, the same values by `Specification/basic-lib/booleans.tex:243-245`, but not the definition.
4. **The names spelled `EQV` and `NEQV`, the line spaced as `<->`'s,** as the family spells `XOR`, `OR`, `AND`, `NOT` in ASCII. Way not taken: the glyphs `≡` and `≢`, one operator to the parser (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:301-306`).
5. **The walk test is a new file, `BooleanEquivalenceWalk.fss`, as the section names it.** Way not taken: new lines in the team's `ProjectFortress/tests/BooleanOps.fss`, which tests the boolean operators through `binop` (the skill's "Add a new case to the test that already asserts cases of its kind"); that is a team test's edit, and the section names the file.
6. **No run test in `one_library_tests/`,** as the section says, though the program runs compiled by hand (`PASS`). Way not taken: an `OneLibraryRunBooleanEquivalence` run test; a question for the curator.
7. **Row 184 rewritten then closed, with walk's mechanism a new row, 1118,** with the class `library gap vs spec (library)` for 184. Ways not taken: row 184's claim widened to every undeclared chaining operator and left open; its class kept `implementation gap (walk)`. Evidence: after the edit no program meets the InterpreterBug at `≡`, and `APPROX` still meets it (above).
8. **1118's home: a gated XXX test (home 2), in the form of a missed refusal at load:** the undeclared operator in a function that the run never calls, so today's program loads and runs clean, and a fix of walk turns it red. Ways not taken: a row only (home 3), since the specification settles it; a test that calls the function, which crashes after load, which an XXX test with load keys reports red ('Failed after load', `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:473-515`); a fix of the disambiguator, a phase that both paths run and not this rung's.
9. **The key `APPROX is not defined.`,** which names the refusal in either fixity. Way not taken: `Operator APPROX is not defined.`, the compiled path's message, which the deliberate fix's prefix refusal did not match (above).
10. **The ladder subset empty,** by the rule of the skill's gate.md (no recorded first error names what the change touched). Way not taken: a subset run of the boolean programs, which compile against the prelude.
11. **The AplCore program reported at both cache states.** Way not taken: the empty-cache run alone, which shows a refusal that the edit does not reach.

## Defects, and their homes

- Row 184, walk's InterpreterBug at `≡`, the library's missing declarations: home 1, repaired; `BooleanEquivalenceWalk` and `OneLibraryBooleanEquivalence` assert it. The row is rewritten, then closed.
- 1118, walk loads an undeclared chaining operator, and a call meets the InterpreterBug: home 2, deferred, the specification settles it (`Specification/basic/declarations.tex:416-419`); `ProjectFortress/tests/XXXUndeclaredChainOperatorWalk`.
- The cold-cache refusal of AplCore's `<`: not new, row 342 (rows 97 and 98; the APL experiments' gaps row 82).
- The seeding tool copies `ProjectFortress/build` and not `ProjectFortress/build-one` (`explorations/coordinator/tools/seed-worktree.sh:86-93`): in the seeded worktree a compiled run under `FORTRESS_LIBRARY=one` stopped, 'java.lang.Error: The type ZZ of the library that the compiled path reads is not compiled over com.sun.fortress.compiler.runtimeValues.FZZ of the run-time classes on the class path', and the first `ant` target printed 'Sources and build as the last build left them? no', rebuilt the Scala and emptied both seeded caches ('Caches .../default_repository/caches started again, empty', the same for `caches-one`), since the implementation's stamp covers `build-one` (`build.xml:400-402`, `:469-470`). A defect of a coordinator tool, not of the tree: no ledger row; handed over for FACTS in `record.md`, and a question for the curator.

## For the curator

- A one-library run test of `EQV` and `NEQV` can pass now: the section's reason for none (rows 994 and 1098) does not reach a program that calls no `=` and prints no boolean, and `OneLibraryBooleanEquivalence` runs compiled, `PASS`. Add one?
- `seed-worktree.sh` does not copy `ProjectFortress/build-one`, so the skill's "Without the warning, `ant compileAll` keeps the seeded caches" (`.claude/skills/fortress-repo/references/worktrees.md:45`) does not hold, and a by-hand compiled run under the one library fails in a seeded worktree until an `ant` target builds it. The tool is not this rung's to edit.

## Commands worked out

- A compiled one-library run by hand in a seeded worktree needs `ProjectFortress/build-one`, which only an `ant` target builds; after `ant testOneLibrary`: `cd ProjectFortress && FORTRESS_CACHES=$FORTRESS_HOME/ProjectFortress/test-caches/fast-onelibrary FORTRESS_LIBRARY=one ../bin/fortress run <Component>`.
