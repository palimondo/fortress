# Rung V: the integer conversions (rung-integer-conversions)

- problem: rows 858 and 859, a low-bits name missing on a type and reached by coercion, and row 502, ZZ's widen keeping the low 64 bits (`explorations/fortress-gap-ledger.md:572`, `:573`, `:557`), measured in `explorations/reviews/integer-conversions-2026-11-06.md:281-332`
- spec: `Specification/basic-lib/basic-integers.tex:39-45` at 157323e51 (the explicit conversions, narrow's sentence), beside "For integer results, overflow throws an IntegerOverflow." (`Specification/basic/operators/opr-overview.tex:155`)
- precedent: QQ's `ceiling` and `truncate`, a test and `throw DivisionByZero` (`Library/FortressLibrary.fss:635`, `:640`); the prelude's `getter asZZ32(): ZZ32 = jLongOverflowingToInt(self)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:581`); powerCount32's sign test of `signed(c)` (`Library/FortressLibrary.fss:747-751`); the prelude's `trait IntLiteral` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:883-889`)
- deviation: ZZ's asZZ64 and asNN64 bind two new helpers, `simpleArbitraryPrecisionArith.bigOverflowingToLong` and `bigOverflowingToUnsignedLong`, beyond fork V1's three pairs, since after the deletion ZZ has no low-bits form for a Fortress body to wrap (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:147-157`)
- deviation: `Library/QuickCheck.fss:322` on `.asZZ64` raises IntegerOverflow for a ZZ outside ZZ64, where `widen` kept the low 64 bits; under walk no generator makes one (row 387) (`Library/QuickCheck.fss:322`)
- deviation: two calls of ZZ's narrow outside the named declarations moved, in countNN32 and exponentNN32 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:400`, `:419`)
- deviation: the getters stand before each type's methods, which the parser requires: 'Field/getter/setter declarations should come before method declarations.' (`Library/FortressLibrary.fsi:500`, `:568`, `:644`, `:719`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:135`)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Library/Format.fss`, `Library/QuickCheck.fss`, `ProjectFortress/demos/sudoku.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java`, `Specification/basic-lib/basic-integers.tex`, `Specification/appendices/changes.tex` (`Library/FortressLibrary.fss:1`)

Commits on `wip/rung-integer-conversions`: 2d49a587 (the code and its tests), 227979aa (the specification). The worktree was seeded by `seed-worktree.sh` (exit 0, 4 s).

## What changed and why

P-161, option 6, whole, and P-169's eight numeral bindings.

**The 25 getters**, each declared in the api at the component's header, each a getter before the type's methods:

| type | asZZ32 | asZZ64 | asNN32 | asNN64 | asZZ |
|---|---|---|---|---|---|
| ZZ32 (`FortressLibrary.fss:771-775`, `.fsi:568-572`) | `= self` | `widen(self)` | Fortress, raises below 0 | Fortress, raises below 0 | `big(self)` |
| ZZ64 (`.fss:877-883`, `.fsi:644-648`) | helper `simpleIntArith.longOverflowingToInt` | `= self` | helper `simpleUnsignedIntArith.longOverflowingToUnsignedInt` | Fortress, raises below 0 | `big(self)` |
| NN32 (`FortressBuiltin.fss:430-437`, `.fsi:135-139`) | Fortress, raises at 2^31 and up | `signed(widen(self))` | `= self` | `widen(self)` | `big(self)` |
| NN64 (`.fss:983-994`, `.fsi:500-504`) | Fortress, raises at 2^31 and up | Fortress, raises at 2^63 and up | helper `simpleUnsignedIntArith.longOverflowingToUnsignedInt` | `= self` | `big(self)` |
| ZZ (`.fss:1096-1102`, `.fsi:719-723`) | `self.asZZ64.asZZ32` | helper `simpleArbitraryPrecisionArith.bigOverflowingToLong` (new) | `self.asNN64.asNN32` | helper `simpleArbitraryPrecisionArith.bigOverflowingToUnsignedLong` (new) | `= self` |

