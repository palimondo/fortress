# Rung I (rung-integer-power): record lines for the gather

## FACTS

- **Every integer power answers its base's own type; at a negative exponent the bases 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base `IntegerOverflow` (contract E).**
  - Under walk this holds at `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ` and the numeral type, at an exponent of any integer type, one beyond 64 bits included; `(1/2)^(big(3))` is `1/8`.
  - The library declares it so in the component and the api. `QQ`'s power splits by a `typecase` over the integer types, `MultiplicativeRing`'s api power is abstract over `AnyIntegral` with `RR64`'s beside it, and `strToInt` writes `fail[\ZZ32\]`.
  - So the distance's six power sites are gone, 31 to 25, and the count goes from 28 to 22. The second export error loses `MultiplicativeRing`'s entry, 44 entries to 43.
  - A fraction comes from a float or rational base, as `2.0^(-1)`. The team tests `realArith`, `compoundArray` and `simpleExp`, and the demos `BiCGSTAB`, `BiCGSTAB2` and `npbft`, now write theirs so.
  - The compiled path's own library still answers 0 at a negative exponent, and a raw exception at 0 (row 523).
  - Tests: `tests/IntegerPowerContractWalk.fss`, `tests/QQPowerExponent.fss`; the distance stage.
  - Detail: `compile-ladder/rung-integer-power/REPORT.md`, sections 1, 2 and 4.
- F-241 and F-247 describe the state before this rung (`REPORT.md`, section 7). F-241's sites are gone. F-247's "Only the declared type says `RR64`" is false, and its three team tests and two demos now write a float base, with `npbft` beside them.

## POSITIONS

- P-153's "Still to build" is built. It names two demos; the rung respelled three, `npbft` among them (fork 15).

## Ledger

- Row 438: close it with the fix's commit on `main` (`0bf22171b` on the branch) and the test `ProjectFortress/tests/IntegerPowerContractWalk.fss`, as row 685 was closed. The distance stage's sites `FortressLibrary.fss:642` (three), `:643`, `:4540` and `:4556` are gone (`REPORT.md` section 4).
- Row 445: close it with the fix's commit (`0bf22171b`) and the test `ProjectFortress/tests/QQPowerExponent.fss`, promoted from `XXXQQPowerExponent` in `b1b944089`.
- Row 441, note: "Contract E (P-153): the specification gives it (`basic-integers.tex`, "Integers", opr ^) and walk builds it (`IntegerPowerContractWalk`); compiled, `2^(-1)` is still 0 and `0^(-1)` a raw RuntimeException (row 523), until phase 4's natives." The row's notes are at 705 of 700 characters, so `ledger.py note` may refuse it; the gather lists it for the coordinator then.
- Row 747, note: "`strToInt` writes `fail[\ZZ32\]` (`fss:4545`), its site gone; the gap stays. No compiled reproducer: `if d <- e` is refused first, 'Variable __cond is not defined'; program: `rung-integer-power/REPORT.md` §8." That is 207 characters, which leaves the notes at 693 of 700.
- Row 523, note: "Its negative branch now has its contract, E (P-153), as walk's natives give it." The row's notes are at 682 of 700, so the note may be refused.

## New rows

NEW-I-1, for section 7 ("Numerals, floats and comparisons"):

| NEW-I-1 | the team demos `BiCGSTAB` and `BiCGSTAB2` stop under walk after their solve, at `ss = t / 1000000000.0` with `t` a `ZZ64` from `nanoTime()`: 'Failed to find any matching overload, args = (63894328343: ZZ64,1.0E9)' (`ProjectFortress/demos/BiCGSTAB.fss:177`, `BiCGSTAB2.fss:163`) | NEGATIVE-VERIFIED | library bug (tests) | `basic-lib/numbers.tex`, "Rational Numbers" | none | climb batch 20 rung I | siblings: 75, 670. A `ZZ64` converts into `RR64` only by `asFloat` (P-74), and `nanoTime()` answers a `ZZ64` under walk (row 75). Both demos print their 29 residuals first, the same lines on the base 97ccd5f1f and after the integer power's contract E; the repair is `asFloat(t) / 1000000000.0`, a team line. `bin/fortress ProjectFortress/demos/BiCGSTAB.fss`: 'BiCGSTAB.fss:177:8: Failed to find any matching overload, args = (63894328343: ZZ64,1.0E9)'. |

