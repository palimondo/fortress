# Climb batch 33, rung D: the skeptic's verdict

Judged head: `9068969984` on `wip/rung-typecase-unbound-arm`, base `1609258002`, one launch of the worker (`rung:D`) and one of the skeptic. The branch carried the worker's `REPORT.md` and `record.md` already, byte for byte the texts of the run's journal (`journal-text.py ... reportText` and `recordText`, compared with `cmp`: the same), so no commit was made for them. Two commits of the skeptic follow the worker's: `74cae86062` (a test case) and `4a8e5c05bb` (record lines). Verdict: **approved**; no fix is contested.

## 1. The stages

The report's tables are those of the worker's code state `74ebf6a8c0`, which is the code of the final head too: `26803cc56b`, `9068969984` and the skeptic's two commits change tests and prose only. The worker's last edit of code was at 19:49:10Z (`FileTests.java`; `TypeDisambiguator.java` at 19:33:35Z), its last build at 19:49:54Z (`ant compileAll` then the library order); the count stage's `nohup` call was at 20:08:55Z and the distance's at 20:10:24Z, both after it. Read from the worker's files:

    diff explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt tmp/rung-typecase-unbound-arm/checker-count-postedit.txt     (prints nothing)
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt tmp/rung-typecase-unbound-arm/distance-postedit.txt
    DISTANCE SAME   0

The diff changes no Scala of the checker and no generated code, so the checker's time protocol does not apply; the count stage was not run again.

## 2. Test first, read in the worker's transcript