So 5 identities, 7 equal to the coercions (each the coercion's own one-call body), and 13 that can raise: 6 Fortress bodies, a sign or range test and `throw IntegerOverflow` around the low-bits form, as QQ's `truncate` throws `DivisionByZero`; 3 on the existing checked helpers of fork V1; 2 on new helpers; 2 compositions over them. The Java signatures: `public static int longOverflowingToInt(long l)` (`simpleIntArith.java:106`), `public static int longOverflowingToUnsignedInt(long l)` (`simpleUnsignedIntArith.java:87`), and the new `public static long bigOverflowingToLong(BigInteger a)` and `public static long bigOverflowingToUnsignedLong(BigInteger a)` (`simpleArbitraryPrecisionArith.java:148`, `:154`), which raise `fortress.CompilerBuiltin$IntegerOverflow` as the other helpers do. Walk carries ZZ in BigInteger, ZZ64 and NN64 in long, NN32 in int; the compiled rewrite passes an NN32 or NN64 result through its transfer helper.

**The four bitsAs getters**: bitsAsNN32 of ZZ32 and bitsAsNN64 of ZZ64 are `unsigned(self)`, bitsAsZZ32 of NN32 and bitsAsZZ64 of NN64 `signed(self)` (`FortressLibrary.fss:776`, `:884`, `:995`; `FortressBuiltin.fss:438`).

**The low-bits names, newly declared** (fork V5, option 1's nine): narrow and unsigned of NN32 `= self`, big of NN32 `big(signed(widen(self)))` (`FortressBuiltin.fss:523-525`, `.fsi:191-193`); widen and unsigned of NN64 `= self`, big of NN64 `do z: ZZ = self; z end` (`FortressLibrary.fss:1075-1077`, `.fsi:555-557`); signed of ZZ32 and of ZZ64 `= self` (`.fss:862`, `:973`; `.fsi:631`, `:706`); big of ZZ `= self` (`.fss:1189`, `.fsi:772`). ZZ has neither narrow nor widen.

**Deleted**: ZZ's narrow and widen, on the glue `BigNum$ToZZ32` and `BigNum$ToZZ64` (`Library/FortressLibrary.fss:1150-1154` and `.fsi:744-745` at 157323e51).

**ZZ32's big** names `simpleArbitraryPrecisionArith.makeZZfromZZ32` (`FortressLibrary.fss:860-861`), not the glue `Long$ToBigNum`.

**IntLiteral's 8** (`FortressBuiltin.fss:544-551`, `:557`, `:570-574`), with their api lines unchanged:

    getter asZZ32(): ZZ32 = self.asZZ.asZZ32
    getter asZZ64(): ZZ64 = self.asZZ.asZZ64
    getter asNN32(): NN32 = self.asZZ.asNN32
    getter asNN64(): NN64 = self.asZZ.asNN64
    getter asString(): String = self.asZZ.asString
    getter asExprString(): String = self.asZZ.asString
    opr =(self, b: IntLiteral):Boolean = self.asZZ = b.asZZ
    cmp(b:IntLiteral): ZZ32 = do
        x = self.asZZ
        y = b.asZZ
        if x < y then -1 elif y < x then 1 else 0 end
      end

`asZZ` stays on its glue class, as fork V3 says.

**The callers of ZZ's narrow and widen**, each moved with its value (fork V4), before at 157323e51 and after at 2d49a587:

| site | before | after | why the value fits |
|---|---|---|---|
| `Library/Format.fss:70` (radixHelper) | `n = widen(\|/(val / base)\|)` | `n = (\|/(val / base)\|).asZZ64` | the ceiling of a ZZ64 over a base of 2 or more |
| `Library/Format.fss:117` (digitSeparator) | `total = narrow(\|\((\|num\|)-1) / nth/\|)` | `total = (\|\((\|num\|)-1) / nth/\|).asZZ32` | a string length's quotient |
| `Library/Format.fss:122` (digitSeparatorRight) | the same | the same | the same |
| `Library/QuickCheck.fss:320` | `g.perturbed(0, narrow(obj))` | `g.perturbed(0, obj.asZZ32)` | under the guard of `:319` |
| `Library/QuickCheck.fss:322` | `perturb(big(widen(obj) LSHIFT 32), ...` | `perturb(big(obj.asZZ64 LSHIFT 32), ...` | every ZZ within ZZ64; one beyond now raises (below) |
| `Library/QuickCheck.fss:323-324` | `narrow((obj BITAND 4294967295) - 2147483648)` | `((obj BITAND 4294967295) - 2147483648).asZZ32` | the value is in [-2^31, 2^31) |
| `ProjectFortress/demos/sudoku.fss:42` | `starti:ZZ32 = narrow(truncate(i/3)) 3` | `starti:ZZ32 = (truncate(i/3)).asZZ32 3` | a cell index over 3 |
| `ProjectFortress/demos/sudoku.fss:43` | `startj:ZZ32 = narrow(truncate(j/3)) 3` | `startj:ZZ32 = (truncate(j/3)).asZZ32 3` | the same |
| `Library/FortressLibrary.fss:723` (shiftCount32) | `c:ZZ => narrow((c MAX (-2147483647)) MIN 2147483647)` | `c:ZZ => ((c MAX (-2147483647)) MIN 2147483647).asZZ32` | clamped into ZZ32 |
| `Library/FortressLibrary.fss:754` (powerCount32) | `else narrow(c) end` | `else c.asZZ32 end` | under the two guards above it |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:400` (countNN32) | as `:723` | as `:723` | clamped |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:419` (exponentNN32) | as `:754` | as `:754` | guarded |
| `ProjectFortress/compiler_tests/XXXZZNarrowRungP.fss:16-22` | `narrow(z1)`, `narrow(zm1)`, `narrow(zwide)` | `z1.asZZ32`, `zm1.asZZ32`, and `zwide.asZZ32` in a `try` that expects IntegerOverflow | the compiled test, below |

They were found by `git grep -n -E '\b(narrow|widen)\b'` over `Library`, `ProjectFortress/LibraryBuiltin` and `ProjectFortress/demos`, each argument read by hand (the rest are ZZ32, ZZ64, NN32, NN64 or RR64 calls), and by `ant testSystem` on the edited tree, which has no failure; the XXX walk tests that call narrow or widen (`XXXCoercionReturnRungC`, `XXXGenericBesidePlainReturnParam`, `XXXInferVarargsRungK`, `XXXRangeWideRungJ`) call them on ZZ32 values. The two at `FortressBuiltin.fss:400` and `:419` are beyond the declarations the brief names; without them a shift or power of an NN32 by a ZZ count finds no narrow.

## The failing run and the passing run

The tests were written first and seen failing through the harness on the base's code, before any library source was edited (the only edits then were the four test files):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-integer-conversions/h-base ProjectFortress/tests/IntegerConversionsWalk.fss ProjectFortress/tests/IntLiteralTextWalk.fss
    # harness-one 2026-11-08T02:44:03Z; tree 157323e5; nproc=4; load 0.02 0.07 0.05; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    Cannot find definition for method asZZ32 given receiver -2147483648: ZZ32
    . interpret tmp/rung-integer-conversions/h-base/tests/IntLiteralTextWalk
    PASS
    Tests run: 2,  Failures: 1,  Errors: 0

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests IntegerConversionHelpersCompiled.test XXXZZNarrowRungP.test
    # junit.sh base 2026-11-08T02:44:25Z; ... tree 157323e5
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleArbitraryPrecisionArith.bigOverflowingToLong
     Saw expected failure
    Tests run: 3,  Failures: 2,  Errors: 0

IntLiteralTextWalk is a guard: it passes on the base, since walk answers the eight today by glue, and after. The old XXXZZNarrowRungP was green there ('Could not check call to function narrow').

The passing runs, the last after the last change of code (2d49a587's tree):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-integer-conversions/h1 ProjectFortress/tests/IntegerConversionsWalk.fss ProjectFortress/tests/IntLiteralTextWalk.fss
    # harness-one 2026-11-08T02:50:38Z; ...
    OK (2 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after1 ProjectFortress/compiler_tests IntegerConversionHelpersCompiled.test XXXZZNarrowRungP.test
    # junit.sh after1 2026-11-08T02:50:55Z; ...
    . run ProjectFortress/compiler_tests/IntegerConversionHelpersCompiled (473ms) PASS
    OK (3 tests)

**XXXZZNarrowRungP**, rewritten for asZZ32 (fork V4): on the compiled path the prelude's ZZ has no getter, so the test stays an expected failure with the key `compile_err_contains=ZZ has no getter called asZZ32`. Its run before the rewrite: 'Saw expected failure' on 'Could not check call to function narrow'; after: 'ZZ has no getter called asZZ32' three times and 'Saw expected failure', 'OK (1 test)' (`junit.sh rewrite2`, 2026-11-08T02:44:49Z). Shown red on a deliberate fix: with its five ZZ bindings made ZZ64 for one run, which the prelude's ZZ64.asZZ32 compiles, the harness printed 'Saw wrong failure. compile' and 'Tests run: 1,  Failures: 1' (`junit.sh red`, 2026-11-08T02:44:59Z); the file was restored and diffed equal. Its comment line, a pointer to a record, is now a topic line.

**Walk's answers at the edges** (IntegerConversionsWalk, 106 assertions, all as below): ZZ32's asZZ32 and asZZ64 and asZZ at -2^31 and 2^31-1 are themselves; asNN32 and asNN64 give 0 and 2^31-1 and raise at -1 (and asNN32 at -2^31). ZZ64's asZZ32 gives -2^31 and 2^31-1 and raises at -2^31-1, 2^31 and -2^63; asNN32 gives 0, 2^31 and 2^32-1 and raises at -1, 2^32 and -2^63; asNN64 gives 0 and 2^63-1 and raises at -1 and -2^63. NN32's asZZ32 gives 0 and 2^31-1 and raises at 2^31 and 2^32-1; asZZ64, asNN64 and asZZ give 2^31 and 2^32-1. NN64's asZZ32 gives 0 and 2^31-1 and raises at 2^31, 2^63 and 2^64-1; asZZ64 gives 0 and 2^63-1 and raises at 2^63 and 2^64-1; asNN32 gives 0, 2^31 and 2^32-1 and raises at 2^32, 2^63 and 2^64-1; asNN64 and asZZ give 2^63 and 2^64-1. ZZ's asZZ32 gives -2^31 and 2^31-1 and raises at -2^31-1 and 2^31; asZZ64 gives -2^63 and 2^63-1 and raises at -2^63-1 and 2^63; asNN32 gives 0, 2^31 and 2^32-1 and raises at -1 and 2^32; asNN64 gives 0, 2^63 and 2^64-1 and raises at -1 and 2^64. Each result's type is asserted with its value. The bitsAs getters give 2^32-1, 2^31, 2^64-1, 2^63, -1, -2^31, -1 and -2^63 as section "What changed" gives. The compiled guard answers: longOverflowingToInt 2147483647 and -2147483648, raising at 2^31 and -2^31-1; longOverflowingToUnsignedInt 0, and the ZZ32 bits -2147483648 and -1 of the NN32 2^31 and 2^32-1, raising at 2^32, at -1 (the NN64 2^64-1) and at -2^63 (the NN64 2^63); bigOverflowingToLong 9223372036854775807 and -9223372036854775808, raising at 2^63 and -2^63-1; bigOverflowingToUnsignedLong 0, and the ZZ64 bits -9223372036854775808 and -1 of 2^63 and 2^64-1, raising at 2^64 and -1.

**The suites**, once each on 2d49a587's code (fork 2):

    ant testSystem    BUILD SUCCESSFUL, Total time: 5 minutes 40 seconds; system-0..3: 188, 199, 192, 201 tests, 0 failures, 0 errors
    ant testQuick     BUILD SUCCESSFUL, Total time: 7 minutes 52 seconds; CompilerJUTest 1449, LibraryJUTest 86, OtherCompilerJUTest 263, 0 failures, 0 errors

Against climb batch 27's summary (778 system tests; 1447, 86, 263): +2 system tests (IntegerConversionsWalk, IntLiteralTextWalk) and +2 compiler tests (IntegerConversionHelpersCompiled's link and run). No verdict changed. The related walk tests run beside them through the harness also passed: AnyGenPerturbOtherType, QuickCheckTest, ReflectiveNumberTypes, ReflectiveQuickCheckTest, formatTest, IntLiteralValue, FlatTowerRungF, NativeHelperFamilyZZ32Walk, NativeHelperFamilyNN32Walk, NativeHelperFamilyNN64Walk, NativeHelperShiftPowerWalk, UnsignedTest, IntSemanticsRungI, NativeHelperFamilyIntegersWalk ('OK (14 tests)').

## Where the fix belongs, and the precedent

The conversions are members of the one library's integer traits and of the interpreter's object NN32 (`explorations/coordinator/map/spec-to-implementation.md`, the library; `Library/FortressLibrary.fsi:495-775`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:133-194`), so the fix is a library edit, with the walk and compiled halves of each helper binding (`fortress-repo` skill, `library.md`, "Designing a change"). The precedent for a checked conversion is the prelude's `asZZ32` on its Overflowing native (`CompilerBuiltin.fss:581`), a getter; for a Fortress body that raises, QQ's `ceiling` and `truncate` (`FortressLibrary.fss:635`, `:640`), the only two `throw` sites of a numeric body in the one library's component (`grep -n 'throw DivisionByZero\|throw IntegerOverflow' Library/*.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` printed those two at the base); for a sign test of an unsigned value, powerCount32's and exponentNN32's `signed(c)` arms (`FortressLibrary.fss:747-751`, `FortressBuiltin.fss:411-416`); for the numeral's conversions in Fortress, the prelude's `trait IntLiteral`, whose `asString` is `self.asZZ32.asString` (`CompilerBuiltin.fss:884`).

## What the specification settles

Before this rung, `basic-integers.tex:39-45` stated only `narrow`, on ZZ64, ZZ and NN64, keeping the low 32 bits (P-72). The operators' overview says "For integer results, overflow throws an IntegerOverflow." (`Specification/basic/operators/opr-overview.tex:155`, `:196`). The rung revises the passage in the S1 form (P-96; fork V6): `Specification/basic-lib/basic-integers.tex:39-79` states the five getters, the four bitsAs getters and the five methods, drops ZZ from narrow's sentence, and adds the callout `\revision{revival-int-conversions}` (`:73-76`); the callout of revival-shifts (`:94-98`) now names the paragraph that states narrow. The Appendix I entry "The conversions between the integer types" (`Specification/appendices/changes.tex:4876-4947`, `\seclabel{revival-int-conversions}`) gives the affected sections, the change, the rationale (the decision of 6 November 2026, the prelude's getters, the overflow sentence, Swift and Julia), a reversal, the effect and the original text (none). Its Effect: the interpreter computes each getter and method as stated and refuses narrow or widen of a ZZ; the compiled path declares of the getters only asZZ32 of ZZ32 and ZZ64, asNN32 of NN32, asNN64 of NN64, asZZ of the fixed widths and the four bitsAs getters, and of the methods only narrow of ZZ64 and NN64, widen of ZZ32 and NN32, unsigned of ZZ32 and ZZ64 and signed of NN32 and NN64, with no big (row 349); the tests that gate it; and that no model line calls a conversion (`grep -l -E '\b(narrow|widen|signed|unsigned|big|asZZ32|asZZ64|asNN32|asNN64|asZZ|bitsAs[A-Z0-9]+)\b'` over `explorations/run-c4/src/*.fs?` and `explorations/apl/mg/*.fs?` printed nothing). The entry "Shifts and narrowing on the integer types" is amended in three clauses that gave narrow on ZZ: its Change (`changes.tex:1733-1735`), its Rationale (`:1751-1753`) and its Effect, whose "neither narrow on ZZ nor shift" becomes "no shift" (`:1777-1779`). The Working Draft names none of the conversions (`grep -rn -E 'VAR\{(narrow|widen|signed|unsigned|big|asZZ32|...)\}' Specification-1.0-frozen/` printed nothing). The front matter's paragraph stays true (`Specification/fortress/preamble.tex:54-64`).

The build, in the worktree after the edit:

    ( cd Specification/fortress && ./ant genSource && ./ant tex )
    BUILD SUCCESSFUL   Total time: 42 seconds
    BUILD SUCCESSFUL   Total time: 40 seconds
    grep -c 'LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|LaTeX Warning: There were multiply-defined labels\|^! Undefined control sequence' Specification/fortress/fortress.log
    0

The build's files were removed with `git clean -fXq -- Specification`.

## Programs run old against new

- `ProjectFortress/demos/sudoku.fss` under walk, old (`old-fortress.sh` on the base build's copy) and new: the same 27 lines after `Operation took` is masked ('SAME').
- The probe of `explorations/reviews/quickcheck-widen.md`, 7.3, its `after` wrapped in a `try` that answers "IntegerOverflow" on that exception, with three more values, 2^63, -2^63 and 7, run under walk from a scratch folder: old '2^40 + 7: 1001751898', '2^70 + 7: 1001751898', '2^63: 1543497436', '-2^63: 1543497436', '7: 1428495430'; new the same but '2^70 + 7: IntegerOverflow' and '2^63: IntegerOverflow'.
- `NarrowOfZZ` and `WidenOfZZ`, a ZZ's narrow of 2^32+5 and widen of 2^63: old 'narrow: 5' and 'widen: -9223372036854775808'; new 'Failed to find any matching overload, args = (4294967301:ZZ)' and '(9223372036854775808:ZZ)'.
- IntLiteralTextWalk through the harness on the base and on the edit: 'PASS' on both, so the eight answer alike at the object IntLiteral.

## The stages

Both ran once on 2d49a587's code after `ant compileAll` (the build of 02:46Z; the suites' builds after it changed nothing), with only the uncommitted specification edits, which neither stage reads; no code changed after them (227979aa is prose).

The count stage (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-integer-conversions/checker-count-postedit.txt tmp/rung-integer-conversions/cc-post`, 03:08:22Z to 03:10:30Z): its table equals climb batch 27's `explorations/compile-ladder/climb-batch-27/gate/checker-count.txt` (`diff` printed nothing):

    FortressBuiltin	0
    FortressLibrary	0
    #total	0
    #locations	0
    #crash	none

The distance stage (`explorations/coordinator/tools/distance/run.sh tmp/rung-integer-conversions/distance-postedit.txt tmp/rung-integer-conversions/dist-post`, '#seconds 169 FortressLibrary 109'): '#total 0', every kind 0, '#crash none'. `compare.sh` against `climb-batch-27/gate/distance.txt`:

    DISTANCE SAME   0
        crash gone   decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
        crash gone   stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1
        crash new    none

The stage's per-site list holds no row, as `explorations/compile-ladder/gate/distance-sites.tsv` holds none, so no site moved. The two crash rows of value object Char, row 929's, go on this tree: Char, now `FortressBuiltin.fss:669:1-781:2`, reads '@@TC DECL-OK ObjectDecl ... FortressBuiltin.fss:669:1-781:2 errors=0' in the stage's full output. Char's body calls no conversion; the edit changes the overload sets of narrow, widen, signed, unsigned and big and the members of the five integer types, which the sorts of row 929 read, but the cause is not analysed here. No crash row is declared.

**The ladder subset** (gate.md, "The ladder regression", own subset): the eight files whose recorded first error in the baseline names something this rung touched (big, unsigned, widen, narrow, IntLiteral's asNN32), run after the edit with the drivers copied into the rung's scratch, as gate.md gives them. None is in climb batch 27's `ladder.tsv` (the 85 of the pass list), so each is compared with the baseline's `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`:

| file | baseline phase, first error | now |
|---|---|---|
| BigNum.fss | disambiguate, 'Variable big is not defined.' | the same |
| NumberPrintTest.fss | disambiguate, 'Variable big is not defined.' | the same |
| RationalTest.fss | disambiguate, 'Variable big is not defined.' | the same |
| UnsignedTest.fss | disambiguate, 'Variable unsigned is not defined.' | disambiguate, 'Variable partitionL is not defined.' |
| XXXextendIntLiteral.fss | typecheck, the inherited abstract getter asNN32 of IntLiteral | the same |
| fib13.fss | disambiguate, 'Variable unsigned is not defined.' | typecheck, 'Could not check call to operator SQRT' (UP) |
| longPrim.fss | disambiguate, 'Variable widen is not defined.' | disambiguate, 'Operator ? is not defined.' |
| testRR32.fss | disambiguate, 'Variable narrow is not defined.' | disambiguate, 'Operator PLUS_UP is not defined.' |

None moved DOWN. These compile against the compiler's prelude, which this rung does not edit; the changed first errors follow the prelude's narrow, widen, signed and unsigned of 2026-09-20, after the baseline (review section 2.4), not this rung.

## Sentences made false

- Appendix I's natives effect, `Specification/appendices/changes.tex:4627-4660` ("341 of the 443 bindings of \library\ name a helper: …", "The other 102 still name a glue class"): the counts move by +6 helpers and -11 glue (finding 7 of record.md), the list gains ZZ32's big and the getters' helper bindings, and ZZ's two glue bindings are gone. Not edited: fork 5, the gather's.
- F-172, F-327 and F-299, as record.md gives.
- `explorations/coordinator/PLAN.md:49` ("`big` moves onto `makeZZfromZZ32` with P-161's rung") and `:75` (P-161 "Answered"): both are now done.
- The comment line of `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss:1` ("Today's behaviour, on which the specification is silent"): the revised `basic-integers.tex` now states that signed keeps the bits. Not edited: not this rung's file.
- Row 856's "spec citation" cell, "silent", and its notes' "are not on NN32 or NN64": the row closes.
- The `fortress-repo` skill: no sentence of `library.md`, `revival-changes.md`, `interpreter.md` or `compiler.md` names these conversions in a way that the change makes false (`grep -n -E '\b(narrow|widen|unsigned|signed|big|asZZ32|asZZ64|bitsAs[A-Z0-9]+|asNN32|asNN64)\b'` over the parts prints only the word "big operator", the functional method `big` as a reserved name, and the transfer helpers, each still true).

## Points to report

- Each getter as declared, helper or Fortress body: the table of "What changed"; the two new helpers' signatures at `simpleArbitraryPrecisionArith.java:148`, `:154`.
- The 25 getters' answers at their edges, the 13 that can raise, and the compiled guard's answers: "The failing run and the passing run".
- The low-bits names newly declared: NN32 narrow, unsigned, big; NN64 widen, unsigned, big; ZZ32 signed; ZZ64 signed; ZZ big. No call in the library, the tests, the demos or the model reached one through a coercion before, by a script that pairs each call's argument with the types its name is declared at (it printed only this rung's own test calls and calls on a type that already declared the member); the calls that did were the evidence's probes (rows 858, 859).
- Each caller of ZZ's narrow or widen, before and after: the callers' table; the team's lines among them are Format's three, QuickCheck's three (whose `widen` at `:322` the revival wrote, `explorations/reviews/quickcheck-widen.md`, 4.2) and sudoku's two (`ProjectFortress/demos/sudoku.fss:42-43`), and rung I's count functions at `FortressLibrary.fss:723`, `:754` and `FortressBuiltin.fss:400`, `:419`.
- IntLiteral's 8 as written, and their answers at the object IntLiteral before and after: "What changed" and "Programs run old against new".
- The revised sentences, callouts, the Appendix I entry's Effect and the build: "What the specification settles".
- The count table and the distance table, and the crash rows: "The stages".
- Tests whose verdict changes in ant testSystem or ant testQuick: none; the counts rise by this rung's own tests.
- Every sentence made false: the section above.
- Files edited beyond those named: `simpleArbitraryPrecisionArith.java:146-157` (two helpers, beyond fork V1's three pairs); `FortressBuiltin.fss:400`, `:419` (countNN32 and exponentNN32, outside NN32 and IntLiteral). No edit of the prelude, of walk or of the checker. Of the team's demos only `sudoku.fss:42-43`, as named; no line of a team test changed. The revival's `XXXZZNarrowRungP` was rewritten as named, its comment line among its lines.

## Decisions

1. **ZZ's asZZ64 and asNN64 on two new checked helpers, and its asZZ32 and asNN32 composed over them.** Fork V1's default, a Fortress body with a range test around the low-bits form, cannot be built on ZZ: after the deletion ZZ has no member that gives a fixed-width value. Ways not taken: (a) keep private low-bits bindings on `BigNum$ToZZ32` and `BigNum$ToZZ64`, which leaves 2 bindings on glue, against the batch's count of 11 off glue (`CLIMB-BATCH-28.md:299`); (b) the review's two unchecked helpers, `x.intValue()` and `x.longValue()`, bound privately under a Fortress range test, which option 6 says are not written (`reviews/integer-conversions-2026-11-06.md:619`); (c) a Fortress extraction with no new Java, bit by bit or through `asFloat` and `truncate` on 32-bit halves, exact but tens of calls a conversion; (d) four checked helpers, one per getter, twice the Java. The evidence: P-162, "those over carried types get new Java helpers"; option 3's helper reading names "ZZ to ZZ64 and to NN64" with the other getters as compositions (`reviews/integer-conversions-2026-11-06.md:575`). This departs from fork V1, a default of the batch record, not a decision of POSITIONS.
2. **The coercion getters and the new identities as the coercion's own one-call body** (`widen(self)`, `big(self)`, `signed(widen(self))`), and NN64's new `big` as `do z: ZZ = self; z end`, NN64's own `numerator` form, since its coercion is a block. Ways not taken: every one as a typed binding; NN64's big copying the coercion's block.
3. **The range tests**: `self < 0` on ZZ32 and ZZ64; on NN32 and NN64 the sign of `signed(self)`, with `s > 2147483647` for NN64's asZZ32, as powerCount32 does. Ways not taken: comparisons with an NN32 or NN64 constant, which walk cannot write as a numeral (row 454); NN64's asZZ32 as `self.asZZ64.asZZ32`, two calls.
4. **QuickCheck.fss:322 on `.asZZ64`**, as P-161 and the review's option 6 give it. Ways not taken: `signed((obj BITAND 18446744073709551615).asNN64)`, which keeps the low 64 bits for every ZZ (the review's reading, not run there; not run here); row 431's fix `obj RSHIFT 32`, which changes every QuickCheck test's data. Evidence: row 387 (no generated value beyond 64 bits under walk) and the probe above.
5. **The two calls in FortressBuiltin's countNN32 and exponentNN32 moved** with the named four; leaving them would break a shift or power of an NN32 by a ZZ count. Way not taken: none that keeps the deletion.
6. **The getters before the methods** in each api and component, where the parser requires it. Way not taken: beside the low-bits names at each trait's end, which walk refuses at load ('Field/getter/setter declarations should come before method declarations.').
7. **IntLiteral's cmp by ZZ's `<`**, -1, 0 or 1 (fork V3). Way not taken: ZZ's own `cmp`, which `Library/FortressLibrary.fsi`'s trait ZZ does not export.
8. **The compiled test binds at the Java types that the compile reads**, an NN32 in a ZZ32 and an NN64 in a ZZ64, as the families' compiled tests do (`compiler_tests/NativeHelperFamilyNN64Compiled.fss`). Way not taken: bindings at NN32 and NN64 through the transfer helpers.
9. **XXXZZNarrowRungP keeps its name and stays an XXX compile test** on the new message. Ways not taken: a rename by topic, which the record's rows and P-161 cite; promotion, which waits for the switch-over.
10. **No decision record.** The rationale is in the Appendix I entry and the review it cites, as climb batch 27's natives rungs did. Way not taken: a `decision-record.md` here.
11. **Row 856 closes with the rung**, as its notes say. Way not taken: leave it to the gather's reading.
12. **The ladder subset of eight**, by the baseline's first errors. Way not taken: none, since the gate runs the pass list.

## Defects and their homes

- Row 858 (widen of an NN64 by coercion): home 1, repaired; `tests/IntegerConversionsWalk.fss`.
- Row 859 (names missing on types): home 1, repaired; `tests/IntegerConversionsWalk.fss`.
- Row 502 (ZZ's widen keeps the low 64 bits): home 1, repaired by the deletion; `tests/IntegerConversionsWalk.fss` (asZZ64 of 2^63 and 2^64+5 raises).
- Row 856 (signed above the signed half): home 1 for the checked getters that its notes wait on; signed keeps the bits by decision, `tests/SignedAboveSignedRangeWalk.fss`.
- Row 349's narrow half: closed by the deletion; the compiled prelude's missing getters and names against the revised chapter: home 2, `compiler_tests/XXXZZNarrowRungP.test`, the specification's answer, until the switch-over; the row's whole new line in record.md.
- QuickCheck's genZZ.perturb raising beyond ZZ64: home 3, a row (431, rewritten); no gated test can reach it under walk (row 387).

## Commands

- A scratch script, not committed: for each `.fss` file of `ProjectFortress/tests`, `test_library`, `demos`, `not_passing_yet`, `Library` and `explorations/run-c4/src`, it collects each name declared `: NN32`, `: NN64`, `: ZZ32`, `: ZZ64` or `: ZZ` or bound to `unsigned(…)`, and prints each call `unsigned(v)` or `big(v)` with v an NN32, NN64 or ZZ, `widen(v)` with v an NN64, `narrow(v)` with v an NN32 and `signed(v)` with v a ZZ32 or ZZ64.
