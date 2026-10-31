# Rung S (`rung-natives-small`): record lines for the gather

## Findings

1. **The small rest's eight bindings name their helpers, and no walk value moves.** The eight are `Long`'s and `BigNum`'s `asString` and `asExprString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:379-382`, `:566-569`), `NN32`'s `signed` (`:469-470`), `Char`'s `codePoint` (`:616-617`), `NN64`'s `signed` (`Library/FortressLibrary.fss:985-986`) and the top-level `char` (`:4540`). They name `simpleLongArith.longToString`, `simpleArbitraryPrecisionArith.toString` and four of the six special names.
   - Conditions: on S's tree at `df9e89d19`, alone.
   - Evidence: a scratch program printing every moved binding at its bounds gave 47 lines on the old code (`tools/old-fortress.sh`) and on the text (`bin/fortress`), and `diff` printed nothing. `ProjectFortress/tests/NativeHelperFamilySmallWalk.fss` and `ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled.test` passed on the base and on the text through `harness-one.sh` ('OK (3 tests)', with the two tests of today's behaviour) and `junit.sh` ('OK (2 tests)').
   - Meaning: 29 of the 449 bindings name a helper on this tree, and 420 name a glue class.
2. **The stages read the eight against their helpers' signatures, and find no error.**
   - Evidence: the count printed '#total 0', '#locations 0', '#crash none', and its table equals climb batch 23's gate table. The distance printed '#total 0' and '#crash none', and `distance/compare.sh` printed 'DISTANCE SAME   0'; `errors.tsv` holds only its header.
   - The control: with `Long`'s `asString` pointed at `simpleIntArith.intToString` and `char` at the `codePoint` special name, for one run, the distance printed '#total 2' and 'typecheck 2'. The sites were `FortressBuiltin.fss:380`, 'ZZ32->String is not applicable to an argument of type Long.', and `FortressLibrary.fss:4540`, 'Char->ZZ32 is not applicable to an argument of type ZZ32.'
   - Times: the count stage took 181 s (load 10.73 at start) and the distance 194 s (load 3.65), on nproc 4, a Xeon at 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`.
3. **`signed` above the signed half wraps on the compiled path too.** The compiler's prelude binds the same helpers (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:816`, `:880`). A compiled probe printed 'NN32 signed of 2^32-1: -1', 'NN32 signed of 2^31: -2147483648' and 'NN64 signed of 2^64-1: -1'. Meaning: row 856 holds on both paths.
4. **The team's two libraries disagree on `char` of a code point out of range.** Walk's `char` passes the value (`Library/FortressLibrary.fss:4540`, `nativeHelpers/simpleChar.java:63`, as `Char$Chr` did). The compiler's prelude has no `char`, and its `makeCharacter` raises `IntegerOverflow` outside 0 to 1114111, "Really should be IndexOutOfRange" (`CompilerBuiltin.fss:1058-1062`, `:1638-1639`). A compiled probe printed 'makeCharacter(-1): IntegerOverflow' and 'makeCharacter(1114112): IntegerOverflow'. The specification names no conversion from an integer to a `Char`. Meaning: row 857's answer is the curator's; it is in the report's "Questions for the curator".

## For FACTS

- **The small rest's eight bindings name helpers, with walk's values unchanged.** On S's tree, 29 of the 449 live bindings name a helper of `nativeHelpers/`. The 8 new ones are `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`. The four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`NamingCzar.java:373-384`). 420 still name a glue class.
  - Meaning: F-299's and F-32's counts move. The gather writes the merged tree's counts.
  - Test: `ProjectFortress/tests/NativeHelperFamilySmallWalk.fss` and `ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled.test`.
  - Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why" and "The stages".

## Ledger

Rows 856 and 857: their whole new lines, for `ledger.py rewrite`. Each takes its test of today's behaviour as reproducer, and states the bindings as they stand and the compiled path. Both lines pass `ledger.py check --rows` ('2 rows, 0 fail the template').

| 856 | under walk, `signed` of an `NN32` or `NN64` above its signed half wraps to a negative value, with no `IntegerOverflow`: `signed(unsigned(-1))` is `-1` on `NN32` and on `NN64`, and `signed` of the `NN32` 2^31 is `-2147483648` | NEGATIVE-VERIFIED | implementation gap (walk) | silent | `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss` | climb batch 24's planner | siblings: 502, 858. The bindings (`LibraryBuiltin/FortressBuiltin.fss:469`, `Library/FortressLibrary.fss:985`) name helpers that return their `int` or `long` as is (`nativeHelpers/simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`), as the glue classes `NN32$ToInt` and `UnsignedLong$ToLong` did. The compiler's prelude binds the same helpers (`LibraryBuiltin/CompilerBuiltin.fss:816`, `:880`), so the compiled path wraps too: a compiled probe printed '-1', '-2147483648', '-1'. The specification names only `narrow`'s wrap (`basic-lib/basic-integers.tex`, "Integers"); keep the low bits or raise is row 502's question, for `widen`. |

| 857 | under walk, `char` takes a negative code point or one past U+10FFFF and answers a `Char` that holds it, with no exception: `char(-1).codePoint` is `-1` and `char(1114112).codePoint` is `1114112` | NEGATIVE-VERIFIED | implementation gap (walk) | silent | `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss` | climb batch 24's planner | `char` (`Library/FortressLibrary.fss:4540`) names a helper that returns its `int` as is (`nativeHelpers/simpleChar.java:63`), as the glue class `Char$Chr` did. The api: "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`). The compiler's prelude has no `char`; its `makeCharacter` raises `IntegerOverflow` outside 0 to 1114111, "Really should be IndexOutOfRange" (`LibraryBuiltin/CompilerBuiltin.fss:1058-1062`, `:1638-1639`): a compiled probe printed 'makeCharacter(-1): IntegerOverflow'. A compiled binding of the helper itself passes -1 and 1114112. The specification names no conversion from an integer to a `Char`. |

No new row.

## Handover line

Climb batch 24 rung S: the small rest's eight bindings name their helpers of `nativeHelpers` (P-58). They are `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`. Walk's values are unchanged, and the count and the distance read 0 and 0. Rows 856 and 857 have their tests of today's behaviour. Next: `printlnWithThread` and `getProperty` after item 310 is asked again, and `FlatString`'s 5 with the string family.

## Revival change

Revival change: none. The eight bindings answer the same values on the old code and the new (`ValSmall`, 47 lines, `diff` empty), on the guards' and the two pinned tests' values. Naming a helper in a `builtinPrimitive` string is climb batch 23's change, already in the record (P-58; F-299) and in its Revival change section; this rung uses that mechanism for eight more bindings and changes no behaviour of a team source.
