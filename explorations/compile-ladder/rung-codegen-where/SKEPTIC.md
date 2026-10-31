# Rung G (`rung-codegen-where`): the skeptic's verdict

Judged: `wip/rung-codegen-where` at `e1ab927ad2aa7ba1eb3c7e29fa96649b8c3bef43`, the worker's head, cut from `b0f6cd6b7`. The skeptic's commits after it: `4efc2097d` (the XXX tests of the defects its programs measured), `de6c58978` and `24911dd6e` (record.md's and REPORT.md's corrections), then this file. No commit of the skeptic's changes code; nothing was built.

**Verdict: approved.** The change is right: the three guards lose their `where` condition, keep their contract condition, and the rung's tests failed on the base's code before the build and pass after. One form behind the guard compiles and does not run, a function's or method's own clause that introduces a `where`-clause variable (NEW-G-1); the skeptic records it as a deferred defect with an `XXX` run pair, as the section records row 307's `VerifyError` behind the trait guard, and adds the record's missing sentence made false (F-270). No fix is contested.

## 0. The worker's report and record

The branch already carried both files (`2b1a00cdb` and after). The journal's texts, written to a scratch file with `journal-text.py ... reportText rung:G resume:G` and `recordText`, are byte for byte the committed ones (`diff -q` printed nothing for either), so nothing was written and no commit was made for this step.

## 1. Stages

The report says neither stage ran (REPORT.md, section 6). `git diff --name-only b0f6cd6b7...e1ab927ad` lists `explorations/`, `ProjectFortress/compiler_tests/` and one path outside item 1's list, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`. That is the code generator, not the checker: the count stage runs the compiler's phase order "up to and including TYPECHECK" (`explorations/coordinator/tools/checker-count/run.sh:24`), and fork 10 (`explorations/coordinator/CLIMB-BATCH-24.md:115`) says "W and G run neither, since neither changes what the checker reads". No Scala, no `Fortress.ast`, no generated checker code changed, so no count stage was owed.

## 2. Test first, in the worker's transcript

- `eui1jC`, 12:46:01 UTC, `junit.sh base` on `WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`, `XXXNatOpenRun`: 'Don't know how to compile this kind of FnDecl. node = g[\U\](u:U):String', '… node = title():String', 'Can't compile TraitDecl AnyBox at …', 'Tests run: 10,  Failures: 9,  Errors: 0'.
- `EbWkJf`, 12:47:21, `junit.sh base-object` on `WhereBoundObjectCompiled`: 'Can't compile ObjectDecl Wrap at …', 'Tests run: 3,  Failures: 3,  Errors: 0'.
- `r5kbBC`, 12:47:41: the edit, the three lines deleted; `ejsEZX`, 12:47:48: `ant compileAll`, 'BUILD SUCCESSFUL', 'Caches … started again, empty'; then the library order, five compiles rc=0.
- `SJ9e9N`, 12:50:10, `junit.sh fix1`: the old `XXXNatOpenRun.test` 'Saw failure, but did not satisfy compile_exception_contains; expected', 'Can't compile TraitDecl NatParamT', the other four green: the guard gone, as the brief asks.
- `fccetE`, 12:55:41, `WhereBoundTraitMethodCompiled`, written after the fix, through the base build's harness (`old-fortress.sh … junit …`): 'Don't know how to compile this kind of FnDecl. node = pick[\U\](u:U):String', 'Tests run: 3,  Failures: 3,  Errors: 0'. The skill allows this for a tree that already holds the fix (`tests-writing.md`, "The order", step 2).
- `ZidbRn`, 12:55:56, `junit.sh final`, after the last change of code: 'OK (18 tests)'.

The order holds, and `recordedFailure` and `recordedPass` quote these runs as they are.

## 3. The diff

