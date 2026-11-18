# Rung N's skeptic: the prelude's seven number types as value objects over payload classes

Verdict: **contested**. The change is right as the section asks, with one defect of the change fixed (a built-in number type named as a value compiled and then died at run time) and two corrections: a test's citation of a file that does not exist, and the report's citations of lines that the fix moved. The fix is contested, since nothing on record settles what such a name denotes. The head judged is `f7ad195d7b`, the worker's last commit; my commits are `eabbfc918b` (the fix), `4fcd929432` (the test's citation and the row 1082) and `b035da3f63` (the moved citations), then this file.

Two launches of this role worked the rung. The first stopped at 03:53 UTC, after it had read the skill, extracted the briefing's slice and printed the worker's report from the journal into its scratch; it committed nothing (its transcript `agent-ad799ace67e021904.jsonl`). The machine had restarted (`uptime` at 04:01: 'up 7 min'). This launch read the first one's files and went on from them. The branch already carried `REPORT.md` and `record.md`, byte for byte the journal's texts (`cmp` of the journal extract against each printed nothing), so no commit "The worker's report and record, from the run's journal" was made.

## What I checked

1. **The two stages.** Both ran on `6465bd6678`, whose code is `b9aa895753`'s, after the worker's last change of code (`8WpDS9` at 02:30:57, the RTTI's `className()`; the count started 02:51:52, the distance 02:53:24). The files under `tmp/rung-number-payload-objects/` match the report: `checker-count-postedit.txt` holds `#total 0`, `#crash none`, and `diff explorations/compile-ladder/climb-batch-33/gate/checker-count.txt` against it prints nothing; `distance-postedit.txt` holds `#total 0`, every `#kind` 0, `#shadow every shadow edit matched the tracked sources`, and

        bash explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-33/gate/distance.txt tmp/rung-number-payload-objects/distance-postedit.txt
        DISTANCE SAME   0

   The diff changes no Scala of the checker and nothing the build generates for it (`git diff --name-only` names no `scala_src/` file), so I ran no count stage. The report's tables are those of the worker's head; I ran no stage after my fix, and the gate's tables on the merged tree are the record.
2. **Test first.** The worker's transcript (`agent-a9751652bad3254fe.jsonl`): call `eF4HDZ` at 02:18:34, `junit.sh base` on the four tests, ended 02:18:41 with 'Saw failure, but did not satisfy compile_err_contains', 'Invalid overloading of add in component OverloadZZ32BesideUserTraitCompiled:', 'Tests run: 6,  Failures: 3,  Errors: 0', before the probe's patch was applied (`Yq8owy`, 02:19:02) and before the first build (`TuU7N3`, 02:25:18). The promoted tests whose plain names came after the fix were seen failing on the old code (`fPF8Nv` 02:28:14, 'Tests run: 4,  Failures: 2'; the row-496 pair, 'Tests run: 3,  Failures: 1'). The last passing run, `hiCjMe` at 02:57:31, after the last change of code: 'OK (13 tests)'. `NumberObjectsCompiled` passes on the base (`junit-old-numobj.txt`, 'OK (2 tests)'), a guard, as the report says. The first `XXX` test was shown both ways (`junit.sh xxx1`, `xxx2`). All as `recordedFailure` and `recordedPass` quote them.
3. **The diff against the section, P-178, P-37 and forks N1 to N6.** The seven headers only change in `CompilerBuiltin.fsi` and `.fss` (`git diff` shows 14 lines). The payload classes are abstract over `FValue`, their `make` reaches the object's class through a method handle (N2), and `LibraryNames` follows `WellKnownNames.compiledPathUsesOneLibrary` with no names for the one library (N4). Descriptors name each type by its payload class (N1); the RTTI's `className()` names it so, while the RTTI's class stays the object's, so that a number lies below its traits at run time (N3, with the worker's departure from the probe, which I reproduced in reading: `RTTI.runtimeSupertypeOf` is `javaRep.isAssignableFrom`, `compiler/runtimeValues/RTTI.java:26-30`). The receiver's cast is folded into rung I's `castReceiver` and follows I's choice of the conjunct (`CodeGen.java:7332-7336`, then `:7412`, `:7438`), and `methodCall` has no other caller (`grep -n 'methodCall('`: `:7447`, `:7702`, both after the cast). The stub file loses the seven; `ProjectFortress/build/fortress/` holds no stub class of them after the build. Compiled6.bx takes its second message (N6) and row 566's test is promoted after both hash modes (N5; `tmp/rung-number-payload-objects/h566/`, both base runs 'ClassCastException ... V?fortress\|CompilerBuiltin\%ZZ32?', both tree runs 'PASS').
4. **Where the fix belongs.** The precedent is the one library's `value object ZZ32` (`Library/FortressLibrary.fss:846`) and the probe's patch; the worker counted the sites. One site it did not reach: `forVarRef`, which names an imported object's singleton field (below, finding 1).
5. **The tests.** Each exercises its row. One citation was wrong: `NumberObjectsCompiled.fss`'s comment line cited `basic-floats.tex`, a file the specification does not have (`ls Specification/basic-lib/`); the seven types are named in `numbers.tex`, section "Rational Numbers" (finding 2). The other citations name a file and a section that exist (`types-vals-vars.tex` "Tuple Types", `overloading.tex` "Incompatibility Rule" and "Overloading Resolution", `basic-integers.tex` "Integers").
6. **My programs** (`tmp/rung-number-payload-objects/skeptic/progs/`, run by `run-prog.sh`: the rung's build with a private copy of its caches, and `old-fortress.sh` on `/home/user/fortress-base38`). Below.
7. **Homes.** Rows 866, 1003, 698 and 566: home 1. Rows 995 and 496: narrowed, with their tests. Row 1080: home 2. Row 1081: home 3 with a CONTESTED row and a question. My finding 1: home 2, `XXXNumberTypeAsValueCompiled`, and the row 1082 in `record.md`.
8. **The ledger and the sibling sites.** `ledger.py find --cites` on the edited files: the rows that name the prelude's number traits as traits (349, 383, 772) do so at named commits, which stay true; no open row names a renamed `XXX` test except the rows the record closes or rewrites (rows 1003, 866, 698, 566 and 496). The other carried types keep two names (row 995, rewritten). Walk already has the objects.
9. **The report.** Its provenance lines, opened with `sed -n`: `types-vals-vars.tex:285-288` holds the quoted sentence; `FortressLibrary.fss:846` the precedent; `CodeGen.java:6283-6292` the `className()`; `LibraryNames.java:30-32` the names; `FZZ32.java:51-62` the holders; `CodeGen.java:7641-7649` `castReceiver`; `ArrayStoreJUTest.java:65-66` the payloads. The suites ran on `b9aa895753`'s code once each (`e6tWBA`, `HXSsg7`): compiler 1,739 tests, 1 failure, the repaired row-496 test; `testSystem` four shards, 0 failures. No sentence of the specification or of Appendix I's Effects is made false: Appendix I's entries on value objects and on the number types (`changes.tex`, `revival-object-kinds`, `revival-numbers`) say nothing of the prelude's number types as traits, and the library chapters still call `\mathbb{Z}` a trait (`basic-lib/basic-integers.tex:105`), which describes the language, not a path.
10. **Competing declarations.** `LibraryNames`, `payloadObjects`, `payloadFor`, `payloadObjectClass`, `payloadObjectClassOfPayload`, `payloadLoadOpcode`, `payloadObjectSuper`, `numberObjectClass` and `inSelectedLibrary` are declared once in `ProjectFortress/src/com/sun/fortress/`; each new test's component is declared once across `tests/` and `compiler_tests/`.
11. **The failure mode.** No loud failure becomes a quiet value: under the selector a value made raises the names table's `Error`; a missing object's class raises one too. Finding 1 was a static error that became a run-time linkage error; the fix makes it a compile-time refusal again.

## My programs, old against new

Each compiled and run on the rung's build and on the base's code; the compiled runs at `FORTRESS_THREADS=4`, `SkAtomic` and `SkArrows` at 1 and at 4.

- `SkGenericDotted` (a dotted getter on a value of a type parameter at each of the seven types, a generic object's method, a generic `<` at `ZZ32`, a generic `=` at six types): old and new print the same six lines, 'show 3 3000000000 123456789012345678901234567890 7 5 1.5 2.5', 'max 9 9', 'same true true true true true true', 'PASS'; walk the same.
- `SkDispatchAny` (overloads at `ZZ32`, `ZZ64`, `RR64`, `NN32` and `Object` reached through `Object`, a pair overload, a `typecase` on an `NN32`): old and new 'kind ZZ32 ZZ64 RR64 NN32 Object', 'pair ZZ32,RR64 RR64,ZZ32 Object,Object', 'first ZZ32', 'typecase NN32'. Walk prints 'first RR64': `first[\T extends Object\](x: T, y: T)` on a `ZZ32` and an `RR64` held as `Object`, which walk promotes by run-time types; row 772's kind, the same on both codes, not the rung's.
- `SkNatives` (values made by Java code: `|s|`, `strToInt`, `nanoTime`, a size read as a value, `asZZ`, `narrow` of a `ZZ64`): old and new 'len 4 5', 'strToInt 42', 'nano true', 'size 7', 'big 4294967294', 'narrow -1294967291'.
- `SkAtomic` (a `var ZZ32`, a `var RR64` and an object's `var ZZ64` field written in `atomic` blocks of a parallel `for` of 2,000): old and new at one and four threads 'count 2000 sum 1000.0 total 6000', 'PASS'; walk the same.
- `SkCoerce` (coercions into `ZZ`, `ZZ64`, `NN64`; `asExprString`, `asDebugString`; `SEQV` of a value object with number fields): old and new 'big 4294967294', 'wide 4294967294', 'wideN 8000000000', 'seqv true false true true'. Walk differs on `big` (my top-level `big` meets the library's `big(self)` of `ZZ32` there) and on `asExprString`'s text (the two libraries' bodies); neither is the rung's.
- `SkArrows` (closures at `ZZ64`, a generic `apply`, a `typecase` at `Box[\ZZ64\]`, `Box[\NN32\]`, `Box[\RR32\]`, tuple and arrow patterns, `SUM`, negation and `|x|`): old and new at one and four threads 'which Box ZZ64; Box NN32; Box RR32; Box String; pair ZZ32 RR64; pair RR64 ZZ32; arrow ZZ64', 'sum 45', 'neg -3 -3000000000 3'; walk the same. Written first with the tuples as arguments of `which(y: Any)`, it stopped the code generator on both codes, 'Error trying to close method scope', which is row 1080.
- `SkMapNum` (a generic method of a generic object over number boxes): old and new 'map 6000000000 9 0.25'; walk the same.
- `SkShadowName` (a program's own `object NN32`): refused on both, 'Type name may refer to: NN32, CompilerBuiltin.NN32', so the bare-name lookup of `payloadObjectClass` cannot meet a program's type of that name.
- `SkObjectValue` (`x: Object = ZZ32`): finding 1.

## Finding 1, a defect of the change: a number type named as a value compiles and dies

On the worker's head the prelude's `ZZ32` is a value object without value parameters, which the checker reads as a singleton declaration (`Specification/basic/objects.tex`, section "Object Declarations": "A singleton declaration declares a sole, stand-alone, singleton object."), so it takes `ZZ32` as a value. The code generator writes a payload object's class without the singleton field (`forObjectDeclPrePass`, `isSingletonObject`), yet `forVarRef` emitted a read of it:

    tmp/rung-number-payload-objects/skeptic/run-prog.sh SkObjectValue 4    (new: the rung's head f7ad195d7b)
    === SkObjectValue new compile
    rc=0
    Caused by: java.lang.NoSuchFieldError: Class fortress.CompilerBuiltin$ZZ32 does not have member field 'com.sun.fortress.compiler.runtimeValues.FZZ32 ONLY'
    === SkObjectValue old compile
        Variable 'ZZ32' not found.

Walk, on the one library, answers the type's zero (`old-fortress.sh ... SkObjectValueWalk.fss`): 'ZZ32 0', 'RR64 0.0', 'NN32 0', 'ZZ 0'.

**The test**, `ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled.test` (an expected failure that names the wall; the program asserts the specification's answer, that the name compiles as a value), red on the worker's head before the edit:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-head ProjectFortress/compiler_tests XXXNumberTypeAsValueCompiled.test    (tree f7ad195d7b)
     Saw failure, but did not satisfy compile_exception_contains; expected
    Can't compile the number type ZZ32 as a value yet
    Tests run: 1,  Failures: 1,  Errors: 0

**The fix**, `eabbfc918b`: in `CodeGen.forVarRef`, a reference that names a payload object is refused, 'Can't compile the number type ZZ32 as a value yet'. Built once (`ant compileAll`, 'BUILD SUCCESSFUL', 'Caches ... started again, empty', then the library order, five jars, each rc=0). Green after it, with every test of the rung in one JVM:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-fix ProjectFortress/compiler_tests XXXNumberTypeAsValueCompiled.test XXXNumberTypeExtendRefusedCompiled.test OverloadZZ32BesideUserTraitCompiled.test NumberObjectsCompiled.test XXX6bx.test ComprisesMeetGenericTraitLink.test ComprisesMeetGenericTrait.test GenericBesidePlainZZ32Link.test GenericBesidePlainZZ32.test XXXTupleArgumentAtAnyCompiled.test XXXTypecaseArmExcludedRefused.test
    . compile ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled com.sun.fortress.exceptions.CompilerError:
     OK Saw expected exception
    OK (15 tests)

The fix edits the code generator only, so by the skill's `tests-running.md`, "When to run a whole suite", the whole tracks are left to the gate. Home: 2, with the row 1082 in `record.md`.

**Contested.** The worker's report argues for the form the fix keeps, not for the behaviour it changes: a payload object "is no singleton" (`REPORT.md`, "What changed and why", item 4, `forObjectDeclPrePass`); it does not name a reference to the object as a value. My argument: the rung's own design writes no singleton field, so a read of it is a dangling reference the rung made; a refusal at the compile is the code generator's way for what it cannot compile yet (`compiler.md`'s walls), and it restores the failure's time to the base's, a compile. But nothing on record settles what the name denotes. The ways: a refusal in the code generator (taken); a value such as walk's zero, which no decision gives; a refusal in the checker, whose Scala the section does not give the rung; or no change, with the run-time death pinned by an expected-failure pair. A judge may revert it; the question goes to the curator.

## Finding 2, a correction: a test's citation

`ProjectFortress/compiler_tests/NumberObjectsCompiled.fss:1` cited 'basic-integers.tex and basic-floats.tex'. The specification has no `basic-floats.tex`; `numbers.tex`, section "Rational Numbers", names the number types (`Specification/basic-lib/numbers.tex:25-29`). Corrected in `4fcd929432`, the comment line only; the test passed after it (above, 'OK (15 tests)').

## Finding 3, a correction: citations that the fix moved

Corrected in `b035da3f63`. The fix adds five lines to `CodeGen.java` at `:7003-7007`, so the report's citations of `CodeGen.java` past them named lines five above their code. `REPORT.md` and `record.md` now cite `:7332-7336` (rung I's choice of the conjunct), `:7412` and `:7438` (the two casts), `:7646-7654` (`castReceiver`) and `:7702` (the finder's call), in place of `:7327-7331`, `:7407`, `:7433`, `:7641-7649` and `:7697`; the quoted 'patch failed: ...CodeGen.java:7312' stays, as output. The line numbers in this file are the head's.

## Where I differ from the worker

Nowhere in its decisions. Its departure from the probe's RTTI is right by the run-time subtype test; its keying of the table by the declaring api keeps fork N4; its one cast at the receiver meets rung I's cast as the section asks. One more place names a payload object's type than its table lists: `CodeGen.forVarRef`, the reference to an imported object, which now refuses a payload object.

## Points to report

The worker's list stands, with one addition to "Each place that names a payload object's type": `CodeGen.forVarRef`, which refuses a payload object's name as a value (`eabbfc918b`). No point holds the push: each is reversible, and none acts against a decision on record.
