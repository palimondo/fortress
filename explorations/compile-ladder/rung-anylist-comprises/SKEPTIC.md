# Rung A of climb batch 17: the skeptic's verdict

Branch `wip/rung-anylist-comprises`. The worker left it at `fa7f66b44`; the skeptic's first commit, `3654552ca`, put the worker's REPORT.md and record.md on the branch from the run's journal. The skeptic changed no code: every commit after it is a record, a test of a deferred defect, an Appendix I sentence or a citation.

**Verdict: approved.** The change does what the section and P-151 ask: `AnyList`'s clause is live, the checker opens a type `where`-clause variable at a call as it opens a size, walk binds it at load, and row 636's four distance sites are gone with nothing come. The count's results are the base's. The tests were seen failing on the base's code before the edit was built. The skeptic's programs found two deferred defects of the new form and two older defects; each now has its home. No fix is contested.

## What was checked

### 1. The count and the distance

The count stage, timed once each in one session on an idle machine (4 CPUs, Intel Xeon @ 2.10 GHz, load 0.09 at the start, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`), the base from `/home/user/fortress-base17` and the head from the rung's worktree, whose build is `c6adc85f1`'s code (no file under `ProjectFortress/src` differs between `c6adc85f1` and the head):

    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/rung-anylist-comprises/skeptic/count/base.txt $W/tmp/rung-anylist-comprises/skeptic/count/base
    real	1m12.501s
    user	1m53.180s
    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/rung-anylist-comprises/skeptic/count/head.txt $W/tmp/rung-anylist-comprises/skeptic/count/head
    real	1m13.366s
    user	1m53.190s

- The two tables are equal (`diff` prints nothing), and each equals `explorations/compile-ladder/climb-batch-16/gate/checker-count.txt` and the worker's table of `c6adc85f1`: `#total 39`, `#locations 38`, `#crash none`.
- The two `run.txt` files, each tree's path replaced by `TREE`, are equal, 178 lines each, and equal the worker's `change2` output. Row 737's error at `FortressLibrary.fss:130` is in both.
- The worker's times (base 76.4 s, change 93.4 s, at load 6 to 10) are of the same size as these; on an idle machine the two are within a second.
- No pass was made (the worker's decision 8). The skeptic has no table of a pass to compare, and none is needed: the pass changed no code.

The distance stage was not run again: the worker's run on `c6adc85f1` was read. Its errors against `explorations/compile-ladder/gate/distance-sites.tsv`, by location and message (the skeptic's set difference of the two files' sixth and seventh columns):

    < List.fss:146	Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].
    < List.fss:179	No such method CovariantCollection.AnyCovColl.toImmutableArray. ...
    < List.fss:88	Could not check call to function app - ... (List.AnyList, List.AnyList)
    < List.fss:89	Could not check call to function addL - ... (Any, List.AnyList).
    < List.fss:90	Could not check call to function addR - ... (List.AnyList, Any).
    ---
    > List.fss:140	Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].

So row 636's four went, `:146` moved to `:140` by the six removed lines, and no site came: 49 to 45, as `compare.sh` prints ("DISTANCE DOWN   49 -> 45 (-4)", "unit component List 5 -> 1 (-4)").

### 2. Test first, in the worker's transcript