Three lines deleted, `header.getWhereClause().isNone() &&` at `CodeGen.java:2967`, `:4107` and `:5027` of `b0f6cd6b7` (checked with `sed -n` on `git show b0f6cd6b7:…`), each guard keeping `header.getContract().isNone()` (now `:2970`, `:4107`, `:5026`) and the object's and trait's throws condition (`:4106`, `:5025`). That is fork 12 as written (`CLIMB-BATCH-24.md:117`): "G drops the header `where`-clause condition at the three guards … and keeps the contract condition beside it". Nothing else in the code generator reads a `where` clause but to extend its type analyzer (`CodeGen.java:1878`, `:5103`), to print an `extends` entry (`:215`) and to copy a header (`:2452`); `OverloadSet`, `NamingCzar` and `runtimeSystem/` read none (grep for `getWhereClause` and `WhereClause`). The renames in `git diff --stat` (`XXXWhereBoundChecker.test => XXXFunctionContractCodeGeneration.test`) are git's similarity guess; `eb2aba6b4` deletes `XXXWhereBoundChecker.*` and adds `WhereBoundFunctionCompiled.*`.

## 4. Precedent

The report's precedent lines hold: the team's commented-out conditions at `CodeGen.java:2970`, `:4105`, `:4106`, `:4110`, `:4112` of `b0f6cd6b7` (`:2939`, `:4073`, `:4074`, `:4078`, `:4080` of `a874948ac`), and the revival's deletion of 'mutable bindings not yet handled' in `4d419c9e8` (its CodeGen hunk, line 113 of `git show 4d419c9e8 -- …/CodeGen.java`). Deleting, not commenting out, follows the revival's form and `committing.md` ("Put provenance and rationale in commit messages and reports, not in source comments").

## 5. The tests

Each program carries one comment line and is named by its topic; each message cites `trait-parameters.tex, section "Where Clauses"`, `"Nat and Int Parameters"` or `functions.tex, section "Function Contracts"`, and each section exists (`Specification/basic/trait-parameters.tex:82`, `:312`; `Specification/basic/functions.tex:447`). Each asserts its values and prints `PASS` last, or `REACHED` before the failing call in the pair. `XXXNatOpenRun`'s failing call sits in an object's method so that `REACHED` prints; that is the brief's `run_out_contains=REACHED`.

## 6. The skeptic's programs, the differential

Each program was written in the skeptic's scratch folder, compiled and run on the old code (`old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches compile P.fss` then `run P`), on the rung's build (`bin/fortress compile P.fss`, `bin/fortress run P`, `FORTRESS_HOME` the worktree, `FORTRESS_CACHES` a private copy of its caches), and under walk on both. Walk is the same code on both trees, and its answers were the same on both for every program. The diff holds no mutable state, field, `atomic` or library write, so every run is at `FORTRESS_THREADS=1`.

