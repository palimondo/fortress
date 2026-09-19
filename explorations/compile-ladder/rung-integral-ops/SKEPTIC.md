<!-- Numbering note added at the merged-diff review of 2026-09-19: this file was written before the gather assigned final ledger numbers. Rung N's provisional 329, 330, 331 and 332 landed as **333, 334, 335 and 336**; in the ledger, 329 and 330 are rung F's and 331 and 332 are rung M's. So "Row 329" below (`:119`, `:176`) is row 333, "row 330" (`:50`, `:184`, `:186`, `:188`) is row 334, and "row 331" (`:41`, `:124`) is row 335. The verdict text is left exactly as the skeptic wrote it. -->

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

---

<!-- Second judgement of rung N, after the repair round the judge ordered.  Written 2026-09-19 by the skeptic session, which did not do the work.  The refusal above is left exactly as it stood; this section is appended, not merged into it.  One line per paragraph. -->

# Skeptic, second judgement: rung N, `rung-integral-ops`

**Verdict: APPROVED, with four required corrections.**

The refusal ground is closed. `0 REM -1`, `0 MOD -1`, `0 GCD -1` and the same three at the type minimum now answer `0`, `0` and `1` on both `ZZ32` and `ZZ64`, the repair is one line per `REM` body, and I verified the answer against the unguarded path rather than against the rung's own expectations. The four corrections below are record-accuracy defects, not grounds for a second refusal; one of them would mislead whoever closes a ledger row this rung opens.

## What I re-verified, by running rather than reading

The recorded failure of the repair round is real and predates the edit. `git show --stat 5d4bd370d` is the extended test plus `raw/IntegralOpsRungN.{compile,run,junit}.before-repair`; `37106becf`, the next commit, is the only one in this round touching `CompilerBuiltin.fss` and it changes four lines (two `REM` bodies, `+`/`-` counted twice). The captured failure is the right failure and not a generic one: `IntegerOverflow` from `intOverflowingDiv(simpleIntArith.java:80)` inherited up `DIV(CompilerBuiltin.fss:666)` → `REM(:667)` and raised at `IntegralOpsRungN.fss:144`, which is `assert(zero REM mOne, 0, "0 REM -1")`, the first assertion the round added; `raw/IntegralOpsRungN.junit.before-repair` ends `Tests run: 2,  Failures: 1,  Errors: 0` with `Failed to satisfy run_out_contains; expected PASS`. The compile capture beside it is empty with exit 0, which is correct and is stated as such — the names landed in the first round, so only the run can separate the two behaviours.

The claimed pass reproduces. I ran it myself: `../bin/fortress compile library_tests/IntegralOpsRungN.fss` after a `touch` is silent and exits 0, `../bin/fortress run IntegralOpsRungN` prints `PASS`, `../bin/fortress junit library_tests/IntegralOpsRungN.test` gives `OK (2 tests)`, `../bin/fortress junit library_tests/Integer.test` gives `OK (27 tests)`, and `tests/chain0.fss` compiles clean and gives 22 `PASS` lines with no `FAIL`. The `Integer.test` run matters independently of the worker's: three of its assertions (`Integer3.fss:93`, `:96`, `:127`) pin the overflows the guard must not suppress, and they still pass.

The diff is the claimed diff and nothing else. The repair round's whole source change is `CompilerBuiltin.fss:584` and `:667`, each now `opr REM(self, other:ZZn): ZZn = if other = -1 then 0 else self - other (self DIV other) end`; line counts are unchanged, so the twelve body ranges `record.md` cites still land on the right lines — I checked all eight endpoints (`.fss:584`, `:606`, `:630-631`, `:667`, `:689`, `:717-718`) and all four declaration ranges (`.fsi:176-179`, `:196-197`, `:237-240`, `:257-258`). No `.java`, no `.scala`, nothing under `explorations/coordinator/`, no `.fsi` edit this round. The edit is as small as the test needs.

The two wrong provenance citations are fixed and the whole block now holds. `CompilerBuiltin.fsi:728` is `object DivisionByZero extends UncheckedException end`; `CompilerBuiltin.fss:895` is the `IntLiteral` `BITAND` stub; `:538-552` is `opr CHOOSE(self, other: ZZ): ZZ =` and its body. I re-opened every other line of the block as well — `AplMg.fss:14`, `basic-integers.tex:438-490` and `:518-529`, `FortressLibrary.fss:624-634`, `FortressBuiltin.fss:483-485` and `:418-437`, `Int.java:307-318`, `:173-183`, `:136-141`, `Integer3.fss:127`, `simpleIntArith.java:90`, `spec-to-implementation.md:418`, `test-coverage.md:114` — and each says what the block says it says. No `spec:` line cites `Specification/library/apis/`; every one is `basic-lib/` or `basic/`, so rule 3 holds.

