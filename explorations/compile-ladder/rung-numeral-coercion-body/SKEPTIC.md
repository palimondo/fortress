<!-- Climb batch 36, rung N: the skeptic's check of the worker's change, its fixes and corrections, and its verdict. -->
# Rung N: the skeptic's verdict

One launch of the skeptic worked the rung. The head judged is the worker's `2bf21b1acf`. Its `REPORT.md` and `record.md` were already on the branch, each the run journal's text but for the journal's own header line, so no commit of them from the journal was made. The report's tables of the count and the distance stages are those of the worker's code (`786aeae138`; the later commits change tests and the record only); I ran the count stage again as a reviewer, below, and no stage after my fix.

## What I checked

1. **The stages.** The worker's count stage started at 02:56:58Z and its distance stage at 02:58:35Z, both after its last edit of code (02:31:34Z, call `qB3GiM`) and the build of that code (02:32:25Z, `F9rsDX`). I ran the count stage on the base build and on the worker's head, in one session, nothing else running (nproc 4, Intel Xeon @ 2.30GHz, 2300 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`; load 0.03 and 0.53 at start): base 'real 1m6.109s', head 'real 1m5.801s', against the worker's 74.0 s and 70.5 s, the same order. The two tables are equal and equal to the worker's (`#total 0`, `#locations 0`, `#crash none`), and the two `run.txt` files are equal once each tree's path is `TREE`, and equal to the worker's normalized `run.txt` (`diff` prints nothing in each case). The worker's distance table: `#total 0`, `#crash none`.
2. **Test first.** The walk tests were written at 02:10:38Z and run through the harness on the base's build at 02:10:58Z (`2Tte3z`), with the "Expected failure:" line echoed before the harness command, 'Unification error: Closure/Constructor for Byte param 1 ($b:ZZ32) got arg 200:ZZ of type ZZ', 'Tests run: 2,  Failures: 2'; the compiled tests at 02:11:13Z (`CN1StW`), 'ZZ32->Byte is not applicable to an argument of type ZZ.', 'Tests run: 4,  Failures: 4'. The first edit of code was at 02:13:50Z (`cPXpfD`), the first build at 02:17:30Z (`6FVnkB`; the report said 02:15Z, corrected), the first library edit at 02:21:43Z (`AxiFaN`). `NumeralCoercionNumberAtCallWalk` failed on the base build at 02:31:53Z (`CgM1FH`), its line echoed. The passing runs, 03:06:24Z and 03:06:32Z, came after the last code change. One gap: at 03:05:27Z (`Tyeh26`, `ukpMoD`) the worker renamed the range tests' variables `big` and `small` to `tooWide` and `fits` and did not run the renamed files on the base's code. I ran them on the old code (04:39:53Z), the line echoed first:

       Expected failure: on the base's code, the committed NumeralCoercionNumberRangeWalk (variables fits and tooWide) red, refused at load at fits with 'got arg 5:ZZ', not the pinned 'param 1 ($w:ZZ32) got arg 3000000000'; the committed XXXNumeralCoercionNumberRangeCompiled red, 'Saw wrong failure', its compile refused with 'ZZ32->Wide is not applicable to an argument of type ZZ.'
       FORTRESS_HOME=/home/user/fortress-wsuite /home/user/fortress-wsuite/explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> <tree>/ProjectFortress/tests/NumeralCoercionNumberRangeWalk.fss <tree>/ProjectFortress/tests/NumeralCoercionNumberRangeWalk.test
        Refused at load, but did not satisfy load_exception_contains; expected
       Unification error: Closure/Constructor for Wide param 1 ($w:ZZ32) got arg 5:ZZ of type ZZ
       Tests run: 1,  Failures: 1,  Errors: 0
       old-fortress.sh /home/user/fortress-wsuite <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXNumeralCoercionNumberRangeCompiled.test
           - ZZ32->Wide is not applicable to an argument of type ZZ.
        Saw failure, but did not satisfy compile_err_contains; expected
       Tests run: 1,  Failures: 1,  Errors: 0

   Both fail as the worker's first runs did, so the record of test first holds.
3. **The diff,** against P-174, P-173, F-341, F-342 and forks N1 and N2. Walk (`Numerals.java`), the checker (`CoercionOracle.scala`, `STypeChecker.scala`, `Decls.scala`, `Functionals.typedApplication`, `KindEnv.scala`'s comment), the code generator (`CodeGen.convertNumber`, `NumeralCoercionFold`, `FZZ.numberAs*`), the library's, `FortressBuiltin`'s and the prelude's coercions, and the tests do what the report says. `FZZ` has no copy in `ProjectFortress/src-one`, so the second set of run-time classes needs none. One site the repair owes is missing: finding 1.
4. **The precedent.** The worker followed walk's folded static constant (`Numerals.java:539`), the checker's `STATIC` numeral (`CoercionOracle.scala:206`) and the owning checker's hook (`STypeChecker.scala:163`), and `KindEnv`'s identity set of exact parameters for its own set of conversions; the library's way is the coercion bodies themselves. I found no device of the library that the rung reinvents.
5. **The tests.** Each new file holds one comment line, and each citation names `literals.tex`, section "Literals", which says what the message says.
6. **My programs,** under walk and compiled, on the rung's build and on the old code; output under "Programs" below.
7. **The homes.** The repair: home 1. Rows 1131 and 1132: home 2 with their rows. Finding 1: home 1, my fix. Finding 2: home 2, with row 1131.
8. **The ledger.** `ledger.py find --open --all` for "numeral coercion", "four numbers" and "asZZ32" lists rows 387, 391, 513, 575, 962, 977, 694, 579, 957, 1016, 1017, 340, 983, 1043 and 349; none states the four numbers' reading, so none changes. Row 962 is about a size used as a value, not one of the four numbers.
9. **The report.** Its five provenance lines open at what they claim (`fixes-36.md:14`, `:28`, `:79`; `Numerals.java:539`; `CoercionOracle.scala:206`, `:686`; `STypeChecker.scala:163`; `Functionals.scala:888`; `FZZ.java:50`); every historical file is in `a874948ac`'s tree and `Numerals.java` and `NumeralCoercionFold.java` are not. The suites ran on `786aeae138`'s code: testSystem 'BUILD SUCCESSFUL' (220 + 231 + 217 + 232), testQuick 'BUILD SUCCESSFUL' (1818, 86, 263), testOneLibrary 'BUILD SUCCESSFUL' (41). The worker did not run the misc track, which holds `NumeralCoercionFoldJUTest`, a unit test of the fold that the rung edits and of the prelude's coercions that it rewrites; I ran that class alone on the worker's build with a private copy of the caches: 'OK (10 tests)'.
10. **Competing declarations.** Each new component and api name is declared once in the tree; `isNumber`, `numbersAsZZ`, `numberTarget`, `numberAt`, `numberRefusals`, `numberUses`, `Numerals.number`, `FZZ.numberAs*` and `CodeGen.convertNumber` have no other declaration under `ProjectFortress/src/com/sun/fortress/`.
11. **Loud to quiet.** The rung turns 'ZZ32->Byte is not applicable' and walk's 'Unification error' at `Byte(v)` into the value the rule gives. One quiet value it makes where the rule refuses: finding 2.

## Findings, fixes and corrections

### 1. Defect: a number in a join's result position was refused on the compiled path (fixed, `fed896a1a7`)

Walk converts a number in a result position of an `if`, a `case` or a `do` block where the join's place fixes a type; the compiled checker read a numeral there but not a number (`impls/Functionals.scala`, `numeralResult` and `joinInto`), so it refused the program. My programs, on the worker's build (`diff.sh`, below):

    SkIf: Byte(if v < 100 then v else 99 end)    walk new 'if=42'; compiled new '- ZZ32->Byte is not applicable to an argument of type ZZ.'
    SkJoin: ByteD(do v end); y: ZZ32 = if v < 100 then v else 99 end; ByteC(case n of 1 => v; else => 0 end)
        walk new 'do=7', 'ifbind=42', 'case=5'
        compiled new '- ZZ32->ByteD is not applicable to an argument of type ZZ.', 'Right-hand side has type ZZ, but declared type is ZZ32.', '- ZZ32->ByteC is not applicable to an argument of type OR(NaturalNumeral[\1,10,0\],ZZ).'

It is settled: P-174, "a number used as a value there converts where it stands, as a numeral does (P-173), into the type that its place fixes", and a numeral converts in a result position of an `if`, a `case`, a `do` block or a `try` at a place that fixes a type (F-342, "also as a tuple's element at a tuple type and in a result position of an `if`, a `case`, a `do` block or a `try`"). The worker built the tuple's case (`CoercionOracle.scala:198`) and not the join's.

The ways: (a) read a number as a numeral is read in the join's conversion, `numeralResult` and `joinInto`, the form of the worker's tuple case; (b) walk the join's branches again in `CoercionOracle.buildCoercion`, which repeats `joinInto`; (c) make the `if`'s own typing (`impls/Misc.scala`, its winning clause) choose the place's type for a number, which changes the type of a join where nothing fixes one. Taken: (a). A branch that the join's own typing coerced into its winner, as a `ZZ32` variable into `ZZ` beside a number, converts or coerces from its own value at the place (`Functionals.scala:1437`); such a branch reaches `joinInto` only in a join that holds a number, since the winner's typing converts each numeral first.

The test: `compiler_tests/NumeralCoercionBodyCompiled.fss` gains `Clamped` (`if v < 100 then do v end else 99 end`), `Chosen` (`c: ZZ32 = case n of 3 => v; else => 0 end`, then `if v < 1000 then c else v end`) and `Wide64` (`if v < 100 then v else z end` at a `ZZ64` parameter, `z: ZZ32`), six assertions; its walk twin the same. Failing on the worker's head, the first form on its build:

    Expected failure: on the worker's head (2bf21b1acf's build), NumeralCoercionBodyCompiled red, its compile refused at Clamped's coercion: the case at c: ZZ32 with 'Right-hand side has type OR(', and the if at Clamped's parameter with 'ZZ32->Clamped is not applicable'; walk converts both
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests NumeralCoercionBodyCompiled.test
        Right-hand side has type OR(NaturalNumeral[\1,10,0\],ZZ), but declared type is ZZ32.
        - ZZ32->Clamped is not applicable to an argument of type ZZ.
    Tests run: 3,  Failures: 3,  Errors: 0

and the final form, once my first build had replaced the worker's, on the worker's checker: `2bf21b1acf`'s `Functionals.scala` compiled by scalac into a scratch folder put first on the class path (`compiler.md`, "Testing an edit here"), through `fortress junit`:

    Expected failure: with the worker's head checker (2bf21b1acf's Functionals.scala, compiled into a scratch folder first on the class path), the revised NumeralCoercionBodyCompiled red, its compile refused at Clamped's if ('ZZ32->Clamped is not applicable to an argument of type ZZ.'), at Chosen's case ('Right-hand side has type OR(') and if ('ZZ32->Chosen is not applicable'), and at Wide64's if ('ZZ64->Wide64 is not applicable')
    cd ProjectFortress && java $JAVA_FLAGS -Dfortress.caches=<scratch>/caches -cp "<scratch>/classes:$CP" com.sun.fortress.Shell junit compiler_tests/NumeralCoercionBodyCompiled.test
        - ZZ32->Clamped is not applicable to an argument of type ZZ.
        Right-hand side has type OR(NaturalNumeral[\1,10,0\],ZZ), but declared type is ZZ32.
        - ZZ32->Chosen is not applicable to an argument of type ZZ.
        - ZZ64->Wide64 is not applicable to an argument of type ZZ.
    Tests run: 3,  Failures: 3,  Errors: 0

Passing, on the fix's build (`ant compileAll`, then the library order):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfix3 ProjectFortress/compiler_tests NumeralCoercionBodyCompiled.test XXXNumeralCoercionNumberRangeCompiled.test NumeralCoercionNumberAtCallCompiledLink.test XXXNumeralCoercionNumberAtCallCompiled.test NumeralCoercionNumberRangeImportedLink.test XXXNumeralCoercionNumberRangeImported.test
    . compile ProjectFortress/compiler_tests/NumeralCoercionBodyCompiled  OK (time = 2308ms)
    OK (8 tests)

The walk twin's new assertions, a correction (walk already converts): on the old code, 'Unification error: Closure/Constructor for Byte param 1 ($b:ZZ32) got arg 200:ZZ of type ZZ', 'Tests run: 1,  Failures: 1' (04:49:22Z, the line echoed first); on the fix's build, with the rung's two other walk tests, `harness-one.sh` 'OK (3 tests)'. After the fix, my programs agree on both paths: SkIf 'if=42'; SkJoin 'do=7', 'ifbind=42', 'case=5'; SkJoin2 'if=42', 'ifelse=99'; and a number that does not fit in a join's branch is refused at the numeral's place, SkJoinRange compiled 'The numeral 3000000000 gives the coercion to Wide the number v = 3000000000, which is out of range for ZZ32, whose values are -2147483648 to 2147483647.', walk 'got arg 3000000000:ZZ of type ZZ'.

### 2. Correction: another component's coercion binds an infinity at RR64 with no error (`dfc61e0002`)

The failure-mode question. A numeral at a type of an imported component whose coercion puts `v` at an `RR64` parameter, where `v` rounds to infinity, was refused statically before the rung and now links and runs with the infinity bound (`FZZ.numberAsRR64` rounds, `FZZ.java:66-69`), where walk refuses it and the numeral's own component refuses it statically (P-173: a numeral that rounds to an infinity at its place's type is refused). My program, `SkInfApi` and `SkInfUse` (`xcomp.sh`, below):

    compiled new: 'api rc=0', 'compile rc=0', 'REACHED', 'inf=Infinity', 'run rc=0'
    walk new: 'REACHED', 'Unification error: Closure/Constructor for Approx param 1 ($a:RR64) got arg 1000000000...'
    compiled old: '- RR64->SkInfApi.Approx is not applicable to an argument of type ZZ.', 'api rc=255'

