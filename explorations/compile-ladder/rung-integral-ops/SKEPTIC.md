<!-- Skeptic's judgement of rung N (rung-integral-ops) of explorations/coordinator/CLIMB-BATCH-1.md.  Written 2026-09-19 by the skeptic session, which did not do the work.  One line per paragraph. -->

# Skeptic: rung N, `rung-integral-ops`

**Verdict: REFUSED, once.**

The one thing that must change: **`0 MOD -1` throws `IntegerOverflow` on the compiled path**, and so do `0 REM -1`, `0 GCD -1`, and the same three at `ZZ32.MIN` and on `ZZ64`, where the specification gives `0`, `0` and `1`. The rung neither fixes this nor records it, its gated test cannot see it, and the ledger row it opens for the defect class names the wrong native methods, so a later reader who closes row 329 as written would still have `0 MOD -1` raising. The repair is one conditional in the `REM` body the rung already writes; I verified it works.

Everything else in the rung is sound, and most of it is unusually good. The refusal is not a verdict on the shape of the work.

## What I verified, and what held

The recorded failure is real and genuinely predates the edit. `git log --oneline cb242a2d8..HEAD` puts `fc196d66a` ("the failing test and its recorded failure", adding `IntegralOpsRungN.fss`, `.test`, `raw/IntegralOpsRungN.compile.before` and `raw/IntegralOpsRungN.junit.before`) before `af659cc47` ("the six operators ... and the recorded pass", the only commit touching `CompilerBuiltin.fsi`/`.fss`). `raw/IntegralOpsRungN.compile.before` has 84 lines reading `Operator <name> is not defined` and ends `File IntegralOpsRungN.fss has 84 errors.`; `raw/IntegralOpsRungN.junit.before` ends `FAILURES!!!` / `Tests run: 2,  Failures: 2,  Errors: 0`. The failure file's line numbers (`REM` at `:76-79`) are one less than the landed test's (`:77-80`), which is the comment-only edit `ac9392a3e` made afterwards — so this is a capture from the running tree, not a reconstruction.

I re-ran the claimed pass rather than trusting the log. `bin/fortress compile ProjectFortress/library_tests/IntegralOpsRungN.fss` is silent and exits 0; `bin/fortress run IntegralOpsRungN` prints `PASS`. `bin/fortress compile ProjectFortress/tests/chain0.fss` is silent and `bin/fortress run chain0` prints 22 `PASS` lines with no `FAIL` — the headline ladder claim holds, independently. `bin/fortress compile ProjectFortress/tests/rshiftbug.fss` now fails at `Can't compile AsIfExpr at .../rshiftbug.fss:34.27` from `CodeGen.sayWhat(CodeGen.java:1552)`, where `raw-before/tests/rshiftbug.fss.compile` recorded two `Operator RSHIFT is not defined` errors — so that claim holds too.

The gate is not vacuous, which was worth checking because `assert` could have been a printer. `Library/CompilerLibrary.fss:99` routes a failed comparison to `fail`, and `fail` at `:73-76` does `errorPrintln("FAIL: " s)` and then `throw FailCalled(s)`, so a failed assertion aborts `run()` and `println("PASS")` at `IntegralOpsRungN.fss:202` is never reached. And `run_out_contains` is a key the harness really checks: `FileTests.java:141` `generalTestFailed` tests `<which>_contains` on every run, not only on a failing one. The worker's note that `run_out_WIcontains` (which `library_tests/Integer.test:19` writes) is *not* among those keys is correct — `_contains`, `_does_not_contain`, `_matches`, `_WImatches`, `_WCIequals` and `_equals` are the list at `FileTests.java:147-200`.

The diff is exactly what is claimed and no more: twelve declarations in `CompilerBuiltin.fsi` at `:176-179`, `:196-197`, `:237-240`, `:257-258` and twelve bodies in `CompilerBuiltin.fss` at `:584-606`, `:630-631`, `:667-689`, `:717-718`, all inside `trait ZZ64` and `trait ZZ32`, no `.java`, no `.scala`, nothing under `explorations/coordinator/`. I checked each of those eight ranges against the hunk headers; all eight are right. Disjoint from rung F's `trait RR64` and rung T's `CompilerLibrary`, so batch rule 1 holds.