- `venzVK`, 14:28:38 to 14:28:40, on the base's code (`git diff --stat` empty, the new tests untracked): `junit.sh base ... OpenTypeChecker.test XXXOpenTypeEscapeChecker.test XXXOpenTypeTwoChecker.test XXXOpenTypeBoundEvidenceChecker.test`, "E is undefined." and "Tests run: 4,  Failures: 4,  Errors: 0".
- `ZimtQV`, 14:29:07 to 14:29:10: `harness-one.sh ... OpenTypeWalk.fss`, "OpenTypeWalk.fss:5:31: E is undefined." and "Tests run: 1,  Failures: 1".
- The first build started at 14:35:01 (`2XVA6r`); the library was first edited at 14:42:14 (`LfJizr`).
- `bDQ9Yb`, 14:57:39, on `b6cb13000` before `c6adc85f1` was built: `NatOpenThroughSubtraitChecker` red ("[\nat m\]Nt[\m\]->ZZ32 is not applicable to an argument of type Mid[\3\]."), and green on the old code ("OK (1 test)").
- The last code edit is `mggXuR` at 14:57:56, built by 14:58:35. The passing runs after it: `9acXhZ` (15:00:14, "OK (11 tests)", and the 30 walk tests "OK (30 tests)"), `rj5bEJ` (15:25:18, "OK (12 tests)"), and the three suites of `5Roxkv` (testQuick 1230/86/263, testSystem 157 + 154 + 162 + 159, testSpecData 130, each "BUILD SUCCESSFUL").

Two of the worker's tests, `XXXOpenTypeThroughSubtraitChecker` and `XXXOpenTypeOverloadChecker`, were written after the change and never run on the base's code. The skeptic ran them there:

    old-fortress.sh /home/user/fortress-base17 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXOpenTypeThroughSubtraitChecker.test <tree>/ProjectFortress/compiler_tests/XXXOpenTypeOverloadChecker.test
        E is undefined.
    1) .../XXXOpenTypeThroughSubtraitChecker(...)AssertionFailedError: Saw wrong failure. compile
    2) .../XXXOpenTypeOverloadChecker(...)AssertionFailedError: Saw wrong failure. compile
    Tests run: 2,  Failures: 2,  Errors: 0

Both are green on the head in the worker's `rj5bEJ` run ("Saw expected failure").

### 3. The diff against the section, B.1 and the decisions

- `TypeDisambiguator.forTraitDecl` is the probe's B.1 lines, comments aside: the where-bound type variables are in scope in the where clause, comprises clause, self type, parameters and members, and not in the extends clause (`:101`) or the excludes clause (`:121`).
- `TypeAnalyzer`: `whereSizes` takes type bindings, `openWhereSizes` makes `E#k` bounded at the trait's arguments and registers it, both calls pass the arguments (`:852`, `:939-940`), as the probe's did. The probe's unused two-argument overload is left out. `opensTypes` and the scoped parent rule (`:303-309`) are the worker's (decision 2). B.2's and B.3's lines (constraint bounds, conditional parents, `Decls.scala`, `TypeWellFormedChecker.scala`, `STypesUtil.scala`) are not in the diff.
- `KindEnv`: `EmptyKindEnv.lookup` and the registry at the end of `object KindEnv`, after `extractNodeBindings`; the trial merge with rung L's head `7881ac403` (`git merge-tree --write-tree`) is clean, as are those with rungs W, C and G.
- Walk: `processWhereClauses` binds the variable in two passes as `SingleFcn.createSymbolicInstantiation` does (`SingleFcn.java:205-217`); the comprises check reads it as a variable for any type (`BuildEnvironments.java:1197-1198`, `:1463-1467`), the worker's deviation, which `OpenTypeWalk` needs.
- The library edits are the section's bodies, nothing of Part A's.
- The memo keys: the subtype and ground memos skip a left type that opens (`TypeAnalyzer.scala:114`); the exclusion and reduction memos keep no answer whose computation moved the shared counter (`:426-428`, `:605-607`); the registry is written once per fresh name. The skeptic agrees with the worker's argument and saw no output that a memo changed (the count's outputs are equal).

One provenance line was false: the probe passed the trait's arguments at both calls of `openWhereSizes` (the probe's `TypeAnalyzer.scala:808` and `:911`; its REPORT, B.1, "TypeAnalyzer.scala:808, 911: the arguments are passed through"), so it was not a deviation. Removed in `fc9be34d5`.

### 4. Where the fix belongs, and the siblings