The precedent the first round asserted did not exist, and I said did, is now cited correctly and in the right place: `FortressBuiltin.fss:501-508` and `:517-520` declare all six on `object IntLiteral` inside the comment opening at `:483` whose text at `:484-485` is the "Do not enable these until coercion is implemented" passage, and `:418-437` has the same six live on `trait NN32`. Decision 8 now says the decision stands on that basis. That is the correction I asked for, made as asked.

The competing-declaration grep holds when I run it myself. Across `tests/`, every `*_tests/`, `compiler_regressions/` and `linker_tests/`, the only file declaring any of the six is `not_working_static_tests/BuiltinTest.fss`, and `grep -n not_working_static_tests ProjectFortress/build.xml` is empty. No `.test` file in any corpus names any of the six. `Library/CompilerLibrary.{fsi,fss}`, `CompilerAlgebra.{fsi,fss}` and `CompilerSystem.fss` name none of them either, so nothing in the compiler world's own library collides with the twelve new declarations.

The test now exercises the defect it is meant to. `IntegralOpsRungN.fss:144-160` binds `mOne`, `maxValue` and `minValue` and pins the `-1` divisor at zero, at `±8` and at the minimum for `REM`, `MOD` and `GCD`, with `MIN REM 3` = `-2`, `MIN MOD 3` = `1` and `MIN GCD 2` = `2` beside them; `:159-160` pin `MIN LCM -1` and `MIN GCD 0` as overflowing through a `shouldOverflow` copied verbatim from `Integer3.fss:17-24`, which is right because both true results are `2^31`; `:245-250` repeat the `-1` and minimum cases on `ZZ64` through `.asString`. Negative operands are covered in all four sign combinations for both `REM` and `MOD` (`:94-125`), and division by zero for `DIV`, `REM` and `MOD` including `0 MOD 0` (`:135-139`). The `.test` file uses `run_out_contains`, which the harness actually checks (`FileTests.java:141`, `:147`), and not the `run_out_WIcontains` that `Boolean.test:13` writes and the harness ignores.

The harness citations the worker corrected against the judge are correct as corrected. `Shell.java:1070` is `private static int junit(List<String> args)` and `:1086` is the `FileTests.suiteFromListOfFiles(args, ...)` call; `FileTests.java:887` is that method and `:907-913` is the loop that recovers a directory from each path; `:855` is `compilerSuite`, the entry point `LibraryJUTest.java:41` uses. `library_tests/Integer.test` is fourteen lines with `tests=` at `:10`, `compile`/`link`/`run` at `:11-13` and `run_out_WIcontains=PASS` at `:14`, so the judge's `:16-19` and my own citation of it were both wrong and the record now carries the right one. Saying so in the report was the right thing to do.

The third FACTS line's claim survives inspection of the five dormant assertions themselves, which I had not checked in the first round. `Integer3.fss:87-91` are `seven DIV zero`, `minusSix DIV zero`, `zero DIV zero`, `minValue DIV zero` and `maxValue DIV zero`; every one reaches `simpleIntArith.java:79`'s `if (b==0)` before the `a==(-a)` guard at `:80`, so all five raise a catchable `DivisionByZero` and `probes/CatchDivZero.fss` is a faithful stand-in for the first of them. The scope qualifier ("on the compiled path") is now on the line, and the record does not guess why the team commented them out.

## My own differential: four programs the worker did not write

Under `probes/skeptic/`, each run under `walk` and then compiled: `SkepR2Divisor`, `SkepR2Cross`, `SkepR2Lit`. (A fourth, an earlier form of `SkepR2Cross`, is described below; it is not kept.)

