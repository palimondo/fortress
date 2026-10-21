# Climb batch 18: the repair after the merged-diff review

Written 2026-10-18 on `main` above `53ee5dc29`, the judge's ruling (`explorations/compile-ladder/climb-batch-18/JUDGE-review.md`). The repair carries out the ruling's twelve steps in order, in `/home/user/fortress`, after the gate there had ended (its `head.txt` names `632f73d60`; `git diff --name-only 632f73d60 53ee5dc29` names only files under `explorations/`, so `main`'s build was the gate's). The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100 MHz, openjdk 25.0.4.1; the load was 0.04 when the base count started and 0.72 when the change count started.

## 1. What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | The count stage on `main`'s build, named `base`: real 1m7.819s; '#total 30', '#locations 29', '#crash none'. |
| 2 | Four of the five expected failures in `ProjectFortress/compiler_tests/`, each `.fss` and `.test` (deviation 1 for the fifth). Their keys are the base's and the scratch copy's places and messages, below. |
| 3 | All five red on `main` before any edit (`red-main`, below). |
| 4 | `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala`, the trait case `:192-203` and the object case `:209-220` replaced by the ruling's lines, now `:192-212` and `:218-236`. `ant compileAll`: "BUILD SUCCESSFUL", "Total time: 21 seconds", "Caches /home/user/fortress/default_repository/caches started again, empty"; then the library order, five compiles each `rc=0`, and the five jars in `bytecode_cache/`. The four report 'Saw expected failure' and the contract test stays red (`after-twfc`, below). |
| 5 | Not taken: `Decls.scala` is unchanged (deviation 1). |
| 6 | Rung X's four and rung K's eight beside the four new tests, in one JVM: "OK (17 tests)" (`repair-reached`, below). The count stage named `change`: real 1m8.924s; the tables equal, the `run.txt` files equal. The profile shows no gain, so no second-pass edit and no `pass` run. `ant testQuick` once: "BUILD SUCCESSFUL", "Total time: 4 minutes 11 seconds". |
| 7 | `Specification/basic/trait-parameters.tex:375-378` replaced by the ruling's seven lines, now `:375-381`. In `Specification/appendices/changes.tex`, "Conditional extension", the Effect's three lines replaced by the ruling's three and four more (deviation 2), then the Change's four lines replaced by the ruling's seven, "the example is" on the next line; bottom up. The specification's build, below. |
| 8 | F-255 by `record.py set`, the title as the ruling words it, the cases' lines and the contract's (deviation 1), and the four tests in "Tests:". `record.py check` before and after: "record.py check: FACTS.md 194 entries, POSITIONS.md 82 entries; 0 failures; reported: size 2"; F-255 is 2,728 characters, past the 600 `RECORD.md:236` names. |
| 9 | `RECORD.md:250`'s last sentence replaced by the repaired reading, with `main`'s lines after the edit, the four tests and the contract's reason (deviation 1). |
| 10 | `PLAN.md`, X.judge.2's entry: the ruling's sentence, with four tests and the contract's reason (deviation 1); judge-review.1 as a new entry after it (section 3, decision 2). |
| 11 | This file. |
| 12 | One local commit on `main`, not pushed; its paths in deviation 3. |

### The keys, read before any edit

The base build's typecheck of each of the first three, from `ProjectFortress/compiler_tests`: `/home/user/fortress-base18/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base18 /home/user/fortress/tmp/old-caches-repair18 typecheck <file>`.

    /home/user/fortress/ProjectFortress/compiler_tests/XXXCondExtendExcludesChecker.fss:8:16-19:
        Ill-formed type: W[\E\]
        The static argument E does not satisfy the corresponding bound Shows.
    File XXXCondExtendExcludesChecker.fss has 1 error.
    exit=255

    /home/user/fortress/ProjectFortress/compiler_tests/XXXCondExtendComprisesChecker.fss:7:17-20:
        Ill-formed type: V[\E\]
    ...
    exit=255

    /home/user/fortress/ProjectFortress/compiler_tests/XXXCondExtendParamBoundChecker.fss:7:23-26:
        Ill-formed type: W[\E\]
    ...
    exit=255

`main`'s typecheck of a scratch copy of `XXXCondExtendExcludesWhereChecker.fss` with `extends { Shows }` in place of the conditional entry (`bin/fortress typecheck`, a private caches folder):

    .../XXXCondExtendExcludesWhereChecker.fss:8:16-19:
        Ill-formed type: W[\E\]
        The static argument E does not satisfy the corresponding bound Shows.
    File XXXCondExtendExcludesWhereChecker.fss has 1 error.
    exit=255

The base's typecheck of `XXXCondExtendContractChecker.fss` prints nothing: `exit=0` (deviation 1).

### The test runs

Each `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests <files>` from the tree's root.

Before any edit, the five (`red-main`, 04:04:52Z):

    . typecheck ProjectFortress/compiler_tests/XXXCondExtendExcludesChecker
     Saw failure, but did not satisfy typecheck_err_contains; expected
    1) ProjectFortress/compiler_tests/XXXCondExtendExcludesChecker(...)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    FAILURES!!!
    Tests run: 5,  Failures: 5,  Errors: 0

