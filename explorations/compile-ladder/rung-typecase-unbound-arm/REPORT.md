# Climb batch 33, rung D: a `typecase` arm at a name that no declaration defines is refused on both paths (row 959)

- problem: row 959, `explorations/fortress-gap-ledger.md:457`: on both paths an arm `Id =>` whose name names no type matched every value; on 1609258002's code `typecase v of Int => ...` for `v: Any = 2.5` printed 'an Int' under walk and compiled (section 5).
- spec: `Specification/basic/declarations.tex:571-572`, "it is a static error for a reference to a name to occur where it is not in scope in the appropriate namespace"; the arm is a type, `Specification/basic/expressions/typecase.tex:69-71`.
- precedent: row 626's refusal in the same method, `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:406` at 1609258002 (`error(NodeUtil.nameString(n) + " is undefined.", n)`, commit 2d22d3a35de), and its tests `compiler_tests/XXXTypecaseUndeclaredType.test:1-3`.
- deviation: the compiled sibling is `compiler_tests/XXXTypecaseUndefinedArmCompiled.test:1`, not the brief's plain name, since the harness reds a plain-named compile test whose compile reports errors (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:383-386`, `:419`).
- deviation: walk's harness counts a static error of the phases as a refusal at load (`FileTests.java:878`), so the promoted walk test's `.test` can name the refusal; the brief named no harness file.
- deviation: a name inside an arm's arrow type or static argument is refused too (`TypeDisambiguator.java:403-406`), beyond the bare arm that row 959 names; an element of a tuple of names still binds (`TypeDisambiguator.java:246`, `:249-256`).
- historical: `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:61`, `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:16`, `ProjectFortress/compiler_tests/Compiled7.PatternMatching.b.fss:30`.

