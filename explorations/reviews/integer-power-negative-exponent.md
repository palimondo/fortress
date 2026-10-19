<!-- The argument behind the ask on PLAN item 58, what an integer raised to a negative power gives: a primer, the team's earlier and later word, the library's own way, six peers, and the four contracts E, Z, R and X, each with its edits, its sites of today's distance, microGPT's quick check and the team tests and demos it touches, then the weighing and the recommendation. Written on `main` at `433079cac` from the integer-power probe of 2026-10-16 and the judgement of 2026-10-19; it measures nothing. -->

# An integer raised to a negative power

PLAN item 58. Recommendation and default: E, an error.

Each section's sources are at its bottom, numbered by the point they support. In them, REPORT is `explorations/perf-probes/integer-power/REPORT.md`, the probe; digest is `explorations/reviews/digest-2026-10-19.md`; fable-judgement.md is `explorations/coordinator/postmortem-2026-10-19-haiku/fable-judgement.md`; PLAN is `explorations/coordinator/PLAN.md`; an `F-` entry is FACTS', a `P-` entry POSITIONS', and a row the gap ledger's, `explorations/fortress-gap-ledger.md`.

## Words used here

- **site**: error that the compiled checker reports in the interpreter's library, at its file and line.
- **distance**: count of sites over the twelve components that the distance stage checks, with every check run. It must reach zero before the switch-over. It is 34 today.
- **checker count**: count of the same checker's errors in its ordinary run, which stops early. It is 30 today, all in the library's main component, `FortressLibrary`. Clearing an error can raise it, since the check then reaches code it stopped before.
- **quick check**: microGPT's walk check after a batch: two programs of about two training passes each, compared with reference values.
- **Q-walk**: walk's half of the numeral switch, where a numeral such as `3` keeps the type `IntLiteral` at run time. The plan puts it in the switch-over's batches.
- **Working Draft**: team's specification as it stood in February 2011, the unrevised copy in `Specification-1.0-frozen/`.

Sources:

1. `explorations/compile-ladder/gate/distance-sites.tsv`.
2. `explorations/compile-ladder/climb-batch-18/gate/distance.txt:2` (`#total 34`); `explorations/coordinator/tools/distance/run.sh:84-86` (the twelve components); `explorations/reviews/digest-2026-10-19.md` section 1.
3. `explorations/compile-ladder/climb-batch-18/gate/checker-count.txt:14` (`#total 30`); digest section 1 ("All 30 are the `FortressLibrary` component's own"; the count can rise, F-42).
4. P-30; `explorations/compile-ladder/climb-batch-18/gate/summary.txt:129`, `:131` (`VERDICT: 7 PASS, 0 FAIL of 7`, once for each program).
5. P-76; `explorations/coordinator/PLAN.md`, phase 4, the Q-walk line.
6. `.claude/skills/fortress-repo/references/specification.md:6`.

## 1. Primer: `2^(-1)` in Fortress

1. `^` raises a number to a power. Each integer type declares its own `^` in the interpreter's library. `ZZ32`'s reads:

   ```
   opr ^(self, b:AnyIntegral):RR64 =
       builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Int$Pow")
   opr ^(self, b:IntLiteral):RR64 = self^(b.asZZ32)
   ```

   `AnyIntegral` is any of the five integer types. `ZZ64`, `NN32`, `NN64`, `ZZ` and the numeral type `IntLiteral` declare the same, each answering `RR64`, a float.
2. What each path gives today:

   ```
   a = 2^3       (* walk: 8, a ZZ32 value under the declared RR64; compiled: 8 : ZZ32 *)
   b = 2^(-1)    (* walk: 0.5, an RR64;                             compiled: 0 *)
   c = 0^(-1)    (* walk: Infinity;                                 compiled: a raw Java RuntimeException *)
   ```