| Program: the form | old compiled | new compiled | walk |
|---|---|---|---|
| `SkTraitOwnWhere`: `trait Shelf[\T\] where { T extends Named }` with dotted and functional bodies | 'Can't compile TraitDecl Shelf' | 'shelf of cat', 'tag cat', 'shelf of cat' | the same |
| `SkWhereHolder`: `where { T extends Holder[\U\], U extends Named }`, and a call with written static arguments | 'Don't know how to compile this kind of FnDecl. node = g[\T,U\](t:T,u:U):String' | 'catcat', 'cat' | the same |
| `SkObjFunctionalWhere`: an object's functional method and a generic method under a clause | '… node = tag(self:Box[\T\]):String' | 'tag cat', 'pick cat' | the same |
| `SkTraitGenericWhere`: a trait's generic method, clause on its own and the trait's parameter | '… node = both[\U\](u:U):String' | 'cat+dog' | `ClassCastException` (NEW-G-4) |
| `SkWalkGenTraitParam`: `mixed[\U\](u: U): String where { T extends Named }` in `trait Pair[\T\]` | '… node = mixed[\U\](u:U):String' | 'mixed cat' | `ClassCastException` (NEW-G-4); with the clause on `U`, 'own dog' |
| `SkWhereOverloadPlain`: `pick[\U\](u: U): String where { U extends Named }` beside `pick(z: ZZ32)` | '… node = pick[\U\](u:U):String' | 'named cat', 'int', 'named cat' | the same |
| `SkWhereOverloadMethod`: the same pair as methods of `object Q` | '… node = pick[\U\](u:U):String' | 'named cat', 'int' | 'Missing type U' (row 760) |
| `SkWhereVarFn`: `g[\U, V\](u: U, v: V): String where [\nat n\]{U extends {X[\n\]}, V extends {Y[\n\]}}` | '… node = g[\U,V\](u:U,v:V):String' | rc 0, then 'java.lang.NoClassDefFoundError', '… (wrong name: …)' (NEW-G-1) | 'OP' |
| `SkWhereVarMethod`: the same clause on a method of `object Q` | '… node = m[\U\](u:U):String' | rc 0, then `NoClassDefFoundError` (NEW-G-1) | 'Missing type n' (NEW-G-2) |
| `SkWhereVarObject`: `object W[\U\](u: U) where [\nat n\]{U extends {X[\n\]}}` | 'Can't compile ObjectDecl W' | 'w O' | 'O must subtype X[\n\]' (NEW-G-3) |
| `SkWhereVarTrait`: `trait Shelf[\U\] where [\nat n\]{…}` | 'Can't compile TraitDecl Shelf' | 'shelf O' | 'O must subtype X[\n\]' (NEW-G-3) |
| `SkWhereVarBody`: a body `= n` reading the variable | 'Variable n is not defined.' | the same | the same |
| `SkWhereOverload`: two `where`-bounded `h`s, `A excludes { B }` | 'There are multiple declarations of h with the same parameter type: U' | the same | refused at load, 'Overloading of h … fails …' (NEW-G-5) |
| `SkWhereOverloadBound`: the same with the bounds in the header | 'java.util.zip.ZipException: duplicate entry: SkWhereOverloadBound?$h???…' | the same (row 537) | 'A:oa', 'B:ob', 'A:oa', 'B:ob' |
| `SkWhereOverloadPlainBound`: `pick[\U extends Named\]` beside `pick(z: ZZ32)` | 'Invalid overloading of pick …' | the same (NEW-G-5) | 'named cat', 'int', 'named cat' |
| `SkRow812`: `ComprisesWhereFunctionalMethodChecker`'s program | 'E is not in the kind env [][]' | the same (row 812) | 'PASS' |