It is row 1131's defect, the refusal across components, with a quieter symptom than the row named. Recorded, home 2: `compiler_tests/XXXNumeralCoercionNumberInfinityImported.fss` with its `.test` and `NumeralCoercionNumberInfinityImportedLink.test`, over a second type, `Approx`, of `NumeralCoercionNumberRangeImportedApi`; the row's claim and notes in `record.md`, and the new entry's effect in Appendix I. Its run through the harness, then red for one run with the numeral made 5, then restored:

    ONE_JVM=1 .../junit.sh skinf ProjectFortress/compiler_tests NumeralCoercionNumberRangeImportedLink.test NumeralCoercionNumberInfinityImportedLink.test XXXNumeralCoercionNumberRangeImported.test XXXNumeralCoercionNumberInfinityImported.test
    . run ProjectFortress/compiler_tests/XXXNumeralCoercionNumberInfinityImported (367ms) REACHED
    FAIL:  a number that rounds to infinity at RR64 was accepted at Approx's parameter
    Saw expected failure (Exit code != 0)
    OK (4 tests)
    ONE_JVM=1 .../junit.sh skinfred ProjectFortress/compiler_tests NumeralCoercionNumberInfinityImportedLink.test XXXNumeralCoercionNumberInfinityImported.test     (tooLarge: Approx = 5)
    PASS
    FAILURES!!!
    Tests run: 2,  Failures: 1,  Errors: 0

