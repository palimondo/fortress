# Rung G (`rung-codegen-where`): the code generator's header `where` clauses

problem: the code generator refuses every function, method, object and trait declaration whose own header carries a `where` clause, measured on `XXXWhereBoundChecker` ('Don't know how to compile this kind of FnDecl.') and `XXXNatOpenRun` ('Can't compile TraitDecl NatParamT'), and on five of the library's walls (row 701; F-181; ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2967, :4107, :5027 at b0f6cd6b7)
spec: "Static parameters may have constraints placed on them in a \KWD{where} clause." and "Object or functional declarations may include \KWD{where} clauses, under the same restriction." (Specification/basic/trait-parameters.tex:332-333, :497); the clause states conditions on static parameters only, so nothing of it is run (Specification/basic/trait-parameters.tex:332-358)
precedent: a guard condition retired once its construct compiles: the revival deleted the code generator's refusal of a mutable top-level binding ("mutable bindings not yet handled") in `4d419c9e8`, and the team commented out five conditions of these same guards (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2970, :4105, :4106, :4110, :4112 at b0f6cd6b7)
deviation: the three conditions deleted, where the team commented out its five; no other line of the code generator changed, and nothing departs from the specification's spelling (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2966-2972, :4103-4111, :5022-5027)
historical: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2967, :4107, :5027 at b0f6cd6b7 (the team's guards, at :2936, :4075, :4982 of a874948ac); the tests renamed and changed, XXXWhereBoundChecker and XXXNatOpenRun, are the revival's (both added in 7fd8fddc8)

## 1. What changed, and why

The three guards of `compiler/codegen/CodeGen.java` lose their `header.getWhereClause().isNone() &&` condition: `forFnDecl` (base `:2967`), `forObjectDeclPrePass` (base `:4107`) and `forTraitDecl` (base `:5027`). Each keeps its contract condition, `header.getContract().isNone()` (now `:2970`, `:4107`, `:5026`), and the object's and trait's throws conditions (`:4106`, `:5025`). Nothing is emitted for a `where` clause: its constraints are the checker's, which checks them before the code generator runs (fork 12). Nothing else in `CodeGen` was needed for the emission: the code generator already extends its type analyzer with a declaration's `where` clause (`CodeGen.java:1878`, `:5103`), and a generic declaration is compiled as a template whatever its clause. The diff is three deleted lines (`git diff b0f6cd6b7 -- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`).

So a function whose `where` clause bounds its type parameter, a method of a generic trait or object whose `where` clause bounds the type's parameter (`SumReduction`'s `distribute`, `BoundedRange.atMost`), an object's own `where` clause, a trait's dotted and functional methods with bodies under such a clause, a generic method's clause on its own parameter, and a trait whose `comprises` clause lists a generic object at a `where`-clause type variable (`AnyList`'s form) all compile, link and run. A trait that lists a type at a `where`-clause size (`NatParam`'s form) now compiles too; a call that opens such a value to its size then fails the JVM's verification (row 307's wall behind this one).

The commits, on `wip/rung-codegen-where`: `eb2aba6b4` (three tests, the promotion), `41b9326ec` (the object test), `11ee497b1` (the fix and the run pair), `9173ceb89` (the contract `XXX` test), `db22125d9` (the trait-method test), and the report's and record's commits after them.

## 2. The tests, failing then passing

Machine for every run: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=4` (junit.sh's header), load at start 0.3 to 0.5.

The tests, all in `ProjectFortress/compiler_tests/`, each a `.test` with `compile`, `link`, `run` and `run_out_contains=PASS`, each program asserting its values with `assert` and printing `PASS` last:

- `WhereBoundFunctionCompiled` (promoted from `XXXWhereBoundChecker`, with `git mv`): `g[\U\](u: U): String where { U extends T } = u.f()`, `g(O)` asserted `"O"`.
- `WhereBoundMethodCompiled`: `trait Shelf[\T\]` with the abstract `title(): String where { T extends Named }` (`atMost`'s form), `object Box[\T\](v: T)` giving its body and `bump(k: ZZ32): ZZ32 where { T extends Named }` (`distribute`'s form), called on the object and through a `Shelf[\Cat\]`.
- `WhereBoundObjectCompiled`: `object Wrap[\T\](x: T) where { T extends Shows }`, the object guard's case.
- `WhereBoundTraitMethodCompiled`: a trait's dotted and functional methods with bodies under a `where` clause on the trait's parameter, and a generic method `pick[\U\](u: U): String where { U extends Named }` of a generic object.
- `ComprisesWhereFunctionalMethodCompiled`: `trait AnyBox comprises { Box[\E\] } where [\E\]` with `weight(self)` and `opr ||(self, other: AnyBox)` bodies in the trait, called through values typed `AnyBox` at `Box[\ZZ32\]` and `Box[\String\]`.
- `XXXNatOpenRun` with `NatOpenRunLink.test` (`link`) and `XXXNatOpenRun.test` (`run`, `run_out_contains=REACHED`): the run pair for row 307.
- `XXXFunctionContractCodeGeneration` (`compile`, `compile_exception_contains=Don't know how to compile this kind of FnDecl`): row 701's contract half, its new reproducer.

**The failing runs, on the base's code, before the edit was first built** (the build started at 12:47:48 UTC):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests WhereBoundFunctionCompiled.test WhereBoundMethodCompiled.test ComprisesWhereFunctionalMethodCompiled.test XXXNatOpenRun.test
    # junit.sh base 2026-10-31T12:46:01Z; ...
    ProjectFortress/compiler_tests/WhereBoundFunctionCompiled.fss:12:1-51:
        Don't know how to compile this kind of FnDecl. node = g[\U\](u:U):String
    ProjectFortress/compiler_tests/WhereBoundMethodCompiled.fss:18:3-67:
        Don't know how to compile this kind of FnDecl. node = title():String
        Can't compile TraitDecl AnyBox at ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodCompiled.fss:5.1
    . compile ProjectFortress/compiler_tests/XXXNatOpenRun com.sun.fortress.exceptions.CompilerError:
     OK Saw expected exception
    Tests run: 10,  Failures: 9,  Errors: 0

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-object ProjectFortress/compiler_tests WhereBoundObjectCompiled.test
    # junit.sh base-object 2026-10-31T12:47:21Z; ...
        Can't compile ObjectDecl Wrap at ProjectFortress/compiler_tests/WhereBoundObjectCompiled.fss:11.1
    Tests run: 3,  Failures: 3,  Errors: 0

The first base run of the method test, at 12:45:40 UTC, failed for another reason: its method was named `label`, a keyword ('Missing label from a label expression.'); it was renamed `title` and run again at 12:46:01 above. `WhereBoundTraitMethodCompiled` was written after the fix, from a probe (section 5), and seen failing on the old code through the base build's harness:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/WhereBoundTraitMethodCompiled.test
    (12:55:41 UTC)
    /home/user/fortress-codegen-where/ProjectFortress/compiler_tests/WhereBoundTraitMethodCompiled.fss:19:3-73:
        Don't know how to compile this kind of FnDecl. node = pick[\U\](u:U):String
    Tests run: 3,  Failures: 3,  Errors: 0

**The old `XXXNatOpenRun.test` red on the fix, before it was changed** (which shows the trait guard gone):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fix1 ProjectFortress/compiler_tests WhereBoundFunctionCompiled.test WhereBoundMethodCompiled.test WhereBoundObjectCompiled.test ComprisesWhereFunctionalMethodCompiled.test XXXNatOpenRun.test
    # junit.sh fix1 2026-10-31T12:50:10Z; ...
    . compile ProjectFortress/compiler_tests/XXXNatOpenRun
     Saw failure, but did not satisfy compile_exception_contains; expected
    Can't compile TraitDecl NatParamT
    Tests run: 13,  Failures: 1,  Errors: 0

**The run pair, its two runs.** As it is, in the last run below: '. link ProjectFortress/compiler_tests/XXXNatOpenRun  OK', '. run ProjectFortress/compiler_tests/XXXNatOpenRun (274ms) REACHED', 'Caused by: java.lang.VerifyError: Bad type on operand stack', 'Type 'XXXNatOpenRun$NatParamT' (current frame, stack[1]) is not assignable to 'XXXNatOpenRun$Nt?n#6?'', 'Saw expected failure (Exit code != 0)'. With the failing call replaced by `assert(3, 3, ...)` for one run, then restored:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh deliberate ProjectFortress/compiler_tests NatOpenRunLink.test XXXNatOpenRun.test
    # junit.sh deliberate 2026-10-31T12:51:20Z; ...
    . run ProjectFortress/compiler_tests/XXXNatOpenRun (309ms) REACHED
    PASS
    Did not see expected failure
    Tests run: 2,  Failures: 1,  Errors: 0

**The contract `XXX` test, its two runs** (12:54:20 and 12:54:22 UTC, `junit.sh contract` and `contract-deliberate`): as it is, '. compile ProjectFortress/compiler_tests/XXXFunctionContractCodeGeneration com.sun.fortress.exceptions.CompilerError:', ' OK Saw expected exception', 'OK (1 test)'; with its `requires` clause removed for one run, then restored, ' Saw failure, but did not satisfy compile_exception_contains; expected', 'Don't know how to compile this kind of FnDecl', 'Tests run: 1,  Failures: 1,  Errors: 0'. A direct compile of the same program prints '…:5:1-49: Don't know how to compile this kind of FnDecl. node = twice(n:ZZ32):ZZ32', at `CodeGen.forFnDecl(CodeGen.java:2975)`.

**The passing run, the last after the last change of code:**

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests WhereBoundFunctionCompiled.test WhereBoundMethodCompiled.test WhereBoundObjectCompiled.test WhereBoundTraitMethodCompiled.test ComprisesWhereFunctionalMethodCompiled.test NatOpenRunLink.test XXXNatOpenRun.test XXXFunctionContractCodeGeneration.test
    # junit.sh final 2026-10-31T12:55:56Z; ...
    . run ProjectFortress/compiler_tests/WhereBoundFunctionCompiled (520ms) PASS
    . run ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodCompiled (511ms) PASS
    OK (18 tests)

## 3. Where the fix belongs, and the precedent search

The place: the feature table's row for `where` clauses names the code generator's three guards and no other site (`explorations/coordinator/map/spec-to-implementation.md:237`, its codegen cell; its line numbers are from September and stale, the guards found by grep at `:2967`, `:4107`, `:5027`). The checker already checks every form the code generator now meets (P-151; the skill's `compiler.md`, "The checker's gaps"), and a `where` clause asks nothing at run time, so the code generator is where the refusal lives and where it goes. `CodeGen` reads a `where` clause elsewhere only to extend its type analyzer (`CodeGen.java:1878`, `:5103`) and to print an `extends` entry (`:215`); `OverloadSet`, `NamingCzar` and `runtimeSystem/` read none (grep for `getWhereClause` and `WhereClause`).

The ways the implementation offers:

1. Drop the condition at the three guards and emit nothing for the clause (chosen; fork 12).
2. Drop it only for P-151's three forms (a function's or method's condition, `AnyList`'s `comprises` form) and keep refusing an object's or trait's own constraint on its static parameters, which P-151 does not list as built. Not taken: fork 12 drops all three conditions, and the checker reads a trait's or object's own constraint where its type is used (the skill's `compiler.md`, "The checker's gaps"), so the code generator would refuse a program the checker accepts and the specification allows (`trait-parameters.tex:497`).
3. Emit a run-time check of the constraints. Not taken: they are static, and the specification states no check at run time.
4. Strip the clause in a desugarer before the code generator. Not taken: more code, in a phase that walk also runs.

The precedent: the same guards hold five conditions the team retired by commenting them out once the construct compiled (`CodeGen.java:2970`, the throws clause, with its 2011 note; `:4105`, `:4106`, `:4110`, `:4112` in the object guard, at b0f6cd6b7); the revival deleted the code generator's refusal of a mutable top-level binding outright in `4d419c9e8`. I deleted the three lines (decision 1).

## 4. What the specification settles

A `where` clause places constraints on static parameters (`trait-parameters.tex:332-337`), may introduce `where`-clause variables (`:340-344`), and may be carried by object and functional declarations (`:497`); P-151 decides which forms the tree builds. So a program that declares such a clause and passes the checker should compile. The specification is silent on the code generator. A function's contract is `functions.tex`, section "Function Contracts", whose `requires` clause, when it does not hold, throws `CallerViolation`; walk does so (section 5).

## 5. Programs run old against new, and the probes

- The five run tests: each failed on the base's code at its guard (section 2) and passes on the fix.
- `XXXNatOpenRun`: on the base its compile stops, 'Can't compile TraitDecl NatParamT'; on the fix it compiles and links, and its run fails verification.
- Probes, not tests, under `tmp/` of the worktree, compiled on the fix with a private copy of the caches:
  - `NatOpenProbeA`, `XXXNatOpenRun`'s program with `println("REACHED")` before `assert(size(mk()), 3, …)` in `run()`: the run ends 'java.lang.VerifyError: Bad type on operand stack', 'Location: NatOpenProbeA.run()…', and prints no `REACHED`, since the component's class fails verification when it loads. With the call in an object's method (`NatOpenProbeB`), `REACHED` prints and the VerifyError is at 'NatOpenProbeB$Opener.opened?()…'. Hence the pair's program (decision 5).
  - `WhereFormsProbe`: a trait's default dotted and functional methods under a `where` clause, a generic method's clause on its own parameter, and a top-level `pickTop[\U, V\](u: U, v: V): String where { U extends Named, V extends Named }`: compiled and printed 'shelf of cat', 'shelf of cat', 'tag cat', 'pick cat', 'catcat', 'PASS'. Its first three became `WhereBoundTraitMethodCompiled`.
  - Row 812: `ComprisesWhereFunctionalMethodChecker`'s program, compiled on the fix: 'Row812Probe.fss:11:33: E is not in the kind env [][]'. The crash stands, as before the guard.
  - Row 812's other shape, the same program with `cat`'s body in the object `Ci[\E\]` only and none in the trait `C[\E\]` (`Row812ObjProbe`): on the old code, 'Can't compile TraitDecl AnyC at …Row812ObjProbe.fss:4.1'; on the fix it compiles and its run prints 'PASS'.
  - Walk on a function contract, `twice(n: ZZ32): ZZ32 requires { n >= 0 } = n + n`: 'met: 6', and `twice(-1)` in a `try` catching `CallerViolation` printed 'CallerViolation'. So walk checks a function's `requires` clause.
- A subset of the compiler track, by reading which tests my change can reach: every `compiler_tests/*.test` with `compile`, `link` or `run` whose program holds the word `where`, and the four that pin a guard message (`XXXObjExprRungS`, `XXXOverrideModifierCodeGeneration`, `XXXTryAtomicCodegenRungB`, `XXXVarargsCodeGeneration`): 35 files, in one JVM, `junit.sh subset` at 12:52:14 UTC, 'OK (55 tests)'. No verdict changed. The `typecheck` tests, `CondExtendChecker`, `ComprisesWhereFunctionalMethodChecker`, `OpenTypeWhereConstraintChecker` and their siblings, run only the checker, which this rung does not change. The tracks themselves are the gate's (fork 9).

## 6. Suites, stages, ladder, demos

- Whole suites: none. The edit is of the code generator, after which the skill asks for the rung's own tests and leaves the tracks to the gate (`references/tests-running.md`, "When to run a whole suite"; fork 9). The four-thread atomic runs are not asked for: the change is not near transactions, top-level mutable state or the class loader's first load (`references/compiler.md`, "Testing an edit here").
- The count stage and the distance stage: run neither. They run the checker, not the code generator, and the checker's code is unchanged (fork 10). The paths changed: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/compiler_tests/` and this folder. No speed pass (fork 14).
- The ladder subset: empty. No file's recorded first error names a `where`-clause guard: of the baseline's 410 files (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`), the 21 at `codegen` stop at varargs, `LetFn`, `ObjectExpr`, `Label`, `AsIfExpr`, tuple bindings, a duplicate jar entry, `emitDesc` and an `OptionUnwrapException`, none at "Don't know how to compile this kind of FnDecl" or "Can't compile TraitDecl/ObjectDecl" (grep of the file); the newest landed `ladder.tsv` (`compile-ladder/climb-batch-23/gate/ladder/ladder.tsv`) has its 85 at `pass`; every microGPT component stops at `disambiguate` (`climb-batch-23/gate/ladder/microgpt-phase.md`).
- The demos: not run; the edit is not of walk, the parser, a shared phase, a helper or the library.
- The library order ran after the build ('Caches …/default_repository/caches started again, empty'); its five compiles exit 0 and the five jars are there. The compiler's prelude holds no declaration with a header `where` clause (grep of its five sources finds the word only in comments).

## 7. Sentences made false

The specification (Appendix I Effects; the gather corrects them, since the rung edits no `Specification/` file):

- `Specification/appendices/changes.tex:255-257`, entry "Conditional extension", Effect: "The code generator compiles a declaration whose \KWD{extends} clause has such a clause; it refuses one that carries a \KWD{where} clause of its own (row~701)." Its second half is false.
- `Specification/appendices/changes.tex:1672-1673`, entry "The traits that extend a closed trait", Effect: "The code generator does not yet compile a trait with a \KWD{where} clause or read a size off an argument at a call (rows~307 and~701)." Its first half is false; the second stays true (row 307).
- `Specification/appendices/changes.tex:4268-4271`, entry "The index type of a subscript", Effect: "The code generator refuses a method with a \KWD{where} clause of its own (row~701 of the revival's gap ledger), so after the switch-over \TYP{BoundedRange}'s \VAR{atMost} waits on that row, beside the two \VAR{distribute} methods of \library's sum reduction." False.

The record and the skill (the gather's and the skill writer's):

- F-181 (`explorations/coordinator/FACTS.md:249`): "The code generator refuses every function, method, object and trait declaration that carries a `where` clause in its own header" (record.md gives its rewrite).
- F-34 (`FACTS.md:31`): "the kinds include … a header `where` clause (row 701)", a measurement at `2bff2fe23`; the kind is gone from the code generator.
- F-281 (`FACTS.md:120`): "such a program still stops in the code generator (row 812; row 701)": row 701's half is false; row 812's stands where a listed generic type gives a member's body.
- F-270 (`FACTS.md:206`): "The code generator does not compile such a trait: "Can't compile TraitDecl NatParamT" (row 307; `compiler_tests/XXXNatOpenRun`).": the trait compiles, and the call that opens its size fails verification (added by the skeptic, `SKEPTIC.md`).
- P-151 (`POSITIONS.md:63`): "Row 701: the code generator's half."
- P-156 (`POSITIONS.md:67`): "the code generator refuses a `where` clause in a declaration's header", and "after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)".
- `PLAN.md:59`: "a header `where` clause (row 701)" among the code generator's kinds; `PLAN.md:249`: "and the code generator's half (row 701), in phase 4 before the names batch".
- The skill: `references/revival-changes.md:67`, "The code generator refuses a declaration with a `where` clause of its own (row 701)."; `references/compiler.md:44`, "It also refuses a function, method, object or trait declaration with a `where` clause of its own"; `references/compiler.md:103`, "only the checker reads it, and the code generator refuses such a declaration (ledger row 701)"; `references/compiler.md:110`, "A program that declares such a trait does not compile: the code generator refuses the trait's `where` clause (ledger row 701)."
- Row 701's claim (record.md gives its new line); row 812's claim, "before its refusal of a `where` clause (row 701)", and its notes' "With the member in the object only, row 701's 'Can't compile TraitDecl'" (record.md gives its new line); row 677's notes, "The reproducer `XXXWhereBoundChecker` now stops in the code generator and is keyed on row 701's wall." (record.md gives its new line, the row staying `FIXED`); row 307's notes, "To run, the code generator must compile `NatParam`, whose `comprises` clause binds a `where`-clause size … (row 701)" (record.md gives its new line).

## 8. Points to report

- Each guard changed: `forFnDecl`, `forObjectDeclPrePass`, `forTraitDecl`, their `header.getWhereClause().isNone() &&` lines deleted (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2967`, `:4107`, `:5027` at b0f6cd6b7; now `:2966-2972`, `:4103-4111`, `:5022-5027`). Nothing else in `CodeGen` was needed.
- The tests before and after through `junit.sh`, and the run pair's two runs: section 2.
- Compiled tests whose verdict changes: in the subset of 35 run (section 5), none; the old `XXXNatOpenRun.test` turned red as intended and was replaced by the pair; `XXXWhereBoundChecker` is promoted. The compiler track itself was not run.
- Row 701's rewritten line and row 307's: record.md. Row 307 gets a whole new line, not a note (decision 6). Row 812 gets a whole new line too, since its claim and notes name the refusal this rung removes, and row 677, `FIXED`, one whose notes name the promoted test by its old name.
- Every sentence made false: section 7.
- Files edited beyond those named: none outside `CodeGen.java` and `compiler_tests/`; no checker Scala. Three tests beyond the brief's list, in `compiler_tests/`: `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `XXXFunctionContractCodeGeneration` (decisions 3, 4, 7).

## 9. Decisions

1. **The three conditions deleted, not commented out.** Ways not taken: comment each out, as the team retired five conditions of the same guards (`CodeGen.java:2970`, `:4105`, `:4106`, `:4110`, `:4112` at b0f6cd6b7). Evidence: the revival deleted a code-generator refusal in `4d419c9e8`; the skill keeps provenance in commits and reports, not in source comments (`references/committing.md`).
2. **Nothing emitted for a `where` clause** (fork 12). Ways not taken: a run-time check of the constraints; a desugaring that strips the clause; keeping the refusal for forms P-151 does not list (section 3, ways 2 to 4).
3. **A test of the object guard, `WhereBoundObjectCompiled`, beyond the brief's list.** Ways not taken: leave the object guard's change untested, since none of the brief's programs reaches it (each of them stops at the function or the trait guard); or keep the object guard's condition. Evidence: the base run's 'Can't compile ObjectDecl Wrap'. An object's own constraint is not among P-151's three forms; the checker reads it (`references/compiler.md`, "The checker's gaps"), and fork 12 drops the condition.
4. **`WhereBoundTraitMethodCompiled` added after the fix**, from the forms probe, seen failing on the old code through the base build's harness. Ways not taken: leave the trait default method, the functional wrapper and the generic method under a clause (`generateTraitDefaultMethod`, `functionalMethodWrapper`, `generateGenericMethod`) to the probe alone.
5. **`XXXNatOpenRun`'s failing call moved into an object's method**, so that `REACHED` prints before the class that fails verification loads. Ways not taken: the call left in `run()` with `run_out_does_not_contain=REACHED`, the skill's form for a run that dies before `run()` prints (`references/tests-writing.md`, "Writing an `XXX` test"), against the brief's `run_out_contains=REACHED`. Evidence: `NatOpenProbeA` (section 5).
6. **Row 307 gets a whole new line, not a note.** The row is at 1,196 characters, so it takes no note of this length (the limit 1,200, `ledger.py`'s header), and its last sentence, that the code generator must compile `NatParam`, is made false. Its new line keeps every other cell and drops row 701 from its siblings. Way not taken: the note the brief names.
7. **Row 701's reproducer: a new `XXX` test of a function contract.** Ways not taken: `none`, with a command in the notes. Evidence: no gated test reaches the contract guard: `XXX10c` and `XXX5z` stop at the checker ('A requires clause has type ZZ32, but it must have Boolean type.'; 'Singleton object O must not have a contract.').
8. **The promoted test asserts and prints `PASS`** in place of `println(g(O))`. Way not taken: keep the program's `run()` and check 'O' with `run_out_equals`. Evidence: the skill's form for a compiled run test (`references/tests-writing.md`, "A test program").
9. **A subset of the compiler track run, not the track** (section 5). Way not taken: no compiled test beyond the rung's own (fork 9 leaves the tracks to the gate).
10. **No stage, suite, demo or atomic run** (section 6, forks 9 and 10).

## 10. Defects, and their homes

- A function, method, object or trait whose own header carries a `where` clause refused by the code generator (row 701's `where` half): home 1, repaired; `WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`.
- A function or method with a contract refused by the code generator (row 701's contract half): home 2, deferred, the specification settles it (`functions.tex`, "Function Contracts"); `XXXFunctionContractCodeGeneration`, row 701 rewritten to it.
- A call that opens a value of a trait listing a type at a `where`-clause size fails verification (row 307's wall, now reached): home 2, deferred, the specification settles it (`trait-parameters.tex`, section "Nat and Int Parameters"); the `XXXNatOpenRun` pair, row 307 rewritten.
- Row 812's crash, measured again on the fix: it stands; its home is its row (reproducer `none`, a crash); nothing of this rung's tests holds it. Its claim and notes name row 701's refusal, now gone, so record.md gives its whole new line.

No new row.

## 11. For FACTS

F-181 is made false in its first clause; record.md gives its new text. No other fact.

## 12. Commands worked out

- An `XXX` run pair whose failing class must load after `REACHED` prints: put the failing call in an object's method, which the JVM verifies when the object's class first loads (section 5).
- `python3 explorations/coordinator/tools/ledger.py check --rows FILE` lints a drafted row without writing the ledger; the four drafts in record.md (rows 701, 307, 812, 677) pass it.