After step 4 (`after-twfc`, 04:06:32Z):

    . typecheck ProjectFortress/compiler_tests/XXXCondExtendExcludesWhereChecker ProjectFortress/compiler_tests/XXXCondExtendExcludesWhereChecker.fss:8:16-19:
     Saw expected failure
    1) ProjectFortress/compiler_tests/XXXCondExtendContractChecker(...)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    FAILURES!!!
    Tests run: 5,  Failures: 1,  Errors: 0

The four new tests, rung X's `CondExtendChecker`, `CondExtendInheritedMember`, `XXXCondExtendRefuseChecker` and `XXXCondExtendUnconditionalEntryChecker`, and rung K's eight of F-256 (`repair-reached`, 04:07:35Z, after the last code change):

    . typecheck ProjectFortress/compiler_tests/OpenTypeWhereSelfBoundChecker  OK (time = 59ms)
    . run ProjectFortress/compiler_tests/CondExtendInheritedMember (471ms) PASS
    OK (17 tests)

`ant testQuick` (04:11:32Z start): the compiler track "Tests run: 1270, Failures: 0, Errors: 0", 4 more than the gate's 1,266, each of the four new tests 'Saw expected failure'; the library track "Tests run: 86", the othercompiler track "Tests run: 263", each with no failure; "BUILD SUCCESSFUL", "Total time: 4 minutes 11 seconds".

### The checker's time

The command of `.claude/skills/fortress-repo/references/compiler.md`, "The checker's time", step 2, in the background: `export W=/home/user/fortress N=<name> ; mkdir -p $W/tmp/count ; time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`, nothing else running beside either.

| run | code | real | user |
|---|---|---|---|
| `base` | `main` at `53ee5dc29`, the gate's build | 67.8 s | 107.7 s |
| `change` | the step 4 edit | 68.9 s | 109.1 s |

- `diff tmp/count/base.txt tmp/count/change.txt` printed nothing: '#total 30', '#locations 29', '#crash none', as the gate's table.
- The two `run.txt` files, each tree path replaced by `TREE`, compare equal (`cmp`, 130 lines each).
- **The profile.** JFR on a copy of the stage's script whose `java` line adds `-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=...,settings=profile,dumponexit=true`, on the change, 5,059 samples; its table equals `change`'s. Read with a scratch `jdk.jfr.consumer` program that counts the samples whose stack holds a method. The top self frames are those rung K's profile shows: `Walker.walkCases7$` 5.36 %, `walkCases0` 4.09 %, `walkCases2` 3.78 %, `Statics.anyHash` 3.72 %, `BoxesRunTime.equals2` 3.68 %. Inclusive: `OverloadingChecker` 44.14 %, `STypeChecker` 41.00 %, `TypeAnalyzer.subtype` 25.20 %, `TypeWellFormedChecker.walk` 5.08 %. Inside `TypeWellFormedChecker.walk`, `TypeAnalyzer.subtype` is 4.49 % (the bound checks that were there) and `TypeAnalyzer.extend` 1 sample, 0.02 %; `KindEnv.extendsConditions` and `KindEnv.withExtendsConditions` have none. The edit adds one `extend` for a declaration with a conditional entry, of which the library has three. No gain to take, so no second-pass edit, no `pass` run, and no answer reused, so no audit.

### The specification's build

`( cd Specification/fortress && ./ant genSource && ./ant tex )`: "BUILD SUCCESSFUL" / "Total time: 36 seconds", then "BUILD SUCCESSFUL" / "Total time: 35 seconds". The log's grep (`grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log`) prints 42, every one the line ``x@warning {Reference `#1' on page \thepage \space undefined}}{}`` (`sort | uniq -c`: "42 x@warning ..."), the traced body of LaTeX's `\@setref`, which names no passage; `grep -c '^LaTeX Warning: Reference'` and `grep -c 'multiply defined'` print 0. Climb batch 17's repair read the same 42 lines so (`explorations/compile-ladder/climb-batch-17/REPAIR-review.md`, section 2, deviation 2). The rendered text (`pdftotext` of the built `fortress.pdf`) holds each new passage: "The rest of the declaration holds at every instance and is checked without them: its static parameters, its own where clause, its throws clause and contract, its excludes and comprises clauses, and the other entries of its extends clause."; "and not while the rest of the declaration is, which holds at every instance"; "Of that rest, the compiled type checker never sees a trait's or an object's throws clause or contract: the disambiguator drops both, so neither is checked, and neither path evaluates an object's contract (row 781)". Then `git clean -fXq -- Specification`; `Specification/fortress.pdf` not updated.

## 2. Deviations