No library type has an exception for a float that overflows (`Library/FortressLibrary.fsi:1255` declares `IntegerOverflow` alone), so a raise in `numberAsRR64` would invent one; the static refusal across components that row 1131 names covers both symptoms.

### 3. Correction: two sentences of Appendix I made true (`3e72757c11`)

The change made false two sentences outside the passages that the section names, which the worker listed for the gather; they are in this rung's topic and in no other rung's entries (rung K edits `changes.tex` near :3747, :4509 and :5472, rung G near :2421, :3125 and :5445):

- `changes.tex:2303-2306` (`revival-inference`), before: "The four numbers of a numeral type, read as values in the body of a coercion from it, are integers of type \EXP{\mathbb{Z}} instead, since the revival decided on 9~November 2026 that they are naturals of any size (\secref{revival-numerals})." After (`:2303-2308`): "The four numbers of a numeral type, used as values in the body of a coercion from it, are instead converted where they stand, as a numeral is, and are integers of type \EXP{\mathbb{Z}} where nothing fixes a type, since the revival decided on 9~November 2026 that they are naturals of any size (\secref{revival-numerals}) and on 23~November 2026 how the body reads them (\secref{revival-numeral-numbers})."
- `changes.tex:5364-5366` (`revival-numerals`, Rationale), before: "the four numbers of a numeral type, naturals of any size, are read in a coercion's body as values of type \EXP{\mathbb{Z}}, the bound of a size to 32 bits being this implementation's, for the lengths of arrays." After (`:5366-5369`): "... are converted where they stand in a coercion's body, and are values of type \EXP{\mathbb{Z}} where nothing fixes a type (\secref{revival-numeral-numbers}), the bound of a size ...".
- The new entry's Effect, before: "raises \TYP{IntegerOverflow} when the class that holds the numeral's place is initialized, where such a number does not fit (row~1131 ...)". After: "... where such a number does not fit an integer type, and gives an infinity where it rounds to one at \EXP{\mathbb{R}64} or \EXP{\mathbb{R}32} (row~1131 ...)".

