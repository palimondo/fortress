# Rung I (rung-integer-power): the integer power by contract E

- problem: the distance stage's six integer-power sites on climb batch 19's landed tree, `QQ`'s body three times at `Library/FortressLibrary.fss:642` and once at `:643`, `strToInt` at `:4540` and `strToFloat` at `:4556` (`explorations/compile-ladder/gate/distance-sites.tsv:6-7`, `:10-12`, `:32`), with `MultiplicativeRing`'s and `QQ`'s `^` entries of the second export error (`distance-sites.tsv:3`); F-241, F-247.
- spec: `Specification/basic-lib/basic-integers.tex:531-542`, the method entry of `opr ^` in "Integers", which gave only a nonnegative power; the revival's box above the listing said the chapter did not give a negative one (`basic-integers.tex:320` on the base).
- precedent: the library's `typecase` over the integer types for "any integer" (`exactValue`, `Library/FortressLibrary.fss:398-408`); the compiler prelude's `opr ^(self, other:ZZ32): ZZ32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`); walk's `Int.overflow()` and `Int.shiftCount` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:258-261`, `:295-306`), whose shapes `Int.divisionByZero()` and `Int.powCount` take (`Int.java:263-282`).
- deviation: `Int.powCount` keeps an exponent's parity where `shiftCount` clamps it (`Int.java:268-282`), since the base -1 needs it; the ZZ and `IntLiteral` powers give an exponent beyond the int's range the base's rules, where the team's `(int)` cast wrapped (`BigNum.java:304-324`); the specification names `DivisionByZero` where the same chapter's listing names `IntegerDivisionByZero` for division (`basic-integers.tex:246-250`; row 792).
- historical: Library/FortressLibrary.fss, Library/FortressLibrary.fsi, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java, ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java, ProjectFortress/tests/realArith.fss, ProjectFortress/tests/compoundArray.fss, ProjectFortress/tests/simpleExp.fss, ProjectFortress/demos/BiCGSTAB.fss, ProjectFortress/demos/BiCGSTAB2.fss, ProjectFortress/demos/npbft.fss, Specification/basic-lib/basic-integers.tex, Specification/appendices/changes.tex

Branch `wip/rung-integer-power`, cut from `97ccd5f1f`, seeded from `/home/user/fortress-base20` (the seeding script exited 0), pushed. Commits: `b1b944089` (the tests), `0bf22171b` (the library, walk's natives, the demos, the test's one correction), `1059606f1` (the specification). The harness refused this agent's write of REPORT.md and record.md; their text is the rung's result.

## 1. What changed and why

P-153 (contract E): each integer type's `^` answers its own type at every exponent; at a negative exponent the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`, since the result is no integer; a fraction comes from a float or rational base.

- **The library**: the planner's `explorations/compile-ladder/plan-20/probes/power.patch`, taken as it is (`git apply --check` passed on the base; decision 1):
  - every integer `^` answers its base's type, in the component and the api: `Integral`'s (`Library/FortressLibrary.fss:723`, `.fsi:473`), `ZZ32`'s, `ZZ64`'s, `NN64`'s and `ZZ`'s two each (`fss:801-803`, `:894-896`, `:977-979`, `:1076-1078`; `fsi:525-526`, `:579`, `:637`, `:675`), `NN32`'s and `IntLiteral`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:460-462`, `:552-554`; `FortressBuiltin.fsi:167-168`, `:213-214`);
  - `QQ`'s power is the probe's `typecase` over the five integer types, negating only inside a signed type (`fss:641-648`);
  - `strToInt` writes `fail[\ZZ32\]` (`fss:4545`);
  - the api: `MultiplicativeRing`'s `abstract opr ^(self, other:AnyIntegral): T` (`fsi:283`), `RR64`'s `opr ^(self, b:AnyIntegral):RR64` after its `^` over `RR64` (`fsi:366`, the component's `fss:487`), and `QQ`'s exponent `AnyIntegral` (`fsi:431`).
- **Walk's six power natives** (`Int.java:220-230`, `Long.java:232-242`, `NN32.java:227-237`, `UnsignedLong.java:227-237`, `BigNum.java:298-302`, `IntLiteral.java:248-252`):
  - the negative branch: signed bases through `Int.negativePow` (`Int.java:285-293`), unsigned bases through `UnsignedLong.negativePow` (`UnsignedLong.java:337-344`), ZZ and `IntLiteral` through `BigNum.pow` (`BigNum.java:304-324`): 1 gives 1, -1 (signed types only) gives 1 or -1 by the exponent's parity, 0 throws `DivisionByZero`, any other base `IntegerOverflow`;
  - `DivisionByZero` is raised by `Int.divisionByZero()` (`Int.java:263-266`), in the shape of `Int.overflow()`, on the constant `WellKnownNames.divisionByZeroException` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:87`), beside `integerOverflowException` (fork 14);
  - the exponent of any integer type is read by `Int.powCount` (`Int.java:268-282`), in place of `getLong`, which a `ZZ` value always refused (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FBigNum.java:48-50`): an `NN64` of 2^63 or more is positive, and an exponent beyond 64 bits becomes the long of its sign and parity nearest it, to which the base's rules then apply (0 gives 0 at a positive exponent and throws at a negative one; 1 and -1 give their exact power; any other base overflows) (fork 11). `BigNum.java:110-116` and `IntLiteral.java:107-113`, the readers `ZL2N` and `KL2N` that only `Pow` uses, call it;
  - the ZZ and `IntLiteral` powers give an exponent beyond the int's range the same rules, and turn `BigInteger`'s own `ArithmeticException` into `IntegerOverflow` (`BigNum.java:304-324`), where the `(int)` cast wrapped (decision 4).