Wherever the new compiled run gives a value, it is walk's, and the specification's: the clause states conditions on static parameters only (`trait-parameters.tex:332-358`). The one compiled run that dies is NEW-G-1's. The NoClassDefFoundError, on the rung's build:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skwv ProjectFortress/compiler_tests WhereVariableCallCompiledLink.test XXXWhereVariableCallCompiled.test
    . run ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled (360ms) REACHED
    Caused by: java.lang.NoClassDefFoundError: XXXWhereVariableCallCompiled?$\=g?XXXWhereVariableCallCompiled\%O,XXXWhereVariableCallCompiled\%P,1??$\=?Arrow?Tuple?U,V?,fortress\|CompilerBuiltin\%String? (wrong name: XXXWhereVariableCallCompile…
    Saw expected failure (Exit code != 0)
    OK (2 tests)

The call names the instance at `O`, `P` and the inferred size `1`; the template carries the declaration's own static parameters only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:99`, `static_params = x.getHeader().getStaticParams()`), so the class the loader makes is named at `O` and `P`.

## 7. Defects and their homes

| Defect | Home | Record |
|---|---|---|
| Row 701's `where` half | 1, repaired by the rung | the five run tests |
| Row 701's contract half | 2 | `XXXFunctionContractCodeGeneration` (the worker's) |
| Row 307's `VerifyError` behind the trait guard | 2 | the `XXXNatOpenRun` pair (the worker's) |
| Row 812's crash | its row, `none` | stands, `SkRow812` above |
| NEW-G-1: a function's or method's `where`-clause variable at a compiled call, `NoClassDefFoundError` | 2: the checker accepts it (row 749, fixed), walk runs the function, 'OP', and the specification lets a `where` clause introduce static variables (`trait-parameters.tex:338-342`); `tests-writing.md`, "How a defect is recorded", puts a linkage failure at run time there | `compiler_tests/XXXWhereVariableCallCompiled` with `WhereVariableCallCompiledLink.test` |
| NEW-G-2: walk, a method's `where`-clause variable, 'Missing type n' | 2 | `tests/XXXWhereVariableMethodWalk` |
| NEW-G-3: walk, an object's or trait's own `where`-clause variable, 'O must subtype X[\n\]' | 2 | `tests/XXXWhereVariableObjectWalk` |
| NEW-G-4: walk, a generic method's clause on its trait's parameter, `ClassCastException` at `SingleFcn.java:231` | 2 (walk crashes; `tests-writing.md`: "If walk crashes on the program, still write the `XXX` test") | `tests/XXXGenericMethodTraitWhereWalk` |
| NEW-G-5: the checker's overloading check reads no `where` constraint on a function's own parameter as a bound | row only: no gated test can pass while the checker accepts the first pair, as for row 653 | record.md's row |

The new tests, each through the harness:

- The compiled pair on the old code, `old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches junit <tree>/…/WhereVariableCallCompiledLink.test <tree>/…/XXXWhereVariableCallCompiled.test` (14:39:55 UTC): '. link … com.sun.fortress.exceptions.CompilerError:', ' OK Saw expected exception', 'Failed to satisfy run_out_contains; expected', 'REACHED', 'Tests run: 2,  Failures: 1,  Errors: 0'; the old compile of the program: 'Don't know how to compile this kind of FnDecl. node = m[\U\](u:U):String'. On the rung's build, `junit.sh skwv` (14:40:07): 'OK (2 tests)', above. With both failing calls replaced by `assert(3, 3, …)` for one run, then restored, `junit.sh skwv-deliberate` (14:40:23): '. run … REACHED', 'PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1,  Errors: 0'.
- The three walk tests, `harness-one.sh <tree>/tmp/…/h1 ProjectFortress/tests/XXXWhereVariableMethodWalk.fss ProjectFortress/tests/XXXWhereVariableObjectWalk.fss` (14:40:41): ' OK Saw expected exception' twice, 'OK (2 tests)'; with each clause respelled `where { U extends T }` for one run, then restored (14:41:01): ' Missing expected failure' twice, 'Tests run: 2,  Failures: 2,  Errors: 0'. `XXXGenericMethodTraitWhereWalk` alone: 'java.lang.ClassCastException', ' OK Saw expected exception', 'OK (1 test)'; with the clause dropped for one run: ' Missing expected failure', 'FAILURES!!!'. A direct run of each prints the message its row quotes: 'Missing type n' at `XXXWhereVariableMethodWalk.fss:13:54`, 'O must subtype X[\n\]' at `XXXWhereVariableObjectWalk.fss:12:37-52`.

The walk tests are green on the base too: walk is unchanged by the rung, and each is an expected failure of an open defect, so its check is the two runs above, not a failure on the base.

## 8. The ledger and the sibling sites

`ledger.py find --cites …/CodeGen.java` and `ledger-find` on 'where-clause variable', 'Missing type', 'must subtype', 'duplicate entry', 'ClassCastException', 'Invalid overloading' and 'where checker overloading' found rows 701, 307, 812, 677, 749, 750, 754, 755, 760, 762, 777, 787, 537 and 653, and no row for NEW-G-1 to NEW-G-5. `SkWhereOverloadBound`'s duplicate class is row 537's ("with both parameters named `T` code generation stops on a duplicate class name"), and `SkWhereOverloadMethod`'s walk refusal row 760's. NEW-G-4 is at row 762's site (`Constructor.java:216`), but row 762 is at 1,022 characters and its claim is a bound, not a `where` clause, so it gets a row of its own. The code generator has no other site that refuses a `where` clause (section 3); walk, the other path, already runs every form the rung opens except NEW-G-2 to NEW-G-4's. `ledger.py landing-check b0f6cd6b7…`: 'no finding'.

