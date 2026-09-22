# Rung R, first skeptic: `round` on a float, half to even

**Verdict: refused. One thing must change.** The rung's own claim holds. Its two tokens are right, its failure was recorded before the edit, its test has teeth for both natives, and after the edit `walk` and the compiled path agree on every float value I tried. But one of my own differentials measured a defect the rung does not repair, and the rung changes that defect's answers. The defect: a numeral with a radix point is rounded as its nearest double, not as the rational number the specification says it is. The specification settles it, so under the batch's rules it belongs in home 2, an `XXX` test, and that test has to exist and be checked before this rung is approved. The one thing to change, and the corrections that ride with it, are at the end.

## What I inherited, and what I re-ran

The branch `wip/rung-round-half-even` carries four worker commits over `d610695c0`: `d4b4e004b` (the failing test and the pre-edit captures), `ae523fa93` (the edit and the recorded pass), `151a44638` (REPORT.md, record.md and the compiled captures), and `d7f512070` (a one-line change to the provenance block). No skeptic had looked at it. The worktree was clean apart from the gitignored `tmp/`. I re-ran every check I rely on below instead of reading the worker's logs.

To get the "before" side without touching the worker's source, I compiled the base's `Float.java` and `RR32.java` (`git show d610695c0:…`) into `tmp/sk-before-classes` and put that directory ahead of `ProjectFortress/build` on the classpath (`java -cp tmp/sk-before-classes:$(bin/fortress_classpath) com.sun.fortress.Shell …`). `javap` shows `Math.round:(D)J` in both `Round` classes there, and `Math.rint:(D)D` in the build. The same method reproduces both of the worker's walk-probe captures line for line (the `RoundHalfEvenWalkProbe` rerun matched `-before.txt` and `-after.txt`, and the 13-line difference between them).

All differentials ran at `FORTRESS_THREADS=1`. I also ran the walk probe at 4 threads, because it contains a `SUM` reduction, and got an identical answer (`probes/skeptic/SkRoundWalk-after-t4.txt`). The diff touches no mutable state, field, atomic block or library write.

## 0. The provenance block

I opened each citation with `sed -n`:

- **problem**: `explorations/compile-ladder/rung-rr64-functions/probes/RoundHalfWalkProbe.out:2` reads `round(2.5)     = 3`. The file is tracked despite its `.out` name (`git ls-files` lists it). `explorations/fortress-gap-ledger.md:340` is row 329. Both hold.
- **spec**: `Specification/basic-lib/numbers.tex:470-472` is the half-to-even sentence, which I read at `:445-490`. The section is "Rational Numbers" (`:16`), and ℚ is a subtype of ℝ (`:37`). `Specification/basic/operators/opr-overview.tex:178-179` and `:211-212` are the two "IEEE 754 'round to nearest'" sentences, which I read at `:160-215`. Both are prose chapters, with no `library/apis/` citation. The half-to-even sentence is identical in `Specification-1.0-frozen/`. All hold. The line leaves out one passage, covered under "Corrections" below.
- **precedent**: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:132-134` is `doubleRound`, `return (long) Math.rint(a);`. It holds.
- **deviation**: `RR32.java:326` holds. `explorations/coordinator/POSITIONS.md:49` names only `Float.java:384`, as the line says. `Library/FortressLibrary.fss:296-300` is `assert(x:Any, y:Any, failMsg: Any...)`, which compares with `=/=`. All hold.
- **historical**: the line names `Float.java` and `RR32.java`, the two files of the 2012 tree that the diff edits; the third file is new. It holds.

## 1. The recorded failure

It exists, and it predates the edit:

- `probes/failure-before-edit.txt` is stamped 20:44:56Z and shows `FAIL: a Long: 3 =/= a Int: 2; RR64 literal round(2.5) = 2 …`, exit 1.
- `probes/harness-before-edit.txt`, under `SystemJUTest`, is stamped 20:45:12Z and shows `Tests run: 1,  Failures: 1`.
- Both were committed in `d4b4e004b` at 20:45:23, a commit that contains no Java change. `Float.java` was modified at 20:46, and the edit was committed in `ae523fa93` at 20:47:52.

I reproduced both states myself (`probes/skeptic/SkRungTest-both.txt`). Against the base's two natives the test fails at `:7` with the same message, and after the edit it prints `PASS` with exit 0. Under `SystemJUTest` on a one-file copy the result is `OK (1 test)` (`probes/skeptic/SkHarness-after.txt`).

## 2. The diff

The diff is two tokens and nothing else. The two methods can disagree only at an exact tie:

- `Math.round(x)` rounds a tie up (JDK 7 and later; JDK 25 here), and `Math.rint` sends a tie to even. They differ only at `x = k + 1/2` with `k` even, which is where `Math.round` goes up and `rint` goes down.
- NaN gives 0 either way.
- ±∞ and `|x| ≥ 2^63` saturate identically: the `(long)` narrowing saturates, and `Math.round` saturates too.
- In `RR32$Round`, widening a float to a double is exact, so `rint` on the widened value is `rint` on the float.

The rerun probe pair confirms it: the 13 changed lines are exactly the ties with an even lower neighbour, and NaN, ±∞ and ±`exp(100)` are unchanged. The diff is as small as the test needs.

## 3. The precedent search

The worker followed the right precedent: the same call in the same kind of native. The counts check out:

- `grep -rn 'Math\.round'` over `ProjectFortress/src`, `Library` and `ProjectFortress/LibraryBuiltin` now finds only `useful/VotingRoundCalc.java:33`, a standalone `main`.
- `grep -rnw rint` over `ProjectFortress/src` finds exactly `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:133`.
- No `HALF_UP`, `HALF_EVEN` or `RoundingMode` exists in the source.

One citation is wrong. The report says the precedent "came from rung F, `632d7cf22`". That commit is only on `origin/wip/rung-rr64-functions`, and `git merge-base --is-ancestor 632d7cf22 HEAD` fails. The commit on main that brought `simpleDoubleArith`'s `rint` is `b70ed4590` (`git log -S'Math.rint' -- …/simpleDoubleArith.java`). The wrong hash came from the batch record (`explorations/coordinator/CLIMB-BATCH-3.md:120`).

## 4. The test

`ProjectFortress/tests/RoundHalfEvenRungR.fss` exercises the defect by both routes:

- A literal goes through `trait Number`'s body at `Library/FortressLibrary.fss:422`, then `asFloat`, then `Float$Round`.
- A `SQRT` value goes straight to `Float$Round`.
- An `RR32` goes to `RR32$Round`.

The file has one comment line, which points at REPORT.md. Every tie assertion carries its citation in its message.

The file's first assertion fails before the edit, so the recorded failure shows only the `Float$Round` half. To check that the `RR32` half has teeth of its own, I put only the base's `RR32` classes ahead of the build, leaving `Float$Round` fixed. The test then fails at `:30`, `RR32 round(2.5) = 2` (`probes/skeptic/SkRungTest-rr32-reverted.txt`). So each native is pinned by its own assertions.

The `.asZZ32` form really is unavailable in the interpreter world: it has zero hits in `Library/FortressLibrary.fss`, `.fsi` and `FortressBuiltin.fss`. The shard arithmetic is right too: the file is index 79 of the 390 sorted names, and `79 % 4 = 3` (`FileTests.java:799-802`).

## 5. Competing declarations

I grepped for `RoundHalfEvenRungR`, `RoundHalfEvenWalkProbe`, `RoundHalfEvenCompiledProbe` and my own component names over `ProjectFortress/tests`, every `ProjectFortress/*_tests`, `ProjectFortress/src/com/sun/fortress` whole, `Library`, `ProjectFortress/LibraryBuiltin` and `ProjectFortress/demos`. Each name occurs only in its own file. `class Round` exists only in `Float.java:382` and `RR32.java:324`, and `$Round` is referenced only at `FortressBuiltin.fss:191` and `:342`.

## 6. record.md

**The four line-number corrections in the ledger note are right.** The rational body is at `FortressLibrary.fss:592`, `trait Number`'s `round` at `:422`, `trait QQ` at `.fsi:373`, and the compiled pin at `RR64FunctionsRungF.fss:87-90`. Three statements need fixing:

- **The FACTS line's saturation clause is wrong as written.** "Saturated to `±(2^63-1)`/`-2^63`" reads as if −∞ saturated to −(2^63−1). What happens is that +∞ and values at or past 2^63 give `9223372036854775807` (2^63−1), and −∞ and values at or below −2^63 give `-9223372036854775808` (−2^63). The rung's own compiled capture shows exactly that (`probes/RoundHalfEvenCompiledProbe.txt`).
- **The ledger note's evidence paths are ambiguous where they will be pasted.** It cites `probes/failure-before-edit.txt` and `probes/pass-after-edit.txt` without a rung directory. Both names also exist under `explorations/compile-ladder/rung-rr64-functions/probes/`. Row 329's existing text already cites that rung's probes in the same relative form (`probes/skeptic/SkZeroWalk.out`), so a reader will open rung F's files. Every path in the note needs its full `compile-ladder/rung-round-half-even/probes/…` form.
- **The header says rungs L and C edit the two library files "only below the lines cited here". That is not true of `.fsi:373`.** Rung L's fifth fix edits that very line: `trait QQ … comprises { ... }` becomes `comprises { AnyIntegral }` (`CLIMB-BATCH-3.md:97`). The edit is in place and the line does not move, so the citation `trait QQ` at `.fsi:373` survives. The sentence should say that rather than what it says now. This is a finding, not a required correction.

## 7. The three homes

The worker's two defects are both in home 1, and I checked each:

- `walk`'s `RR64` round (row 329) is asserted at `RoundHalfEvenRungR.fss:7-10` and `:17-20`.
- `walk`'s `RR32` round, which row 329 does not name, is asserted at `:30-34`.

Both pass after the edit, both fail against the base's natives, and I showed the `RR32` half failing on its own.

The defect I measured (below) has no home. That is the refusal.

## The differentials I ran

These are my own programs, not the rung's. Each was run under `walk` and, where the compiled prelude can express it, through `fortress compile` and `fortress run`. The compiled path's extra space after `=` (row 76) is ignored in the comparisons.

1. **`probes/skeptic/SkRoundWalk.fss` against `SkRoundComp.fss`**, which build float values by routes the rung's test does not use: arithmetic (`two + 0.5`), division (`five / 2.0`), a user function's result (`halfOf(5.0)`, `halfOf(-7.0)`), a typed `RR64` binding (`6.5`), and large ties, `4503599627370494.5` and `4503599627370495.5` (just under 2^52, where the spacing is 1/2). The probe also covers the value just under 1/2 (`0.49999999999999994`), `-0.0`, `-0.4`, 2^53−1, a sum of three rounds, and `RR32` ties including `8388606.5` and `8388607.5` (just under 2^23). On the compiled path the `RR32` values come from a typed binding, `b32: RR32 = 8388606.5`, through `CompilerBuiltin.fsi:476` `coerce(x: FloatLiteral)` and `RR64`'s `coerce(x: RR32)` at `:435`. `walk` also got a generic `roundAny[\T extends Number\]`, `ℚ` values `5/2` and `-7/2`, a `SUM[i <- 0#4] round(i + 0.5)` reduction, and an `RR32` sum `q + q`.
   - **Walk after, against compiled: all 15 shared lines agree.** `arith` 2/2, `div` 2/2, `halfOf(5.0)` 2/2, `halfOf(-7.0)` −4/−4, typed `6.5` 6/6, `4503599627370494.5` → `4503599627370494` on both, `8388606.5` → `8388606` on both, `RR32` 2.5 → 2 on both, sum 8/8.
   - **Walk before, against compiled: 9 of the 15 disagree**, and `walk` gives 3, 3, 3, −3, 7, `4503599627370495`, 9, `8388607` and 3. The walk-only lines move the same way: `roundAny(2.5)` goes 3 → 2, the reduction 10 → 8, and the `RR32` generic 3 → 2. The `ℚ` lines are unchanged (2 and −4), since they go through the rational body.
   - Captures: `SkRoundWalk-before.txt`, `SkRoundWalk-after.txt`, `SkRoundWalk-after-t4.txt` and `SkRoundComp.txt`.
   - **Rule 4.** Before the edit the two paths disagreed. For a literal operand the specification settles it against the old `walk` directly: `basic/expressions/literals.tex:162-163` makes a numeral with a radix point a rational literal, and `basic-lib/numbers.tex:470-472` rounds a rational half to even. For a `Float` or `RR32` value the prose is silent, and the ground is the decision at `POSITIONS.md:49`, with `opr-overview.tex:178-179` as corroboration. The rung repairs the interpreter, and after the edit the two paths agree.
2. **`probes/skeptic/SkNearTie.fss`** rounds four numerals that lie within half an ulp of a tie but are not ties: `round(2.50000000000000001)`, `round(2.49999999999999999)`, `round(3.49999999999999999)` and `round(0.50000000000000001)`. `SkNearTieRational.fss` rounds the same four values written as quotients, which the library makes rationals.

   | case | numerals: walk after | numerals: compiled | numerals: walk before | the same values as rationals (walk) |
   |---|---|---|---|---|
   | 2.50000000000000001 | 2 | 2 | 3 | 3 |
   | 2.49999999999999999 | 2 | 2 | 3 | 2 |
   | 3.49999999999999999 | 4 | 4 | 4 | 3 |
   | 0.50000000000000001 | 0 | 0 | 1 | 1 |

   Capture: `SkNearTie.txt`. **Rule 4.** The two paths agree with each other and disagree with the specification, which settles it against both of them (derivation below). The repair lies outside this rung, which is the legitimate fourth case: the rung lands and the defect gets a gated home and a row.
3. **`probes/skeptic/SkNearIntNumeral.fss`** tries the same cause on the other three methods. `floor(2.99999999999999999)` gives 3.0, `ceiling(2.00000000000000001)` gives 2.0 and `truncate(2.99999999999999999)` gives 3, on both paths; the specification's answers are 2, 3 and 2. The rung does not change these. Capture: `SkNearIntNumeral.txt`.
4. **The rung's own test** was run against the base's two natives (red at `:7`), after the edit (green), with only `RR32` reverted (red at `:30`), and under `SystemJUTest` (`OK (1 test)`). Captures: `SkRungTest-both.txt`, `SkRungTest-rr32-reverted.txt` and `SkHarness-after.txt`.

## The defect this rung leaves without a home

**What it is.** A numeral with a radix point is rounded as the nearest `double` to it, not as the rational number it denotes. This happens on both paths.

- In `walk`, a `FloatLiteral`'s `round` is `trait Number`'s body `round(self): ZZ = round(asFloat(self))` (`Library/FortressLibrary.fss:422`). `FloatLiteral$AsFloat` returns `FFloatLiteral.getFloat()`, which is `Double.valueOf(value)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java:39-40`). Yet `FFloatLiteral` keeps the numeral's decimal digits as a `String` (`:17`, `:28`), so the exact value is available.
- `floor`, `ceiling` and `truncate` share the step (`FortressLibrary.fss:417`, `:419`, `:421`).
- On the compiled path, `trait RR64`'s `coerce(x: FloatLiteral) = x.asRR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:927`) converts the numeral before `RR64.round`.

**The specification settles it.** I read each passage at ±10 lines:

- `Specification/basic/expressions/literals.tex:162-163`: "Numerals containing a radix point are actually rational literals; thus 3.125 has the rational value 3125/1000."
- `:132-148`: numerals are "not directly converted to any of the number types", because "converting it immediately to a floating-point number may lose precision", and the library defines coercions "from numerals to integers (for simple numerals) and rational numbers (for compound numerals)".
- `Specification/basic/lexical-structure.tex:1137-1138`: a numeral is compound if it contains a `.`.
- `Specification/basic-lib/numbers.tex:470-472` rounds a rational half to even, and `:464-468` define `floor`, `ceiling` and `truncate` on the rational.

So `round(2.50000000000000001)` is 3, `round(0.50000000000000001)` is 1, `round(3.49999999999999999)` is 3 and `round(2.49999999999999999)` is 2. The same four passages are identical in `Specification-1.0-frozen/`. `walk`'s own rational body gives exactly these answers when the values are written as quotients (`SkNearTieRational.fss`).

**What this rung does to it.** The rung did not create the defect, but it changes three of its four answers on `walk`:

- `2.50000000000000001` goes 3 → 2, and `0.50000000000000001` goes 1 → 0. Before the rung, `walk` gave the specification's answer on these two, because half-up agreed with it.
- `2.49999999999999999` goes 3 → 2, from wrong to right.
- `3.49999999999999999` stays 4, which is wrong.

REPORT.md says nothing about any of this. The rung was right to take `rint`. The defect sits one step earlier, in the numeral's conversion, and its repair is a `FloatLiteral` `round` over the exact decimal (the `BigDecimal` `HALF_EVEN` of the digits `FFloatLiteral` already holds, with `floor`, `ceiling` and `truncate` beside it) together with the compiled coercion. That is outside this rung.

**Its home is 2.** The specification settles it, so the home is an `XXX` test. I wrote the proposal as `probes/skeptic/XXXRoundNearTieNumeral.fss`, four assertions with the specification's answers. It fails today at its first assertion (`FAIL: a Long: 2 =/= a Int: 3; …`). Under `SystemJUTest` on a one-file copy, the harness reports `OK Saw expected exception` (`probes/skeptic/SkXXXNearTie-harness.txt`). The reason is in `FileTests.java`: `InterpreterTest` sets its expected-failure flag from the file name, `s.startsWith("XXX")` (`:711`); a thrown assertion then counts as a success (`:360`), and a run that passes fails the suite with "Missing expected failure" (`:400-402`). `ProjectFortress/tests/` has 55 `XXX` files and no `.test` files, so an interpreter `XXX` test needs no `.test` file. I did not place the file in `tests/`, because a skeptic does not edit the rung's tree.

## The failure-mode question

The rung replaces no loud failure. Before and after, `round` on a float returns a quiet `ZZ64` everywhere. The rung changes it only at exact ties whose lower neighbour is even. At NaN it still returns 0. At ±∞ and past ±2^63 it still saturates to 2^63−1 and −2^63, identically on both paths before and after (the rung's probe pair, which I reproduced, and `RoundHalfEvenCompiledProbe.txt`). That saturation is already recorded in row 330's note.

## Other findings, not required

- The worker's compiled probe says, in its comment, that "the RR32 lines have no compiled twin". They do: a typed binding `x: RR32 = 2.5` builds an `RR32` on the compiled path, and its `round` agrees with `walk` at the ties (`SkRoundComp.txt`, the three `RR32` lines).
- The test's literal-line messages cite `numbers.tex:470-472` alone. `literals.tex:162-163` is what makes that clause apply to a numeral. It could be added, but it is not required.

## Refusal: the one thing that must change

**Give the near-tie numeral defect its home 2 in this rung.**

1. Add `ProjectFortress/tests/XXXRoundNearTieNumeral.fss`, starting from the proposal at `probes/skeptic/XXXRoundNearTieNumeral.fss`, with its comment line pointed at REPORT.md.
2. Show it as `OK Saw expected exception` under `SystemJUTest`.
3. Show it going red, with "Missing expected failure", on a deliberate local fix, and revert the fix. For example, use a temporary `FloatLiteral$Round` over `new BigDecimal(digits).setScale(0, RoundingMode.HALF_EVEN)`, bound in `object FloatLiteral`.
4. Record the defect in REPORT.md and record.md:
   - the numerals' answers the rung changes;
   - a provisional new ledger row (the text proposed in this skeptic's output);
   - `testSystem` going to 386.

## Corrections to close in the same repair round

1. record.md's ledger note: write every evidence path in full, `compile-ladder/rung-round-half-even/probes/…`, because `failure-before-edit.txt` and `pass-after-edit.txt` also exist under `rung-rr64-functions/probes/`, which row 329 already cites in the relative form.
2. record.md's FACTS line: replace "saturated to `±(2^63-1)`/`-2^63`" with "+∞ and values at or past 2^63 saturate to 2^63−1, and −∞ and values at or below −2^63 to −2^63".
3. REPORT.md's specification section: replace "The specification settles the walk-vs-compiled divergence of row 329 against walk" with the split this rung actually has. For a numeral operand, `literals.tex:162-163` with `numbers.tex:470-472` settles it. For a `Float` or `RR32` value, the prose is silent and the decision at `POSITIONS.md:49` settles it, with `opr-overview.tex:178-179` and `:211-212` as corroboration. Add `literals.tex:162-163` to the provenance block's spec line.
4. REPORT.md's precedent section: cite the rung F commit on main, `b70ed4590`, instead of the wip-branch `632d7cf22`, or name both and say which is which.
