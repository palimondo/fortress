<!-- The skeptic's review of climb batch 22c's rung A (rung-abstract-declared): what was checked, the programs and their output, the corrections and the one contested fix, and the verdict. -->
# Skeptic: rung A, an api member written abstract is declared in the component (P-158; row 816)

Head judged: `8e3c9224b` (the worker's last commit). Head after: the commit that adds this file. My commits, in order:

| Commit | Kind | What |
|---|---|---|
| `4e054ec89` | record | `REPORT.md` written from the run's journal, byte for byte (the worker's write was refused) |
| `40402a981` | correction | Appendix I: the sentence on the library began with `\library\` (lowercase at a sentence start) and gave the plural libraries "its component" |
| `31c01f44c` | correction | two defects my programs measured, outside the change, each a gated `XXX` test and a row (NEW-A-2, NEW-A-3) |
| `eee518f60` | defect, **contested** | the restored count refused a component field that declares an api's abstract getter |

**Verdict: contested.** The change is right with these commits; the fix `eee518f60` is contested, for a judge to rule on alone. The count and distance tables in `REPORT.md` are those of the worker's head; no stage ran after my fix, and the gate's tables on the merged tree are the record.

## 1. What I checked

1. **The tables.** The worker's files read: `tmp/count/base.txt` and `change.txt` equal (`diff` prints nothing), '#total 0', '#locations 0', '#crash none'; `tmp/rung-abstract-declared/distance-postedit.txt` '#total 0', '#kind export 0', '#crash none', its `errors.tsv` only the header. My own count stage, one session (nproc 4, Intel Xeon @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, nothing else running):
   - base, from `/home/user/fortress-base23` (load at start 0.15): `time explorations/coordinator/tools/checker-count/run.sh .../skbase.txt .../skbase` printed 'real 2m42.647s', 163 s;
   - the worker's head, from its tree, whose build is `733d73574`'s code (load at start 0.97): 'real 2m49.054s', 169 s.
   - The worker's: 172 s and 170 s. The same order of size. My two tables are equal, and equal the worker's `base.txt` and `change.txt`; the two `run.txt` files, each tree's path and scratch path replaced by one word, are equal (`diff` printed nothing).
2. **Test first**, in the worker's transcript (`agent-a699d5b64ecb0b415.jsonl`): call `2c2QFv`, 22:17:36, `junit.sh base ...` on the seeded base build, its `git diff --stat c3c22817c -- ProjectFortress/src Library` empty: '1) ...XXXExportAbstractMemberAbsent... Saw wrong failure. compile', '2) ...XXXExportAbstractMemberOtherHeader... Saw wrong failure. compile', 'Tests run: 5,  Failures: 2,  Errors: 0'. The patch was applied at 22:19:15 (`5ub6FX`), the last code edit at 22:19:33 (`Dt31R5`), the build started at 22:21:45 (`qWK43o`, 'BUILD SUCCESSFUL'). The pass: `MDq79c`, 22:23:27, 'OK (12 tests)'. As recordedFailure and recordedPass say.
3. **The diff**, line by line, against the section, P-158 and the revised text: the count is the team's 2012 one (`5a68404fd:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:767`); `equalAbstractMember` is the team's `ignoreAbstract` (`ExportChecker.scala:606-619`); the 12 lines are at the api's headers (each checked against `Library/FortressLibrary.fsi:983`, `:1462`, `:1897-1898`, `:2195`, `:2453-2496`). One gap: finding 1.
4. **The library's way.** A bodyless component member carries `abstract` to the check: the old code refuses a component trait's bodyless `g(): ZZ32` against the api's `abstract getter g(): ZZ32` with 'Asbtract method g ... is not declared in the API' (`SkGetterPlain`, below), so the 12 bodyless lines match by `equalMember` and `equalAbstractMember` serves a component body, which `ExportAbstractMemberDefined` guards. The prelude's form and its counts (18, 62, 5 in the apis, 0, 0, 5 in the components) recounted with `grep -c '^\s*abstract '`: as the report says.
5. **The tests.** Each comment cites `source-code.tex`, subsection "Export Statements", which the revised text makes say what the comment says; one comment line a file.
6. **My programs**, section 2.
7. **Homes**: row 816 home 1; NEW-A-1 home 3 (the brief's form); my findings 3 and 4 home 2, finding 1 home 1.
8. **Ledger and siblings**: `ledger-find` for 'export check', 'abstract member', 'missing members', 'equalListMembers', 'exported api', 'component api member', 'NoSuchMethodError interface', 'getter', 'field', 'unify', 'SubString': rows 637, 768, 769, 782, 800, 801, 802, 816, 828, 829, 587; none holds findings 1, 3 or 4. Row 802's case (`ExportComprisesEllipsisAbstract`) stays green. A text scan of the other library components for an api trait's abstract member that the component leaves out flagged only spellings that only the checker can settle (`Containment`'s `⊆` beside the component's `SUBSETEQ`, `IntMap`'s `CUP` beside `UNION`); I claim no site there. The distance covers the fourteen.
9. **The report**: the five provenance lines opened (`fortress-gap-ledger.md:314` row 816; `export-abstract-codegen/REPORT.md:5-23` "In short"; `CLIMB-BATCH-22c.md:330` run a0; `CompilerLibrary.fss:301-312` against `.fsi:110-120`; `5a68404fd:...ExportChecker.scala:767` and `:790-801`; `ExportChecker.scala:606-619`, `:821-828`; `source-code.tex:385-388` against `:413-418`): each says what it is cited for. `edb516dba` is sukyoungryu's (`git show -s`), `26718e298` and `5a68404fd` have no parent. P-158 was recorded on 2026-10-25 (`edbd0d4f5`), the date the box gives. The worker's suites: `tmp/rung-abstract-declared/testQuick.txt` 'Tests run: 1318', '86', '263', 'BUILD SUCCESSFUL', on `733d73574`'s code, the head's.
10. **Competing names**: `equalAbstractMember`, `ExportAbstractMemberBodyless`, `ExportAbstractMemberBodylessApi`, `XXXExportAbstractMemberOtherHeader`, `XXXExportAbstractMemberAbsent`, and my `ExportAbstractGetterField`, `ExportAbstractGetterFieldApi`, `XXXExportFieldByGetter`, `XXXListMapPairFunctionWalk`: each only in its own files, in both test corpora and `ProjectFortress/src/com/sun/fortress/`.
11. **The failure mode**: the rung turns a run-time `NoSuchMethodError` into a compile-time refusal, louder and earlier; it turns no failure into a quiet value. Under walk nothing moves but one refusal's text (section 2, `SkMaybeObject`).

## 2. My programs, old against new

Under `tmp/rung-abstract-declared/skeptic/p/`. The old code through `old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-abstract-declared/skeptic/old-caches`; the new through the tree's `bin/fortress` with a private copy of its caches (a fresh copy for the runs on my fix). Walk at `FORTRESS_THREADS=1`; the harness runs at 4. The diff writes no mutable variable, field, atomic block or library state, so no further thread runs.

Compiled, `compile` of the api's component (rc; the message):

| Program | api | component | old | the worker's head | my fix |
|---|---|---|---|---|---|
| `SkGetterOut` | `abstract getter g(): ZZ32` | leaves it out | 0 | 255, 'missing members of the trait/object in the component' | 255 |
| `SkFunctionalOut` | `abstract num(self): ZZ32` | leaves it out, `R` defines it | 0 | 255, 'missing members' | |
| `SkOprOut` | `abstract opr \|self\| : ZZ32` | leaves it out | 0 | 255, 'missing members' | |
| `SkGenericTraitOut` | `trait G[\X\] abstract f(): X` | leaves it out | 0 | 255, 'missing members' | |
| `SkPrivate` | `abstract f(): ZZ32` | `private f(): ZZ32 = 1` | 0 | 255, 'different method f' | 255 |
| `SkExtraMember` | `abstract f`, `g` | `g`, `h` | 0 | 255, 'different method f' | 255 |
| `SkBothAbstract` | `abstract f(): ZZ32` | `abstract f(): ZZ32` | 0 | 0 | 0 |
| `SkGenericSame`, `SkGenericRenamed` | `abstract m[\X\](x: X): X` | `m[\X\](y: X): X`; `m[\Y\](y: Y): Y` | 0; 255 'Asbtract method m' | 0; 255 | |
| `SkGetterPlain` | `abstract getter g(): ZZ32` | `g(): ZZ32` | 255, 'Asbtract method g ... is not declared in the API' | 255 | 255 |
| `SkAbsField` | `abstract x: ZZ32` | `x: ZZ32` | 255, 'abstract cannot modify fields in an API.' | 255 | |
| `SkFieldGetter` | field `x: ZZ32` | `getter x(): ZZ32` | 255, 'different field x' | 255 | 255 (finding 3) |
| `SkAbsGetterField`, `SkAbsGetterFieldObj` | `abstract getter x(): ZZ32` | field `x: ZZ32` (and `object O(x: ZZ32)`) | 0 | **255, 'due to different method x'** | 0 (finding 1) |
| `SkGetterFieldPrivate`, `SkGetterFieldType` | `abstract getter x(): ZZ32` | `private x: ZZ32`; `x: String` | 0 | | 255, 'different method x' |
| `SkGetterFieldSettable` | `abstract getter x(): ZZ32` | `settable x: ZZ32` | 0 | | 0 |

With a client (`compile` the api's component, `compile` the client, `run` it), and walk:

| Program | old | new | walk, old and new |
|---|---|---|---|
| `SkRunGetter`: the component leaves the abstract getter `g` out, `O` defines it | run rc 1, 'java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 SkRunGetterApi$T.g()'' | the component refused, 'missing members' | 'mk().g = 7', 'PASS' (NEW-A-1) |
| `SkRunGetterDecl`, `SkRunFunctional`, `SkRunSubTrait`: declared bodyless; a functional method; the body in a sub-trait | 'PASS' | 'PASS' | |
| `SkAbsGetterFieldRun`: the getter declared by a field | 'mk().x =  4', 'PASS' | head: 'java.lang.NoClassDefFoundError: SkAbsGetterFieldObj'; my fix: 'mk().x =  4', 'PASS' | 'mk().x = 4', 'PASS' |

Walk over the 12 members, `SkLibWalk.fss` (`depth`, `isBalanced`, `balanced`, `verify`, `rangeContains`, `splitWithOffsets`, `split` on flat, concatenated and empty strings, `Range`'s `isEmpty`, `holds`, `a[:]`, `StringReduction`'s `empty` and `join`): old and new print the same lines, 'flat size=6 depth=0 isBalanced=true balanced=0 rangeContains=true pieces=0 split=0', 'cat size=72 depth=1 ...', 'cat3 size=216 depth=3 ...', and both stop at the substring's `split()`, 'Cannot unify (Any,Any)->BOTTOM ... with E->G' at `Library/String.fss:478` (finding 4). `SkMaybeObject.fss`, `value object M extends AnyMaybe end`, is refused at load on both; the text moves: old 'Object M does not define an abstract method declared in type AnyUniqueItem: .../Library/FortressLibrary.fss:1699:5-28: holds():Boolean', new '... declared in type AnyMaybe: .../Library/FortressLibrary.fss:1614:5-28: holds():Boolean'. No gated test pins the old text (`grep` of the `.test` and `.fss` files of the gated folders).

## 3. Findings

1. **Defect of the change, fixed in `eee518f60`, contested: the restored count refuses a component field that declares the api's abstract getter.** An api `trait T abstract getter x(): ZZ32 end` with a component `trait T x: ZZ32 end` and `object O(x: ZZ32) extends T end`: the base compiles it and a compiled client's `mk().x` runs ('mk().x =  4', 'PASS'); the worker's head refuses it, 'due to different method x', because `equalAbstractMember` matches only a method. A trait's field declaration is "an implicit declaration of an abstract getter method" (`Specification/basic/traits.tex`, "Abstract Field Declarations", :722-723), so the field declares the member at the api's header, which is what P-158 and the revised `source-code.tex` ask; and the field's getter is in the trait's interface, which is why the old run passes.
   - The fix (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`, `equalAbstractMember`): an api getter with no static parameters, no parameters, no `throws`, and `abstract` and `getter` its only modifiers, also matches a component field of one name, the getter's name and its return type, neither `hidden` nor `private`.
   - The ways: (a) match the field, as above; (b) keep the refusal, the team's 2012 check, which compared members of one kind only; (c) record it and defer. I took (a): the program is valid by the text and ran on the base, and the change, not the text, introduced the refusal.
   - Test first: `ProjectFortress/compiler_tests/ExportAbstractGetterField` (an api `ExportAbstractGetterFieldApi`, its component with the field and `O`, a client asserting `mk().x` is 4). On the worker's head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests ExportAbstractGetterField.test XXXExportFieldByGetter.test` (2026-10-30T00:25:50Z): 'due to different method x @ ProjectFortress/compiler_tests/ExportAbstractGetterFieldApi.fsi:5:5-6:1)', '1) ...ExportAbstractGetterField... Must satisfy FAIL or fail should not appear in output link', 'Tests run: 3,  Failures: 2,  Errors: 0'. On the old code, `old-fortress.sh ... junit .../ExportAbstractGetterField.test .../XXXExportFieldByGetter.test`: '. run .../ExportAbstractGetterField (313ms) PASS', 'OK (3 tests)'. On my fix, after `ant compileAll` ('BUILD SUCCESSFUL') and the library order (five compiles rc 0, the five jars), every export test of the folder, `junit.sh skfix ProjectFortress/compiler_tests <the 18 *Export*.test files>`: '. run ProjectFortress/compiler_tests/ExportAbstractGetterField (283ms) PASS', 'OK (23 tests)'.
   - The suite: `ant testQuick` on `eee518f60`'s code: 'Tests run: 1321, Failures: 0, Errors: 0' (compiler), 'Tests run: 86, Failures: 0, Errors: 0' (library), 'Tests run: 263, Failures: 0, Errors: 0' (othercompiler), 'BUILD SUCCESSFUL', 'Total time: 5 minutes 4 seconds'. The 3 more compiler tests than the worker's 1318 are `ExportAbstractGetterField`'s link and run and `XXXExportFieldByGetter`'s compile.
   - No library site: no api abstract getter of `Library/` or `LibraryBuiltin/` is met by a trait field in its component (a `grep` of the 71 `abstract getter` lines), so the distance and the count cannot move.