3. Why an integer result exists: integer code stays integer and exact. The library's `strToInt` sums `d radix^(n-i)` as a `SUM[\ZZ32\]`, and a power past the type's range raises `IntegerOverflow` instead of rounding.
4. Why the question is live now. On the flat tower `RR64` is a sibling of the integers, not their supertype. So the declared `RR64` no longer holds the integer that walk's natives answer, and the checker refuses six sites of today's 34. The premise of item 58, which the curator took, is that each integer `^` answers its own type at an exponent of 0 or more: `2^3` is `8 : ZZ32`.
5. Why the exponent is signed. Many exponents are computed in signed arithmetic, as `n-i` is in `strToInt`. The compiled library types `ZZ32 ^ ZZ32`, and the revival's chapter made the exponent ℤ, "so a negative power is admitted".
6. So `2^(-1)` type checks, and under the premise it needs a value that a `ZZ32` can hold, or no value. That is the fork.
7. The six sites today: `QQ`'s power at `Library/FortressLibrary.fss:642` three times and `:643` (its body divides two integer powers typed `RR64`, and negates an `AnyIntegral`, which declares no `-`); `strToInt`'s `SUM` at `:4540`; and `strToFloat`'s `SUM` over `10^k` at `:4556`.

Sources:

1. `Library/FortressLibrary.fss:799-801` (`ZZ32`), `:892-894`, `:975-977`, `:1074-1076`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:460-462`; `Library/FortressLibrary.fsi:441-443` (`AnyIntegral`); `perf-probes/integer-power/REPORT.md` section 1.1.
2. REPORT section 1.1 (walk's values, measured on the base); `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:400-405` (`intExp`: `(int) Math.pow(a,b)`, and `throw new RuntimeException("Overflow Error:")` above `Integer.MAX_VALUE`); `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`; ledger row 441 (`0^(-1)` a raw `java.lang.RuntimeException` compiled).
3. `Library/FortressLibrary.fss:4540-4545`; P-73; REPORT section 1.3 (`PowChooseLcmRungE:58-107`, the overflow tests at the four fixed widths).
4. P-43; REPORT section 6 (d846e3644, 2026-09-27); ledger row 438; F-241; PLAN item 58 ("with the integer result at a nonnegative exponent as its premise"); `postmortem-2026-10-19-haiku/fable-judgement.md` section B.2, first point.
5. `Library/FortressLibrary.fss:4540`; `CompilerBuiltin.fsi:267`; `Specification/basic-lib/basic-integers.tex:315-316`.
6. `Specification/basic-lib/basic-integers.tex:320` ("This chapter does not give it").
7. `explorations/compile-ladder/gate/distance-sites.tsv` lines 9, 10, 13, 14, 15 and 35; digest section 2; ledger rows 438 and 445; `Library/FortressLibrary.fss:641-646`.

## 2. The team's earlier word and its later word

1. **The earlier word, the Working Draft.** The integers declare `opr ^(self, power: NN): ZZ`: "Exponentiation of an integer to a nonnegative integer power produces an integer result." The rationals declare `opr ^(self, power: ZZ): QQ#`: "Exponentiation of a rational number to an integer power produces a rational result", with the property `x^y = 1/(x^(-y))`.
   - ℤ was then a subtype of ℚ, so an exponent typed ℤ chose ℚ's power, and `2^(-1)` was 1/2.
   - A numeral had a natural type, so `x^2` chose ℤ's power and stayed an integer.
   - This points to R.
2. **The later word, the team's code.** The compiled library declares `opr ^(self, other:ZZ32): ZZ32` (Christine Flood, 2011-09-19), and `NN32` and `NN64` the same at their own types. Every exponent, a negative one included, gets an integer type.
   - Its native, `intExp`, casts Java's `Math.pow` to `int`, so `2^(-1)` is 0 on the compiled path today.
   - Guy Steele's `intToIntPower` (2011-11-17) is bound nowhere. Called directly, it gives 0 at `(2,-1)` and at `(0,-1)`, 1 at `(1,-1)`, and raises at every negative base, `(-1)^(-1)` included.
3. **The conflict.** The earlier word gives a rational at a negative exponent; the later word gives an integer type for every exponent. The team's later word outweighs its earlier text where they conflict, by the curator's rule. That is the premise, which the curator took. With it, R, the earlier design, is out.
4. **On the value, the later word is silent.** `intExp`'s 0 is the by-product of a cast, not a line about negative exponents. `intToIntPower` is unfinished, nothing calls it, and it is inconsistent: 0 where 1/0 has no value, and a raise at every negative base. The curator's rule weighs a position the team took, and an unbound helper is not one. The `intExp` binding is in the compiler's prelude, which is deleted at the switch-over.
5. **The revival's chapter** keeps the integer result, makes the exponent ℤ, and does not give the negative case.
6. So the team's text and its library are silent on the value, and the peers weigh (section 4).

