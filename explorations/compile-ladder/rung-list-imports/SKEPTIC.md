# Climb batch 22c, rung L (`rung-list-imports`): the skeptic's verdict

Judged: `wip/rung-list-imports` at `681dd8605` (the worker's head), cut from `c3c22817c`. The old code ran from the batch's base build, `/home/user/fortress-base23`, through `explorations/coordinator/tools/old-fortress.sh`. That worktree's HEAD is `e0ec620a9`, not `c3c22817c`: `git diff --name-only e0ec620a9 c3c22817c -- ProjectFortress Library bin build.xml Specification` prints nothing, so its code is the base's. Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1; rung A's skeptic ran its own count stage beside my first timing.

**Verdict: approved.** The change does what the section asks, by the team's devices, and the record is honest but for the corrections below, which I made. No defect of the change; no contested fix.

## 0. The worker's report and record

The brief's first two journal lines exited 1 and wrote nothing: `explorations/compile-ladder/rung-list-imports/` did not exist ('FileNotFoundError: ... REPORT.md'). After `mkdir -p` the same lines wrote both files ('wrote ... REPORT.md, 33064 bytes', 'wrote ... record.md, 18972 bytes'), committed alone in `479f16405`.

## 1. The count and distance tables

The worker's tables, read from its scratch folders, match its report: its count tables for `base` and `change` are equal and equal `explorations/compile-ladder/climb-batch-22/gate/checker-count.txt` (twelve `#api` rows at 0, '#total 0', '#locations 0', '#crash none'); the distance table reads '14 components', '#total 0', every kind 0, '#crash none', '#seconds 313'.

The diff changes the compiled checker (`ExportChecker.scala`), so I ran the count stage on the base build and on the worker's head, one after the other in one background call, the scratch folders in this tree, `FORTRESS_HOME` set to each tree:

    time explorations/coordinator/tools/checker-count/run.sh <S>/base.txt <S>/base      # from /home/user/fortress-base23
    real	2m48.419s        (load at start 1.13)
    time explorations/coordinator/tools/checker-count/run.sh <S>/change.txt <S>/change  # from /home/user/fortress-listimports
    real	2m42.429s        (load at start 2.43)

The two tables are equal (`diff` prints nothing), and equal the worker's `change` table. The two `run.txt` files, each tree's path replaced by `TREE`, differ in 0 lines, and my `change` output equals the worker's `change` output in 0 lines. The worker's times, 179 s and 221 s, are of the same size. The base build was left as it was: `git status --porcelain` there prints nothing, and no file under it changed during the runs (`find -mmin -8` prints nothing). The worker made no second pass, so its head is its step-1 code.

## 2. Test first, in the worker's transcript

- `ExportVarObjectParameter`: written 22:17:37; failing through `junit.sh` on the base's code at 22:24:08 (call `Vktpva`), 'due to different parameters, different parameters for object constructors', 'Tests run: 1,  Failures: 1'; the edit first built at 22:29:02 (`GKQ5zK`); passing at 22:31:09 (`GjTv5P`), '. compile ProjectFortress/compiler_tests/ExportVarObjectParameter  OK (time = 1399ms)', 'OK (10 tests)'; no code edited after; in `ant testQuick` at 22:40, compiler track 'Tests run: 1316, Failures: 0, Errors: 0'. The recordedFailure and recordedPass lines are those of the transcript.
- `table.py`'s canned case: failing at 22:20:10 on the unchanged `table.py` (`E7PH4W`), 'FAILED (failures=2)'; `table.py` edited at 22:28:42; passing at 22:28:49 (`2CGt6M`), 'Ran 13 tests', 'OK'; neither file edited after.
- `CovariantCollectionArmsWalk`, a guard: 'PASS', 'OK (1 test)' at 22:25:18 (`3v8YHM`), before the library's first edit, `git apply` at 22:27:01 (`rAsCX7`); in the thirteen-test harness run after the build, 'OK (13 tests)'. Its two earlier red runs were the test's own syntax, as the report says.
- `XXXObjectFieldWithoutType`, the first `XXX` test: 'Saw expected failure' as it is (`jU87Es`), 'Saw wrong failure' with `sz: ZZ32` written for one run (`hZeXJQ`), then restored.
- The library text's test is the distance stage over the fourteen, its before the planner's b14; the worker ran it once, on the final code, at 22:40.

## 3. The diff against the section and the decisions

Every edit is one the section lists: the api's five lines and the component's eight places are `rung-L.patch`'s, taken whole; `equalParams` drops `var` on both sides, as `equalLValue` does (`ExportChecker.scala:852`), its comment re-cited to `objects.tex`, "Field Declarations", as the brief asks; `run.sh`'s list and header; `table.py`'s api lines. My programs (section 6) show the parameter rule is not broader than fork 8's default: `hidden`, `settable`, a type and the api's own `var` are still compared or refused.

## 4. Where the fix belongs

The precedents hold: `equalLValue`'s `remove(Modifiers.Var)` for the parameter; in the library, upward's own failing `NonEmpty` arm for `iaf` and `aaf`, `FortressLibrary`'s `cast` (`Library/FortressLibrary.fss:33-37`), as `List.fss:179` uses it, for upward's general arm and `Singleton`'s `dirtyIAF`; `fail[\()\]` with its static argument, as `library.md` asks; the api at the component's headers, `abstract` on the bodyless members; `table.py`'s existing `none:` reason. No device is the rung's own.

## 5. The tests' text

The names are by topic; each file carries one comment line; the citations name file and section. One was wrong: `CovariantCollectionArmsWalk`'s comment cited aggregate.tex, section "List Expressions", a `\subsection` (`Specification/basic/expressions/aggregate.tex:98`). Corrected in `42890b433`; the test is green on the head after it:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../h1 ProjectFortress/tests/CovariantCollectionArmsWalk.fss
    . interpret tmp/rung-list-imports/skeptic/h1/tests/CovariantCollectionArmsWalk
    PASS
    OK (1 test)

## 6. My programs, old code against the head

Walk, each program at `FORTRESS_THREADS=1` and `=4`, old code `old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches P.fss`, head `bin/fortress P.fss` with a private caches folder; outputs compared with each tree's path masked:

| Program | What it does | Old | Head | 1 and 4 threads |
|---|---|---|---|---|
| `SkCovWalk` | list comprehensions at `ZZ32`, `Number`, `Any`, `String`, a tuple type, nested, filtered, empty, 300 sequential and 1000 parallel elements; a set and a map comprehension; `APPCOV` of singletons at `ZZ32`, `RR64` and `String`, `toArray`, `toImmutableArray`, `assignToArray` at `Number`, `cata` | rc 0 | rc 0, the same output | the same |
| `SkCovOpen` | `OpenParameterListComprehensionWalk`'s open-type copy, caught | 'CastError' | 'CastError' | the same |
| `SkRow96` | row 96's probe, `c18_map_of_shapes` | 'FAIL: Singleton[...] APPCOV Singleton[...] have no common supertype!' | the same, raised from `CovariantCollection.fss:43:5-52` where the old code says `:40:5-52` | the same |
| `SkCovUserNE` | a user `object Three extends NonEmpty[\ZZ32\]` defining `opr \|self\|`, `cata`, `dirtyIAF`; `Three.toArray()` | 'Failed to find any matching overload, args = (Three)' at `CovariantCollection.fss:84:26-31`, the trait's `\|self\|` | 'FAIL: initArrayFrom: NonEmpty but not Singleton/Append', the new `iaf` arm | the same |

Lines from `SkCovWalk` on the head, equal to the old code's: 'b=<|0, 1.5, 2, 3.5, 4|>', 'nested=<|<||>, <|0|>, <|0, 2|>, <|0, 3, 6|>|>', 'm={k0|->0, k1|->1, k2|->2}', 'x4 [0#3][ p 7 1.5 ] size 3', 'cata ((<p> <7>) <1.5>)'. `SkCovUserNE`'s own `catch` then failed, 'Cannot find definition for method message given receiver FailCalled', my program's error, on both. The open type's `CastError`, uncaught, with walk's context lines: old 'Library/List.fss:179:65-98:' then 'Library/CovariantCollection.fss:146:18-45:'; head 'Library/CovariantCollection.fss:17:5-38:' then ':156:25-44:'.

Compiled, each component compiled by `fortress compile` on the old code and on the head, each api beside it:

| Api parameter | Component parameter | Old | Head |
|---|---|---|---|
| `Counter(n: ZZ32)` | `Counter(var n: ZZ32)`, a method `bump` that writes `n` | rc 255, 'different parameters for object constructors' | rc 0 |
| `H(hidden x: ZZ32)` | `H(var x: ZZ32)` | rc 255 | rc 255, the same message |
| `St(settable x: ZZ32)` | `St(var x: ZZ32)` | rc 255 | rc 255 |
| `Sb(settable x: ZZ32)` | `Sb(settable x: ZZ32)` | rc 0 | rc 0 |
| `Sv(settable x: ZZ32)` | `Sv(settable var x: ZZ32)` | rc 255 | rc 0 |
| `W(x: ZZ32)` | `W(var x: ZZ64)` | rc 255 | rc 255 |
| `Va(var x: ZZ32)` | `Va(x: ZZ32)` | rc 255, 'var cannot modify an object parameter, x' | the same |
| `Tp(a: ZZ32, b: String)` | `Tp(a: ZZ32, var b: String)` | rc 255 | rc 0 |
| `Tq(a: ZZ32, b: ZZ32)` | `Tq(b: ZZ32, a: ZZ32)` | rc 0 | rc 0 |
| `Np(a: ZZ32)` | `Np(z: ZZ32)` | rc 0 | rc 0 |

`SkVarParamMain` (`Counter(5)`, two `bump()`s, `assert(c.get(), 7, ...)`, `assert(c.n, 7, ...)`): on the head compiled and run 'PASS', rc 0, at 1 and at 4 threads; under walk 'PASS' on both trees at both widths; the old code's run dies 'java.lang.NoClassDefFoundError', its component refused. `Sv` passes on the head because `settable` implies `var` (traits.tex, "Abstract Field Declarations"); the rule is fork 8's.

The last two rows are a defect older than the rung (section 7). `SkNameParamMain`, `println("a=" Np(3).a)`, compiles on both and dies run: 'java.lang.NoSuchMethodError'; walk: 'Cannot find definition for method a given receiver Np'. `SkSwapMain`, `t = Tq(1, 2)`: compiled 'a= 2  b= 1', 'FAIL:  2 =/= 1; the api's first parameter is a'; walk 'a=2 b=1'. The same on the old code and on the head.

The compiled path cannot run `CovariantCollection` before the switch-over (`fortress compile` uses the compiler's prelude), so its checker answer is the distance stage's, '#total 0'.

## 7. Defects and their homes

- Rows 828 and 829, home 1, as the report says.
- NEW-L-1, home 2, `XXXObjectFieldWithoutType`, as the report says.
- NEW-L-2, home 3 with reproducer `none`, `CONTESTED`. I agree with the reading: `apis.tex:87-88` takes `ObjectHeader`, whose `ObjectParam` admits `var` (`objects.tex:104-109`), and `SyntaxChecker.java:154-157` refuses it; my `Va` program shows the refusal on both trees.
- **NEW-L-3, new: the export check compares no object value parameter's name** (`equalParams` binds `nameL` and `nameR` and reads neither, `ExportChecker.scala:658-669` at `c3c22817c`, the team's; through `equalOptListParams` at `:372-374` and `:703-704`). Section 6 measures it on both trees. The specification settles it (source-code.tex, "Export Statements": the same header, and a satisfying declaration for each field), but no gated test can assert a refusal while the check accepts, so its home is a row with reproducer `none`, as rows 653 and 759 are. Not repaired: a function's parameter names do not count (`library.md`, "Designing a change"), so the repair is in the object comparison, a function of `ExportChecker` the brief does not give this rung. Its row is in `record.md`.

## 8. The ledger and the sibling sites

`ledger.py find --cites` for each file the rung edits, and `ledger-find` for "object parameter", "var parameter", "CovariantCollection", "APPCOV", "OneShot", "different parameters", "equalParams": rows 96, 592, 603 and 719 cite lines the rung moves, and the worker's rewrites name the new lines (`:43`, `:30`, `:707-708`, `:138-143`; each checked with `grep -n`). It missed **row 825**, whose claim the rung makes false: 'ends in `CastError` at its unwrap's cast (`Library/List.fss:179`)', now at `upward`'s cast (section 6). Its rewrite is in `record.md` (`f8dc80a2a`), checked against the row template with `ledger.py rewrite` on a copy of the ledger. No other row cites a moved line: 768's `:636-643`, 769's `:431-437` and 782's `:275` are above the edit.

The other sites of the parameter rule: `ExportChecker.scala`'s five comparisons of modifiers, as the report's precedent says; the top-level variable's at `:232` compares `var` whole, which source-code.tex asks ("the modifiers including the mutability of a variable must be the same"). The other site of the defect on the other path: walk has no export check; it runs `SkVarParamMain` on both trees.

## 9. The report and the record

The provenance lines' citations hold, each opened with `sed -n` (`CLIMB-BATCH-22c.md:310`, `source-code.tex:393-397`, `traits.tex:759-761`, `objects.tex:243-244`, `ExportChecker.scala:852`, `CovariantCollection.fss:20-22` and the base's `:17-19`, `FortressLibrary.fss:33-37`, `apis.tex:121`, `objects.tex:256`, `run.sh:60-62`); `Thunker.scala:91` is the team's (`5a68404fd`, 2012). The suites' verdicts are in the worker's logs: compiler 'Tests run: 1316, Failures: 0', library 86, othercompiler 263, system shards 178, 162, 174 and 170, spec data 130, each 'BUILD SUCCESSFUL'. The fourteen are closed under import: their `.fss` and `.fsi` import only apis among them.

Corrections, made:
- `f8dc80a2a`, `record.md`: row 825's rewrite; NEW-L-3; a section "Sentences of the specification made false"; the F-288 rewrite's "so `List` compiles after the switch-over with both", which claims more than the distance measures, is the original's "compiles only with both"; the revival change's "`ExportChecker.scala:662` in the team's text" is `:662` at `c3c22817c` and `:655` at `a874948ac`.
- `f8dc80a2a`, `REPORT.md` section 10: "In `Specification/`: none" now names the two sentences below.
- `9d18f3c2b`, `REPORT.md` section 5: the suites' commit, `720285d7c`, the head's code, and their commands.

**Sentences made false**, missed by the report: by the reading under which an object's header holds its value parameters with their modifiers (objects.tex, "Object Declarations", `ObjectParam ::= ... [transient] var ParamWType`), the reading the team's check applied, the parameter rule makes false, for a parameter written `var` in the component only:
- `Specification/basic/components/source-code.tex:372-379`: "A trait or object declaration is satisfied by a declaration that has the same header". Rung A revises this paragraph for P-158, so the gather words one entry.
- `Specification/basic/components/apis.tex:256`: "The header and type of $d'$ must be the same as the header and type of $d$."

Both are the same in `Specification-1.0-frozen/`.

## 10. Competing declarations

`AnyEmpty`, `AnySingleton`, `dirtyIAF`, `CovariantCollectionArmsWalk`, `ExportVarObjectParameter` and `XXXObjectFieldWithoutType` are declared nowhere else in `ProjectFortress/tests`, the compiled test folders, `test_library`, `ProjectFortress/src/com/sun/fortress`, `Library`, `LibraryBuiltin` or the demos (`grep -rlw`).

## 11. Loud failures made quiet

- The export check: a refusal becomes an acceptance for a component's `var` parameter; the value is the object whose field the api's getter reads, `c.n` 7 after two writes, which the specification's field rule gives.
- `table.py`: the other way, a quiet `#total` that missed an api's errors becomes `none:`.
- The library: the arms turn dispatch failures into other loud failures, `CastError` for upward's cast and `FailCalled` for `iaf` and `aaf`. For a user's `NonEmpty`, `|self|` in the trait's methods now reaches the object's own definition, where it failed dispatch (`SkCovUserNE`), and the failure moves to `iaf`'s `fail`. No quiet value comes.

## 12. Where I differ from the worker

- Row 825 belongs in the record's rows, as above.
- The two header sentences are made false, as above; the report read only the field rule.
- NEW-L-3 is a defect of `equalParams` the worker's own programs did not reach.
- The worker's decision 12 timed its base in its own worktree; I timed the base build itself, its count scratch outside it, and the times agree in size.