**`SkepR2Divisor` — the type minimum as a *divisor*, and the guard from inside the Euclid loop.** Everything measured so far, by the rung and by my first round, uses the minimum as a dividend; nothing anywhere uses it as a divisor, and nothing reaches the new guard except at the call site. `MOD`'s correcting branches add the divisor to the remainder, which is the one place the body could overflow if it were written wrongly, and `5 GCD MIN` drives Euclid down through `2 REM -1`, which is the guard reached from inside `GCD`. Eighteen cases. Walk and compiled agree exactly on all ten `REM`/`MOD` cases — `5 MOD MIN` = `-2147483643`, `MAX MOD MIN` = `-1`, `-5 MOD MIN` = `-5`, `MIN MOD MIN` = `0`, `0 MOD MIN` = `0` — and on `5 GCD MIN` = `1`, `MIN GCD 5` = `1`, `MAX GCD MIN` = `1`, `MAX GCD -1` = `1`. The four that diverge are the four whose true result is unrepresentable: `MIN GCD 0`, `0 GCD MIN`, `MIN LCM 1` and `5 LCM MIN` are `THROWS` compiled and `-2147483648` under walk. Compiled is right on all four; see correction 1.

**`SkepR2Cross` — the guard's constant checked against the unguarded path.** This is the check the rung does not make and could not make from inside its own expectations: the guard returns `0` without evaluating `DIV`, so `0` has to be justified by something that is not the guard. `basic-integers.tex:489` states `property FORALL (m, n) m REM n = m REM (-n)`, so `m REM -1` must equal `m REM 1`, and `n = 1` does not hit the guard and goes through `DIV`. Over 121 dividends from `-60` to `60`, compiled and under walk: `bad REM(-n) symmetry = 0`, `bad REM negation = 0` (`:490`), `bad MOD -1 vs MOD 1 = 0`, `bad MOD periodicity at -1 = 0` (`:488`, at `k = 7`), `nonzero REM -1 = 0`. The guard returns the value the unguarded path returns at the mirror divisor, on both paths.

**`SkepR2Lit` — the divisor as a numeral at the call site, and through coercion.** Every measurement so far writes the divisor as a typed binding; a program writes a numeral, and the folding phase does not fold these operators (`IntegerLiteralFoldingVisitor.java:105-106`), so the numeral must coerce to the trait before the guard can be reached at all. Compiled: `7 REM -1` = `0`, `7 MOD -1` = `0`, `7 GCD -1` = `1`, `7 LCM -1` = `7`, `-7 REM -1` = `0`, `-7 MOD -1` = `0`, `(-7) MOD mOne` = `0`. The mixed pair reaches the `ZZ64` overload through `coerce` with a `-1` numeral: `10^10 REM -1` = `0`, `10^10 MOD -1` = `0`, `10^10 GCD -1` = `1`, `-10^10 MOD -1` = `0`, `7 REM -1` at `ZZ64` = `0`. The target program's own shape with a negative modulus, `applyIt(fn (i: ZZ32): ZZ32 => i MOD mOne, 30)`, gives `0`. Walk agrees on twelve of the thirteen; the exception is `7 LCM -1`, `-7` under walk against `7` compiled, which is row 330 reached from a new direction.

**An accident worth recording.** My first version of `SkepR2Cross` wrote `-(m REM mOne)` and died compiled at `m = 0` with `IntegerOverflow` from `intOverflowingNeg(simpleIntArith.java:85)` through `opr -(self): ZZ32` at `CompilerBuiltin.fss:652`. That is row 329's `-0` defect, tripped by ordinary loop code over a symmetric range rather than by a probe built to find it, which is a fair measure of how easily the row will be met. The probe now skips `m = 0` and says why.

## The failure-mode question

**Loud to quiet, and the value is right.** Before the repair, `x REM -1`, `x MOD -1` and `x GCD -1` produced a `FortressException: IntegerOverflow` with a four-frame stack naming `intOverflowingDiv`, `DIV`, `REM` and `MOD`. After it they produce `0`, `0` and `1`. Whoever meets these expressions now gets a number where they previously got a stack trace, so the diagnosability question has to be asked and answered rather than waved at: the values are `0` for `REM` and `MOD` at every dividend including the type minimum, and `1` for `GCD` at every nonzero dividend, and they are the specification's own (`basic-integers.tex:484`, `:465-468`, `:523-524`). I did not take that on the rung's word. `SkepR2Cross` derives the same values from the mirror divisor `n = 1`, which the guard does not intercept, over 121 dividends with zero violations; `SkepR2Divisor` and `SkepR2Lit` reproduce them at the boundary, through coercion and from inside `GCD`'s loop. The lost stack trace was a false alarm reporting an overflow that did not occur, so nothing diagnostic was lost with it.