1. **The contract test and `Decls.scala` (steps 2, 3, 5, 8, 9, 10).** The ruling takes the contract test's key from the base, which "reads no condition, so it refuses each for the reason the text gives". The base accepts it: its typecheck exits 0 and prints nothing. No checker sees a trait's or an object's contract or `throws` clause. The disambiguator rebuilds the header with neither: `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:112-113` for a trait and `:137-138` for an object pass `Option.<List<Type>>none()` and `Option.<Contract>none()`, as the team's own lines did (`git show a874948ac:ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java`, `:100-101`, `:125-126`). A function keeps both (`:161-162`). The runs that show it, each on scratch programs under `tmp/`, on `main` with a private caches folder unless named:
   - `object V(x: String) requires { x.nothere() }`: `bin/fortress disambiguate -out D.tfs` then `unparse D.tfs` prints `object V(x: CompilerBuiltin.String) extends CompilerBuiltin.Object` / `end`, no contract; the base's typecheck exits 0.
   - `object V[\E\](x: E) requires { 1 + "a" }` and `requires { x.nothere() }`: the base's typecheck exits 0.
   - `f[\E\](x: E): Boolean requires { x.shown() } = true`: the base refuses it, 'ContractC.fss:8:16-23: No such method E.shown.', exit=255.
   - `object V(x: String) throws { NoSuchThing }`: typecheck exits 0.
   - `object V(x: ZZ32) requires { x > 0 }` with `v = V(-1); println("made")` in `run()`: `compile` exits 0 and `run` prints `made`, and walk prints `made`.

   So `Decls.scala:139-142` never checks a contract, and no edit of it or of `TypeWellFormedChecker.scala` can make the contract test pass: it is red on `main`, and red after step 4, as measured. The ruling's step 3 leaves `Decls.scala` unedited where `Decls` does not reach the contract with the conditions; it reaches no contract at all. An edit with no test that can fail first and pass after is outside `.claude/skills/fortress-repo/references/tests-writing.md`, "The order". So `Decls.scala` is unchanged. The contract test is not committed, since the gate would run it red. Its text, for the change that makes the disambiguator keep a contract: the ruling's program, with the first-line comment "An object's contract is evaluated when the object is made, at every instance, so it is checked without a conditional extends entry's condition: x.shown() needs an E that extends Shows, which only that entry assumes; trait-parameters.tex, section "Where Clauses", and objects.tex, section "Object Declarations"."; and the `.test` lines `tests=XXXCondExtendContractChecker`, `typecheck`, `typecheck_err_contains=File XXXCondExtendContractChecker.fss has 1 error.` and `typecheck_err_WIcontains=XXXCondExtendContractChecker.fss:9:16-23: No such method E.shown.`. That place and message come from the function's contract above, at the same line's columns, not from a run of the object. The defect is ledger row 781 (`ledger.py add`, section 14; `ledger.py check` after it: "780 rows, 10 fail the template", the ten it printed before). Its home is 2: the specification settles it (`Specification/basic/objects.tex:189-190`), and no gated test can pass while it shows, since a refusal test is red while the program is accepted, so its reproducer is `none` with the runs in its notes. When a change keeps the contract, the ruling's step 5 applies, with this test.
2. **The Effect's added sentence (step 7).** The ruling's Effect says the compiled type checker checks "the rest of the declaration without them", and the rest includes the `throws` clause and contract. By deviation 1, it checks neither. So four lines follow the ruling's three: "Of that rest, the compiled type checker never sees a trait's or an object's \KWD{throws} clause or contract: the disambiguator drops both, so neither is checked, and neither path evaluates an object's contract (row~781)." The specification's own sentence, in `trait-parameters.tex`, says what the language checks, and stays as the ruling words it.
3. **Step 12's paths.** Eight test files, not ten (deviation 1); one Scala file, not two; `explorations/fortress-gap-ledger.md` for row 781. The `historical:` line names the files of the 2012 tree that the commit edits: `TypeWellFormedChecker.scala` and the two `.tex` files.

## 3. Decisions

1. **The contract test's handling (deviation 1).** Taken: no gated test, `Decls.scala` unchanged, and row 781. Not taken: a gated contract test, red in the gate; an edit of `Decls.scala` that no program can observe; an edit of `TypeDisambiguator.java`, which the ruling forbids ("Edit no file of `ProjectFortress/src/` but `TypeWellFormedChecker.scala` and `Decls.scala`") and which would also bring each object with a contract to the code generator's refusal (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4107-4109`, `:5027-5029`; row 701).
2. **Where judge-review.1 goes.** Under "Off the path, parked", in "Climb batch 18, listed for his review", as a new entry after X.judge.2's: it asks for no answer before work on the path goes on. The ruling ties it to row 773's scoping of members, which is X.worker.2's entry, so the new entry names that entry. Not taken: joining X.worker.2's entry. That entry tells of the members' scoping; this one asks where the value parameters fall, a separate choice with its own way back.
3. **The cases' line numbers.** `RECORD.md`, F-255 and `PLAN.md` cite `main`'s lines after the edit: the trait case `TypeWellFormedChecker.scala:192-212` (the header `:195-197`, the conditions `:199-203`, the entries `:204-208`, the members `:209`, `excludes` and `comprises` `:210-211`), the object case `:218-236` (the header `:221-223`, the conditions `:225-229`, the members `:235`).
