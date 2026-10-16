<!-- Probe P1 of the open asks of 2026-10-16: every integer power in the one library, its tests, the team's demos and microGPT, and what each contract for a negative exponent clears of the distance's six power sites, moves and costs, measured with shadow patches in a worktree at main 72a4ff655 (code as at 528438ac5), with the peers' and the commits' word. -->

# Probe P1: the integer power

Worktree `/home/user/fortress-probe-power`, branch `wip/probe-integer-power`, seeded from `/home/user/fortress-base16` (528438ac5; `main` at 72a4ff655 changes no code). Every run was niced, one JVM at a time. The worktree is left clean. The shadow patches are given inline below.

## In short

- **The six sites have three causes, not two.** On the shared library text of the error and zero contracts, the distance falls from 49 to 44. Five sites clear: `QQ`'s four and `strToFloat`'s. `strToInt`'s site keeps its exact text: "ZZ32->ZZ32 is not applicable to an argument of type Any". Its body is the `if d <- digit(…) then d radix^(n-i) else fail(…) end` of a `SUM[\ZZ32\]`, and `fail[\T\]`'s result-only `T` there takes its bound `Any`. Writing `fail[\ZZ32\]` on top of the patch takes the distance to 43, and nothing else moves. So that site needs both the power's own type and the typed `fail`.
- **Uses.**
  - Walk's suite reaches 79 distinct integer-base power sites, with 3,324 calls. All 11 sites that see a negative exponent are in three tests present since the record's first commit: `realArith`, `compoundArray` and `simpleExp`. Each writes a decimal scale as `10^(-k)`.
  - Every other value already is the integer: the natives answer it, and only the declared type says `RR64` (row 438).
  - microGPT has no integer-base power of its own. It reaches one through `strToInt` while it parses the exponents of its data (`explorations/run-c4/src/FlatData.fss:34`, `explorations/apl/mg/FlatData2.fss:37`), always at a nonnegative exponent.
- **Per contract** (the 49 are the last landed gate, `explorations/compile-ladder/climb-batch-15b/gate/distance.txt`):

| contract | sites cleared of the six | distance | walk's 26 power tests | microGPT quick pair | library text |
|---|---|---|---|---|---|
| E, an error (`IntegerOverflow`; `DivisionByZero` at 0; ±1 exact) | 5, and 6 with `fail[\ZZ32\]` | 44 (43) | 23 pass; 3 team tests fail | all pass, every value line equal to the base | 15 edits, +29/−27 lines, and 11 lines of walk natives |
| Z, zero (truncated toward 0; `DivisionByZero` at 0; ±1 exact) | as E | as E (same text) | 24 pass; 2 team tests fail, and `compoundArray`'s output moves in 6 lines | as E | as E |
| R, a rational, typed by the exponent (the Working Draft's split) | 4 (`QQ`'s); `strToFloat`'s stays, now typed `QQ`; 2 new | 46 | 10 pass; 16 fail | both stop in `strToInt` | 21 edits, +91/−29 |
| X, an exponent typed so that it cannot be negative (`NN32`, `NN64`, a numeral) | 5, with the two library callers converted | 43 (with the run-to-run `LEXICO` site gone) | 10 pass; 16 fail by "Ambiguous coercion" | all pass, every value line equal to the base | 23 edits, +57/−31 |

- **The designers' later word holds a negative case.** Guy Steele's `simpleIntArith.intToIntPower` (snapshot `2eb54ef20`, 2011-11-17), bound nowhere, answers 0 for a negative exponent. Called directly, it gives 0 at a base of 2 and at a base of 0, 1 at a base of 1, and raises at every negative base, (−1)^(−1) included. So it is the zero contract with two slips (section 7).
- **Peers.**
  - Julia raises `DomainError`, except at bases ±1. For a numeral exponent it gives a float.
  - Rust types the exponent `u32`.
  - Swift has no integer power.
  - X10 has no power operator. Its `Math.pow(Int, Int)` answers a `Double`.
  - The revival's own precedent: walk refuses a negative exponent in a size (F-222).
- **History.**
  - Jan-Willem Maessen typed the interpreter's integer powers `RR64` on 2008-06-03 (c07ae816b, bfe7a5ced). They had been `Number`. At the time every integer was an `RR64` (`trait Integral extends { StandardTotalOrder[\Integral\], RR64 }`).
  - Guy Steele widened the exponent to `AnyIntegral` and wrote `QQ`'s power on 2008-07-21 (dc41d5000).
  - The revival's flat tower (d846e3644, 2026-09-27) made `RR64` a sibling of the integers, and from then on the declared type no longer holds the integer value.

## 1. Every integer `^` and its uses

**The census.** This covers the one library, the tests, the team's demos and microGPT's programs. The static types below come from reading. The run-time classes and the exponents' signs come from a census run: walk's `SystemJUTest` over all of `ProjectFortress/tests` (621 tests, one JVM, the base library), with a scratch copy of `Evaluator.java` ahead of the build on the class path. The copy logs every `^` application, in `forOpExpr` and in `mathItemApplication`, with its site, the run-time classes of both operands and their values.