The precedent is the right one: the size opening of climb batch 13's rung N, widened to types. The other users of `covariantCompr` are counted by the worker. Not counted: the team's other commented clauses of the same form, which the type opening now makes writable. `Library/FortressLibrary.fsi:959` (`AnyMaybe`, "not yet: comprises Maybe[\T\] where [\T\]"), `Library/FortressLibrary.fss:1693` (`AnyUniqueItem`, "comprises UniqueItem[\T\] where [\T\]"), `Library/FortressLibrary.fsi:1207` (`Array`, with a constraint), `Library/FortressLibrary.fsi:444` (`AnyIntegral`, whose clause already lists the five integer types live), and eight traits of `Library/Reflect.fss` (`:82`, `:86`, `:150`, `:157`, `:172`, `:208`, `:214`, `:223`). P-151 names `AnyList`'s comment only, so none is touched; the question is for the curator.

### 5. The tests

Each tests what it names, carries one comment line and is named by its topic. `OpenTypeWalk`'s messages cite `traits.tex`, section "Trait Declarations", which says that every value of the trait is a value of a listed type (`Specification/basic/traits.tex:235-237`).

### 6. The skeptic's programs, old against new

Programs under `tmp/rung-anylist-comprises/skeptic/`, run with `old-fortress.sh /home/user/fortress-base17 <tree>/tmp/old-caches` for the base and with the head's `bin/fortress` and a private caches folder for the new code. The diff writes no Fortress mutable variable, field or atomic block; the walk programs ran at one thread.

| program | what it asks | base | head |
|---|---|---|---|
| `SkCompWide` (walk) | list comprehensions at a declared wider type, `List[\Number\]`, `List[\Object\]`, empty | `w <\|0, 1, 2\|> 3 true false` ... | the same four lines |
| `SkAnyListOps` (walk) | `addLeft`, `addRight`, `\|\|` on empty, mixed and tuple elements | seven lines | the same seven lines |
| `SkTraitPlain` (walk; compiled) | a trait with `comprises` and a generic trait, no `where` | `PASS`; `PASS` | `PASS`; `PASS` |
| `SkUnlisted` (checker; walk) | an unlisted object extends `AnyBox` | "E is undefined." | refused, "Invalid comprises clause ... Other is not eligible to extend it"; walk refuses at load, the same |
| `SkBound` (checker; walk) | the opened type keeps its binding's bound `Number` | "E is undefined." | accepted; walk prints `3` |
| `SkBoundTooNarrow` (checker) | a callee that needs `E extends ZZ32` | "E is undefined." | refused, "[\E extends ZZ32\]NBox[\E\]->ZZ32 is not applicable to an argument of type AnyNumBox." |
| `SkBoundArgs` (checker; walk) | the bound `E extends T` at the trait's argument `Number` | "E is undefined." | accepted; walk prints `3` |
| `SkSelf` (checker; walk) | `count(self)` in the trait | "E is undefined." | accepted; walk prints `1` |
| `SkDomain` (checker) | a function of one opened `Box` passed where `AnyBox -> ZZ32` is expected | "E is undefined." | refused, "AnyBox->ZZ32->ZZ32 is not applicable to an argument of type Box[\E#3\]->ZZ32." |
| `SkBoundExtender` (checker; walk) | `object NBox[\E extends Object\] extends AnyNumBox`, listed only at `E extends Number` | "E is undefined." | accepted; walk prints `PASS NBox[\String\]`: NEW-A-3, NEW-A-4 |
| `SkMemberInside`, `SkMember` (checker; walk) | a member `getter item(): E` | "E is undefined." | the declaration accepted; walk "Missing type E" at load; an outside call `println(mk().item)` crashes the checker, "E is not in the kind env [][][]": NEW-A-5, NEW-A-6 |
| `SkMemberNat` (checker; walk) | the size face, `getter me(): Nt[\n\]` | accepted; walk "Missing type n" | the same |
| `SkLeakTypecase`, `SkLeakTwoBounds`, control `SkTypecaseBare` (walk) | whether `E`, bound in the component's environment for a trait without static parameters, is seen elsewhere | "E is undefined." (control: `kind E E`) | `kind E E`, as the control on both; two traits with `E` at different bounds run: not observed |
| `SkGenericFnValue` (checker; walk) | a generic function passed as a value, no `where` | crash, "F is not in the kind env [][][]"; walk "Unification error ... of type null" | the same: NEW-A-8 |
| `SkTcThenCompile` (compiled) | `typecheck`, then `compile`, then `run` | compile exits 0, no jar, "Could not load SkTcThenCompile" | the same: NEW-A-7 |
| the worker's `ArrowType`, `ArrowSize` (checker; walk) | NEW-A-1 | | accepted; walk "Cannot unify ZZ32->AnyBox", "Cannot unify ZZ32->NatParamT" |