Sources:

1. `git show 5a68404fd:Specification/basic-lib/basic-integers.tex`, lines 506-510; `Specification-1.0-frozen/basic-lib/numbers.tex:344-355`; `Specification-1.0-frozen/basic/expressions/literals.tex:83-85` (`NaturalNumeral`); REPORT section 2.
2. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`, `:326`, `:385`; 489d3c1bb; `simpleIntArith.java:380-398` (`intToIntPower`), `:400-405` (`intExp`); REPORT section 6 (snapshot 2eb54ef20) and section 7, item 2.
3. P-26; PLAN item 58; fable-judgement.md section B.2, first point.
4. fable-judgement.md section B.2, second point; P-37 and P-38 (the prelude deleted, its defects not repaired); `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744` (`opr ^(self, other:ZZ32):ZZ32 = jIntExp(self, other)`).
5. `Specification/basic-lib/basic-integers.tex:315-320`, `:524-529`; `Specification/appendices/changes.tex:3984` ("The result of an integer raised to a negative power is not yet given").
6. fable-judgement.md section B.2, second point.

## 3. The library's own way

1. **Today, walk answers a float.** Each of the six `Pow` natives returns `FFloat.make(1.0 / pow(base, -exp))` for a negative exponent, so `2^(-1)` is `0.5`. That is X10's way. It cannot stand under the premise, since a `ZZ32` cannot hold 0.5, and it is not one of the four contracts.
2. **A result that a fixed-size integer type cannot hold raises `IntegerOverflow`.** The revival's chapter says so, and walk and the compiled path both do it, by the curator's decision. E follows this rule for 1/2.
3. **A fraction comes from a float or rational base.** This is what the library does where E refuses an integer base.
   - The float types' power takes any integer exponent: `10.0^(-4)` is a float. microGPT writes its one negative power so, `10.0^(-5)`.
   - `QQ`'s own power takes a negative exponent: `(2/3)^(-1)` is `3/2`, measured under E.
4. **A body over any integer type is a `typecase` over `AnyIntegral`'s five types,** as `exactValue` and `Number`'s `=` are written. `QQ`'s power takes that shape under E and Z, and negates only inside a signed type. It is 8 lines for 6.

Sources:

1. `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:220-230`, `Long.java:232-242`, `NN32.java:227-237`, `UnsignedLong.java:227-237`, `BigNum.java:298-306`, `IntLiteral.java:248-256`; REPORT sections 1.1 and 5 (X10); fable-judgement.md section B.2, second point.
2. `Specification/basic-lib/basic-integers.tex:567-568`; P-73; REPORT section 8.
3. `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:160` (`Float`'s `opr ^(self, b:AnyIntegral):RR64`); REPORT section 1.6 (microGPT's `10.0^(-5)`) and section 3.1 (`(2/3)^(-1)` = `3/2`).
4. `Library/FortressLibrary.fss:386-395`, `:398-408`; REPORT section 4.

## 4. The peers

1. **Julia** raises `DomainError` for a negative exponent, "Cannot raise an integer x to a negative power -1", except at bases 1 and −1, which give their exact power. A numeral exponent is rewritten to `inv(x)^-y`, so `3^-1` is `0.3333333333333333`, a float. Close to E.
2. **Rust** declares `pub const fn pow(self, exp: u32) -> i32`. The exponent's type cannot hold a negative value. X.
3. **Swift** has no exponentiation operator. Its `^` is bitwise XOR. Nothing to compare.
4. **X10** has no power operator; its `^` is bitwise. `x10.lang.Math` converts both integers to `Double`: `pow(a:Int, b:Int) = pow(a as Double, b as Double)`. Every integer power is a float. That is today's walk, not one of the four contracts.
5. **Java's `BigInteger.pow(int exponent)`** throws `ArithmeticException` when "`exponent` is negative. (This would cause the operation to yield a non-integer value.)" It raises at every negative exponent, bases ±1 included. E.
6. **Haskell's `^`**, `(Num a, Integral b) => a -> b -> a`, "raises any number to a nonnegative integer power". The Prelude's last clause is `_ ^ _ = error "Prelude.^: negative exponent"`. A second operator, `^^`, "raises a fractional number to any integer power", as `recip (x^(-n))`. So `^` is E, and the Working Draft's rational way lives in a separate operator for fractional bases.
7. **The revival's own precedent.** Walk refuses a negative exponent in a size, "a power in a size takes an exponent of 0 or above", and the compiled path computes none. It is a static refusal, E's analogue for values.
8. In sum: Julia, Java and Haskell raise; Rust types the exponent unsigned; X10 answers a float; Swift has no integer power. None answers 0.

Sources:

1. `base/intfuncs.jl`, Julia v1.11.7; docs.julialang.org, Base, Mathematics, `^`; REPORT section 5.
2. doc.rust-lang.org, `primitive.i32`, `pow` and `checked_pow`; REPORT section 5.
3. `swiftlang/swift-book`, `TSPL.docc/LanguageGuide/AdvancedOperators.md`; REPORT section 5.
4. The X10 2.1 specification, draft of 2011-02-23; `x10.runtime/src-x10/x10/lang/Math.x10`; REPORT section 5.
5. docs.oracle.com, Java SE 21 API, `java.math.BigInteger`, `pow(int exponent)`, its Throws clause.
6. The Haskell 2010 Report, section 6.4.3, "Exponentiation and Logarithms"; chapter 9, "Standard Prelude", the definitions of `^` and `^^`.
7. F-222; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:476`; `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1221`; REPORT section 5.
8. Points 1 to 6.