The specification citations are exact, and they are prose-chapter citations, not api renderings. I opened every line: `basic-integers.tex:438-442` (the declarations with `throws IntegerDivisionByZero`), `:444-451` (truncating `÷`, `REM` its remainder, `MOD` the remainder of the division that "rounds inexact results towards negative infinity"), `:459` ("if `other` is zero then an `IntegerDivisionByZero` is thrown"), `:465-468` (the four-sign table), `:484` (`m REM n = m - n(m ÷ n)`), `:488-490` (the three properties), `:518-519` (the suppressed `opr GCD(self, other: ZZ): NN` against the rendered `: ZZ` at `:520-521`), `:523-529`, `:544` (the lattice property), `:621-624` (`opr |self| : NN` and "returns the negative of this integer if the argument is less than zero"), `:228`, `:401`, `:696-702`. `grep -rn "LSHIFT\|RSHIFT" Specification/ Specification-1.0-frozen/` matches nothing, so "the specification is silent" is true of the whole tree, not just the chapter.

The precedent citations are exact too: `Library/FortressLibrary.fss:624-627` and `:633-634` are the six on `trait Integral[\I\]`; `glue/prim/Int.java:307-318` is the `mod` helper the `MOD` body transcribes, branch for branch; `:136-141` is `Lcm` returning `(u / g) * v` unnormalized; `:173-183` are `LShift`/`RShift` saturating outside `0..31`; `:252-259` is `gcd`'s unnormalized zero case; `simpleIntArith.java:85`, `:90` and `simpleLongArith.java:94`, `:99` are the four `a==(-a)` guards; `library_tests/Integer3.fss:87-91`, `:96` and `:58-59` are what the report says they are.

I re-ran the competing-declaration grep. Across `ProjectFortress/tests/`, every `*_tests/`, `compiler_regressions/` and `linker_tests/`, the only file declaring any of the six is `not_working_static_tests/BuiltinTest.fss:44-62` on its own `trait SweetZZ32`, and `grep -n not_working_static_tests ProjectFortress/build.xml` is empty. No `.test` file in any corpus contains any of the six names, so no `compile_err_equals` fixture breaks. That part of the precedent search is confirmed.

I checked the scope of the third FACTS line, because "would pass if uncommented" depends on how `Integer3` is run. `library_tests/Integer.test:16-19` is `compile` / `link` / `run` — the compiled path only — so the claim stands for the gated run.

## My own differential, and what it found

Seven programs the worker did not write, under `probes/skeptic/`, each compiled and run and then run under `walk`.

`SkepProps.fss` checks the **defining** properties rather than a table: over 325 operand pairs (`a` in `-12..12`, `b` in `-7..7` less `0` and `-1`) it counts violations of `b(a DIV b) + (a REM b) = a`, of `a MOD b` having the sign of `b`, of `|a MOD b| < |b|`, of `(a MOD b) - (a REM b) ∈ {0, b}`, of `a GCD b` being nonnegative and dividing both, of `a LCM b` being nonnegative and divisible by both, of `(a GCD b)(a LCM b) = |ab|`, and of `(a + 3b) MOD b = a MOD b`. **Compiled: every count is 0.** That is a far stronger positive result for the rung's four arithmetic bodies than its own fixed table, and I record it in the rung's favour. Under `walk` the same program reports 6 bad `GCD` and 156 bad `LCM` and 156 bad lattice — which independently confirms row 330 and quantifies it; run over the full range including `b = -1` (`SkepProps.walk-fullrange`) it is 7 and 168 of 350.

`SkepResolve.fss` checks resolution the rung's probes did not: `17 MOD 5` and `-17 MOD 5` with no expected type at the call site (`2` and `3`, agreeing both ways), `17 GCD 51` (`17`), a `ZZ64 MOD ZZ32` mixed pair reaching the `ZZ64` overload through `coerce` (`4`), and the target program's own shape `f(fn (i: ZZ32): ZZ32 => i MOD nc, -30)` (`5`). All six agree between the two paths. The rung's central use case works.

`SkepZeroNegOne.fss`, `SkepBoundary.fss` and `SkepZZ64Neg.fss` found the defect this refusal rests on, below.

`SkepShiftNeg.fss` extends row 331 to negative shift counts: `3 LSHIFT -1` is `-2147483648` compiled and `0` under `walk`; `3 LSHIFT -32` is `3` and `0`; `3 LSHIFT 32` is `3` and `0`; `-16 RSHIFT 32` is `-16` and `-1`; `-16 RSHIFT -1` is `-1` both ways.