The commands, for example:

    old-fortress.sh /home/user/fortress-base17 <tree>/tmp/old-caches typecheck SkBoundExtender.fss
        E is undefined.
    FORTRESS_CACHES=<tree>/tmp/rung-anylist-comprises/skeptic/new-caches <tree>/bin/fortress typecheck SkBoundExtender.fss
        (no output)
    FORTRESS_CACHES=... <tree>/bin/fortress SkBoundExtender.fss
        PASS NBox[\String\]
    FORTRESS_CACHES=... <tree>/bin/fortress typecheck SkMember.fss
        SkMember.fss:5:20:
        E is not in the kind env [][][]
    FORTRESS_CACHES=... <tree>/bin/fortress SkMember.fss
        ProgramError: .../SkMember.fss:5:20:
        Missing type E

The worker's walk-side reading that the variable, bound in the component's environment, is not observed elsewhere holds for the skeptic's programs too.

### 7. Defects measured, and their homes

| defect | home |
|---|---|
| NEW-A-3: the checker reads a bounded type `where`-clause variable at every type when it checks the extenders, so `SkBoundExtender` is accepted; `traits.tex`, "Trait Declarations", lists the type at every value of the variable, the types below its bound | the row only, reproducer none: a compiled refusal test is red while the declaration is accepted |
| NEW-A-4: walk's check at load reads it at every type too, and runs the program | home 2: `ProjectFortress/tests/XXXComprisesWhereBoundExtender.fss` and `.test` (`load_exception_contains=Invalid comprises clause`) |
| NEW-A-5: walk refuses at load a member whose declared type names the variable, of either kind (the size face on the base) | home 2: `ProjectFortress/tests/XXXWhereVariableMemberWalk.fss`; `trait-parameters.tex`, "Where Clauses", lets every static variable of a declaration be a `where`-clause variable |
| NEW-A-6: the checker crashes at an outside call of a member whose type names a type `where`-clause variable; the size face is accepted | the row only, CONTESTED (the text gives no type for such a call), reproducer none: a crash |
| NEW-A-7: a compile after a typecheck of the same file writes no jar (older than the rung) | the row only, reproducer none |
| NEW-A-8: the checker crashes on a generic function passed as a value (older than the rung; walk's face is row 156's message) | the row only, reproducer none: a crash |

The rows are in record.md in the row template; each passes `ledger.py check --rows` with a number for its placeholder. The two `XXX` walk tests through the harness:

    FORTRESS_HOME=/home/user/fortress-base17 /home/user/fortress-base17/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-anylist-comprises/skeptic/old-h1 <the three files>      (17:05, the base's code)
    . interpret .../XXXWhereVariableMemberWalk .../XXXWhereVariableMemberWalk.fss:5:31:
     OK Saw expected exception
     Failed after load ... E is undefined.
    1) .../XXXComprisesWhereBoundExtender(...)AssertionFailedError: Failed after load, in an XXX test.
    Tests run: 2,  Failures: 1,  Errors: 0

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-anylist-comprises/skeptic/new-h1 <the three files>      (17:05, the head)
     OK Saw expected exception
     Saw expected failure: loaded and ran, not refused at load
    OK (2 tests)

