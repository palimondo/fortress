<!-- Climb batch 29, rung C (rung-numeral-checker): the skeptic's check of the worker's head b3a0639603, two fixes (the default at a result that declares no return type; the range refusal inside a tuple at a tuple type), two expected-failure tests with their rows, two rows rewritten, and the verdict. -->

# Skeptic: rung C, the checker's numerals

Head judged: `b3a0639603`. The skeptic's commits: `f5f4c57922` and `b212f67a0e` (fixes), `c4c17302e6` and `76efb477a7` (corrections), then this file. Machine for every run below: `nproc` 4, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1` for direct runs (the harness forces 4); other agents of the batch ran beside it. The skeptic's scratch is not cited; its lines are quoted with their commands.

## 1. The report and record on the branch

The branch carries both files at `b3a0639603`; each is byte-equal to the run's journal text (`journal-text.py ... reportText rung:C resume:C` and `recordText`, then `cmp`: "REPORT same", "record same"). Nothing was written for them.

## 2. The stages

**Count, timed by the skeptic** (compiler.md, "The checker's time", a reviewer's runs), the same command in one session, the base build first, each `nice -n 19`, `time explorations/coordinator/tools/checker-count/run.sh <out> <scratch>` from each tree:

    base   (/home/user/fortress-base29, code of b430f9f428)   load at start 0.92   real 2m3.233s
    head   (/home/user/fortress-numeral-checker, b3a0639603)  load at start 2.94   real 1m49.905s

The worker's `change` run: "real 2m12.521s", against the prototype's 122 s. Same order of size; no slowdown of several times. `git diff 7bd7c7dfc7 HEAD -- ProjectFortress/src ProjectFortress/astgen build.xml Library ProjectFortress/LibraryBuiltin` prints nothing, so the worker's step-1 commit and its head are one code state and one run covers both. Tables: base, head, the worker's `change` table and `explorations/compile-ladder/climb-batch-28/gate/checker-count.txt` are equal (`diff` prints nothing; `#total 0`, `#locations 0`, `#crash none`). The three `run.txt` files, each tree's path replaced by `TREE`, are equal (33 lines each, `diff` empty). The rung keeps the checker's results on the one library.

**Distance**, the worker's run's table, read: `#total 0`, every kind 0, `#crash none`, "#seconds 198 FortressLibrary 131"; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-28/gate/distance.txt tmp/rung-numeral-checker/distance-postedit.txt` prints "DISTANCE SAME   0". Its `nohup` (call `uzQYyo`, 02:19:59) and the count's (`uTW27B`, 02:00:10) both come after the worker's last code edit (`5Uga6f`, 01:55:26): both stages ran on the final code.

**The tables are those of the worker's head.** The skeptic's two fixes change the checker's Scala; by the brief no stage ran after them, and the gate's tables on the merged tree are the record. Risk read from the library: the one library's only untyped results that are numerals are `getter size()=1` and `=0` in `Just`, `Nothing` and `NotUnique` (`Library/FortressLibrary.fss:1746`, `:1777`, `:1823`), whose api declares `getter size(): ZZ32` for each (`Library/FortressLibrary.fsi:1082`, `:1108`, `:1148`); no function expression of the library returns a numeral.

## 3. Test first, read in the worker's transcript

- Failing on the base's code: `junit.sh fail1` (call `soMx48`, 01:43:17 to 01:43:23), "Tests run: 8,  Failures: 5"; the first edit of code is `CZh3CP` (01:45:55, `CoercionOracle.scala`), the first build `YoKfKQ` (01:49:30). The promoted `NumeralBeyondWidthMax` and `NumeralPrintRungR` failed on the old code (`929ghL`, 01:56:45, `old-fortress.sh ... junit`): "java.lang.Error: Not in range for ZZ32: 3000000000", "java.lang.NullPointerException", "Tests run: 7,  Failures: 2".
- Passing after the last code edit (`5Uga6f`, 01:55:26), on build3 (01:56:36 to 01:58:01, "BUILD SUCCESSFUL", the library order rc=0): `junit.sh p3` (`DYmnX3`, 01:58:28), "OK (136 tests)".
- `LiteralNoCoercionRefused` passed on the base (a guard), as the report says; `tests/NatValueZZ32Walk` too.

recordedFailure and recordedPass quote these runs truly.

## 4. The diff, against the section and the decisions

The edit does what REPORT.md section 1 says, with these readings:
- **The written-only rule** refuses `IntLiteral` and `FloatLiteral` anywhere but a parameter's whole type: also a `typecase` arm, `asif`, `extends`, a tuple or arrow parameter type (the skeptic's programs: "IntLiteral cannot be written in a program except as a parameter's type." at each; `fa(x: IntLiteral)`, a local function's and a function expression's parameter pass). That is P-174's "written only as a parameter type"; fork C2 lists only the variable's, field's, return type and the static argument, and any function's parameter is allowed, not only a coercion's or an operator's. A point for the curator, not a defect.
- **`ee(5)` (forCurator 1).** With the body `ee[\nat n\](e: ZZ32): ZZ32 = n` beside `ee(e: Any): ZZ32 = 2`, the head's run dies: "java.lang.NumberFormatException: For input string: "n"", where the base answered "ee(5) 2"; walk gives "undefined variable [n]" (program `SkNatBody`). So way (a) leaves row 446's crash reachable by a numeral; the call `ez(z)` for a `ZZ32` `z` is refused on both codes, "Could not infer static argument nat n without context." (way (b)'s answer for the variable). Row 446 is rewritten with this (record.md).
- **`3 MAX 4`** on the prelude now runs `ZZ32`'s `MAX` ("3 MAX 4 ZZ32"; the base "IntLiteral"): both `IntLiteral`'s and `ZZ32`'s declarations fit the numerals as they are, and the tie reading takes `ZZ32`. By the tie rule (`Specification/basic/inference.tex`, "A Numeral Whose Conversions Tie"); reported only.
- **Row 390's numeral example** now runs: `g1(5)` for `g1(y: Object)` beside `g1(y: ZZ32)` prints "g1 ZZ32" (the base: "NoSuchMethodError"), and `h(Circle, 3)` "h ZZ32"; `t3(3)` for `t3(a: ZZ64)` beside `t3(a: Number)` still dies with "NoSuchMethodError" on both codes. Row 390 is rewritten (record.md).
- **Two defects of the change**, sibling sites its own repair owes, fixed below (section 6).
- **One more site not reached, deferred:** a numeral as a `typecase`'s selector (section 6).

The other parts: the ranking by the coercion's form, `defaultFits`, the joins, the narrowest default, the receiver rule, the nat value in `KindEnv` and `CodeGen`, the respellings of the nine team tests and the three pinned texts (REPORT.md section 3), each checked against its decision; the respellings keep each value. `InferResultOnlyLabelBody.fss` has no `IntLiteral` arm at the base, as the report says (`git grep -nw IntLiteral b430f9f428 -- ...InferResultOnlyLabelBody.fss` prints nothing).

## 5. The skeptic's programs (the differential)

Each compiled on the head (`FORTRESS_HOME` the rung's tree, a private caches copy) and on the old code (`old-fortress.sh /home/user/fortress-base29 ...`), and under walk on the old code where it runs there; walk's code and the library are unchanged by the rung (the diff touches neither), so walk new equals walk old (checked on `SkDefaultsW`: the two runs print the same 30 lines). The rung writes no program state: no mutable variable, field, atomic block or library state in the diff, so one thread column.

| program | head (compiled) | old (compiled) | walk |
|---|---|---|---|
| `h() = 3`; `tName(h())` | "01 h() IntLiteral" | IntLiteral | "01 h() ZZ32" |
| `bigOne() = 3000000000`; `v = bigOne()`; `g(v)` | "java.lang.Error: Not in range for ZZ32: 3000000000" | same | "g(v) g ZZ64" |
| `mk = fn () => 3000000000`; `g(mk())` | "java.lang.Error: Not in range for ZZ32: 3000000000" | same | "g(mk()) g ZZ64" |
| local `lf() = 3` | "local fn IntLiteral" | same | (ZZ32) |
| `t: (ZZ32, ZZ32) = (1, 3000000000)` | "java.lang.Error: Not in range for ZZ32: 3000000000" | same | (not run) |
| `rt(): (ZZ32, ZZ32) = (1, 3000000000)` | "java.lang.Error: Not in range for ZZ32: 3000000000" | same | (not run) |
| `typecase 7 of ZZ32 => ... else => ...` | "The typecase clause, ZZ32, is unreachable." | same | "typecase 7 ZZ32" |
| `Box(3).v`, `k(): Any = 3`, `obj(): Object = 7`, `num(): Number = 8` | ZZ32 each | IntLiteral each | ZZ32 each |
| `x + 3000000000` for `x = 3` | "ZZ64" | "IntLiteral" | (ZZ64) |
| `z < 3000000000` for `z: ZZ32` | "true" | "Not in range for ZZ32" | |
| `pk(3000000000, z)` for `pk[\T\](a: T, b: T)`, `z: ZZ32` | "ZZ64,ZZ64" | "Not in range for ZZ32" | |
| `m2 = -2147483648` | ZZ32 | IntLiteral | "ZZ64" (walk's departure, not this rung's) |
| range refusals: `fz(3000000000)`, `v := 3000000000`, `rz(): ZZ32 = 3000000000`, `-2147483649` at `ZZ32`, `2^64` at `NN64`, `2^63` at `ZZ64`, `Cl[\ZZ32\](3000000000)`, `340282356779733661637539395458142568448.0` at `RR32` | each refused, "The numeral ... is out of range for ..." / "... rounds to infinity in RR32." | each runs and raises, or (RR32) runs | |
| `340282356779733661637539395458142568447.9` at `RR32` | accepted (rounds to the largest finite) | accepted | |
| `(3).asZZ64`, `(1).asNN32` | "ZZ64", "NN32" | same | |

The first five rows and the tuple rows are the two defects of section 6; the `typecase` row is row 963.

## 6. Fixes

**Fix 1, `f5f4c57922` (defect, settled).** The default did not reach a numeral that a function, method, local function or function expression returns with no declared return type: the body is typed by `newChecker.checkExpr(body)` (`impls/Decls.scala`, FnDecl) and `this.extend(params).checkExpr(body)` (`impls/Functionals.scala`, FnExpr) with no default, and the result type is read from the body (the Thunker reads the checked body's type, `scala_src/typechecker/Thunker.scala:166-170`). So row 946's crash stays reachable through `v = bigOne()`. Settled by P-173 (`explorations/coordinator/POSITIONS.md:104`): "`Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default", and by row 946, which the rung closes. Ways: the two body sites (taken, `impls/Decls.scala:223-225`, not for a coercion, whose result is its type; `impls/Functionals.scala:1567`); the call site of such a function (not taken: the call is an expression of numeral type, to which P-173 says the default never applies). Test `compiler_tests/LiteralDefaultResultCompiled`:
- failing on the worker's head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfail1 ProjectFortress/compiler_tests LiteralDefaultResultCompiled.test XXXNumeralBeyondRangeInTuple.test` (it then held a `typecase` line, dropped below): "Tests run: 3,  Failures: 3"; as committed, on the old code, `old-fortress.sh /home/user/fortress-base29 <tree>/tmp/rung-numeral-checker/skeptic/old-caches junit .../LiteralDefaultResultCompiled.test ...`: "FAIL:  IntLiteral =/= ZZ32; a function's numeral result with no declared return type is a ZZ32", "Tests run: 4,  Failures: 2";
- passing on the final code, `junit.sh skpass2 ... LiteralDefaultResultCompiled.test XXXNumeralBeyondRangeInTuple.test XXXNumeralTypecaseSelector.test XXX5r.test XXXPatternMatchingc.test LiteralDefaultCompiled.test XXXNumeralBeyondZZ32Range.test`: ". run ProjectFortress/compiler_tests/LiteralDefaultResultCompiled (552ms) PASS", "OK (9 tests)".
The two library tests whose `pick` relied on an untyped result staying an `IntLiteral` (the worker's respelling) now reach the prelude's `IntLiteral` operators through `choose(b: Boolean, lo: IntLiteral, hi: IntLiteral)` (`library_tests/IntLiteralArithRung7.fss:35-36`, `IntLiteralRung6.fss:41-42`); a probe prints "pick IntLiteral pick0 ZZ32" (the old code: "pick IntLiteral pick0 IntLiteral"). This writes `IntLiteral` as a plain function's parameter type, which the checker allows and the batch's rule for tests ("only as a coercion's parameter type") does not: a point below.

**Fix 2, `b212f67a0e` (defect, settled).** The range refusal read a numeral only by itself. A tuple at a tuple-typed place is converted by one `TupleCoercionInvocation`, whose element coercions `checkCoercionTuple` builds for dummy arguments (`scala_src/typechecker/CoercionOracle.scala:301-361`), so `t: (ZZ32, ZZ32) = (1, 3000000000)` and a return type `(ZZ32, ZZ32)` compiled and raised at run time: row 325's defect, which the rung closes. Settled by P-173: "a numeral outside the type's range is refused statically", and fork C3. Ways: `NumeralConversion.outOfRangeAt` reads a tuple expression at a tuple type element by element and `STypeChecker` signals at the element (taken, `CoercionOracle.scala:459-466`, `STypeChecker.scala:513-514`); the oracle's tuple coercion given the element expressions (not taken: it builds every coercion for dummies, a larger change). Test `compiler_tests/XXXNumeralBeyondRangeInTuple.test` over `NumeralBeyondRangeInTuple`: failing on the worker's head (`junit.sh skfail1`): "Saw failure, but did not satisfy compile_err_WImatches", "Saw wrong failure. compile"; on the old code (the same run as above), the same; passing on the final code (`junit.sh skpass1`): "NumeralBeyondRangeInTuple.fss:6:25-33: The numeral 3000000000 is out of range for ZZ32, whose values are -2147483648 to 2147483647.", "... :11:29: The numeral -5 is out of range for NN32, whose values are 0 to 4294967295.", " Saw expected failure", "OK (3 tests)".

**The whole suite after the last fix**, `ant testQuick` on the final code (the code of `b212f67a0e`): "Tests run: 86, Failures: 0" (library), "Tests run: 263, Failures: 0" (othercompiler), "Tests run: 1491, Failures: 0, Errors: 0" (compiler), "BUILD SUCCESSFUL". 1491 is the worker's 1487 and the four cases of the skeptic's three `.test` files then in the tree; `XXXTypecasePatternUntypedBinder.test`, added after, passed alone (`junit.sh skxxx1`: " OK Saw expected exception", "OK (2 tests)").

**Not fixed: a numeral as a `typecase`'s selector (row 963, home 2).** The skeptic built the default at the selector (`impls/Misc.scala:660`) too; `ant testQuick` then gave "Tests run: 1490, Failures: 2": `XXX5r.test` ("Saw failure, but did not satisfy compile_err_equals": its pinned clauses' span became `Compiled5.r.fss:16:3-.../CompilerBuiltin.fsi:210:9`) and `XXXPatternMatchingc.test` ("UNEXPECTED exception", "java.lang.RuntimeException: typcase match failure!" at `CodeGen.getType`, `CodeGen.java:2181`), whose `typecase (3, 4) of (x, y: ZZ32)` the default makes reachable. That moves two team tests and turns a static refusal into a code-generator stop, so the site is reverted and recorded: `compiler_tests/XXXNumeralTypecaseSelector.test` (green on the old and the final code: "The typecase clause, ZZ32, is unreachable.", " Saw expected failure") and row 963; the code generator's stop on an untyped pattern binder, on the base too (`old-fortress.sh ... junit .../XXXTypecasePatternUntypedBinder.test`: "java.lang.RuntimeException: typcase match failure!", " OK Saw expected exception"), is `XXXTypecasePatternUntypedBinder.test` and row 964.

**Corrections**, `c4c17302e6` and `76efb477a7`: the two expected-failure tests above; `XXXInferComboCap.fss`'s comment, which pointed to a record (tests-writing.md, "Names, comments, citations"), now says what it checks; record.md's findings 1 and 5 name the fixes and row 963, rows 946 and 325 their added tests, rows 390 and 446 rewritten, row 963 and row 964 added, finding 1's `Decls.scala` lines moved two down by fix 1.

Contested: none. Neither fix changes a behaviour the report argues for: the report's list of places where the default does not apply (REPORT.md section 1) names neither a result with no declared return type nor a tuple element, and the worker's respelling of the two library tests used the untyped result without arguing for it.

## 7. Homes

Rows 79, 946, 486, 325: home 1 (with fixes 1 and 2 for 946 and 325). 362, 506: home 2, rewritten. 675: home 3, rewritten. row 961: home 2. row 962: home 3, row only (the run dies). Row 390's numeral half and row 446's numeral reach: rows rewritten in record.md (home 2 and home 3 as before). row 963, row 964: home 2. The error-text change of REPORT.md section 8 is no defect of acceptance.

## 8. Ledger and sibling sites

`ledger.py find` with "numeral return type", "typecase numeral", "Not in range", "NoSuchMethodError": rows 390 and 446 bear on the rung (rewritten); 340 (a `typecase` body's integer clauses at `ZZ32`) is untouched, since `joinNumerals` does not read a `typecase`. Sibling sites of the default: the function result and the function expression (fixed), the `typecase` selector (row 963); of the range refusal: a tuple at a tuple type (fixed), a call's tuple argument at a tuple parameter and a varargs call (already refused on the head: "Could not check call to function ft", "The numeral 3000000000 is out of range for ZZ32"). Walk's side is rung N's.

## 9. The report

The five provenance lines open as they say (`FACTS.md:54` F-57; `POSITIONS.md:104`, `:105`; `inference.tex:299-317`, "A Numeral Whose Conversions Tie"; `literal-default.patch:973` the start of the patch's `CoercionOracle.scala` hunk; `impls/Functionals.scala:459`, `numeralReading`; `CoercionOracle.scala:410`, `object NumeralConversion`; `impls/Functionals.scala:1`, the team's copyright header). Sentences made false: the report's list (section 11) holds; the fixes add none. The worker's `ant testQuick` ran on `fe5d146a86`, whose code is the head's, and its four failures were respelled in `fa13e6383c` and passed alone; the skeptic's run above is the suite on the final tree. Line numbers in REPORT.md are those of `fa13e6383c`, as it says; after fix 1 the four `Decls.scala` binding sites are at `:254`, `:291`, `:345`, `:386`.

## 10. Competing declarations

`NumeralConversion`, `defaultNumeral`, `defaultAtUnfixed`, `defaultFits`, `defaultReceiver` (each declared abstract in `STypeChecker` and once in `Functionals`), `preDefault`, `numeralDefault`, `numeralInto`, `joinNumerals`, `joinInto`, `mayDefault`, `numeralFixesOwnType`, `signalNumeralRanges`, `isNumeralType`, `numeralTypeWritten`, `sizeValueType`, `outOfRangeAt`: one declaration each in `ProjectFortress/src/com/sun/fortress/`. `NumeralConversion.isNumeral` beside the base's `Functionals.isNumeral` (N's): two objects, called qualified. Each new test component name is one `.fss` file in the tree.

## 11. Failure modes

The rung turns run-time `java.lang.Error`s into static refusals (row 325, the tuple places with fix 2, `z MAX 3000000000`). It turns two quiet values into loud failures: a size of 2^31 or more read as a value raises `java.lang.Error` (row 962, forCurator 2), and `ee(5)` with a sized arm that reads its size raises `NumberFormatException` where the base answered 2 (row 446 rewritten, forCurator 1). No new quiet value was found.

## Verdict

**Approved**, with the two fixes, both settled, and the corrections. The count and distance tables are those of the worker's head.