`decision-record.md`, section 3, lists both sentences; `REPORT.md`'s deviation line names the infinity, and its list of sentences made false says these are brought in line. The specification is not built here: the gather builds it once.

### 4. Record: the renamed range tests (no commit)

Item 2 of "What I checked": the worker's renamed tests were not run on the base's code; my run shows each failing as its first form did.

### 5. Correction: the report's time of the first build (`8d7fea1ccc`)

`REPORT.md` said the build of the edit began at 02:15Z; the transcript's first `ant compileAll` is at 02:17:30Z (call `6FVnkB`). The runs on the base's code, at 02:10:58Z and 02:11:13Z, came before it either way.

## Where I differ from the worker

- Rows 1131 and 1132 stay as recorded departures, each with its expected failure. P-180, "a defect is fixed, not only recorded in the gap ledger", bears on both. I made no fix of either: 1131 needs the checker to read another component's checked coercion body, which the worker built and removed for the order of compiles (its D6), or a new form of the api; 1132 needs the checker to check a coercion's body at each numeral's four numbers (its D5). Each is larger than a repair round; both go to the curator (below).
- The worker's report left two sentences of Appendix I for the gather; I made them (finding 3).
- The worker ran no misc track. The rung edits `NumeralCoercionFold.java` and the prelude's coercions, which `NumeralCoercionFoldJUTest` tests; that class passes on the worker's build and on mine: 'OK (10 tests)'.