- **The team tests** (fork 15), a `.0` on each base numeral and nothing else: `ProjectFortress/tests/realArith.fss:54`, `:57`; `compoundArray.fss:17-18`, `:27`, `:32`, `:33-34`; `simpleExp.fss:18-20` (section 9, point 2).
- **The demos** (fork 15): `ProjectFortress/demos/BiCGSTAB.fss:211`, `BiCGSTAB2.fss:198`, `npbft.fss:130`.
- **The specification**: `Specification/basic-lib/basic-integers.tex` and Appendix I (section 5).

## 2. The tests, their failing runs and their passing runs

The tests, in `ProjectFortress/tests/`:
- `IntegerPowerContractWalk.fss` (new): at `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, `2^(-1)` raises `IntegerOverflow` and `0^(-1)` `DivisionByZero`; `1^(-1)` is 1, and at the signed types `(-1)^(-1)` is -1 and `(-1)^(-2)` is 1, each of the base's own type; `2^3` is 8 of the base's type; the numeral type's `0^3` is 0 and `0^(-1)` raises `DivisionByZero`; `(2/3)^(-1)` is `3/2`; `2.0^(-1)` is 0.5; and an exponent of each integer type, one beyond 64 bits and an `NN64` of 2^63 among them. Its helpers are `PowChooseLcmRungE.fss:6-12`'s `overflows` and `dividesByZero` in its shape; the type is read by `IntLiteralValue.fss:6-17`'s `typecase` `shown`.
- `QQPowerExponent.fss`: `XXXQQPowerExponent.fss` promoted (`git mv`, its component line renamed) before the edit.
- `realArith`, `compoundArray`, `simpleExp`: respelled before the edit.

**Failing, on the base's code, before the edit was built** (the tree was the base plus the test):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-integer-power/h-base ProjectFortress/tests/IntegerPowerContractWalk.fss
    # harness-one 2026-10-20T07:14:25Z; tree 97ccd5f1f; nproc=4; load 0.24 0.50 0.49; ...; FORTRESS_THREADS=4; cache empty
    FAIL: ZZ32 2^(-1) is no integer and throws IntegerOverflow; basic-integers.tex, section "Integers", opr ^
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-integer-power/h-base-qq ProjectFortress/tests/QQPowerExponent.fss
    # harness-one 2026-10-20T07:15:53Z; tree 97ccd5f1f; ...
    Value 3 might not fit in ZZ64.
    Tests run: 1,  Failures: 1,  Errors: 0

The three respelled team tests passed there: `harness-one.sh $PWD/tmp/rung-integer-power/h-base-team ProjectFortress/tests/realArith.fss ProjectFortress/tests/compoundArray.fss ProjectFortress/tests/simpleExp.fss` (07:14:52Z, tree `97ccd5f1f`) 'OK (3 tests)'. `compoundArray`'s 20 printed lines were equal, line for line, to those of the unchanged file run the same way (07:15:03Z, 'OK (3 tests)'): `diff` of the two outputs printed nothing.

**One correction of the test after the edit.** The first run after the build failed at the numeral case: 'FAIL: J8/0:0 : ZZ32 =/= J14/0:0 : IntLiteral; the numeral type's 0^3 is its own 0'. Walk's numeral power answers walk's numeral, a `ZZ32` value: `FIntLiteral.make` gives an `FInt` for any value that fits (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-48`; P-76; row 578, whose test `IntLiteralValue` pins the same `ZZ32` for the object's other arithmetic). The base does the same: a probe on the old code printed '0 : ZZ32' for `IntLiteral^3`. The assertion now checks the value only, `lit^3 = 0`. The next run stopped on a parse error, 'the argument should not be immediately followed by a non-expression element', at `big(2)^(big(3))`, so each `big(…)` base is now parenthesised. The corrected test failed again on the old code, through the base build's harness:

    FORTRESS_HOME=/home/user/fortress-base20 /home/user/fortress-base20/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-integer-power/h-old ProjectFortress/tests/IntegerPowerContractWalk.fss
    # harness-one 2026-10-20T07:23:28Z; tree 97ccd5f1f; ...
    FAIL: ZZ32 2^(-1) is no integer and throws IntegerOverflow; basic-integers.tex, section "Integers", opr ^
    Tests run: 1,  Failures: 1,  Errors: 0