2. **Correction, `40402a981`**: `Specification/appendices/changes.tex`, the entry "An abstract method of an exported trait": `\library\ followed ...` started a sentence with the lowercase macro and said "its component"; now `\Library\ followed ... their component \TYP{FortressLibrary}`.
3. **Defect outside the change, recorded, `31c01f44c`: the export check refuses a component getter for an api field.** An api `trait T x: ZZ32 end` and a component `trait T getter x(): ZZ32 end`: 'due to different field x', on the old code and on the head, where `source-code.tex`, "Export Statements", says "A field declaration is satisfied by a (possibly implicit) getter and/or setter declaration". Home 2: `ProjectFortress/compiler_tests/XXXExportFieldByGetter` (`compile_err_contains=different field x`), green on the old code and on the head ('Saw expected failure'), red with the component's getter made a field for one run ('Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'). Row NEW-A-2 in `record.md`.
4. **Defect outside the change, recorded, `31c01f44c`: under walk, `List`'s `map` on a list of pairs cannot infer its static argument from a function.** `p.map(fn (i: ZZ32, s: String): String => s)` on a `List[\(ZZ32, String)\]`: 'Cannot unify (ZZ32,String)->String ... with E->G' at `Library/List.fss:469`; the same with a function of one tuple parameter; it runs with `p.map[\String\](...)` ('static argument ab') and at a non-tuple element type ('not a pair xx'). So `SubString`'s `split()` (`Library/String.fss:478`) stops at every call, on the old code and the new. The specification settles it (`inference.tex`, "The Static Arguments of a Call"). Home 2: `ProjectFortress/tests/XXXListMapPairFunctionWalk.fss`, through `harness-one.sh` on the old code (`FORTRESS_HOME=/home/user/fortress-base23 .../harness-one.sh ...`) and on the head: 'OK Saw expected exception', 'OK (1 test)'; with `map[\String\]` written for one run: 'PASS', '...AssertionFailedError: Expected failur...', 'Tests run: 1,  Failures: 1'. The direct run names the cause: 'Cannot unify (ZZ32,String)->String(class com.sun.fortress.interpreter.evaluator.types.FTypeArrow)'. Row NEW-A-3.
5. **Confirmed as reported**: the check counts every api member and matches by header with `abstract` aside; the 12 lines; the tests seen failing first; the specification's revision, its box, label, entry and record; NEW-A-1 (my `SkRunGetter` under walk on both codes: 'mk().g = 7'); the prelude unrefused; the timings; no sentence of `Specification/` besides `source-code.tex:380-385` (the base's lines) made false; F-282, F-286, F-294, F-53, `library.md:44` and `compiler.md:74` made false, as `record.md` lists.

## 4. Contested

`eee518f60`, finding 1.

- **The worker's side** (`REPORT.md`, section 10, decision 1; section 3, "The ways for the check"): the check is P-158's letter, "an api member written abstract is matched by a component member of the same header with the abstract modifier ignored" (`count816`, `equalFnHeaders(..., true)`), the team's count restored. The report does not take up a field; read by it, a field is not a member "of the same header", and the team's 2012 check, which P-158 cites, refused it too.
- **Mine**: P-158 asks the component to declare each such member at the api's header, and a trait's field is an implicit declaration of that getter (`traits.tex`, "Abstract Field Declarations"); the field's getter is in the trait's interface, so the compiled call runs (the old code's 'PASS'), and row 816's reason for the refusal does not hold. The rung's count, not the text, made the refusal. Nothing on record names the field case, so I chose among ways; a judge may revert the commit whole (its test, its record line in `record.md`, "The skeptic's additions", and the code go with it).

## 5. Where I differ from the worker

- Decision 1: I add the field case (section 4).
- Decision 7, NEW-A-1 with reproducer `none`: agreed.
- The report's sentence "no other sentence of `Specification/` made false" holds on my reading too.