## 5. The four contracts

The figures come from the probe's shadow patches on the tree of 2026-10-16, whose distance was 49 at climb batch 15b's gate. The six sites are still in today's 34, so the figures for today subtract the sites each contract cleared from 34. They were not measured on today's tree. The probe measured the distance, not the checker count; the six sites are in `FortressLibrary`, where all 30 of the count are, so the count can fall with them, or rise as the check reaches further.

The tests: walk's suite has 26 tests that reach an integer power or a library function that calls one. They pass 26 of 26 on the base library. The team tests that a negative exponent reaches are three, all from the record's first commit and unchanged by the revival:

- `realArith`: `assert(sin pi, 1.2246467991473532 TIMES 10^(-16))`, and the same for `tan pi`.
- `compoundArray`: `7.07106781186547462 10^(-1)` in two 2×2 arrays, `3 10^(-2)` and `3.14 10^(-2)`.
- `simpleExp`: `x : RR64 = 10000000000000000000000000^(-1)`, `y : RR64 = 1000000000000000^(-1)` and `a : RR64 = 7.07106781186547462 10^(-1)`.

The demos `BiCGSTAB` and `BiCGSTAB2` set the solver's stopping threshold as `er0 = 1.0 10^(-4)`, and test `rr < er0` and `c1 < er0` to stop. No test runs them; their lines are by reading. No compiled test raises an integer to a negative power.

Sources (for the lead paragraphs):

1. REPORT, the first lines and the table under "In short"; digest section 2; `explorations/compile-ladder/climb-batch-15b/gate/distance.txt`.
2. Digest section 1; F-42.
3. REPORT sections 1.3 and 3.1 ("Walk"); `ProjectFortress/tests/realArith.fss:54`, `:57`; `compoundArray.fss:17-18`, `:27`, `:32-34`; `simpleExp.fss:18-20`; REPORT section 1.3 (72ae6881b, 2007-01-04; `git diff a874948ac --` prints nothing).
4. `ProjectFortress/demos/BiCGSTAB.fss:211`, `:235`, `:259`; `BiCGSTAB2.fss:198`, `:213`, `:237`; REPORT sections 1.4 and 1.5.

### 5.1 E, an error