The run's two failures are `ReflectTest` and `ReflectiveQuickCheckTest`, both on a `Set` `CUP` dispatch (`Library/Set.fss:124`). They pass when run alone without the instrument, and they hold no power.

### 1.1 The declarations

| where (component; api) | declaration today |
|---|---|
| `MultiplicativeRing[\T\]`, `Library/FortressLibrary.fss:377`; `.fsi:283` | `opr ^(self, other:AnyIntegral): T` in the component, `other:ZZ64` in the api (row 445) |
| `Integral[\I\]`, `.fss:721`; `.fsi:472` | `opr ^(self, b:AnyIntegral):RR64` (abstract) |
| `ZZ32` `.fss:799`, `:801`; `ZZ64` `:892`, `:894`; `NN64` `:975`, `:977`; `ZZ` `:1074`, `:1076`; `NN32` `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:460`, `:462`; `IntLiteral` `FortressBuiltin.fss:552`, `:554` (apis `.fsi:524-525`, `:578`, `:636`, `:674`; `FortressBuiltin.fsi:167-168`, `:213-214`) | `opr ^(self, b:AnyIntegral):RR64 = builtinPrimitive(…$Pow)` and `opr ^(self, b:IntLiteral):RR64 = self^(b.asZZ32)` |
| `QQ`, `.fss:641-646`; `.fsi:430` | `opr ^(self, other:AnyIntegral):QQ`, the four sites (`other:ZZ64` in the api) |

The natives answer the base's own class for a nonnegative exponent, and `FFloat.make(1.0 / pow(base, -exp))` for a negative one (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:220-230`, `Long.java:232-242`, `NN32.java:227-237`, `UnsignedLong.java:227-237`, `BigNum.java:298-306`, `IntLiteral.java:248-256`).

A probe program under walk on the base gives:
- `2^3` = `8 : ZZ32`;
- `2^(-1)` = `0.5 : RR64`;
- `0^(-1)` = `Infinity`;
- `(-1)^(-1)` = `-1.0`;
- `2^(-1)` at `ZZ64`, `NN32`, `NN64` and `ZZ` = `0.5`.

Walk evaluates a numeral as a `ZZ32` value. In the census, a numeral base or exponent shows as `FInt`, and `IntLiteral$Pow` is reached once in the suite (`IntLiteralValue.fss:38`).

### 1.2 The one library's expression sites