## Programs (scratch, not committed)

Each under walk and compiled (the prelude), the rung's build with a private copy of its caches against the base build through `old-fortress.sh`:

- SkCmp: `v < 256`, `v + 1`, `v = 200` bound with no type, and `pick(v)` beside `pick(x: ZZ32)` and `pick(x: ZZ)`: all four runs 'lt=true', 'plus=201', 'eq=true', 'pick=2'.
- SkBind: `x32: ZZ32 = v`, `var y: ZZ32 := 0; y := v`, `(p, q): (ZZ32, ZZ32) = (n, v)`, a local `f(): ZZ32 = v`: new, both paths, 'bind=77 assign=77', 'tuple=3,123', 'local=55', at `FORTRESS_THREADS=1` and `=4`; old, walk 'RHS expression type ZZ is not assignable to LHS type ZZ32', compiled 'Right-hand side has type ZZ, but declared type is ZZ32.'.
- SkWidths: `v` at `NN32`, `ZZ64`, `NN64` and `RR32` parameters at each type's largest numeral and at 16777217: new, both paths, 'nn32=4294967295', 'zz64=9223372036854775807', 'nn64=18446744073709551615', 'rr32=1.6777216E7'; old, 'got arg 4294967295:ZZ of type ZZ' and 'NN32->U is not applicable to an argument of type ZZ.'.
- SkInf: `v` of 321 digits at an `RR64` parameter, in the same component: new, walk 'got arg 1000...' refused, compiled '... gives the coercion to Approx the number v = 1000..., which rounds to infinity in RR64.' refused statically.
- SkIf, SkJoin, SkJoin2, SkJoinRange: finding 1.
- SkInfApi with SkInfUse: finding 2.
- SkLib and SkLibQQ, the reserved point on library values: numerals at `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR64` (four, one of 23 digits, one `00.5`), `RR32` (three, one of 24 digits), and at `ZZ32` and `ZZ64` parameters; and `QQ` under walk. All four runs of SkLib print the same lines, 'zz32=2147483647 zz64=9223372036854775807 nn32=4294967295 nn64=18446744073709551615', 'rr64=0.1 9.007199254740992E15 3.141592653589793 0.5', 'rr32=1.6777216E7 0.1 1.0000001', 'args=7 3000000000'; SkLibQQ, both walks, 'qq=1/8 3 15707963267948966192313/5000000000000000000000'.

The reserved points: a model line, none (`git diff --name-only b5a758846d...HEAD -- explorations/run-c4 explorations/apl` prints nothing); a value of a numeral at a library type that changed, none (SkLib, SkLibQQ, and `NumeralCoercionFoldJUTest`'s values of the prelude's coercions); a pinned message changed, none (`git diff --name-status b5a758846d HEAD -- '*.test'` lists only added files).

## The suite after my fix

My fix changes the checker's Scala, so `ant testQuick` ran once, after it, on `fed896a1a7`'s code (the commits after it change tests and prose): 'BUILD SUCCESSFUL', 'Total time: 7 minutes 35 seconds'; compiler 'Tests run: 1820, Failures: 0, Errors: 0' (the worker's 1818 and my expected-failure pair), othercompiler 263 and library 86, no failure. My fix does not touch walk, so no walk suite ran; no count or distance stage ran after it, and the report's tables are those of the worker's code.

## Verdict

Approved. One fix of the change (finding 1), settled by P-174 and F-342 as quoted; two corrections (findings 2 and 3), settled by the brief's list of corrections. None is contested.