## 9. The report and the record

- The five provenance lines: each cited line opened with `sed -n` says what the line claims (`CodeGen.java:2967`, `:4107`, `:5027`, `:2970`, `:4105`, `:4106`, `:4110`, `:4112` at `b0f6cd6b7`; `:2936`, `:4075`, `:4982` at `a874948ac`; `trait-parameters.tex:332-333`, `:497`; `4d419c9e8`; `7fd8fddc8` adding both renamed tests).
- Sentences made false: the worker's list holds, and misses F-270 (`explorations/coordinator/FACTS.md:206`): "The code generator does not compile such a trait: "Can't compile TraitDecl NatParamT" (row 307; `compiler_tests/XXXNatOpenRun`)." Added to REPORT.md section 7 and to record.md's list (`de6c58978`). The Specification holds no other sentence on the code generator's `where` refusal (grep of `Specification/` for "code generator": `changes.tex:255`, `:1672`, `:4268` are the worker's three).
- Whole suite: none owed: the edit is of the code generator, and `tests-running.md`, "When to run a whole suite", asks for the rung's own tests there.
- record.md: F-181's new text, finding 1, row 701's notes, the handover line and the revival change said that every such declaration compiles and runs, and the `where`-clause variable's call does not run; each now says so (`de6c58978`). Rows 701, 307, 812, 677 and the five new ones pass `ledger.py check --rows` (the new ones with a number in place of `NEW-G-n`).
- The worker's compiled subset: 35 `.test` files, 'OK (55 tests)' (`ekz3Sc`). Of the compiled tests whose programs hold the word `where`, it leaves out only `library_tests/IntLiteralRung6` and `TimingRungT`, whose `where` is in a comment.

## 10. Names

No other declaration of `WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`, `XXXFunctionContractCodeGeneration` or `NatOpenRunLink` in `ProjectFortress/` (test folders and `src/`) or `Library/`; nor of the skeptic's `XXXWhereVariableCallCompiled`, `WhereVariableCallCompiledLink`, `XXXWhereVariableMethodWalk`, `XXXWhereVariableObjectWalk` and `XXXGenericMethodTraitWhereWalk`. `XXXWhereBoundChecker` stays named only in row 677's notes, which record.md rewrites.

## 11. The failure mode

The rung turns a compile-time refusal into a compile. For the forms of section 6 that run, the value is walk's and the specification's. For two it turns the refusal into a loud failure at run time: row 307's `VerifyError`, which the section asks for, and NEW-G-1's `NoClassDefFoundError`, where the base refused at compile with 'Don't know how to compile this kind of FnDecl.'. No quiet value: nothing is emitted for a constraint, and the checker has checked it at every call before the code generator runs.

## Where the skeptic differs from the worker

- Finding 1 and F-181 said that every such declaration compiles, links and runs; one form does not run (NEW-G-1). The worker measured no `where`-clause variable on a function or method.
- NEW-G-1 is recorded, not fixed. Ways not taken: keep `forFnDecl`'s refusal for a clause that binds a variable, which would bring back the base's compile-time stop for that form; or make the template carry the clause's variables as static parameters, a change of the function, generic method and wrapper paths beyond the guards. The section treats the run-time wall behind the trait guard as a deferred defect with a run pair (fork 13, `CLIMB-BATCH-24.md:118`), and the skeptic follows it. Whether the code generator should refuse at compile until the template carries the variable is put to the curator.