- Failing on the base's code, before the edit (19:33:35Z) and before its first build (19:45:13Z): call `LbefTM`, 19:30:52Z, `harness-one.sh ... TypecaseUndefinedArmWalk.fss TypecaseUndefinedArmWalk.test TypecaseUndefinedNameInArmTypeWalk.fss ...` on the seeded base build ("tree 1609258002"): ` Missing expected refusal at load`, ` Failed after load` over `Missing type NoSuchArgType`, `Tests run: 4,  Failures: 3,  Errors: 0`. Call `e7inj7`, 19:32:26Z, `ONE_JVM=1 .../junit.sh base ProjectFortress/compiler_tests XXXTypecaseUndefinedArmCompiled.test XXXTypecaseUndefinedNameInArmTypeCompiled.test TypecaseTypeParamArmCompiled.test`: ` Saw failure, but did not satisfy compile_err_contains; expected` / `NoSuchTypeHere is undefined.`, `Tests run: 4,  Failures: 2,  Errors: 0`. These are the lines `recordedFailure` quotes.
- Passing after the last change of code: call `vVtuDk`, 20:15:21Z, `harness-one.sh` on the seven walk files: `OK (5 tests)`; call `WHmH8J`, 20:15:31Z, `junit.sh new3 ... AfterTypeChecking.test`: `OK (101 tests)`. These are the lines `recordedPass` quotes.
- The static-argument case was added after the build (`26803cc56b`). Its compiled half was seen failing on the old code through the harness (`old-fortress.sh ... junit .../XXXTypecaseUndefinedNameInArmTypeCompiled.test`, 20:15:13Z: `Tests run: 1,  Failures: 1,  Errors: 0`). Its walk half was not run through a harness on the old code: the worker's call of the base build's `harness-one.sh` was refused by the automatic permission check (20:14:58Z), and the brief lets the base build run only through `old-fortress.sh`, whose `junit` reads only compiled `.test` files (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1057-1059`, a `.fss` is skipped). The walk test as a whole was seen failing on the base through the harness (`LbefTM` above); the case's own base answer is the worker's probe `PArmStaticArg`, 'Missing type NoSuchArg' when the arm ran.

## 3. The diff

`TypeDisambiguator.java` (`:59-61`, `:241-275`, `:398-406`): the flag that spared every undefined name in a clause's type becomes an identity set of the elements of a tuple arm, taken from the arm before it is resolved (`:246`, `:263-275`), and the bare-name binder rewrite is removed. `handleTypeName` asks `_env.hasTypeParam` first (`:392-393`), so a type parameter in scope still binds the arm, the section's "An arm at a type parameter in scope still binds". The set holds the very `VarType` nodes that `recur` passes to `forVarType`, since the visitor recurs on the same element objects; `typeToPatternBinding` (`:216-237`) rewrites exactly those. A nested `typecase` in a clause's body sees an empty set and a cleared flag (`:248`, `:258`). `extend` makes a fresh disambiguator with an empty set (`:78-81`), which matters only for a declaration, never inside a clause's type. The edit does what the report says and no more. The refusal of names inside an arm's arrow type, static argument or named clause goes past the bare arm of row 959, and the section settles it: "You refuse such an arm where a type name elsewhere is refused", and `Specification/basic/declarations.tex:571-572`. The `FileTests.java` change (`:16`, `:868-878`) makes a `StaticError` in the exception's chain a refusal at load. It is used only by `refusalVerdict` (`:491`), whose `XXX` branch reads `ranClean` alone (`:495`), so no green test turns red. The section's "Promote ... to a refusal" needs it, and it is a reported point (a file beyond those named).

The name `XXXTypecaseUndefinedArmCompiled` in place of the brief's plain name follows the tree: all 398 `.test` files of `compiler_tests/` with a `compile_err` key are `XXX`-named (`grep -l compile_err compiler_tests/*.test | grep -v /XXX` prints nothing), and a plain compile test whose compile exits non-zero is red (`FileTests.java:383-386`, `:419`).

## 4. The skeptic's programs, old against new

Each is a scratch program with one `run()`. Old: `old-fortress.sh /home/user/fortress-base37 /home/user/fortress-typecase-unbound-arm/tmp/old-caches [compile|run] P`. New: the rung's `bin/fortress` with `FORTRESS_HOME` the rung's tree and a private `FORTRESS_CACHES` copied from its caches. All at `FORTRESS_THREADS=1`: the diff touches no mutable variable, field, `atomic` block or library state.

| program | arm | walk, old | walk, new | compiled, old | compiled, new |
|---|---|---|---|---|---|
| SkNestedBodyArm | `Nonesuch =>` in a `typecase` inside a clause's body | 'inner undefined arm' | 'Nonesuch is undefined.' | 'inner undefined arm' | 'Nonesuch is undefined.' |
| SkNamedUndefinedArm | `x: Nonesuch =>` | 'Missing type Nonesuch' when run | 'Nonesuch is undefined.' | 'Nonesuch is not in the kind env [][][]' | 'Nonesuch is undefined.' |
| SkTupleInnerUndefined | `(a, Maybe[\Nonesuch\]) =>` | 'Missing type Nonesuch' when run | 'Nonesuch is undefined.' | 'The typecase clause, Pattern at ..., is unreachable.' | 'Nonesuch is undefined.' |
| SkValueNameArm | `y =>`, `y` a local value | 'Variable y is already declared.' | 'y is undefined.' | the same as walk, old | 'y is undefined.' |
| SkExplicitBinder | `n: ZZ32 =>`, `x: Any =>` | 'a ZZ32', 'any value' | the same | the same | the same |
| SkForwardTypeArm | `Later =>`, an object declared after the function | 'the Later arm', 'other' | the same | the same | the same |
| SkTraitParamArm | `T =>` in a generic trait's method | 'the T arm', 'other', 'the T arm' | the same | the same | the same |
| SkObjectParamArm | `T =>` in a generic object's method | 'T', 'not T' | the same | the same | the same |
| SkLocalGenericArm | `T =>` in a local `kind[\T\](v: Any)` | 'Unexpected _RewriteFnRef value' at the call | the same | 'Can't compile a local function with static parameters of its own yet' | the same |
| SkNestedTupleArm | `((a, b), ZZ32) =>`, `Any` selector | 'typecase match failure!' | the same | '... is unreachable.' | the same |
| SkNestedTupleTyped | `((a, b), ZZ32) =>`, `p: ((ZZ32, String), ZZ32)` | 'typecase match failure!' | the same | `RuntimeException: typcase match failure!` | the same |
| SkWhereVarArm | `X[\n\] =>`, `n` a function's `where`-clause variable | 'Missing type n' when run | the same | links, dies `NoClassDefFoundError` | the same |
| SkWhereVarBody | `y: X[\n\] = u`, the same `n` | 'Missing type n' when run | the same | the same as above | the same |

Quoted, from `tmp/rung-typecase-unbound-arm/skeptic/diff.sh SkNamedUndefinedArm.fss` (old) and `diff-new.sh` (new):

    ===== SkNamedUndefinedArm walk old
    Missing type Nonesuch
    ===== SkNamedUndefinedArm compiled old
    Nonesuch is not in the kind env [][][]
    ===== SkNamedUndefinedArm walk new
        Nonesuch is undefined.

The arm at a type parameter in scope binds on both paths, for a function's (the worker's tests), a trait's, an object's and a local function's parameter (the last reaches the disambiguator without 'T is undefined.' and stops later, as on the base). Every arm that the rung refuses gave a wrong value or a late failure on the base. Walk and the compiled path agree on every program of the new code.

## 5. Findings and fixes

1. **The named clause's type was refused by the rung with no test** (home 1, a missing assertion). The worker's in-arm-type tests hold an arrow type and a static argument; the form `x: T =>`, whose base answers are in the table, had none. Fix `74cae86062`, a correction: a third case `kindOfNamed`, `x: NoSuchNamedType =>`, in `tests/TypecaseUndefinedNameInArmTypeWalk.fss` and `compiler_tests/XXXTypecaseUndefinedNameInArmTypeCompiled.fss`, with the keys `load_exception_matches=(?s).*NoSuchNamedType is undefined.*` and `compile_err_matches=` the same. Settled by the section, "You refuse such an arm where a type name elsewhere is refused" (`explorations/coordinator/CLIMB-BATCH-33.md`, rung D's mission), and `Specification/basic/declarations.tex:571-572`. Failing on the old code: `old-fortress.sh /home/user/fortress-base37 .../tmp/old-caches junit .../XXXTypecaseUndefinedNameInArmTypeCompiled.test` (21:16:53Z): `NoSuchNamedType is not in the kind env [][][]`, ` Saw failure, but did not satisfy compile_err_contains`, `Tests run: 1,  Failures: 1,  Errors: 0`; under walk the walk half cannot reach a harness on the old code (section 2), and the test program run directly on it, `old-fortress.sh ... tests/TypecaseUndefinedNameInArmTypeWalk.fss` (21:16:55Z), loads and stops when run, `Missing type NoSuchArgType`, rc=1. Passing on the head: `harness-one.sh .../skeptic/h-new ...TypecaseUndefinedNameInArmTypeWalk.fss .test TypecaseUndefinedArmWalk.fss .test` (21:16:58Z, "tree 9068969984"): ` OK Saw expected refusal at load` twice, `OK (2 tests)`; `ONE_JVM=1 junit.sh skeptic-new ... XXXTypecaseUndefinedNameInArmTypeCompiled.test XXXTypecaseUndefinedArmCompiled.test` (21:17:06Z): `NoSuchNamedType is undefined.`, ` Saw expected failure` twice, `OK (2 tests)`. Each new key was seen red with its name changed to `NoSuchNamedTypeX` for one run, then restored: ` Refused at load, but did not satisfy load_exception_matches` and ` Saw failure, but did not satisfy compile_err_matches`.
2. **The precedent's provenance line cited the base at the branch's line.** `REPORT.md:5` gave `TypeDisambiguator.java:406` at 1609258002; there the refusal is `:395` (`git show 1609258002:.../TypeDisambiguator.java | sed -n 395p`). Fix `4a8e5c05bb`, a correction.
3. **Two FACTS entries and two other record texts become false** and `record.md` did not list the FACTS entries: F-379, "a typecase arm at one of those names takes every value (row 959)", F-361's "A `typecase` arm that names a removed object, such as `Int`, matches every value with no message (row 959)", the skill's `revival-changes.md:97` (which the worker's Revival change names), and the orientation key's case 36 (`explorations/coordinator/tools/orientation/regression/key.md:479`, `:488`, `:492`). Fix `4a8e5c05bb`: `record.md`, "For FACTS" and a section "Other record texts this rung makes false"; left for the gather to rewrite.
4. **Defects the skeptic's programs measured, unchanged by the rung, given their homes as ledger notes** (`4a8e5c05bb`, `record.md`, "Ledger"; each `ledger.py note N ... --check` fits): row 964, both paths stop on a nested tuple of names beside a type, `((a, b), ZZ32) =>`; row 1020, a local generic function whose parameter appears only in its body loads and its call stops, 'Unexpected _RewriteFnRef value'; row 868, a top-level function's own `where`-clause variable loads and stops at its first use in the body, 'Missing type n' (row 868 says the clause "on a top-level function runs", true where the body does not name the variable). Under walk each crashes the program, so a ledger note is their home (`tests-writing.md`, "How a defect is recorded", 3).
5. **The fix commit's message omits `FileTests.java` from its historical files** (`git log -1 74ebf6a8c0`), as the worker's own account says; a landed message is not rewritten, and `REPORT.md:10` lists all three.

## 6. The worker's decisions, where the skeptic differs

None in substance. The tuple of names (decision 2, row 1064, the question for the curator) is a conflict of the team's sources: the grammar (`Specification/basic/expressions/typecase.tex:69-71`) against the team's tested binding form (`compiler_tests/Compiled7.PatternMatching.a.fss:30` under `AfterTypeChecking.test:16`), with the chapter's note deferring patterns (`typecase.tex:15`). Fork D1 names "a typecase arm whose name binds no type variable in scope and no declared type", so leaving the tuple's elements to the curator with a plain test of today's answer and a CONTESTED row is the record's home 3. The respelling of the team's `Compiled7.PatternMatching.b.fss:30` keeps its value and the test's check (typecheck OK, `WHmH8J`).

## 7. Sites, rows, names, specification

- The instrumented scan of 239 `typecase` files (the worker's `tmp/.../instr/`) printed a spared name only for `Compiled7.PatternMatching.a` and `.b`, the planner's probe `PInt.fss` and, compiled against the prelude, the seven walk tests of `REPORT.md` section 6; `git grep -lw typecase` finds no file of the corpora outside its list but the rung's own tests and two `.fsi` files. None of the seven is in the ladder's `pass-list.txt`, so the gate's ladder does not move. No library line names such an arm; no model line changes.
- No competing declaration of the eight new component names or of `typecaseTupleNames`, `tupleElementNames`, `addTupleElementNames` in the test corpora or `ProjectFortress/src/com/sun/fortress/`.
- Sentences of the specification made false: none. The chapter gives an arm as a type (`typecase.tex:69-71`), the appendix grammar the same (`Specification/appendices/grammars/concrete-syntax.tex:1066-1071`), and no passage, `\note` or Appendix I entry says that an arm binds a name or matches every value.
- Failure mode: the rung turns quiet wrong values (an arm that took every value) and walk's late 'Missing type' into a static error at the name; it turns no loud failure quiet.

## 8. Suites

None run by the skeptic: its fixes change tests and prose only, no Java or Scala, so the worker's `ant testFast` ("BUILD SUCCESSFUL", compiler 1698, 0 failures) and `ant testSystem` ("BUILD SUCCESSFUL", 874, 0 failures) on `74ebf6a8c0` are of the head's code state. The gate runs every suite on the merged tree, where the in-arm-type tests carry the third case.

## Verdict

Approved. The change is right and minimal, its record holds with the corrections above, and no fix is contested.