Each later section also fails alone on the old code, in scratch copies whose `run()` calls one function, run directly. `exponentTypes` fails with 'Value 3 might not fit in ZZ64.', and `numeralType` with 'FAIL: the numeral type's 0^(-1) throws DivisionByZero'. `negativeNN64` and `negativeZZ` fail at their `2^(-1)`.

**Passing, after the last change of code** (`0bf22171b`'s code; the later commits change only prose):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-integer-power/h-census <30 tests>
    OK (30 tests)

The 30 tests:
- `IntegerPowerContractWalk`, `QQPowerExponent`, `realArith`, `compoundArray` and `simpleExp`.
- The probe's census of the tests that reach an integer power: `ComprehensionTypedBindingWalk`, `InferUnfixedFBoundedWalk`, `setSum`, `simpleSum`, `RandomTest`, `zeno`, `PowChooseLcmRungE`, `UnsignedTest`, `expTest`, `IntLiteralValue`, `transposition`, `FlatTowerRungF`, `NumeralTest`, `QuickCheckTest`, `TimingTests`, `LongStringTests`, `quicksortTest`, `CovCollTest`, `formatTest`, `roundBug`, `HeapTest` and `RationalTest`.
- `NumberOrderListDeclarations`, `ShouldRaiseNoExceptionWalk` and `NatArithPowerWalk`.

Then, once, on that code state:

    ant testSystem      BUILD SUCCESSFUL, Total time: 5 minutes 45 seconds; system-0..3 'Tests run: 160', '172', '164', '169', Failures: 0, Errors: 0
    ant testSpecData    BUILD SUCCESSFUL, Total time: 1 minute 24 seconds; 'Tests run: 130, Failures: 0, Errors: 0, Skipped: 0'

That is 665 walk tests, against 664 at climb batch 19's gate (`climb-batch-19/gate/summary.txt`, system-0 to 3: 167, 167, 161, 169). The one added is `IntegerPowerContractWalk`.

The edit does not reach the compiled power tests, and they kept their verdicts. `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh pow ProjectFortress/compiler_tests PowZZ32CompiledRungELink.test PowNN32CompiledRungELink.test PowNN64CompiledRungELink.test XXXPowZZ32CompiledRungE.test XXXPowNN32CompiledRungE.test XXXPowNN64CompiledRungE.test` printed three 'Saw expected failure (Exit code != 0)' and 'OK (6 tests)'.

microGPT's quick pair under walk, `explorations/coordinator/tools/mg-run.sh tmp/rung-integer-power/mg post`: `MicroGptFlatQuick` 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', 'rc=0 secs=38'; `MicroGptAplQuick` the same, 'rc=0 secs=46'.

No `XXX` test is added, so none is shown red on a deliberate fix. (The skeptic added one, `compiler_tests/XXXIntegerPowerContractCompiled`, shown red on a deliberate change in `SKEPTIC.md`.)

## 3. Where the fix belongs, and the precedent search

- The sites are in the interpreter's library's text, which the checker reads at the switch-over (`explorations/coordinator/map/spec-to-implementation.md`, the numbers row at `:323`). Walk's values come from its natives in `interpreter/glue/prim/` (`explorations/coordinator/map/modules-and-phases.md:84`). The compiled path's own power, `jIntExp` (row 523), belongs to phase 4, not to this rung.
- The ways the language and the library offer for each part, and the one taken:
  - The power's type: the base's own type (E, Z), a rational typed by the exponent (R), an exponent typed so that it cannot be negative (X), or `RR64` as declared. P-153 takes E; the Fable judgement's section 5 weighs the others.
  - `QQ`'s body over "any integer": the library's `typecase` over the comprised types (`exactValue`, `fss:398-408`; `Number`'s `=`, `fss:386-395`), `-` and `<` declared on `AnyIntegral` (adds abstract members to a comprised trait), or an unsigned exponent per arm (the R and X form). Fork 9 takes the `typecase`.
  - `strToInt`'s `else`: `fail[\ZZ32\]` (P-153), a `case` on `Maybe` without a generator clause, or a checker repair of row 747. The library calls `fail` with a static argument nowhere else. Of its 20 calls of `fail` on the base (21 lines with the declaration at `:54`), `strToInt`'s is the only one inside a reduction's body with a generator clause (`grep` of `Library/FortressLibrary.fss`).
  - The ring's api power: fork 7's three texts, (a) `abstract` alone, (b) the exponent alone, (c) both with `RR64`'s line; (c) taken.
  - The natives' exception at 0: `DivisionByZero` (the probe, after `intToIntPower`), `IntegerOverflow` for every base, or `CastError`; the name by a `WellKnownNames` constant (fork 14) or the probe's string.
  - The exponent reader: `getLong` as the team wrote it, `Int.shiftCount` as the revival wrote it for shifts (`d6faad28f`), or a reader that keeps parity (taken; decision 2).
- The precedents counted:
  - The `typecase` over the integer types appears twice in the same file, in `exactValue` and in `Number`'s `=`.
  - `Int.overflow()` is defined once (`Int.java:258-261`), and every exact operation in `Int.java`, `Long.java`, `NN32.java` and `UnsignedLong.java` calls it.
  - `shiftCount` has 5 callers, one shift reader per integer native file (`Int.java:94`, `Long.java:108`, `NN32.java:99`, `UnsignedLong.java:100`, `BigNum.java:106`).

## 4. The stages

Neither stage could be skipped, since the edit changes `Library/` and `ProjectFortress/LibraryBuiltin/`. Each ran once, on `0bf22171b`'s code, with the brief's command lines. The before is climb batch 19's landed tables.

**The count**, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-integer-power/checker-count-postedit.txt tmp/rung-integer-power/cc-post`, against `explorations/compile-ladder/climb-batch-19/gate/checker-count.txt`:

    14,15c14,15
    < #total	28
    < #locations	27
    ---
    > #total	22
    > #locations	22

Every api row stays 0, and `#crash none`. Entry by entry, the 22 left are the per-site list's typecheck sites of `FortressLibrary.fss` minus the six power sites. Past `fss:646` each is 2 lines later than landed, since the `typecase` adds two lines:
- `:1465` (landed `:1463`);
- the 19 array sites from `:2528` to `:2979` (landed `:2526` to `:2977`);
- `BIG MIN` at `:4370` and `:4376` (landed `:4368`, `:4374`).

The six gone are `:642` three times, `:643`, `:4540` and `:4556`. So 28 to 22, as read.

**The count stage's seconds**: before, about 64 s (climb batch 19's gate, by the brief); after, 71 s.
- It started at 2026-10-20T07:34:04Z, and its `EXIT=` was written at 07:35:15Z (`stat` of `count-run.txt`).
- Load at start 6.25 12.60 7.93; nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz; openjdk 25.0.4.1; FORTRESS_THREADS=1; beside rung A's agent.
- The two times are not a pair from one run. There was no speed pass (fork 17): the checker is unchanged.

**The distance**, `explorations/coordinator/tools/distance/run.sh tmp/rung-integer-power/distance-postedit.txt tmp/rung-integer-power/dist-post` ('#seconds 171 FortressLibrary 128', load at start 2.93 9.39 7.33), then `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/rung-integer-power/distance-postedit.txt`:

    DISTANCE DOWN   31 -> 25 (-6)
        kind typecheck               29 -> 23     (-6)
        class GF                      1 -> 0      (-1)  generators: a filter that failed for another reason
        class OT                      9 -> 4      (-5)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary     30 -> 24     (-6)

`#crash none`; `#shadow every shadow edit matched the tracked sources`. Site by site, `tmp/rung-integer-power/dist-post/errors.tsv` was read against `explorations/compile-ladder/gate/distance-sites.tsv` row by row: by kind, by location (mapped back by -2 past `fss:646`) and by message.
- **Gone (6):**
  - `FortressLibrary.fss:642` 'Could not check call to operator -' (`distance-sites.tsv:6`), and `:643` the same (`:7`);
  - `:4540` 'ZZ32->ZZ32 is not applicable to an argument of type Any' (`:10`);
  - `:4556` 'ZZ32->ZZ32 is not applicable to an argument of type RR64' (`:11`);
  - `:642` 'Filter expressions in generator clauses must have type Boolean' (`:12`);
  - `:642` 'Function body has type RR64, but declared return type is QQ.' (`:32`).
- **Came:** none. **Moved:** none, beyond the line offsets.
- **The two export errors** stay.
  - The first keeps its 17 entries, each one api line later past `fsi:365` (`RR64`'s new line).
  - The second goes from 44 entries to 43. `MultiplicativeRing`'s entry is gone. `QQ`'s now reads '(TraitDecl QQ at FortressLibrary.fsi:395.1, due to Asbtract method isNaN @ FortressLibrary.fss:589:5-27 is not declared in the API)', where it named `^` twice before `isNaN`. Nothing else in it differs.

31 to 25, as read. No table is committed.

## 5. What the specification settles, and the text changed

- The Working Draft gave `2^(-1)` as `1/2` through `QQ`'s power, while `ZZ` was a subtype of `QQ` (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`). The revised chapter withheld the negative case (`basic-integers.tex:320` on the base). P-153 settles it as E.
- The text changed in the S1 form, after the precedent of `14e91723f`, which extended an existing Appendix I entry with "Another revision …" and cited the rung's report for its reasoning:
  - `Specification/basic-lib/basic-integers.tex:534-539`: the method entry of `^` gains three sentences:
    - an integer raised to a negative power is an integer only at the bases 1 and -1, and is then that exact power, of the base's type;
    - a base of 0 throws `DivisionByZero`, and any other base `IntegerOverflow`;
    - a fraction is written with a floating-point or rational base: `2.0^{-1}` is `0.5` and `(2/3)^{-1}` is `3/2`.
    A `\revision{revival-integers}` box follows (`:540-542`).
  - `basic-integers.tex:320-324`: the box above the listing said "This chapter does not give it.", which became false; it now says, in one sentence, that the method entry gives it.
  - `Specification/appendices/changes.tex`, "The integer trait" (`:882`):
    - its Change gains the revision (`:898-903`);
    - its Rationale's parenthesis now says the power on integers takes an exponent of any integer type and returns the integer's own type (`:908-909`);
    - its Rationale gains the decision of 20 October 2026, where its reasoning is and the way back (`:910-925`);
    - its Effect's last sentence becomes four (`:935-943`): the text gives the negative power, walk does so and the checker types it so, and the compiled path's own library answers 0, and a Java exception no `catch` sees at 0 (rows 441 and 523);
    - the replaced revival sentences are quoted (`:1040-1051`).
  - "Passages not yet revised" loses "The result of an integer raised to a negative power is not yet given (…)" (`changes.tex:4076`, `:4034` on the base).
  - `Specification/fortress/preamble.tex` says nothing of the power (grep), so it stays.
- The compiled path's claim in the Effect was run. `NegPowCompiled.fss` (`two^(-1)` and `zero^(-1)` at `ZZ32`) was compiled and run in the tree after the library order. It printed '2^(-1) =  0', then 'java.lang.RuntimeException: java.lang.RuntimeException: Overflow Error:'.
- The specification was built with `./ant genSource && ./ant tex`, both 'BUILD SUCCESSFUL'.
  - The log holds no 'LaTeX Warning: Reference … undefined', no '! Undefined control sequence' and no 'multiply defined'. The skill's grep counts 44 lines, each an echo of the `\@warning` macro's definition (`x@warning {Reference `#1' on page …`).
  - `pdftotext` shows the entry as written (section 33.2.45).
  - The build's files were removed with `git clean -fXq -- Specification`.
- `Specification/basic/operators/opr-overview.tex:73`, "This operation is defined in the usual way on numerals.", is left as it is (fork 16) and listed in section 7.
- No decision record was written. The section did not ask for one, and the reasoning that the Appendix I entry cites, the Fable judgement and the probe's report, is already on record (decision 8).

## 6. Old against new

- **The demos** were each run once under walk on the base (`old-fortress.sh /home/user/fortress-base20 tmp/old-caches ProjectFortress/demos/X.fss`) and once on the final tree (`bin/fortress ProjectFortress/demos/X.fss`, with a private caches folder):
  - `BiCGSTAB`: both runs print the same 29 residual lines and stop at `:177`, `ss = t / 1000000000.0`, with 'Failed to find any matching overload, args = (63894328343: ZZ64,1.0E9)' (base) and '(61962592400: ZZ64,1.0E9)' (after). The unrespelled file on the new code stops at `:211` with 'IntegerOverflow', before its first residual. The demo does not complete, before or after (row 791).
  - `BiCGSTAB2`: the same 29 residual lines before and after, then the same stop at `:163`. It does not complete (row 791).
  - `npbft`: refused at load before and after, with 'Object Complex does not define an abstract method declared in type Number: … asFloat():RR64' (row 670), so its `:130` is never reached. It does not complete.
- **A probe of the numeral power**, `LitPow.fss` on the old code: `IntLiteral^3` '0 : ZZ32', `IntLiteral^IntLiteral` '1 : ZZ32', `IntLiteral^(-1)` 'Infinity : RR64'.
- **A probe of exponents beyond the int**, `BigExp.fss`: on the old code `(big(3))^(2^32 as ZZ64)` printed '1' (the `(int)` cast's 0) and `0^(2^63 as NN64)` printed '1.0'. On the new code the first raises 'IntegerOverflow', and the test asserts the second is 0.
- **Row 747's shape**, compiled on the old code: section 8.
- **The ladder files** `expTest` and `transposition`: section 9.

## 7. Sentences made false

The gather corrects those this rung does not edit:
- FACTS F-241, "The integer power's declared `RR64` holds five of the distance's sites; `strToInt`'s sixth needs a typed `fail` too.": its sites are gone, by the typed power and `fail[\ZZ32\]` (section 4).
- FACTS F-247:
  - "Only the declared type says `RR64` (row 438)" is false: the library declares the base's type.
  - "only three team tests reach a negative one" is false: the three tests now write a float base.
  - "by reading the demos `BiCGSTAB` and `BiCGSTAB2`" is past: both are respelled, with `npbft`.
- POSITIONS P-153's "Still to build: …": built, and with three demos where it names two.
- Row 438's claim, "the one library declares integer `^` as answering `RR64`", is false; the row closes.
- Row 441's first clause, "a negative power of an integer has no specified result", is false, and so are "on `ZZ32` `2^(-1)` is `0.5` (an `RR64`) under walk" and "`0^(-1)` is `Infinity` under walk". Its notes' "By reading, `NN32$Pow`'s negative branch sign-extends (`NN32.java:232`)" and "The curator chooses a rational, a throw, or `RR64`" are past.
- Row 445's claim: the api's `ZZ64` exponent, the failure on a `ZZ` exponent and the recursion on an unsigned one are all gone; the row closes.
- Row 747's claim, "so `strToInt`'s `SUM[\ZZ32\]` (…) is refused", is false: `strToInt` now writes `fail[\ZZ32\]`. The checker's gap stays.
- Row 523's notes, "binding it as it stands would decide row 441", are past: row 441's contract is decided (E).
- FACTS F-84, "The one library's numbers, orderings, `List` and natives answer their declared types ...": its "Left: `QQ`'s power (rows 438, 445)." is false, since the integer powers answer their declared types and `QQ`'s power its exponent of any integer (rows 438 and 445 close). (Added by the skeptic.)
- Row 533's claim names the tie of `RR64`'s `opr ^(self, b:RR64)` with `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`; the second is now `abstract opr ^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fsi:283`), and `RR64`'s api gains `opr ^(self, b:AnyIntegral):RR64` (`:366`). Whether `10.0^(-5)` still ties, and between which two, is not measured. (Added by the skeptic.)
- In `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`, no integer `Pow` still gives a float result except the unbound `ZZ32.java:201-211` (`ZZ32$Pow`), which no library binds (grep of `Library/` and `ProjectFortress/LibraryBuiltin/`).
- The specification:
  - `opr-overview.tex:73`, "This operation is defined in the usual way on numerals.", is left (fork 16);
  - `basic-integers.tex:320` and `changes.tex:902-903`, `:913` and `:4034` on the base are edited (section 5);
  - no other Appendix I Effect or note on walk or the compiled path says what the integer power answers (grep of `changes.tex` for "power").
- The skill: no sentence of `.claude/skills/fortress-repo/` gives the integer power's type or a negative power's value (grep for "negative power", "integer power", "2^(-1)").
- `Library/FortressLibrary.fsi:282`, the team's "Exponentiation need only deal with natural exponents.", stands above the ring's power that now takes any integer. It is still true of the ring's contract, since an integer ring raises at a negative exponent, so it is left.

## 8. Row 747's reproducer: the notes, not a compiled test

The compiler's own library cannot state the shape: it refuses an `if` with a generator clause before any typing, 'Variable __cond is not defined' (`ProjectFortress/compiler_tests/XXXIfGeneratorClause.test`). The shape, compiled on the old code (`old-fortress.sh /home/user/fortress-base20 tmp/old-caches compile Row747Shape.fss`):

    component Row747Shape
    export Executable

    stop[\T extends Any\](s: String): T = throw InvalidRange
    digitOf(c: ZZ32): Maybe[\ZZ32\] = if c < 10 then Just[\ZZ32\](c) else NothingObject[\ZZ32\] end

    run(): () = do
        r: ZZ32 = SUM[i <- 0#3] if d <- digitOf(i) then d else stop("non-digit") end
        assert(r, 3, "the sum of the digits 0, 1 and 2")
        println("PASS")
      end

    end

It printed 'Compiler internal generated.:0:0:', 'Variable __cond is not defined.' and 'File Row747Shape.fss has 1 error.'. A test keyed on the row's message cannot pass there, and one keyed on `__cond` would test row 747's neighbour, not row 747. So the row keeps this program in its notes, or points here where its notes have no room (record.md).

## 9. Points to report

1. **power.patch, taken as it is.** It applied to the base (`git apply --check`), and every value and site it moves is one the planner and the probe measured (sections 2 and 4). None of its lines needed an improvement: `git diff 97ccd5f1f -- Library ProjectFortress/LibraryBuiltin` is the patch.
2. **The team lines changed**, before → after, each keeping its value: the respelled tests passed on the base, and `compoundArray`'s printed lines are equal.
   - `realArith.fss:54` `assert(sin pi, 1.2246467991473532 TIMES 10^(-16))` → `… TIMES 10.0^(-16))`; `:57` `assert(tan pi, -1.2246467991473532 TIMES 10^(-16))` → `… TIMES 10.0^(-16))`.
   - `compoundArray.fss`:
     - `:17-18` `(7.07106781186547462 10^(-1))` four times → `(7.07106781186547462 10.0^(-1))`;
     - `:27` `println(3 10^(-2))` → `println(3 10.0^(-2))`;
     - `:32` `println(3.14 10^(-2))` → `println(3.14 10.0^(-2))`;
     - `:33-34` `7.07106781186547462 10^(-1)` four times → `7.07106781186547462 10.0^(-1)`.
   - `simpleExp.fss`:
     - `:18` `10000000000000000000000000^(-1)` → `10000000000000000000000000.0^(-1)`;
     - `:19` `1000000000000000^(-1)` → `1000000000000000.0^(-1)`;
     - `:20` `7.07106781186547462 10^(-1)` → `7.07106781186547462 10.0^(-1)`;
     - its comment on "Int and Long exponentiation" is kept (fork 15).
   - `demos/BiCGSTAB.fss:211` and `demos/BiCGSTAB2.fss:198`: `er0 = 1.0 10^(-4)` → `er0 = 1.0 10.0^(-4)`. `demos/npbft.fss:130`: `alpha = 10^(-6)` → `alpha = 10.0^(-6)`. None of the three demos completes, before or after (section 6).
3. **Walk values that move**:
   - an integer raised to a negative power raises `IntegerOverflow`, or `DivisionByZero` at 0, where it answered an `RR64` (0.5, `Infinity`, `-1.0`);
   - `1^(-1)` and `(-1)^(-1)` answer the base's type, where they answered `1.0` and `-1.0`;
   - `(1/2)^(big(3))` answers `1/8`, where walk stopped;
   - an `NN64` exponent of 2^63 or more is positive (`0^(2^63)` was `1.0`);
   - a ZZ or numeral base at an exponent beyond the int's range follows the base's rules, where the cast wrapped (`3^(2^32)` was `1`) or `BigInteger` threw.
   No test's message or verdict changed beyond the promotion: `ant testSystem` passed 665 of 665, and `ant testSpecData` 130 of 130.
4. **The tables**: the count 28 → 22, its locations 27 → 22; the distance 31 → 25, six sites gone and none come; the second export error 44 entries → 43 (section 4).
5. **The count stage's seconds**: about 64 s before (at the gate), 71 s after (section 4).
6. **Row 747's reproducer** is in the row's notes or this report's section 8, since the compiler's library refuses the generator clause first.
7. **Sentences made false**, and those edited: sections 7 and 5.
8. **Ladder, compiled tests, specification examples, microGPT**: none changed.
   - The ladder subset is `expTest` and `transposition`, the only baseline files whose recorded first error names `^` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`). It gave `expTest` at 'disambiguate', 'Variable asFloat is not defined.', and `transposition` at 'typecheck', 'Could not check call to operator ^'. Each equals the old code's own compile output. The baseline of 2026-09-19 had `expTest` at typecheck, a move that came before this base.
   - The eighteen microGPT components' phases equal climb batch 19's: `diff <(mg_phases …/climb-batch-19/gate/ladder/microgpt-phase.md) <(mg_phases tmp/…/microgpt-phase.md)` printed nothing. Each first error is the same; only the seconds differ.
   - `ant testSpecData` passed 130 of 130, and the compiled power tests 'OK (6 tests)'.
9. **Files beyond those named**: none. `WellKnownNames.java` is under `compiler/`, but it gains only one constant, which only walk's natives read. No checker, code-generator or array edit.

## 10. Decisions

1. **power.patch as it is**, not changed. Ways not taken: fork 7's text (a), which brings a site at `FortressBuiltin.fss:194`, and (b), which leaves `MultiplicativeRing`'s entry; contracts Z, R and X (P-153). Evidence: the patch applied, and the stages moved exactly its six sites and one entry (section 4).
2. **The exponent reader keeps parity.** `Int.powCount` reads `FNN64` and `FBigNum` as `shiftCount` does, but maps an exponent beyond 64 bits by its parity: to `Long.MAX_VALUE - 1` or `Long.MAX_VALUE` when positive, and to `Long.MIN_VALUE` or `Long.MIN_VALUE + 1` when negative. Ways not taken: `shiftCount` itself, which clamps to an odd `Long.MAX_VALUE` and so gives `(-1)^(2^70)` as -1; a `BigInteger` path in each native; an error for an exponent beyond 64 bits. Evidence: the brief's base rules need the parity at -1; the test's `mone^huge` and `mone^hugeOdd`.
3. **The negative branch as two shared helpers**: `Int.negativePow` for signed bases and `UnsignedLong.negativePow` for unsigned ones, where the probe wrote the branch inline in each native. An unsigned base never reads as -1: `NN64`'s all-ones value is -1 as a long, and `NN32.getNN32` gives an int of its bits. So the unsigned helper tests only 1 and 0. Ways not taken: the probe's inline lines; one helper with a sign flag.
4. **The ZZ and numeral powers beyond the int's range.** `BigNum.pow` gives an exponent above `Integer.MAX_VALUE`, or a negative one, the base's rules, and turns `BigInteger`'s `ArithmeticException` into `IntegerOverflow`. Ways not taken: keep the `(int)` cast, which wrapped silently (`3^(2^32)` gave 1); raise for every exponent beyond the int. Evidence: section 6's probe, and the brief's rules for an exponent beyond 64 bits, carried down to the width at which `BigInteger.pow` stops.
5. **`DivisionByZero` by a `WellKnownNames` constant** (fork 14), with `Int.divisionByZero()` beside `Int.overflow()`. Way not taken: the probe's string.
6. **The test's form.** One walk test of the contract, reading the base's type with a `typecase` `shown` (`IntLiteralValue`'s), where `instanceOf` on each value would double the assertions. The numeral case asserts the value only, since walk's numeral power answers a `ZZ32` value (section 2). Way not taken: a separate test of the exponent reader, which checks the same contract at other exponent types.
7. **Row 747's reproducer in the notes** (section 8). Way not taken: an expected failure keyed on `__cond`, which is `XXXIfGeneratorClause`'s defect.
8. **The specification in the existing Appendix I entry**, extended as `14e91723f` extended its own, with a box after the method entry besides the revised box above the listing, and no `decision-record.md`. Ways not taken: a new Appendix I subsection; a decision record, which the section did not ask for (the brief, "A decision record if your section asks for one").
9. **The specification names `DivisionByZero`** (P-153; `opr-overview.tex:165`; both libraries), not the listing's `IntegerDivisionByZero` (row 792).
10. **The microGPT quick pair was run** beside the phase step the brief asks for, since `strToInt` is on microGPT's path under walk (F-247).
11. **Left as they are**:
    - the unbound `ZZ32$Pow` (`ZZ32.java:201-211`);
    - `Int.pow` and `UnsignedLong.pow`, whose callers the change removes (dead code, not this rung's);
    - `not_passing_yet/tree.fss:54-87`, whose `10^(-1)` now raises, in a folder of tests expected to fail.
12. **The first commit's footer** carries the session's suggested co-author line, not the skill's `Co-Authored-By: Claude <noreply@anthropic.com>`; the later commits carry the skill's. Changing it needs a force-push, which the brief forbids.

## 11. Defects and their homes

- Row 438, the declared `RR64` (home 1): `IntegerPowerContractWalk`'s `shown` assertions and the distance stage's five sites.
- Row 445, the rational power's exponent (home 1): `QQPowerExponent`, promoted.
- Row 441, the negative power unspecified (home 1 for walk and the text: `IntegerPowerContractWalk`). Its compiled half stays open with row 523 (a note).
- Row 441's compiled half, `2^(-1)` answering 0 and `0^(-1)` a raw `RuntimeException` on the compiled path, is a deferred defect that the revised text settles, so home 2: `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test` with `IntegerPowerContractCompiledLink.test` (added by the skeptic; `SKEPTIC.md`).
- Row 747, the checker's `fail` in a generator clause's `else` (home 3, its row): the library's site is gone; the reproducer stays the program of section 8.
- Walk read an `NN64` exponent of 2^63 or more as negative, and a ZZ or numeral power wrapped an exponent beyond the int (home 1): `IntegerPowerContractWalk`'s `exponentTypes`. No row, since the defect was found and repaired here.
- Row 791, `BiCGSTAB` and `BiCGSTAB2` stop at their `ZZ64 / RR64` timing line under walk (home 3, the row only). Walk stops with an uncatchable `ProgramError`, so no gated test can pass while it shows, and the demos are not gated.
- Row 792, the integer listing's `IntegerDivisionByZero`, which neither library declares (home 3, the row only): a name in the specification's listing, which no program observes.

## 12. For FACTS

In the library's declarations every integer power answers its base's own type, and under walk so does every power of the five integer types; walk's numeral object answers a `ZZ32` value, as all its arithmetic does (row 578). At a negative exponent only the bases 1 and -1 give a value: 0 raises `DivisionByZero` and any other base `IntegerOverflow`, at an exponent of every integer type. So the distance's six power sites are gone (31 to 25, and the count 28 to 22), and a program that wants a fraction writes a float or rational base. The compiled path's own library still answers 0 (row 523). Test: `ProjectFortress/tests/IntegerPowerContractWalk.fss`, `QQPowerExponent.fss`; the distance stage. Detail: sections 1, 2 and 4.

## 13. Commands worked out

- The per-site comparison: a short Python read of `errors.tsv` and `distance-sites.tsv`, matching on the kind, the location and the message's first 60 characters, with the location mapped back by the edit's line offset. The export errors' entries were split on ' at FortressLibrary.fsi' and compared by name.
- The ladder subset: `printf 'tests\texpTest.fss\ntests\ttransposition.fss\n' > $D/subset.txt`, with the drivers of `gate.md`, "The ladder regression", copied under `tmp/rung-integer-power/ladder/`.