1. **What it does.** A negative exponent raises an exception when the result is not an integer: `IntegerOverflow`, or `DivisionByZero` at a base of 0. The bases 1 and −1 give their exact power.
2. **What it produces,** measured: `2^(-1)`, `(-2)^(-1)`, and `2^(-1)` at `ZZ64`, `NN32`, `NN64` and `ZZ` raise `IntegerOverflow`; `0^(-1)` raises `DivisionByZero`; `1^(-1)` is `1 : ZZ32`; `(-1)^(-1)` is `-1 : ZZ32`; `(2/3)^(-1)` is `3/2`. At an exponent of 0 or more no value moves: the natives are unchanged there.
3. **E's exceptions.** `IntegerOverflow` follows the chapter's rule for a result that the type cannot hold; `DivisionByZero` follows `intToIntPower`; the exact ±1 follows Julia. The probe weighed three others: refuse every negative exponent, ±1 included, as walk does for sizes and as Java and Haskell do; `CastError`, the Working Draft's check exception, which is checked; or a new exception. No walk test catches a power's exception, so the choice moves no measured value.
4. **The edits.**
   - The library: each integer type's `^` answers its own type, on `Integral` too, in the component and the api; the two numeral overloads the same; `QQ`'s body becomes the `typecase` of section 3. That is 15 edits in 4 files, 29 lines in and 27 out.
   - Walk's natives: one line in each `Pow` class's negative branch, and a new 4-line `Int.divisionByZero()`, 11 lines in all.
   - By reading: the compiled helper for the phase-4 natives takes a raise in its negative branch, one line; the specification gains one sentence at `basic-integers.tex:524-529` and loses its two "not given" lines.
   - The three team tests: their integer base to a negative power becomes a float base, such as `10.0^(-16)`, a changed line in each. The respelled tests were not run.
   - With it, by the default: `fail[\ZZ32\]` in place of `fail` in `strToInt`, one line, for the sixth site.
5. **The sites.** 5 of the 6: `QQ`'s four and `strToFloat`'s, 49 to 44 measured. With `fail[\ZZ32\]`, 6: 43, and nothing else moved. Today: 34 to about 29, or about 28 with the typed `fail`.
6. **microGPT's quick check** passes, 7 of 7 in both programs, every value line equal to the base run's.
7. **Team tests and demos.** 23 of the 26 pass. `realArith`, `compoundArray` and `simpleExp` raise `IntegerOverflow` at their first negative power, until respelled. `BiCGSTAB` and `BiCGSTAB2` would raise at `10^(-4)`, by reading, and need `10.0^(-4)`.

Sources:

1. REPORT section 3, the four contracts.
2. REPORT section 3.1, the probe program under E; "No value at a nonnegative exponent moves".
3. `Specification/basic-lib/basic-integers.tex:567-568`; P-73; `simpleIntArith.java:383` (`DivisionByZero`); REPORT sections 5 and 8.
4. REPORT section 3.1 (15 edits, +29/−27; the natives and `Int.divisionByZero()`; "Cost"), the table under "In short" (11 lines of walk natives); PLAN phase 4, the natives (rows 523 to 525); fable-judgement.md section D.3, item 2 (the typed `fail` in the same rung).
5. REPORT section 3.1, "Distance"; F-241; digest section 2.
6. REPORT section 3.1, "microGPT".
7. REPORT section 3.1, "Walk" and "Demos, by reading"; F-247; fable-judgement.md section B.2, the redo.

### 5.2 Z, zero

1. **What it does.** A negative exponent gives the quotient truncated toward zero: 0 when the base is 2 or more, or −2 or less; ±1 at the bases ±1; and `DivisionByZero` at 0. It is what the compiled `intExp` does today by its cast, and what `intToIntPower` meant.
2. **What it produces,** measured: where E raises `IntegerOverflow`, Z answers `0`. `2^(-1)` is `0`, `(-2)^(-1)` is `0`.
3. **The edits.** E's library text, the same 15 edits, 29 lines in and 27 out. The natives differ from E's in the last clause of the negative branch only. By reading, the compiled helper is `intToIntPower` with its two slips corrected: `a == 0` where it tests `a < 0`. The three team tests need the same float base as under E, since two fail and one moves.
4. **The sites.** As E, from one distance run, since the checker reads the library text alone: today 34 to about 29, or about 28 with the typed `fail`.
5. **microGPT's quick check** passes, 7 of 7 in both programs, every value line equal.
6. **Team tests and demos.** 24 of the 26 pass.
   - `realArith` fails its assert: `1.2246467991473532E-16 =/= 0.0`.
   - `simpleExp` stops at line 18: "RHS expression type BigNum is not assignable to LHS type RR64". Z's 0 is a `ZZ`, and a `ZZ` does not convert into an `RR64`.
   - `compoundArray` passes with 6 printed lines moved and no error: `0.7071067811865475` to `0.0` in four array cells, `0.03` to `0`, `0.031400000000000004` to `0.0`, and `0.1` to `0.0` twice.
   - `BiCGSTAB`'s and `BiCGSTAB2`'s `er0` is `0.0`, by reading, so their stopping tests compare the residual with zero.