One launch of the worker role worked this rung. Branch `wip/rung-typecase-unbound-arm`, base 1609258002; commits 8614e381ab (the tests), 74ebf6a8c0 (the refusal, the harness, the team test's line), 26803cc56b (two more test cases), and this report's.

## 1. What changed and why

`TypeDisambiguator`, the part of the phase that binds names, which walk and the compiler both run (`explorations/coordinator/map/modules-and-phases.md`, "B.4 Disambiguation"), resolved a `typecase` clause's type with a flag, `forTypecaseClause`, that let every name in the clause's type that names no type pass silently and set `rewriteTypecaseClause` (base `TypeDisambiguator.java:392-393`). Then `forTypecaseClause` made a bare arm `Id =>` the binder `Id: Any =>` (base `:246-250`), and a tuple arm a pattern of binders (`:251-258`), each element by `typeToPatternBinding`. A name in any other place of the arm's type, as in `NoSuch -> ZZ32` or `Maybe[\NoSuch\]`, was left unresolved: walk failed when the arm ran, 'Missing type NoSuch', and the compiled path refused the arrow form, 'Unbound type: NoSuch', but compiled the static-argument form with no message (section 5).

The edit (`TypeDisambiguator.java:59-61`, `:241-275`, `:398-406`):

- the flag becomes `typecaseTupleNames`, the set, by identity, of the names that are elements of a tuple arm, at any depth of nested tuples: exactly the names that `typeToPatternBinding` turns into binders (`:262-275`);
- `handleTypeName` spares only such a name; every other name that binds no type variable in scope and no declared type gets 'X is undefined.' at its span, the message of every undefined type name (`:401-406`);
- the bare-name binder rewrite is removed: a bare arm that names no type is now refused, so that branch would be reached only after the error.

A type variable in scope still binds the arm: `handleTypeName` asks `_env.hasTypeParam(n)` first and takes such a name as the variable before it looks for a declaration (`:392-393`); the clause keeps the `VarType`, which tests the value against the static argument, as the library's `instanceOf[\T\]` does (`Library/FortressLibrary.fss:39-43`).

The harness (`FileTests.java:868-878`): `InterpreterTest.thrownAtLoad` counted only an exception under `Driver.evalComponent` as a refusal at load, so the promoted test's `.test`, `load_exception_contains=NoSuchTypeHere is undefined`, read 'Failed after load' though walk refused the program as named: on the edit's first build, before this change, `harness-one.sh ... TypecaseUndefinedArmWalk.fss TypecaseUndefinedArmWalk.test` printed ' Failed after load' over '    NoSuchTypeHere is undefined.'. It now also counts a `StaticError` in the exception's chain: a static error of the phases refuses the program before it loads. Walk's evaluator raises no `StaticError` (`grep -rln 'StaticError\|TypeError' ProjectFortress/src/com/sun/fortress/interpreter/` prints nothing). No existing verdict changes: a green plain test with `load_` keys was refused under `evalComponent`, which still counts, and an `XXX` test's verdict reads only whether the program ran clean (`FileTests.java:495`).

The team's test `compiler_tests/Compiled7.PatternMatching.b.fss:30` wrote `x => println x`, a bare binder; `AfterTypeChecking.test:16` typechecks it. It is respelled `x: Any => println x`, the clause the old rewrite made; the typecheck passes on 1609258002's code with both spellings (`old-fortress.sh ... typecheck Compiled7.PatternMatching.b.fss`, rc=0 for each), and on the edit the old spelling is refused:

    bin/fortress typecheck Compiled7.PatternMatching.b.fss    (the original line, on the edit)
    .../Compiled7.PatternMatching.b.fss:30:11:
        x is undefined.
    rc=255

## 2. The tests: failing on the base, passing after

Tests: `tests/TypecaseUndefinedArmWalk.fss` with `.test` (row 959's `XXXTypecaseUndefinedArmWalk`, renamed by `git mv`, its component renamed; the program and the key unchanged), `compiler_tests/XXXTypecaseUndefinedArmCompiled.fss`/`.test`, `tests/TypecaseUndefinedNameInArmTypeWalk.fss`/`.test`, `compiler_tests/XXXTypecaseUndefinedNameInArmTypeCompiled.fss`/`.test`, `tests/TypecaseTypeParamArmWalk.fss`, `compiler_tests/TypecaseTypeParamArmCompiled.fss`/`.test`, `tests/TypecaseTupleArmUndefinedNameBindsWalk.fss` and `tests/TypecaseTupleArmMixedBinderWalk.fss`.

The failing runs, on 1609258002's build before the edit was first built (the tree held only the new tests, uncommitted):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-typecase-unbound-arm/h-base ProjectFortress/tests/TypecaseUndefinedArmWalk.fss ProjectFortress/tests/TypecaseUndefinedArmWalk.test ProjectFortress/tests/TypecaseUndefinedNameInArmTypeWalk.fss ProjectFortress/tests/TypecaseUndefinedNameInArmTypeWalk.test ProjectFortress/tests/TypecaseTypeParamArmWalk.fss ProjectFortress/tests/TypecaseTupleArmUndefinedNameBindsWalk.fss
    # harness-one 2026-11-17T19:30:53Z; tree 1609258002; nproc=4; ... FORTRESS_THREADS=4; cache empty
    . interpret tmp/rung-typecase-unbound-arm/h-base/tests/TypecaseUndefinedArmWalk
    the undefined arm
     Missing expected refusal at load
    Missing type NoSuchArgType
    Tests run: 4,  Failures: 3,  Errors: 0

The third failure was the first draft of `TypecaseTupleArmUndefinedNameBindsWalk`, which asserted the binder's value and met row NEW-D-2; rewritten to assert the arm taken, it passed on the base (`harness-one.sh ... TypecaseTupleArmUndefinedNameBindsWalk.fss`: 'OK (1 test)').

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXTypecaseUndefinedArmCompiled.test XXXTypecaseUndefinedNameInArmTypeCompiled.test TypecaseTypeParamArmCompiled.test
    # junit.sh base 2026-11-17T19:32:27Z; ... tree 1609258002 with the next rung applied, not yet committed
    . compile ProjectFortress/compiler_tests/XXXTypecaseUndefinedArmCompiled
     Saw failure, but did not satisfy compile_err_contains; expected
        Unbound type: NoSuchArgType
    Tests run: 4,  Failures: 2,  Errors: 0

By hand, the same program compiles and runs on the base (`old-fortress.sh ... compile XXXTypecaseUndefinedArmCompiled.fss`, rc=0; `run`: 'the undefined arm', 'PASS'). The static-argument case, added after the edit was built, through the old code's `junit`:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 $PWD/tmp/old-caches junit $PWD/ProjectFortress/compiler_tests/XXXTypecaseUndefinedNameInArmTypeCompiled.test
    (2026-11-17T20:15:13Z)
        Unbound type: NoSuchArgType
    File XXXTypecaseUndefinedNameInArmTypeCompiled.fss has 1 error.
    Tests run: 1,  Failures: 1,  Errors: 0

No line for `NoSuchStaticArg`: the base compiled that arm with no message. Its walk half was not run on the old code: the call to the base build's `harness-one.sh` was refused by the automatic permission check, and no other route was tried; the probe `PArmStaticArg` (section 5) shows the base's walk answer, 'Missing type NoSuchArg' when the arm ran.

The first `XXX` test, shown red on a deliberate change: with `trait NoSuchTypeHere end` added to `XXXTypecaseUndefinedArmCompiled.fss` for one run, then restored,

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh deliberate ProjectFortress/compiler_tests XXXTypecaseUndefinedArmCompiled.test
    (2026-11-17T19:52:39Z)  Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 1,  Failures: 1,  Errors: 0

The passing runs, on 74ebf6a8c0's code with the tests of 26803cc56b, the last runs after the last change of code:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-typecase-unbound-arm/h-new [the five walk tests and the two .test files]
    (2026-11-17T20:15:21Z)  OK (5 tests)
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new3 ProjectFortress/compiler_tests XXXTypecaseUndefinedArmCompiled.test XXXTypecaseUndefinedNameInArmTypeCompiled.test TypecaseTypeParamArmCompiled.test AfterTypeChecking.test
    (2026-11-17T20:15:32Z)  OK (101 tests)

with 'OK Saw expected refusal at load' for both walk refusal tests, 'NoSuchArgType is undefined.' and 'NoSuchStaticArg is undefined.' for the compiled one, and `Compiled7.PatternMatching.a` and `.b` typechecked OK. `XXXPatternMatchingc`, `XXXTypecasePatternUntypedBinder`, `XXXTypecaseUndeclaredType`, `XXXTypecaseBodyUndeclaredType` and `CastBindRungG` were green on the same code (`junit.sh new2`, 'OK (107 tests)').

## 3. The whole suites

The edit is Java of a phase that both paths run, so both suites ran once on its code, 74ebf6a8c0, the brief's two:

    ant testFast     (started 19:53:10Z)  BUILD SUCCESSFUL, Total time: 11 minutes 15 seconds
        compiler 1698, library 86, othercompiler 263, misc: 0 failures, 0 errors
    ant testSystem   (started 20:04:40Z)  BUILD SUCCESSFUL, Total time: 4 minutes 4 seconds
        shards 214 + 223 + 224 + 213 = 874, 0 failures, 0 errors

Against `explorations/compile-ladder/climb-batch-31b/gate/summary.txt`: the compiler track 1694 to 1698, the rung's four compiled cases; the interpreter tests 871 to 874, the rung's three new walk tests (the promoted one is a rename). `TypecaseTupleArmMixedBinderWalk` and the static-argument case came after the suites, test files only; their runs are section 2's last.

## 4. The stages

Both ran once on 74ebf6a8c0's code; later commits touch tests only. Neither is a table to commit.

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-typecase-unbound-arm/checker-count-postedit.txt tmp/rung-typecase-unbound-arm/cc-post
    diff explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt tmp/rung-typecase-unbound-arm/checker-count-postedit.txt     (prints nothing)
    #total 0, #locations 0, #crash none

    explorations/coordinator/tools/distance/run.sh tmp/rung-typecase-unbound-arm/distance-postedit.txt tmp/rung-typecase-unbound-arm/dist-post
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt tmp/rung-typecase-unbound-arm/distance-postedit.txt
    DISTANCE SAME   0
    #seconds 120  FortressLibrary 76

No site moved: the stage's per-site error list holds no row, as `explorations/compile-ladder/gate/distance-sites.tsv` holds none. The count took about 88 s (20:08:56Z to 20:10:24Z). The checker's time of `compiler.md` was not taken: the edit is Java of the disambiguator, not the checker's Scala or the generated syntax tree.

## 5. Programs run old against new

Probes, scratch programs each of one `run()` with one `typecase` over a value of type `Any` unless named, written out in the column 'arm'; old with `old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches [compile|run] P`, new with `bin/fortress` and a private caches folder.

| program | arm | walk, old | walk, new | compiled, old | compiled, new |
|---|---|---|---|---|---|
| PArmInt | `Int =>`, `v = 2.5` | 'an Int' | 'Int is undefined.' | 'an Int' | 'Int is undefined.' |
| PArmBinder | `x =>` | 'binder 7' | 'x is undefined.' | refused: juxtaposition of `String` and `Any` | 'x is undefined.' |
| PArmArrow | `NoSuch -> ZZ32 =>` | 'Missing type NoSuch' when run | 'NoSuch is undefined.' | 'Unbound type: NoSuch' | 'NoSuch is undefined.' |
| PArmStaticArg | `Maybe[\NoSuchArg\] =>` | 'Missing type NoSuchArg' when run | 'NoSuchArg is undefined.' | compiles, runs 'other' | 'NoSuchArg is undefined.' |
| PArmTypeParam | `T =>` in `kind[\T\]` | 'the T arm', 'other' | the same | the same | the same |
| PArmTuple | `(Int, ZZ32) =>`, `("s", 3)` | 'Int pair arm' | the same (NEW-D-1) | 'The typecase clause, Pattern at ..., is unreachable.' | the same |
| PArmTupleBinder | `(x, y) =>`, `(3, 4)` | 'pair 3 4' | the same | 'unreachable', 'Variable 'x' not found.' | the same |
| PArmTupleMixed | `(first, ZZ32) =>`, `("s", 3)` | 'first is (s,3)' | the same (NEW-D-2) | PArmTupleMixedC, `p: (String, ZZ32)`: `NoClassDefFoundError: PArmTupleMixedC$first` | the same |
| PArmPattern | `(x, y: ZZ32) =>`, `p: (ZZ32, ZZ32)` | 'typecase match failure!' | the same | 'typcase match failure!' (row 964) | the same |
| PArmPatternTyped | `(x: ZZ32, y: ZZ32) =>` | 'typed pattern 3 4' | the same | not run | not run |

## 6. The sites: every arm of the libraries and the tests at an undefined name

Grep finds no arm at `Int`, `Long`, `Float`, `BigNum`, `UnsignedLong`, `IntLiteral` or `FloatLiteral` in a test or a library (`git grep -nwE '(Int|Long|Float|BigNum|UnsignedLong|IntLiteral|FloatLiteral)' -- '*.fss' '*.fsi' | grep '=>'` prints only `explorations/compile-ladder/plan-31/probes/planner/PInt.fss:4`). For any other undefined name, a copy of the base's `TypeDisambiguator` that prints each name it spares, compiled into a scratch class folder and put first on the class path (`compiler.md`, "Testing an edit here"), ran on 1609258002's code over every `.fss` file that holds `typecase` (239 files): under walk the 147 outside the compiled test folders, with one caches folder that starts empty so that every library component it reaches is analysed; compiled the other 92, the compiler's prelude among them; and compiled the 91 walk tests, as the ladder sees them. The sites:

- Libraries: none, in `Library/`, `ProjectFortress/LibraryBuiltin/` or the compiler's prelude. No reserved library line.
- `compiler_tests/Compiled7.PatternMatching.b.fss:30`, `x => println x`, the team's: now refused, 'x is undefined.'; respelled `x: Any => println x` (section 1).
- `compiler_tests/Compiled7.PatternMatching.a.fss:30`, `(x, y) => println x`, the team's: unchanged, the tuple of names binds.
- Seven walk tests whose arm names a type of the interpreter's library that the compiler's prelude lacks: `tests/IntegerMaxNumMinNum.fss:13`, `IntegerMinMaxRungM.fss:13`, `IntegerPowerContractWalk.fss:28`, `NumeralFoldWalk.fss:16`, `NumeralTypesWalk.fss:12`, `NumeralWithNN32.fss:13` (`QQ =>`) and `TransitiveImportMethodLookup.fss:23` (`Generator[\Char\] =>`). Under walk, the gated path, nothing changes. Compiled against the prelude, as only the ladder does, each arm is now refused, 'QQ is undefined.', 'Char is undefined.', where on the base it bound every value. No line changes.
- `explorations/compile-ladder/plan-31/probes/planner/PInt.fss:4`, the planner's probe: now refused under walk, 'Int is undefined.' Not a test; not edited.
- Demos, `BirdyLib/`, `not_passing_yet/`, `Sandbox/`, `SpecData/`, `syntax_abstraction_tests/` and the microGPT helpers under `explorations/apl/`: none.

The ladder subset is the seven walk tests, the only files of the ladder's corpora with such an arm; the drivers, copied as `gate.md`, "The ladder regression", says, `run-subset.sh` then `classify.py`, ran them after the edit only: each at `disambiguate`, first error 'QQ is undefined.' or 'Char is undefined.'. None is in the newest landed `explorations/compile-ladder/climb-batch-31b/gate/ladder/ladder.tsv`; of the baseline's `ladder.tsv`, only `TransitiveImportMethodLookup.fss`, at `disambiguate`, 'Char is undefined.', the same. On the base the other six had no 'is undefined' line in the scan's compile, so their compiled phase on the base, which no record holds, was past `disambiguate`.

## 7. Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md`, the row of `typecase`, and `modules-and-phases.md`, "B.4 Disambiguation": the names of a type are bound in `TypeDisambiguator`, which both paths run, and the checker, the code generator and walk's evaluator see only what it leaves. The arm is parsed whole as a `VarType` (`parser/DelimitedExpr.rats:241-248`), and `forTypecaseClause` sees the clause's type before it recurs into it, so the parser need not mark the arm. Row 626 put the same message in the same method for a name with static arguments and for a clause's body (2d22d3a35de; `rung-checker-overloading/JUDGE.md`, section 2). `TypeDisambiguator.java` has two sites that report 'X is undefined.', for a name with its api (`:387`) and without (`:406`); the edit narrows the exemption before the second and adds no site. The library's way is not involved: no library text changes.

## 8. What the specification settles

The chapter gives an arm as a type, `TypecaseTypes ::= ( TypeList ) | Type` (`typecase.tex:69-71`), and names no binder form; `declarations.tex:571-572` makes a name out of scope a static error. So the bare arm at an undefined name is a static error, as fork D1 builds. The tuple of names reads the same by the grammar, but the chapter's note defers the section to the pattern-matching proposal (`typecase.tex:15`), whose binding form the team built and tested (`Compiled7.PatternMatching.a.fss`); no decision covers it, so it stays and goes to the curator.

Sentences of the specification made false: none. No passage, revision or note says that such an arm binds or matches every value, and Appendix I has no entry on it: `grep -rn 'row~959\|matches every value\|BigNum\|UnsignedLong' Specification/` prints nothing.

## 9. Points to report

1. Where the refusal is made: `TypeDisambiguator.java:398-406`, in `handleTypeName`, with the arm's spared names set at `:246-248`. A type variable in scope binds the arm because `handleTypeName` takes a name that `_env.hasTypeParam` finds as the variable first (`:392-393`). Reversible.
2. Row 959's walk test promoted and its compiled sibling, each failing on the base and passing after (section 2); a typecase over a type parameter unchanged, `TypecaseTypeParamArmWalk` and `TypecaseTypeParamArmCompiled`, green on the base and after. Reversible.
3. Every existing test and library line that names such an arm, and what each now does: section 6. One team line changed, `compiler_tests/Compiled7.PatternMatching.b.fss:30`, before `x => println x`, after `x: Any => println x`, the value it checks kept. Reversible.
4. The stages on the final code against the comparand: count identical, distance 'DISTANCE SAME   0' (section 4). Reversible.
5. Sentences of the specification made false: none (section 8).
6. A file edited beyond those named: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:16,870-878`, the walk harness's `thrownAtLoad`. Reversible; acts against no decision.

No step was taken that cannot be undone or that acts against a decision on record.

## 10. Decisions

1. **The refusal is in `TypeDisambiguator`, which both paths run.** Fork D1's default. Ways not taken: the checker only, which leaves walk's answer wrong (D1's way not taken); walk's `Evaluator.forTypecase`, walk only; the parser, which needs no mark (section 7).
2. **The exemption keeps exactly the names that a binding rewrite takes, the elements of a tuple of names; every other undefined name in an arm's type is refused, in an arrow type or a static argument too.** Ways not taken: refuse only the bare arm and keep the flag for every other name, which leaves `NoSuch -> ZZ32` failing only when run under walk and `Maybe[\NoSuch\]` compiled with no message (section 5); refuse the tuple's elements too, ending the team's binding form, which goes beyond D1's text, which names "a typecase arm whose name binds no type variable" and the bare arm of row 959, while rung C's judge names two binding forms (`rung-checker-overloading/JUDGE.md`, section 2, point 2) and a gated team test uses the tuple form (`AfterTypeChecking.test:16`). Left to the curator.
3. **The set of spared names is kept by identity, from the arm before it is resolved, with nested tuples.** Way not taken: a boolean flag over the tuple arm, which would spare a name inside an element's arrow type that no rewrite takes. `typeToPatternBinding` (`TypeDisambiguator.java:216-238`) recurs on nested tuples and binds only their `VarType` elements, as the set does.
4. **The bare-name binder rewrite is removed.** Way not taken: keep it; after the refusal it is reached only with the error already reported.
5. **The team's `Compiled7.PatternMatching.b` is respelled `x: Any =>`.** Ways not taken: drop it from `AfterTypeChecking.test`, or make it an expected failure, each losing the check that a binder arm typechecks. The respelling is the clause the old rewrite built.
6. **The walk harness counts a static error of the phases as a refusal at load.** Ways not taken: keep the walk test `XXX`-named with no keys, the team's negative-test form (`tests/XXXLabelShadowing.fss`), which checks no message and is not the promotion the brief asks for; leave the plain test red. Evidence: before the change the harness read walk's refusal as ' Failed after load' over '    NoSuchTypeHere is undefined.' (section 1).
7. **The compiled sibling is named `XXXTypecaseUndefinedArmCompiled`, not the brief's `TypecaseUndefinedArmCompiled`.** The harness reds a plain-named compile test whose compile reports errors, whatever its keys (`FileTests.java:383-386`, `:419`); every compile refusal test of `compiler_tests/` is `XXX`-named, as row 626's are. Its key is the whole message, 'NoSuchTypeHere is undefined.', which holds the brief's 'is undefined'.
8. **The static-argument case joins the in-arm-type tests, with a second key of another kind (`_WIcontains`).** Way not taken: a third pair of test files.
9. **The tuple-of-names hazard is home 3**, a `CONTESTED` row and a plain test of today's answer, not home 2, since the grammar and the team's binding form disagree and no decision says which holds.
10. **Walk's binding of a name beside a type in a tuple arm is a new row, NEW-D-2**, not a note on row 498, whose notes have 78 characters left.
11. **The ladder subset is the seven files that the instrumented scan finds**, not every file of the corpora that holds `typecase` (99): the scan shows that no other file meets an undefined arm name on either path, so the change cannot move it.
12. **The suites are `ant testFast` and `ant testSystem`, as the brief says**, where `tests-running.md` names `ant testQuick` and `ant testSystem` for a shared phase; the brief holds.

## 11. Defects and their homes

| defect | home | where |
|---|---|---|
| a bare arm at an undefined name took every value on both paths (row 959) | 1, repaired | `tests/TypecaseUndefinedArmWalk.fss`, `compiler_tests/XXXTypecaseUndefinedArmCompiled.test`; row 959 closes |
| an undefined name in an arm's arrow type or static argument loaded under walk and failed when run; compiled, the static-argument form was accepted with no message | 1, repaired | `tests/TypecaseUndefinedNameInArmTypeWalk.fss`, `compiler_tests/XXXTypecaseUndefinedNameInArmTypeCompiled.test` |
| an element of a tuple of names at an undefined name binds and takes every value | 3, deferred and contested | row NEW-D-1, `tests/TypecaseTupleArmUndefinedNameBindsWalk.fss`; a question for the curator |
| walk binds a tuple arm's name beside a type to the whole selector | 3, deferred, the specification silent on patterns | row NEW-D-2, `tests/TypecaseTupleArmMixedBinderWalk.fss` |
| walk stops on `(x, y: ZZ32) =>` when it runs, 'typecase match failure!' | 3, deferred with its row | a note on row 964, whose reproducer holds the compiled half |
| walk's harness could not name a phase's refusal in a `.test` | 1, repaired | `FileTests.java:878`; `tests/TypecaseUndefinedArmWalk.test` |

## 12. For FACTS, commands, questions

For FACTS: the two entries of `record.md`, "For FACTS".

Commands worked out: the instrumented scan of section 6: copy the class, add a `System.err.println` in the spared branch, `javac -nowarn -cp "$(bin/fortress_classpath | tail -1)" -d <classes> TypeDisambiguator.java`, then for each file `java $JAVA_FLAGS -Dfortress.caches=<private> -cp "<classes>:$CP" com.sun.fortress.Shell [compile] FILE`, from the file's folder, and grep the printed names.

Question for the curator, as a decision not taken: should an element of a tuple arm at a name that no declaration defines be refused too, ending the team's tuple-of-names binding form? For: the grammar reads `( TypeList )` as types (`typecase.tex:69-71`), and an old program's `(Int, Int) =>` answers wrongly with no message (row NEW-D-1). Against: the team built and tested the form (`TypeDisambiguator.java:249-256` on the edit, `Compiled7.PatternMatching.a.fss:30`), and the chapter defers the section to the pattern-matching proposal (`typecase.tex:15`). Today it stays, as fork D1 names only the arm whose name binds nothing.