`XXXComprisesWhereBoundExtender`, the first `XXX` test, with an unlisted `object Other extends AnyNumBox end` added for one run and then removed, is red: "Refused at load as its keys name, in an XXX test" and "Tests run: 1,  Failures: 1".

### 8. The ledger

`ledger.py find` for the rung's words (`where member*`, `comprises where`, `Missing type`, `kind env`, `generic function value*`) found no row for the defects above; row 156 is walk's `nat`-generic face of NEW-A-8 and is at 1,144 characters, so the new row cites it as a sibling. Rows 636, 682, 701 and 307 are noted as the worker's record.md says.

### 9. The report and the record

- The five provenance lines were opened; the false deviation is removed (`fc9be34d5`). The historical line's `5a68404fd` is the parentless import that blame reaches.
- REPORT.md's Appendix I lines are moved to the head's (`4525643e4`).
- record.md's revival change said the variables are in scope in the trait but for its extends clause; the excludes clause is outside too (`a8a89f6b7`, its citation corrected in `899ff2c25`).
- The FACTS entry, the row notes and the revival change are otherwise true as written. The suites' verdicts, commands and code state are `c6adc85f1`'s, the head's code.
- The sentences made false: the worker's list (`changes.tex:1480-1486` at the base, F-244's "left two holes", P-151's "Still to build", row 636's note, `List.fsi:56`'s comment). The skeptic reads F-243 as the worker does: its counts are the probe's and hold.
- The skeptic added two departures to the Effect, in the revision form, as the entry's other departures are written: the extenders read at every type whatever the bound (`Specification/appendices/changes.tex:1492-1495`, `:1510`, rows NEW-A-3 and NEW-A-4), and the member whose type names the variable (`:1512-1516`, rows NEW-A-5 and NEW-A-6). The specification builds: both `ant` commands "BUILD SUCCESSFUL", no "LaTeX Warning: Reference", "multiply defined" or "Undefined control sequence" in `fortress.log`.

### 10. Competing declarations

The worker's eight test names, the skeptic's two, `opensTypes`, `registerOpened` and `lookupOpened` have no other declaration in `ProjectFortress/*tests*`, `Library/` or `ProjectFortress/src/com/sun/fortress/`. Rung L's `XXXWhereVariableBoundCall` is another name.

### 11. The failure-mode question

- `SkBoundExtender`: the base refused the clause, "E is undefined."; both paths now accept an object that the clause lists only below the bound, and walk gives `NBox[\String\]` the type `AnyNumBox`. A loud refusal became a quiet acceptance of a declaration that `traits.tex` refuses (NEW-A-3, NEW-A-4).
- `SkMember`: the base's "E is undefined." became a checker crash at the outside call (NEW-A-6), loud still.
- Nothing else of the rung turns a throw into a value. Walk's comprises check reads an unbounded variable at every type, as the text lists it.

## Where the skeptic differs from the worker

- The deviation of the two `openWhereSizes` calls is not one (above).
- The worker reported no check of a bounded type `where`-clause variable or of a member naming the variable; the skeptic's programs found the four rows above.
- The worker's three questions for the curator stand.

## The skeptic's commits

| commit | what | kind |
|---|---|---|
| `3654552ca` | the worker's REPORT.md and record.md, from the run's journal | record |
| `61a532afc` | `XXXComprisesWhereBoundExtender`, `XXXWhereVariableMemberWalk`, rows NEW-A-3 to NEW-A-8, the Effect's two departures, the revival change's departures and the handover | correction (home-2 tests, rows, specification) |
| `fc9be34d5` | REPORT.md's false deviation removed | correction (provenance) |
| `a8a89f6b7`, `899ff2c25` | record.md's scope sentence, and its citation | correction (record) |
| `4525643e4` | REPORT.md's Appendix I lines | correction (citation) |

`3654552ca`'s footer names the model by its tier, where the skill's footer has "Claude" alone; the later commits use the skill's footer.

No code was changed, so nothing was built and no suite was run; the report's tables are those of the worker's head.