| site | base : exponent (static) | the result is used as | exponent negative? |
|---|---|---|---|
| `FortressLibrary.fss:645` (`QQ`'s body), twice | `ZZ` : `AnyIntegral` | an operand of `/`: `RR64 / RR64` today, the site "body has type RR64" | no: the `if -other > 0` guard, but for an unsigned exponent whose negation wraps (row 445) |
| `:4545` `strToInt`, `d radix^(n-i)` | `ZZ32` : `ZZ32` | `ZZ32`, a term of `SUM[\ZZ32\]` | no: `i <- i0:n` |
| `:4560` `strToFloat`, `10^k (…)` and `/(10^(\|frac\|))` | `IntLiteral` : `ZZ32` | `ZZ32` in `SUM[\ZZ32\]`, then a `ZZ32 / …` quotient | no |
| `Library/Format.fss:95` `number 10^(-power)`, `:97` `number / 10^(power)` | `IntLiteral` : `ZZ64` (`power`, a floor; the census reads `FLong`) | an `RR64` operand, through `IntLiteral`'s conversion | no: each branch's guard keeps it nonnegative; `:95` is reached by no test |
| `Library/Timing.fss:21`, `:23`, `:25` `w10^2`, `w10^5`, `w10^8` | `ZZ64` : numeral | compared with the `ZZ64` `duration` | no |

`Format` and `Timing` are not among the distance stage's twelve components (`explorations/coordinator/tools/distance/run.sh:84-86`).

### 1.3 Walk's tests (`ProjectFortress/tests`), as the census found them

- **Nonnegative exponent, used as an integer:**
  - `ComprehensionTypedBindingWalk:8` and `InferUnfixedFBoundedWalk:24`: `{ n^2 | n <- -2:2 }`, into a `Set[\ZZ32\]`.
  - `setSum:19-31`: `n^2` in `SUM[\ZZ32\]` and `BIG |||`.
  - `simpleSum:53`: `x^2 + 2 x + 3`, under `BIG MIN`.
  - `RandomTest:46-88`: `0#n^2`, `2^n:3^n` as ranges, and `5^n`.
  - `zeno:57`, `:73`: `d = 2^n'`, compared with a `ZZ32`; `chunkedSparseArray(2^rounds, …)`.
  - `PowChooseLcmRungE:58-107`: the overflow tests, at all four fixed widths.
  - `UnsignedTest:107-108`, `:213-214`: `NN32` and `NN64` bases, with numeral and unsigned exponents.
  - `expTest:23`: `ZZ64 ^ ZZ64`.
  - `IntLiteralValue:38`: `x^x = 1`.
  - `transposition:15`: `x^2` on a `Number`.
  - Through `strToInt` and `strToFloat`: `FlatTowerRungF`, `NumeralTest`, `QuickCheckTest`.
  - Through `Timing`: `TimingTests`, `LongStringTests`, `quicksortTest`, `CovCollTest`.
  - Through `Format`: `formatTest`.
- **Nonnegative exponent, used as an `RR64`:**
  - `roundBug:19`: `SQRT(a^2 + b^2)`, with `a`, `b : ZZ32`.
  - `CovCollTest:52`: `narrow(2^i)`. Walk reaches `RR64`'s `narrow` by converting the `ZZ32` value, so `gensize` is an `RR32`.
  - `HeapTest:89`: `(fin-start) / 10^6`, declared `RR64`; walk answers a `QQ`.
  - `compoundArray:25`, `:30`: `3 10^2`, `3.14 10^2`.
- **Negative exponent (11 sites), all used as an `RR64`:**
  - `compoundArray:17-18`, `:27`, `:32`, `:33-34`: `7.07106781186547462 10^(-1)`, `3 10^(-2)`, `3.14 10^(-2)`.
  - `realArith:54`, `:57`: `1.2246467991473532 TIMES 10^(-16)`.
  - `simpleExp:18-20`: `x : RR64 = 10000000000000000000000000^(-1)` (a `ZZ` base), `y : RR64 = 1000000000000000^(-1)` (`ZZ64`), `a : RR64 = 7.07106781186547462 10^(-1)`.
  - All three files date from the record's first commit (72ae6881b, 2007-01-04), and the revival has not changed them (`git diff a874948ac --` prints nothing).
- **The `QQ` base**, through `QQ`'s own power, which reaches the integer power at `:645`: `RationalTest:699-712`, the negative exponents among them; `XXXQQPowerExponent:8` (row 445).

### 1.4 The compiled tests, which move onto this library at the switch-over

- `compiler_tests/Compiled1.al.fss:15`: `f(a)^b`, `ZZ32 ^ ZZ32` into a `ZZ32`.
- `Compiled5.bb.fss:17`: `(n[i])^2`, added into a `ZZ64`.
- `XXXPowZZ32CompiledRungE.fss:5`: `a^b` at nonnegative `b`.
- `XXXPowNN32CompiledRungE.fss:9` and `XXXPowNN64CompiledRungE.fss:9`: unsigned bases and exponents.
- `library_tests/ShiftTest2.fss:19`: `p = 2^(k-1)`, then `p BITOR (p-1)`. This is an integer use, by Guy Steele (e6f04f2b1, 2012-05-23).
- `Compiled1.j`, `.k`, `Compiled5.u`, `.v`, `.w`, `.aw`, and `parser_tests/XXXTwoThreeTwo*` and `XXXcaretOperator` are syntax tests of `^`.
- All other compiled uses have a float base.

### 1.5 The team's demos (`ProjectFortress/demos`), by reading

- **Negative exponent, used as an `RR64`:** `BiCGSTAB.fss:211` and `BiCGSTAB2.fss:198`: `er0 = 1.0 10^(-4)`.
- **Integer uses:**
  - `BirdCount1m.fss:28`, `1n:27`, `1o:27`, `1p:28`: `strToFloat`'s shape, `10^k`, at nonnegative exponents.
  - `LogFib.fss:30`: `fib_h1^2 + fib_h^2` on `ZZ`.
  - `aStar.fss:292`: `Sudoku(9^3, …)`. `aStar.fss:348-350`: `i >= 10^9`, with `i : ZZ64`.
  - `newtictactoe.fss:81`, `:84`, `:119`: `1#N^2`, `position <= N^2`, `0#N^2`.
  - `npbft.fss:14`: `a:ZZ64 = 5^13`.
  - `HeapShakedown.fss:108`: as `HeapTest`.
- All other demo uses of `^` have a float base (for example `gmp^j` in `BirdCount*`, where `gmp` is a geometric mean of `RR64`s, `BirdCount2d.fss:93`) or a `String` base.

### 1.6 The specification's examples and microGPT

- `SpecData/examples/basic/Expr.ListComp.fss:22`, `Expr.MapComp.fss:22` and `Expr.SetComp.fss:21` hold `x^2` and `x^3` over `{0, …, 5}`: nonnegative numeral exponents.
- microGPT's own powers all have a float base: `10.0^(-5)`, `beta1^t` with `beta1 : RR64`, and `b^e` with `b : RR64` (`explorations/apl/mg/AplMg.fss:37`). Its only integer power is `strToInt`'s, reached as section 1 says.

## 2. The designers' word

- **The earlier word, the Working Draft.** The integers chapter declares `opr ^(self, power: NN): ZZ`: "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`git show 5a68404fd:Specification/basic-lib/basic-integers.tex`, lines 506-510). The rationals declare `opr ^(self, power: ZZ): QQ#`: "Exponentiation of a rational number to an integer power produces a rational result", with the property `x^y = 1/(x^(-y))` (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`).
  - With ℤ a subtype of ℚ, an exponent typed ℤ picks ℚ's power, so 2^(−1) is 1/2.
  - A digits-only numeral had a natural type, `NaturalNumeral[\n,10,v\]` (`Specification-1.0-frozen/basic/expressions/literals.tex:83-85`), so `x^2` picked ℤ's power.
  - The revival's chapter keeps the integer result, makes the exponent ℤ, and leaves the negative case open (`Specification/basic-lib/basic-integers.tex:315-320`, `:524-529`; `Specification/appendices/changes.tex:3758`).
- **The later word, the team's code.**
  - The interpreter's library typed every integer power `RR64` (section 6) while every integer was an `RR64`. Its natives answer the integer for a nonnegative exponent and a float for a negative one.
  - The compiled library types `ZZ32 ^ ZZ32 : ZZ32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`; Christine Flood, 489d3c1bb, 2011-09-19, through `intExp`'s cast of `Math.pow`). `NN32` and `NN64` answer their own types (`:326`, `:385`).
  - Steele's unbound `intToIntPower` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:380-398`) is the team's only code for an integer result at a negative exponent. It answers 0.
- **They conflict.** The earlier word gives a rational, and the later gives an integer type for every exponent. So the peers follow, in section 5.

## 3. The contracts, as shadow patches, measured

The four contracts:

- **E** raises an exception for a negative exponent when the result is not an integer. The exception is `DivisionByZero` at a base of 0 and `IntegerOverflow` otherwise. Bases ±1 give their exact power.
- **Z** gives the quotient truncated toward zero. That is 0 at |base| ≥ 2 and ±1 at the bases ±1, with `DivisionByZero` at 0.
- **R** gives a rational. Its typing follows the Working Draft: an unsigned or numeral exponent gives the base's own type, and a signed exponent gives `QQ`.
- **X** gives the exponent only unsigned and numeral types.

### 3.1 E and Z: one library text, two sets of natives

Each integer type's `^` answers its own type, on `Integral` too (`I`), in the component and in the api. The two numeral overloads change in the same way. `QQ`'s body becomes section 4's device. That is 15 edits in 4 files, 29 lines in and 27 out. Shown for `ZZ32`; the others differ only in the type and the native:

```
    opr ^(self, b:AnyIntegral):ZZ32 =
        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Int$Pow")
    opr ^(self, b:IntLiteral):ZZ32 = self^(b.asZZ32)
```

The walk natives (scratch copies ahead of the build) change one line in each `Pow` class's negative branch, and E and Z differ only in that branch's last clause. Shown for `Int$Pow`:

```
if (base == 1) return FInt.make(1); if (base == -1) return ((-exp) % 2 == 0) ? FInt.make(1) : FInt.make(-1);
if (base == 0) throw Int.divisionByZero(); throw Int.overflow();        // E
if (base == 0) throw Int.divisionByZero(); return FInt.make(0);         // Z
```

`Int.divisionByZero()` is new: 4 lines in the shape of `Int.overflow()` (`Int.java:258-261`), on the library object `DivisionByZero`.

A probe program under E gives:
- `2^(-1)`, `(-2)^(-1)`, and `2^(-1)` at `ZZ64`, `NN32`, `NN64` and `ZZ`: raise `IntegerOverflow`;
- `0^(-1)`: raises `DivisionByZero`;
- `1^(-1)` = `1 : ZZ32`;
- `(-1)^(-1)` = `-1 : ZZ32`;
- `(2/3)^(-1)` = `3/2`.

Under Z, the same calls answer `0` where E raises `IntegerOverflow`.

**Distance.** 49 → 44 on this text (947 s, `FortressLibrary` 483 s, load at start 2.32). Gone are `FortressLibrary.fss:642` three times, `:643` and `:4560`. The rest, mapped back by line through the patch, are the landed 44 site for site. The crash row stays `none`, as in the 15b gate. Adding `fail[\ZZ32\]` in `strToInt` (the base's `:4547`) gives 43 (982 s, load 2.05). It clears `:4544`, and nothing else moves.

**Walk.** The 26 tests that reach an integer power (section 1.3, with their library-path callers) pass 26 of 26 on the base library.

- Under E, 23 pass. `realArith`, `compoundArray` and `simpleExp` raise `IntegerOverflow` at their first `10^(-k)`.
- Under Z, 24 pass:
  - `realArith` fails `assert(sin pi, 1.2246467991473532 TIMES 10^(-16))` (`1.2246467991473532E-16 =/= 0.0`);
  - `simpleExp` stops at `:18`: "RHS expression type BigNum is not assignable to LHS type RR64". Z's 0 is a `ZZ`, and `ZZ` does not convert into `RR64`;
  - `compoundArray` passes, with 6 printed lines moved: `0.7071067811865475` → `0.0` in four array cells, `0.03` → `0`, `0.031400000000000004` → `0.0`, and `0.1` → `0.0` twice.
- No value at a nonnegative exponent moves under either contract: the natives are unchanged there.

**microGPT.** The quick pair passes under E and under Z (`VERDICT: 7 PASS, 0 FAIL of 7`, both programs). Every value line of each equals the base run's, once the millisecond timings and parser notes are removed.

**Demos, by reading.** `BiCGSTAB`'s `er0 = 1.0 10^(-4)` raises under E and is `0.0` under Z.

**Cost.**
- **Measured:** the library text above, the 6 native lines and the helper.
- **Reading:**
  - The compiled path's checked helper for a nonnegative exponent is already planned (PLAN, phase 4, the natives; rows 523-525). Its negative branch is one line: Steele's `intToIntPower` with its two slips corrected for Z (section 7), and with a raise for E.
  - The specification gains one sentence in the entry at `basic-integers.tex:524-529`, and loses the "not yet given" of `changes.tex:3758` and of the callout at `:315-320`.
  - The three team tests above need their `10^(-k)` written `10.0^(-k)`. That is a changed line of a test the team wrote.

### 3.2 R: a rational, typed by the exponent

A ring has no negative powers, so `MultiplicativeRing[\T\]`'s power takes `NN64` (component and api). Each integer type `T` declares:

```
    opr ^(self, b:NN64):T = builtinPrimitive("…$Pow")
    opr ^(self, b:NN32):T = builtinPrimitive("…$Pow")
    opr ^(self, b:IntLiteral):T = self^(b.asNN64)
    opr ^(self, b:ZZ32):QQ = do q: QQ = self; q^b end
    opr ^(self, b:ZZ64):QQ = do q: QQ = self; q^b end
    opr ^(self, b:ZZ):QQ = do q: QQ = self; q^b end
```

`QQ`'s body raises its integers only to unsigned exponents (section 4). Walk refuses at load until each other ring object declares a natural power:

- "Object Float does not define an abstract method declared in type MultiplicativeRing: … ^(NN64):RR64". Walk takes a body only at or below the abstract parameter type, and `Float`'s `^(AnyIntegral)` is above it.
- So `Float`, `FloatLiteral`, `RR32` and `QQ` each get `opr ^(self, b:NN64)`.
- Without the `NN32` overload, `ZZ ^ NN32` is an "Ambiguous coercion" under walk, which coerces the base as well.

That is 21 edits in 4 files, 91 lines in and 29 out. The natives are unchanged, since no signed exponent reaches one.

**Distance.** 49 → 46 (1,016 s, load 4.89).
- Gone are `QQ`'s four sites, and `LEXICO`'s `FortressLibrary.fss:130`. The latter is among the variation that `compare.sh` names (its header), and I do not count it.
- `strToFloat`'s site stays, now "… not applicable to an argument of type QQ".
- `strToInt`'s site stays.
- Two are new: the `ZZ`-exponent overloads of `NN32` and `IntLiteral`, in `FortressBuiltin.fss`, "not applicable to an argument of type (QQ, ZZ)". They exist because that component sees the api's `QQ` power at `other:ZZ64` (`Library/FortressLibrary.fsi:430`, row 445). By reading, they would go with row 445's api fix.

**Walk.** 10 of 26 pass. Under walk a numeral exponent is a `ZZ32` value, so every integer power at a numeral or signed exponent becomes a `QQ`, and the 16 failures follow:

- `RR64 × QQ` and `RR64 / QQ` have no overload: `compoundArray`, `realArith`, `formatTest` (`Format.fss:97`);
- `SQRT` of a `QQ`: `roundBug`;
- `narrow` of a `QQ`: `CovCollTest`;
- a `QQ` term in `SUM[\ZZ32\]` or in a `ZZ32` set: `setSum`, `ComprehensionTypedBindingWalk`, `InferUnfixedFBoundedWalk`; and through `strToInt` and `strToFloat`: `NumeralTest`, `FlatTowerRungF`, `QuickCheckTest`;
- a `QQ` range bound: `RandomTest`;
- a `QQ` size: `zeno`, in `ChunkedSparseArray`;
- `QQ` is not assignable to `RR64`: `simpleExp`;
- `2^31` no longer overflows: `PowChooseLcmRungE`;
- the expected failure `XXXQQPowerExponent` now passes, because the unsigned body fixes row 445 under walk.

A probe program gives `2^3` = `8 : QQ`, `2^(-1)` = `1/2`, `0^(-1)` = `1/0` and `(-2)^(-1)` = `-1/2`.

**microGPT.** Both quick programs stop in `strToInt` (`rc=1`): "Unification error: Closure/Constructor for body param 1 (i:ZZ32) got arg Ratio", from `FlatData.fss:34`.

**Cost, by reading.**
- Walk's half of P-76 (Q-walk, a numeral keeping `IntLiteral` at run time) must come first, or no `x^2` stays an integer under walk. The checker would choose the numeral overload; walk does not.
- `strToInt` and `strToFloat` need their exponents made unsigned (X's two edits) to clear their sites.
- The specification's integer entry returns to the Working Draft's natural exponent, and the rationals' entry takes the signed one. The algebra's power on rings becomes a natural power.
- The compiled helpers cannot build a `Ratio`, a library object, so the signed overloads stay in Fortress text.

### 3.3 X: an exponent that cannot be negative

X is R's text without the three signed overloads, plus the two library callers converted: `d radix^(unsigned(n-i))` and `10^(unsigned(k)) …/(10^(unsigned(|frac|)))`. That is 23 edits in 4 files, 57 lines in and 31 out.

**Distance.** 49 → 43 (1,011 s, load 5.02).
- Gone are `QQ`'s four sites and `strToFloat`'s.
- `strToInt`'s site stays: the typed `fail` is still missing.
- `LEXICO`'s `:130` goes as under R. It is not counted.

**Walk.** 10 of 26 pass. 14 tests fail on "Ambiguous coercion" at their first `ZZ32`-valued exponent, numerals included (for example `PowChooseLcmRungE.fss:58`, args `(2: ZZ32, 31: ZZ32)`, applicable after coercing the base to `RR64` or to `QQ`). `formatTest` fails on a `ZZ64` exponent at `Format.fss:97`. `simpleExp` fails when its `ZZ` base is coerced to `QQ`: "Ratio is not assignable to LHS type RR64". `XXXQQPowerExponent` passes, as under R.

**microGPT.** The quick pair passes, and every value line equals the base run's: `strToInt` is converted, and microGPT's own powers have a float base.

**Cost, by reading.**
- As R: Q-walk first, the ring's natural power, and natural-power bodies for `Float`, `FloatLiteral`, `RR32` and `QQ`.
- Every caller with a signed exponent is converted. In the one library: the 2 above, and `Format.fss:95`, `:97`.
- The compiled bindings of `ZZ32 ^ ZZ32` go, and so do the compiled tests that call it (`Compiled1.al`, `XXXPowZZ32CompiledRungE`, `ShiftTest2`).
- The specification's exponent returns to ℕ, as `NN64` in the flat tower.

## 4. `QQ`'s body: the library's own way

`AnyIntegral` comprises `{ZZ, ZZ64, ZZ32, NN64, NN32}` and declares no `-` and no `<` (`Library/FortressLibrary.fsi:441-443`). The library handles "any integer" in Fortress text with a `typecase` over the comprised types: `exactValue` (`Library/FortressLibrary.fss:398-408`) and `Number`'s `=` (`:386-395`). In that shape, the body splits by the sign inside each type, and negates only within a signed type, so no unsigned value is ever negated:

```
    opr ^(self, other:AnyIntegral):QQ =
        typecase other of
            e: NN32 => (numerator(self))^e / (denominator(self))^e
            e: NN64 => (numerator(self))^e / (denominator(self))^e
            e: ZZ32 => if e < 0 then (denominator(self)/numerator(self))^(-(widen(e))) else (numerator(self))^e / (denominator(self))^e end
            e: ZZ64 => if e < 0 then (denominator(self)/numerator(self))^(-e) else (numerator(self))^e / (denominator(self))^e end
            e: ZZ => if e < 0 then (denominator(self)/numerator(self))^(-e) else (numerator(self))^e / (denominator(self))^e end
        end
```

- **Cost:** 8 lines for 6. The checker has no exhaustiveness check on a `typecase` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:676`, "TODO: A nonexhaustive typecase is an error"), and gives it the union of its arms, `QQ`.
- **Effect:**
  - Measured: it clears the two `-other` sites and the `if`'s test. With the integer power at its own type, it also clears "Function body has type RR64".
  - `RationalTest:699-712` passes on it under E and Z.
  - It also removes row 445's recursion for an unsigned exponent, but not the row: `XXXQQPowerExponent` still fails under E and Z, since walk's natives refuse a `ZZ` exponent (row 445, part 1).
- **The R and X form** writes the `ZZ32`, `ZZ64` and `ZZ` arms with `unsigned(…)` exponents, as section 3.2 needs. Under walk, that form also makes `XXXQQPowerExponent` pass.
- **Not measured, by reading:** declaring `-` and `<` on `AnyIntegral`. This adds abstract members to a comprised trait. `<` would need a heterogeneous comparison family across the five types.

## 5. The peers (P-66), from their documentation

- **Julia.** `^(x::T, p::T) where {T<:Integer} = power_by_squaring(x,p)`. For `p < 0`: "`isone(x) && return copy(x)`; `isone(-x) && return iseven(p) ? one(x) : copy(x)`", and otherwise `throw_domerr_powbysq`, "Cannot raise an integer x to a negative power -1" (`base/intfuncs.jl`, v1.11.7).
  - A numeral exponent is rewritten: "If `y` is a negative integer literal, then `Base.literal_pow` transforms the operation to `inv(x)^-y`", so `3^-1` is `0.3333333333333333`. With `p = -1`, `3^p` raises `DomainError`.
  - "If `x` and `y` are integers, the result may overflow" (`10^19 > 0` is `false`). Source: docs.julialang.org, Base, Mathematics, `^`.
  - This is close to E, with a float for a numeral exponent.
- **Rust.** `pub const fn pow(self, exp: u32) -> i32` and `pub const fn checked_pow(self, exp: u32) -> Option<i32>`, "returning `None` if overflow occurred" (doc.rust-lang.org, `primitive.i32`). The exponent's type excludes a negative value: X.
- **Swift.** The book's Advanced Operators chapter lists no exponentiation operator. Its `^` is "The bitwise XOR operator", and "arithmetic operators in Swift don't overflow by default. Overflow behavior is trapped and reported as an error" (`swiftlang/swift-book`, `TSPL.docc/LanguageGuide/AdvancedOperators.md`). So there is no integer power to compare.
- **X10.** The X10 2.1 specification (draft of 2011-02-23) lists no power operator; `^` is bitwise. `x10.lang.Math` (IBM, 2006-2016) declares `public static def pow(a:Int, b:Int) = pow(a as Double, b as Double);` and the same for `Long`, so every integer power is a `Double`. That is today's walk, and not one of the four contracts. It also declares `pow2(i:Int):Int`, commented "returns 2^(max(0,i))" (`x10.runtime/src-x10/x10/lang/Math.x10`, master; the comment was not run).
- **The revival's precedent.** F-222: walk refuses a negative exponent in a size with "a power in a size takes an exponent of 0 or above" (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:476`). The compiled path computes none (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1221`). That is a static refusal, the analogue of E for values.

## 6. Who typed the interpreter's integer power `RR64`, and when

The conversion cut parent links (`research/authorship.md`), so the commits are found by `git log --full-history -S` over `main`, and by the snapshot roots' contents.

- Up to 2008-05-08: the integer powers are top-level and answer `Number`, for example `opr ^(a:ZZ32, b:Integral):Number = builtinPrimitive("…ZZ32$Pow")` at `900bff59b^` (`Library/FortressLibrary.fss:2705`). It is already commented so in the 2007 snapshot (`72ae6881b:ProjectFortress/FortressLibrary.fss:913`).
- 2008-05-08, Jan-Willem Maessen, dc0f919ce, "Refactored libraries to move arithmetic operators from top level into the relevant traits and objects": `opr ^(self, b:Integral):Number` on each integer type.
- **2008-06-03, Jan-Willem Maessen.** c07ae816b changes `ZZ32`'s and `IntLiteral`'s in `FortressBuiltin.fss`, in a commit about `||`. bfe7a5ced, "the last commit happened from a subdirectory and omitted FortressLibrary", changes `ZZ64`'s and `Number`'s `(* was RR64 *)` in `FortressLibrary.fss`. Both change `opr ^(self, b:Integral):Number` to `:RR64`. At both commits, `trait RR64 extends Number comprises { Float, Integral, FloatLiteral }` and `trait Integral extends { StandardTotalOrder[\Integral\], RR64 }`, so the declared `RR64` held both the integer of a nonnegative power and the float of a negative one.
- 2008-07-02, Maessen, 82c85b03a: `Integral[\I\]`, the exponent `ZZ64`, and `Integral`'s `opr ^(self, b:ZZ64):RR64`. 2008-07-10, Christine Flood, 25acd32f7: `ZZ`'s, `opr ^(self, b:ZZ64):RR64`.
- 2008-07-21, Guy Steele, dc41d5000: the exponent becomes `AnyIntegral`; `NN32` and `NN64` are added with `:RR64`; `QQ` is added, with today's body (`FortressLibrary.fss:641-646`). The tower is then `QQ extends RR64` and `AnyIntegral extends { QQ }`. It is the same at the team's last commit (`a874948ac:Library/FortressLibrary.fss:422`, `:609`).
- 2026-09-27, the revival, d846e3644, "The one library's number types are siblings under Number". From here `RR64` excludes the integers, so the declared type no longer holds the value that the natives answer (row 438). 2026-10-02, 9d2e4c856, added the numeral overloads at `:RR64`.
- The compiled side:
  - `ZZ32 ^ ZZ32 : ZZ32`: Christine Flood, 489d3c1bb, 2011-09-19.
  - `NN32`'s: first in the snapshot 25f7cf913 (Jean-Baptiste Tristan, "Implementation of NN32", 2011-11-23).
  - `NN64`'s: first in the snapshot fb6bf98e4 (2012-01-05).
  - `intToIntPower`: first in the snapshot 2eb54ef20 (Guy Steele, 2011-11-17). The snapshot of 2011-11-14 (796b6d3da) lacks it.

## 7. Defects and findings, with the ledger rows they need

1. **New row (checker; the compiled path only, since walk has no static types).**
   - The site: `strToInt`'s `SUM[\ZZ32\][ i <- i0:n] if d <- digit(s[i], radix) then d radix^(n-i) else fail("…") end` (`Library/FortressLibrary.fss:4544-4548`) is refused with the body typed `Any`. `fail[\T\]`'s result-only `T` (`Library/FortressLibrary.fsi:37`) takes its bound in the `else` of an `if` with a generator clause, inside a reduction's body.
   - The evidence: on the E/Z text the site keeps its exact message; with `fail[\ZZ32\]` it clears (44 → 43), and nothing else moves.
   - Siblings: row 560 (fixed, four other contexts) and row 438. Reproducer: none yet (a compiled test in this shape, beside `InferResultOnlyIfWithoutElse`). The site needs both this repair and the power's own type.
2. **A note to row 523, or to row 441 (the compiled run time; unbound code).** Steele's `intToIntPower` (`simpleIntArith.java:380-398`), called directly:
   - `(2,-1)` → 0, `(0,-1)` → 0, `(1,-1)` → 1;
   - `(-1,-1)`, `(-1,-2)` and `(-2,-1)` raise. Its `Utility.makeFortressException("…DivisionByZero")` fails outside a compiled run as `FortressImplementationError`.
   - So it answers 0 where 1/0 has no value, and raises at every negative base. By reading, `a < 0` stands where `a == 0` would give the zero contract.
   - Binding it as it stands would decide row 441 as Z with these two slips.
3. **A note to row 445.** Measured under R: a `ZZ` exponent passed to `QQ`'s power from `FortressBuiltin` is refused, "not applicable to an argument of type (QQ, ZZ)". The api's `other:ZZ64` (`Library/FortressLibrary.fsi:430`) is what that component sees. Under walk, the unsigned-exponent body of sections 3.2 and 4 makes `XXXQQPowerExponent` pass.
4. **Not new, met on the way.**
   - Walk evaluates a numeral as a `ZZ32` value, so an `IntLiteral`-typed exponent overload is never chosen under walk. This is P-76's Q-walk, and it decides R's and X's walk costs.
   - Walk's abstract-method check takes no body above the abstract parameter type (`.claude/skills/fortress-repo/references/interpreter.md`, "What walk checks"), so a narrower ring power costs a body on each ring object.

## 8. Decisions

- **E's exceptions.** I chose `IntegerOverflow` for a result that no integer type holds, after the revival's sentence "a result that the type cannot hold throws an IntegerOverflow" (`basic-integers.tex:567-568`) and P-73. At a base of 0 I chose `DivisionByZero`, as `intToIntPower` raises it. Bases ±1 give their exact power, as in Julia.
  - The alternatives: refuse every negative exponent, as F-222 does for sizes; `CastError`, the Working Draft's check exception, which is checked; or a new exception.
  - No walk test catches a power's exception, so the choice moves no measured value.
- **Z's meaning.** Truncation toward zero: the compiled `intExp` today and `intToIntPower`'s intent. The alternative is floor division, which gives −1 at (−2)^(−1).
- **R's shape.** The result is typed by the exponent, as in the Working Draft, with a numeral exponent read as natural. The alternatives, by reading:
  - every integer power a `QQ`, which drops the premise;
  - a `QQ` value under an integer type, which is unsound and impossible to compile.
- **The ring's power, for R and X.** The only way the measurement found: `MultiplicativeRing`'s power takes `NN64`. With `AnyIntegral` there, R breaks the ring's return type, and X breaks walk's load check on the integer objects.
- **One distance run for E and Z.** The checker reads only the library text, which is identical for both, and the walk natives differ only (`fortress-repo` skill: reuse a result unless the code changes). Instead, the diagnostic `fail[\ZZ32\]` run was added.
- **The test set.** The 26 tests that the census showed reaching an integer power, or calling `strToInt`, `strToFloat`, `Format` or `Timing`. I did not run the whole suite.
- **microGPT.** Each quick program was run alone, not as `mg-run.sh` runs the pair at once, to keep one JVM at a time.

## 9. For FACTS

- **The power holds five of the distance's sites.** The integer power's declared `RR64` holds five of the 49: `QQ`'s four and `strToFloat`'s. `strToInt`'s site clears only with that repair and a typed `fail` together. It means the ask frees 5 sites, and 6 with the new row's repair. The command: `explorations/coordinator/tools/distance/run.sh` on section 3.1's text gives `#total 44`, and with `fail[\ZZ32\]` in `strToInt`, `#total 43`. Detail: sections 3.1 and 7.
- **No nonnegative power's walk value depends on the declared type.** The natives already answer the integer (row 438). Under E and Z, 23 and 24 of the 26 power tests pass, and every failure and every moved value is at a negative exponent. Detail: section 3.1.
- **The negative-exponent values are in three team tests.** Every walk value that a negative-exponent contract can move is in `realArith`, `compoundArray` and `simpleExp`, which write a decimal scale as `10^(-k)`. The demos `BiCGSTAB` and `BiCGSTAB2` do the same, by reading. Detail: section 1.3.
- **microGPT's only integer power is `strToInt`'s.** It is reached from `FlatData.fss:34` and `FlatData2.fss:37`, at nonnegative exponents. Under R, both quick programs stop there. Detail: sections 1.6 and 3.2.

## 10. Commands worked out

- **The power census.** A scratch copy of `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`, which appends one line per `^` application to the file that `FORTRESS_POW_CENSUS` names, compiled with `javac -cp "$(bin/fortress_classpath | tail -1)"` and put ahead of the build on the class path of a `SystemJUTest` run (harness-one.sh's `java` line, with `-Dtests` set to a folder).
- **Shadow natives.** Whole copies of the six glue files, compiled into a scratch folder and put ahead of the build on the class path, for both walk and the harness. No `ant` build.
- **microGPT's quick pair one program at a time.** `mg-run.sh`'s per-program commands, run in sequence, with the class path built as `bin/fortress` builds it.
- **Mapping a distance run's sites back.** Each site's line, mapped to the base's through the hunks of `git diff -U0`, then compared with `explorations/compile-ladder/gate/distance-sites.tsv` by kind, place and message (span ends and fresh-name numbers dropped).

## 11. For the curator: a decision not taken

What an integer raised to a negative power gives, with the integer result for a nonnegative exponent as its premise: E, Z, R or X as above, each with its sites, values and cost in section 3. Inside the ask, but not taken here:

- E's exceptions (section 8).
- Whether the new `strToInt` row's repair, a typed `fail` or the checker's expected type, goes with the answer.
- For R and X: the ring's natural power, and that Q-walk comes first.