## The finding: `0 MOD -1` raises

`probes/skeptic/SkepZeroNegOne.compiled`:

    0 DIV -1 =  THROWS      (walk: 0)
    0 REM -1 =  THROWS      (walk: 0)
    0 MOD -1 =  THROWS      (walk: 0)
    0 GCD -1 =  THROWS      (walk: -1, itself row 330)
    0 LCM -1 =  0           (guard takes the zero case first)
    5 GCD -1 =  1           (agrees)

`probes/skeptic/SkepBoundary.compiled` shows the same at the other root of the guard — `MIN REM -1`, `MIN MOD -1`, `MIN GCD -1` and `MIN LCM -1` all `THROWS`, where `walk` answers `0`, `0`, `1` — and `probes/skeptic/SkepZZ64Neg.compiled` shows `ZZ64 0 REM -1`, `0 MOD -1`, `0 GCD -1`, `MIN REM -1`, `MIN MOD -1` all `THROWS`. The clearest single pair is `probes/skeptic/SkepRaise.fss`, eight lines that do nothing but `println("0 MOD -1 = " (zero MOD mOne))`. Under `walk` it prints `0 MOD -1 = 0` (`SkepRaise.walk`). Compiled it prints the inheritance chain in full (`SkepRaise.compiled`):

    FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow
      at com.sun.fortress.compiler.runtimeValues.Utility.makeFortressException(Utility.java:48)
      at com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingDiv(simpleIntArith.java:80)
      at fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods.DIV?0(.../CompilerBuiltin.fss:666)
      at fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods.REM?0(.../CompilerBuiltin.fss:667)
      at fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods.MOD?0(.../CompilerBuiltin.fss:669)
      at SkepRaise.run(.../SkepRaise.fss:10)

`:667` and `:669` are two of the twelve bodies this rung adds.

The cause is the rung's own defect class, one file down from where it looked. `simpleIntArith.java:80` is

    if (b==(-1) && a==(-a)) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");

and `simpleLongArith.java:89` is the same line. `a==(-a)` is true for `a==0` as well as for the most negative value the guard exists to catch — exactly what the rung established for `intOverflowingNeg` (`:85`) and `intOverflowingAbs` (`:90`). Because `REM` is written over `DIV` (`CompilerBuiltin.fss:667`), and `MOD` over `REM`, and `GCD` over `REM`, all three inherit it. The set of throwing inputs is exactly `{(0, -1), (MIN, -1)}`; `SkepProps` confirms there is nothing else, since with `b = -1` excluded all 325 pairs are clean.

The specification settles it against the compiled path, and this is rule 4's first outcome, not its fourth. `basic-integers.tex:459` makes a throw conditional on the *divisor* being zero and on nothing else; the table at `:465-468` gives `REM` and `MOD` a value for every sign combination; `:401` says operations on ℤ "never need to wrap or saturate". The true answers — `0 REM -1 = 0`, `0 MOD -1 = 0`, `MIN REM -1 = 0`, `MIN MOD -1 = 0`, `0 GCD -1 = 1`, `MIN GCD -1 = 1` — are all representable in the result type, so there is no overflow to report. `DIV` itself is a different case and its throw is defensible, because `MIN ÷ -1` really is `2^31`; but `0 DIV -1` is `0` and that one is a plain defect in `DIV` too.

The report's justification for the inherited throw does not survive its own citation. REPORT.md says "Because `REM` and `MOD` are written over `DIV`, they inherit both, which is the specification's requirement for the first (`basic-integers.tex:459`) and the trait's own overflowing-family convention for the second." `:459` is about a zero divisor and says nothing about overflow; and the "overflowing-family convention" is a convention about operations whose *result* does not fit, which is not the case here. The rung reasoned about the inheritance in the abstract and never measured a divisor of `-1`.

The rung's own gated test cannot see it: `IntegralOpsRungN.fss` has no `-1` divisor and no `MIN` operand anywhere. `library_tests/Integer.test`'s `OK (27 tests)` cannot see it either.