NEW-I-2, for section 6 ("Integer arithmetic"):

| NEW-I-2 | the integer chapter's listing writes `throws IntegerDivisionByZero` on ÷, `REM`, `MOD`, `DIVREM` and `DIVMOD`, an exception neither library declares; the operators chapter, the completion chapter and both libraries name `DivisionByZero` | CONTESTED | library gap vs spec (specification) | `basic-lib/basic-integers.tex`, "Integers" | none | climb batch 20 rung I | The listing: `Specification/basic-lib/basic-integers.tex:246-250`. 'For integer results, division by zero throws a DivisionByZero' (`Specification/basic/operators/opr-overview.tex:165`); `Specification/basic/evaluation/completion.tex:31`. `Library/FortressLibrary.fsi:1113` and `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:747` declare `DivisionByZero` only, and the method entry of the integer power names it (P-153). Which name the listing takes is not settled. |

Both lines pass `ledger.py check --rows` except for their `?` number cells (859 and 844 characters).

## Handover

Rung I built contract E (P-153). Every integer power answers its base's own type. At a negative exponent walk's six power natives raise `IntegerOverflow`, or `DivisionByZero` at a base of 0, and they read an exponent of any integer type. `QQ`'s power takes the library's `typecase`, `strToInt` writes `fail[\ZZ32\]`, and the ring's and `RR64`'s api powers match their components. The team tests `realArith`, `compoundArray` and `simpleExp` and the demos `BiCGSTAB`, `BiCGSTAB2` and `npbft` now write a float base. Rows 438 and 445 close. On the rung's tree the distance is 25 and the count 22.

## Revival change

### The change

1. **An integer power's type, and its value at a negative exponent.**
   - The team's sources:
     - The library declared every integer `^` as answering `RR64`: `opr ^(self, b:AnyIntegral):RR64` on `Integral` and each integer type (`Library/FortressLibrary.fss:721`, `:799-801`, `:892-894`, `:975-977`, `:1074-1076`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:460-462`, `:552-554`, at `97ccd5f1f`).
     - Walk's natives answered the integer at a nonnegative exponent and `1.0 / pow(base, -exp)` at a negative one (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:220-230` and its five kin, at `97ccd5f1f`): `2^(-1)` was `0.5` and `0^(-1)` was `Infinity`.
     - The Working Draft gave `2^(-1)` as `1/2` through the rational power (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`).
     - The compiler's prelude types the `ZZ32` power `ZZ32` at a `ZZ32` exponent (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`), and answers 0 at a negative one (row 523).
   - What the tree now does:
     - Each integer `^` answers its base's own type.
     - At a negative exponent the bases 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`.
     - A fraction is written with a float or rational base, `2.0^(-1)`.
     - The integer chapter's method entry says so (`Specification/basic-lib/basic-integers.tex:534-539`).
     - Test: `ProjectFortress/tests/IntegerPowerContractWalk.fss`.
   - The reason:
     - The compiled checker refuses the library as written: 'Function body has type RR64, but declared return type is QQ.' in the rational power (`Library/FortressLibrary.fss:642` at `97ccd5f1f`), and 'ZZ32->ZZ32 is not applicable to an argument of type RR64' in `strToFloat` (`:4556`). On the flat tower an `RR64` holds no integer value.
     - The team's later code types an integer power by its integer at a signed exponent (`CompilerBuiltin.fsi:267`).
     - No type carries the sign of a numeral, so no overload can tell `10^16` from `10^(-16)`: the checker types every integer numeral `IntLiteral` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:468-469`).
2. **The rational power over any integer.**
   - The team's library: `if -other > 0 then (denominator(self)/numerator(self))^(-other) else (numerator(self))^other / (denominator(self))^other end` (`Library/FortressLibrary.fss:641-646` at `97ccd5f1f`), under the comment "Way too clever by half". The api declared its exponent `ZZ64` (`Library/FortressLibrary.fsi:430`).
   - What the tree now does: a `typecase` over the five integer types negates only inside a signed type (`fss:641-648`), and the api takes `AnyIntegral` (`fsi:431`). Tests: `ProjectFortress/tests/QQPowerExponent.fss`, `RationalTest.fss`.
   - The reason: the checker's 'Could not check call to operator -', since `AnyIntegral` declares no `-` (`fss:642`, `:643` at `97ccd5f1f`). Under walk an unsigned exponent's negation wraps, so it recursed (row 445).