Sources:

1. REPORT sections 3 and 8 ("Z's meaning"); `simpleIntArith.java:380-405`.
2. REPORT section 3.1 ("Under Z, the same calls answer `0`").
3. REPORT section 3.1 (the two native lines; "Cost"), section 7, item 2.
4. REPORT section 8 ("One distance run for E and Z"); F-241; digest section 2.
5. REPORT section 3.1, "microGPT".
6. REPORT section 3.1, "Walk" and "Demos, by reading"; `BiCGSTAB.fss:235`, `:259`.

### 5.3 R, a rational typed by the exponent

1. **What it does.** The Working Draft's split: an unsigned or numeral exponent gives the base's own type, and a signed exponent gives a `QQ`.
2. **What it produces,** measured under walk: `2^(-1)` is `1/2`, `0^(-1)` is `1/0`, `(-2)^(-1)` is `-1/2`, and `2^3` is `8 : QQ`, since walk reads the numeral `3` as a `ZZ32` until Q-walk.
3. **The edits.** 21 edits in 4 files, 91 lines in and 29 out. The algebra trait that declares `^` for the number types, `MultiplicativeRing[\T\]`, takes an `NN64` exponent, and `Float`, `FloatLiteral`, `RR32` and `QQ` each gain `opr ^(self, b:NN64)`, or walk refuses them at load. By reading: Q-walk first; `strToInt` and `strToFloat` need X's two unsigned conversions to clear their sites; the specification's integer exponent returns to ℕ and the rationals take the signed one; the compiled helpers cannot build a `QQ`, so the signed overloads stay Fortress text.
4. **The sites.** 4 of the 6, `QQ`'s; `strToFloat`'s stays, now typed `QQ`; `strToInt`'s stays; 2 new sites in `FortressBuiltin`, which by reading go with the fix of `QQ`'s api exponent. The probe's run read 46, which counts a run-to-run site that went by chance. Today: 34 to about 32.
5. **microGPT's quick check** stops in both programs, in `strToInt`: "Unification error: Closure/Constructor for body param 1 (i:ZZ32) got arg Ratio", from microGPT's data reader.
6. **Team tests and demos.** 10 of the 26 pass, and 16 fail: among them `compoundArray` and `realArith` (`RR64` times or over `QQ` has no overload) and `simpleExp` (`QQ` is not assignable to `RR64`). `BiCGSTAB`'s `1.0 10^(-4)` has `compoundArray`'s shape, an `RR64` times a `QQ`, so by reading it stops as `compoundArray` does.

Sources:

1. REPORT section 3, the four contracts; section 8, "R's shape".
2. REPORT section 3.2, the probe program.
3. REPORT section 3.2 (edits; walk's load refusal; "Cost, by reading"), section 8 ("The ring's power").
4. REPORT section 3.2, "Distance"; ledger row 445; `explorations/coordinator/tools/distance/compare.sh` (its header, the run-to-run variation).
5. REPORT section 3.2, "microGPT"; `explorations/run-c4/src/FlatData.fss:34`; F-247.
6. REPORT section 3.2, "Walk"; `BiCGSTAB.fss:211`.

### 5.4 X, an exponent that cannot be negative

1. **What it does.** An integer `^` takes only an `NN32`, an `NN64` or a numeral exponent. `2^e` with `e : ZZ32` has no declaration, so the checker refuses it, whatever `e` holds. Rust's way.
2. **What it produces.** At an exponent of 0 or more, the integer. A caller with a signed exponent converts it, as `strToInt` becomes `d radix^(unsigned(n-i))`.
3. **The edits.** R's text without its three signed overloads, plus the two library callers converted: 23 edits in 4 files, 57 lines in and 31 out. By reading: Q-walk first; `MultiplicativeRing`'s `NN64` power and the four float and rational bodies, as R; `Format.fss:95` and `:97` converted; the compiled `ZZ32 ^ ZZ32` bindings go, with the compiled tests that call them, `Compiled1.al`, `XXXPowZZ32CompiledRungE` and `ShiftTest2`; the specification's exponent returns to ℕ, as `NN64`.
4. **The sites.** 5 of the 6: `QQ`'s four and `strToFloat`'s. `strToInt`'s stays without the typed `fail`. The probe's run read 43, which counts the same run-to-run site as R's. Today: 34 to about 29, and by reading about 28 with the typed `fail`.
5. **microGPT's quick check** passes, every value line equal: `strToInt` is converted, and microGPT's own powers have a float base.
6. **Team tests and demos.** 10 of the 26 pass until Q-walk. 14 fail on "Ambiguous coercion" at their first `ZZ32` exponent, numerals included, such as `PowChooseLcmRungE`'s `2^31`. `formatTest` fails on a `ZZ64` exponent in `Format`, and `simpleExp` on its `ZZ` base. The three team tests and the two demos need a float base for their negative powers, as under E.

Sources:

1. REPORT section 3, the four contracts; section 5 (Rust).
2. REPORT section 3.3.
3. REPORT section 3.3 (edits; "Cost, by reading").
4. REPORT section 3.3, "Distance"; digest section 2.
5. REPORT section 3.3, "microGPT".
6. REPORT section 3.3, "Walk"; `PowChooseLcmRungE.fss:58`; REPORT section 3.1, "Cost" (the team tests under E and Z); `postmortem-2026-10-19-haiku/part-3-return.md`, entry 18d (two demos and three team tests).

## 6. How they weigh

1. **E and Z share everything but one branch.** The same library text, 15 edits; the same sites, about 29 or 28 of today's 34; microGPT passes under both with every value equal; both land in a phase-3 batch, with no wait on Q-walk.
2. **Where they differ.**
   - E stops with an error where the three team tests use a negative power, and they get a float base.
   - Z keeps the compiled path's 0, but that 0 comes from the cast in `intExp`, which only the compiler's prelude binds, and the switch-over deletes the prelude. Z changes six printed lines of `compoundArray` with no error, sets the demos' stopping threshold to 0.0, and still needs the three tests respelled.
   - E matches Julia, Java and Haskell, and the revival's refusal of a negative exponent in a size. No peer answers 0.
   - E gives up `2^(-1)` as a value. The library gives it instead from a float or rational base, `2.0^(-1)` or a `QQ`.
3. **R** is the Working Draft's design, which needed ℤ inside ℚ, gone with the flat tower. It clears the fewest sites, 34 to about 32, stops microGPT's quick check, fails 16 of 26 walk tests and waits on Q-walk.
4. **X** moves the error to the checker, as Rust does, and microGPT passes. It costs the most edits, 23, puts a conversion in every caller with a signed exponent, removes the compiled `ZZ32 ^ ZZ32` and three compiled tests, and waits on Q-walk. Q-walk sits in the switch-over's batches, so X's sites would wait for those batches, though the switch-over needs them cleared.
5. **The path.** The six sites are on the path to the switch-over, so the answer is needed before it, and no sooner. A later batch takes them once it is answered.

Sources:

1. Sections 5.1 and 5.2; REPORT section 3.1.
2. Section 5.2; P-37, P-38; section 4; F-222.
3. Section 5.3; P-43; fable-judgement.md section B.2, first point.
4. Section 5.4; PLAN phase 4, the Q-walk line; PLAN phase 3, the integer power's candidate line.
5. fable-judgement.md section B.2, the default; PLAN, "Pavol's answers", "Before the switch-over"; digest section 4.

## 7. The recommendation

E, an error: `IntegerOverflow` at a negative exponent where the result is not an integer, `DivisionByZero` at a base of 0, and the bases ±1 exact. In the same rung: the three team tests' negative powers written with a float base, `10.0^(-k)` and the like, and `fail[\ZZ32\]` in `strToInt`. Today's distance then falls from 34 to about 28.

Sources:

1. fable-judgement.md section B.2 ("Default: E") and section D.3, item 2; sections 5.1 and 6 above.