**And the fix is inside the rung's existing edit.** `probes/skeptic/SkepZZ64Neg.fss` defines `myRem`, `myMod` and `myGcd` as the prelude writes them plus one guard, `if b = -1 then 0 else a - b (a DIV b) end`, and compiled it gives `guarded 0 REM -1 = 0`, `guarded 0 MOD -1 = 0`, `guarded 0 GCD -1 = 1`, `guarded MIN REM -1 = 0`, `guarded MIN MOD -1 = 0`, `guarded MIN GCD -1 = 1`, the whole `±8 / ±3` table unchanged, and `guarded 8 REM 0 = THROWS` — so `DivisionByZero` is preserved. Two lines, pure Fortress, no `.java`, inside `trait ZZ32` and `trait ZZ64` where the rung is already editing.

This is the same move the rung already made once, and argued for: it rewrote `GCD` to normalize at the end rather than call `|0|`, precisely to route around an `a==(-a)` guard. Decision 2 even states the principle — do not work around a defect "at a site that cannot reach it", which implies working around it at sites that can. `REM` is a site that can reach it and was not measured.

## The provenance block: two lines do not say what the block says

Both are in the landed tree, and one of them is also in `record.md`, which is the text the coordinator pastes into `FACTS.md`.

`deviation: ... — ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:716` for the name `DivisionByZero`. Line 716 of the landed `.fsi` is `object EqualTo extends TotalComparison end`. `object DivisionByZero extends UncheckedException end` is at **`:728`**. The cited number was correct before the edit and the rung's own twelve added declarations pushed it down twelve lines.

`deviation: ... a declaration there wins over coercion ... — ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:844` for the `IntLiteral` `BITAND` stub. Line 844 of the landed `.fss` is `opr >>(self, other:ZZ32): NN64 = ...`, inside `trait NN64`. `opr BITAND(self, other:IntLiteral): IntLiteral = throw CompilerFailureDetectedAtRunTime` is at **`:895`**. This one was wrong before the edit as well: `git show cb242a2d8:...CompilerBuiltin.fss | sed -n '844,845p'` gives `opr BITNOT(self): IntLiteral` at `:844` and the `BITAND` stub at `:845`. The same `:844` appears in `record.md`'s second FACTS line and twice in REPORT.md's prose.

The rest of the block is accurate. I do not treat these two as the refusal — the refusal is the `MOD` defect — but under the batch's own rule they are refusal-grade on their own, and they must be closed in the repair round.

## The precedent search missed the file that answers its own decision 5

The report says of `IntLiteral`: "the six are deliberately **not** declared on `trait IntLiteral`, where the interpreter has no equivalent question". The interpreter has exactly that question, wrote the answer, and switched it off with a written reason.

`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:501-508` declares `REM`, `MOD`, `GCD` and `LCM` on `object IntLiteral` bound to `IntLiteral$Rem`, `$Mod`, `$Gcd`, `$Lcm`, and `:517-520` declares `LSHIFT` and `RSHIFT`; the api is `FortressBuiltin.fsi:130-133` and `:138-139`. All of it sits inside a comment that opens at `.fss:483` (`.fsi:121`) and whose text at `.fss:484-485` reads: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals." That passage is the one the shared prefix quotes as rung 7's case in point.

The rung reached the right answer by its own measurement (`probes/LitResolve2.fss`: `3 BITAND 4` throws rung 7's stub because `IntLiteral`'s own overload beats coercion), and its reasoning about there being no way back into `IntLiteral` for a quotient is sound and specific to the compiler world. But the strongest support for the decision was three lines the brief itself points at, the report asserts the opposite of what is there, and the precedent claim "One way, in the interpreter: `trait Integral[\I\]`" is not the whole answer — `FortressBuiltin.fss` is a second site, and it also declares the six live on `trait NN32` at `:418-436`.

## Two divergences the rung did not record

**`LCM` overflow: `walk` is quietly wrong where the compiled path is loud.** `probes/skeptic/SkepBoundary`: `MAX LCM 2` throws `IntegerOverflow` compiled and answers `-2` under `walk`; `100000 LCM 99999` throws compiled and answers `1409965408` under `walk`. The true values are `2^32 - 2` and `9999900000`, neither representable in `ZZ32`. The compiled side is right, and this belongs in the record as a second divergence settled against the interpreter, beside row 330 — `Int$Lcm` at `glue/prim/Int.java:136-141` computes `(u / g) * v` in `int` and wraps.