3. **`strToInt`'s `fail`.**
   - The team's library: `fail("strToInt(" … ")")` in the `else` of a generator clause inside `SUM[\ZZ32\]` (`Library/FortressLibrary.fss:4543` at `97ccd5f1f`).
   - What the tree now does: `fail[\ZZ32\](…)` (`fss:4545`). Test: the distance stage, where the site is gone.
   - The reason: the checker's 'ZZ32->ZZ32 is not applicable to an argument of type Any' (`fss:4540` at `97ccd5f1f`), its result-only `T` taking the bound `Any` there.
4. **The ring's power in the api.**
   - The team's api: `opr ^(self, other:ZZ64): T` (`Library/FortressLibrary.fsi:283` at `97ccd5f1f`), where the component has `opr ^(self, other:AnyIntegral): T` (`fss:377`). `RR64`'s api had no power over any integer, while its component has one (`fss:486-487`, under the team's comment "Shouldn't need this extra declaration.").
   - What the tree now does: `abstract opr ^(self, other:AnyIntegral): T` (`fsi:283`) and `RR64`'s `opr ^(self, b:AnyIntegral):RR64` (`fsi:366`). Test: the distance stage, where the export error's `MultiplicativeRing` entry is gone.
   - The reason: the checker's export error, '(TraitDecl MultiplicativeRing …, due to different method ^ …)'.
5. **Walk's reading of an exponent.**
   - The team's natives: every power read its exponent with `getLong` (`Int.java:223`, `BigNum.java:114` at `97ccd5f1f`), which a `ZZ` refuses, 'Value 3 might not fit in ZZ64.'. An `NN64` of 2^63 or more read as negative (`0^(2^63)` was `1.0`), and the ZZ power cast its exponent to an int (`(big(3))^(2^32)` was `1`).
   - What the tree now does: an exponent of any integer type is read by its sign and parity (`Int.java:268-282`), and the ZZ and numeral powers apply the base's rules past the int's range (`BigNum.java:304-324`). Tests: `IntegerPowerContractWalk.fss` (`exponentTypes`), `QQPowerExponent.fss`.
   - The reason: the measured failures above; `AnyIntegral`, the declared exponent type, comprises `ZZ` (`Library/FortressLibrary.fsi:442`).
6. **The team's tests and demos with a negative power.**
   - The team's lines: `10^(-k)` as a decimal scale (`ProjectFortress/tests/realArith.fss:54`, `:57`; `compoundArray.fss:17-18`, `:27`, `:32`, `:33-34`; `simpleExp.fss:18-20`; `ProjectFortress/demos/BiCGSTAB.fss:211`, `BiCGSTAB2.fss:198`, `npbft.fss:130`, at `97ccd5f1f`).
   - What the tree now does: each base numeral takes a `.0`, as `10.0^(-k)`, with the same values. The tests pass; the demos stop where they stopped before.
   - The reason: under the change each of these lines raises `IntegerOverflow`, as the unrespelled `BiCGSTAB` does at `:211`.

### Provenance

- P-153 (contract E, PLAN item 58), whose default is the Fable judgement's section 6 (`explorations/reviews/integer-power-fable-judgement.md`); P-26, P-73, P-76, P-80; F-241, F-247, F-262.
- The integer-power probe (`explorations/perf-probes/integer-power/REPORT.md`, sections 3.1 and 4), and the planner's `explorations/compile-ladder/plan-20/probes/power.patch`.
- Climb batch 20's forks 3 and 7 to 17: the ring's api text (c), `QQ`'s api exponent, `QQ`'s `typecase`, `IntLiteral`'s power, the exponent's reading, row 747's reproducer, row 441's note, the `WellKnownNames` constant, the float bases, the specification's text, and no speed pass.
- Rows 438 and 445 (closed); 441, 747 and 523 (noted); NEW-I-1 and NEW-I-2 (new).
- Climb batch 20, rung I.