**One consequence to state plainly, because it is permanent.** `REM` now returns `0` at `other = -1` without consulting `DIV`, so when row 329 is closed and `intOverflowingDiv` is repaired, `REM`, `MOD` and `GCD` will still not exercise that repair at the `-1` divisor. That is deliberate and it is correct — `MIN DIV -1` must keep throwing (`Integer3.fss:127`, `Integer4.fss:127`), so `REM` needs its own `-1` case whatever the native does — but it means the guard, not the native, is where `x REM -1` is defined from now on, and a future defect in `DIV` at `-1` would be invisible through the three operators written over it. The rung says this; I am confirming it is true and that it is the right trade.

**Quiet-wrong to loud, unchanged and still an improvement.** `MAX LCM 2`, `100000 LCM 99999`, `MIN LCM 1`, `5 LCM MIN`, `MIN GCD 0` and `0 GCD MIN` wrap silently under `walk` and throw on the compiled path, where every true result is unrepresentable.

## Required corrections

Four. None is a preference; each is something a reader of the record would otherwise get wrong.

1. **Row 330's stated fix does not close the case the row names, and must be corrected.** The row says "The fix is `Math.abs` on the zero case in `Int.gcd` and on the result in `Int$Lcm` and `Long$Lcm`, plus an overflow check on the `LCM` multiplication." Applied as written, `0 GCD MIN` and `MIN GCD 0` still answer `-2147483648` under `walk`. The reason is in the code and not in the sign: `Int.gcd` computes in `long` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:247`), and `Int$Gcd` narrows the result with `return (int) gcd(u, v);` (`:130-134`), so the zero case returns `-2147483648L` and `Math.abs` of it is `2147483648L`, which the `(int)` cast wraps straight back to `-2147483648`. The true `GCD` is `2^31`, which no `ZZ32` holds, so the correct behaviour is the throw the compiled path gives. The row must say that the `GCD` half needs a representability check and not only a sign normalization, and must name where: on `ZZ32` the wrap is the narrowing cast at `Int.java:130-134`, and on `ZZ64` `Long$Gcd` passes the `long` straight through (`Long.java:140-144`, `return Int.gcd(u, v);`) so the wrap there is `Math.abs(Long.MIN_VALUE)` being `Long.MIN_VALUE` — two different mechanisms for one defect, and `Math.abs` defeats the stated fix in both. It should add the two measurements: `MIN GCD 0` and `0 GCD MIN` are `-2147483648` under `walk` against `THROWS` compiled (`probes/skeptic/SkepR2Divisor.walk` and `.compiled`, lines 15-16). Without this, a reader six months from now applies `Math.abs`, sees the sign cases pass, and closes a row that is still open.

2. **Row 330 should also name `MIN LCM 1` and `5 LCM MIN` among the silent wraps**, or say that the three it names are examples rather than the set. Both are `-2147483648` under `walk` against `THROWS` compiled (`SkepR2Divisor`, lines 17-18), and both are the minimum-as-operand case rather than the large-product case the row's three examples all are. One clause.

3. **The differential section of REPORT.md and row 330 should cite the three second-round probes**, since they are the only measurements in the record of the minimum as a divisor, of the guard reached from inside `GCD`'s loop, of a numeral `-1` at the call site, and of the guard's value checked against the unguarded path at `n = 1`. `probes/skeptic/SkepR2Divisor`, `SkepR2Cross` and `SkepR2Lit`, with their `.walk` and `.compiled` captures, are committed on this branch beside the first round's.

4. **`record.md`'s third FACTS line should say which five assertions it is talking about.** It claims `Integer3.fss:87-91` "would pass if uncommented" on the evidence of a probe that reproduces only the first of them. The claim is in fact true of all five — they are `seven DIV zero`, `minusSix DIV zero`, `zero DIV zero`, `minValue DIV zero` and `maxValue DIV zero`, and every one reaches `simpleIntArith.java:79`'s `if (b==0)` before the `a==(-a)` guard at `:80` — but the record does not say so, and the two that involve the minimum are exactly the ones a careful reader would doubt. One clause naming the five and the `b==0`-first ordering closes it.

## What I did not do

I did not edit any of the worker's source changes, any of its reports, or the first-round section of this file, and I did not run `ant testFast` or `ant testSystem`. The gated checks I ran are the two `fortress junit` invocations named above, which is what the worker ran and which the batch permits. My three probes and their six captures are under `probes/skeptic/`; nothing else in the tree was touched by me except this file.