**The interpreter cannot catch `DivisionByZero` at all.** Running `probes/skeptic/SkepZZ64Neg.fss` under `walk`, the `8 REM 0` case escapes a `try` / `catch e` / `Exception =>` as an uncaught `java.lang.ArithmeticException: / by zero` from `com.sun.fortress.interpreter.glue.prim.Int$Div.f(Int.java:120)`, all the way out through `Shell.walk`. That is very likely the original reason `library_tests/Integer3.fss:87-91` was commented out, and it is a qualifier the third FACTS line and `map/dormant-code.md:314`'s "unknown" status both want: the status resolves to "works on the compiled path, and the compiled path is the only one `Integer.test` drives", not simply to "works".

## The failure-mode question

**Loud to quiet, as intended.** Before this rung, `x MOD y` failed loudly at `DISAMBIGUATE` with `Operator MOD is not defined` (`ExprDisambiguator.scala:500`); now it computes. I established what the values are over 325 operand pairs and they satisfy every defining property the specification states, so the diagnosability that was lost was the diagnosability of an unimplemented name, which is the point of the rung. The one place the new quiet value differs from `walk` is a shift count outside the width, where nothing computed before at all, so no diagnostic was displaced — only agreement with the interpreter, which row 331 records.

**Quiet to loud, not recorded, and this is the refusal.** `0 MOD -1` and `MIN MOD -1` are values under `walk` and exceptions on the compiled path. Whoever next writes `x MOD -1` in compiled Fortress gets an `IntegerOverflow` stack trace for an expression whose answer is zero.

**Quiet-wrong to loud, not recorded, and an improvement.** `MAX LCM 2` wraps silently under `walk` and throws compiled.

## Required corrections

These are the checklist for the repair round. The first is the refusal; the rest must be closed with it.

1. **`0 MOD -1`, `0 REM -1`, `0 GCD -1` and the same three at the type minimum, on `ZZ32` and `ZZ64`, must stop throwing `IntegerOverflow`.** The guard `if other = -1 then 0 else ... end` on each `REM` body is verified sufficient (`probes/skeptic/SkepZZ64Neg`) and preserves both the specification's table and `DivisionByZero`. If the rung instead argues the repair belongs in `intOverflowingDiv`, it must say so, and then correction 2 below is not optional and the rung must state plainly in REPORT.md and in the handover line that it ships a `MOD` that raises on `0 MOD -1`.
2. **Row 329 must name `simpleIntArith.java:80` and `simpleLongArith.java:89` alongside `:85`, `:90`, `:94`, `:99`**, and must state the defect as the guard `a==(-a)` used as an overflow test in six native methods, not as "`|0|` and `-0`". As written, closing row 329 leaves `0 MOD -1` raising.
3. **Add the `-1` divisor and the type minimum to `IntegralOpsRungN.fss`**, whichever way correction 1 goes. The rung's test currently cannot distinguish a correct `MOD` from one that raises on `0 MOD -1`.
4. **Fix `CompilerBuiltin.fsi:716` to `:728` and `CompilerBuiltin.fss:844` to `:895`**, in the provenance block, in REPORT.md's prose and in `record.md`'s second FACTS line. Check the rest of the block against the landed tree at the same time, since the edit moved everything below it.
5. **Correct decision 5's claim that "the interpreter has no equivalent question"**, and add `FortressBuiltin.fss:501-508`, `:517-520` (and `.fsi:130-133`, `:138-139`) with the team's reason at `.fss:483-485` to the precedent search, alongside the live `trait NN32` declarations at `.fss:418-436`. The decision itself is right and should stand; its stated basis is wrong.
6. **Record the two unrecorded divergences**: `LCM` overflow (`walk` wraps, compiled throws, compiled is right, `Int.java:136-141`) as a second finding beside row 330, and the interpreter's inability to catch `DivisionByZero` (`Int$Div.f`, `Int.java:120`, uncaught `java.lang.ArithmeticException`) as a qualifier on the third FACTS line and on `map/dormant-code.md:314`.
7. **Row 331 should name negative shift counts explicitly** and cite a measurement of one. "Outside `0..31`" covers them, but `3 LSHIFT -1` giving `-2147483648` compiled against `0` under `walk` is the surprising case and no probe in the rung records it. `probes/skeptic/SkepShiftNeg` may be cited.

## What I did not do

I did not edit any of the worker's source changes, and I did not run `ant testFast` or `ant testSystem`. My probes and their captured outputs are under `probes/skeptic/`; nothing else in the tree was touched by me except this file.
