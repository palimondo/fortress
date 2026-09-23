# Rung R: `round` on a float, half to even

problem: the interpreter answers `round(2.5) = 3`, where the rule gives 2 — `explorations/compile-ladder/rung-rr64-functions/probes/RoundHalfWalkProbe.out:2` (ledger row 329, `explorations/fortress-gap-ledger.md:340`)
spec: for a numeral operand, "Numerals containing a radix point are actually rational literals" — `Specification/basic/expressions/literals.tex:162-163` (with `:132`, `:146-148`) — and a rational rounds half to even, "if this rational number is exactly halfway between two consecutive integers, then round returns whichever of the two integers is even" — `Specification/basic-lib/numbers.tex:470-472` (declared `:461`); `literals.tex:170-173` (one rounding when a rational static expression is part of a floating-point computation) does not reach `round(numeral)`, because the only `round` the prose defines for a rational is ℚ's (`numbers.tex:461`); for a `Float` or `RR32` value the prose is silent, and the ground is the decision at `explorations/coordinator/POSITIONS.md:49`, with "the IEEE 754 round to nearest rounding mode" of ordinary float arithmetic as corroboration — `Specification/basic/operators/opr-overview.tex:178-179`, `:211-212`
precedent: `return (long) Math.rint(a);` in the compiled path's `doubleRound` — `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:132-134`
deviation: `RR32$Round` keeps its `(double)` widening cast, `(long) Math.rint((double) x)`, where the precedent takes a `double` parameter and needs no cast — `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:326`; the decision names `Float.java:384` alone, and the second site is the batch record's, the other float type — `explorations/coordinator/POSITIONS.md:49`; the test compares with the interpreter's `assert(x, y, msg)` against an integer literal, not the brief's `.asZZ32` form, which the interpreter's library does not declare — `Library/FortressLibrary.fss:296-300`
historical: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java`

## What landed

Two tokens, one in each of the interpreter's two float `round` natives:

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:384`, in `class Round extends R2L` (`:382-386`): `return Math.round(x);` becomes `return (long) Math.rint(x);`.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:326`, in `class Round extends F2L` (`:324-328`): `return (long) Math.round((double) x);` becomes `return (long) Math.rint((double) x);`.

And two new interpreter tests:

- `ProjectFortress/tests/RoundHalfEvenRungR.fss`: 21 assertions and a closing `PASS`, the rung's gate.
- `ProjectFortress/tests/XXXRoundNearTieNumeral.fss`, added in the repair round: four assertions of the specification's answers for four numerals near a tie, an expected failure today. It is the home-2 gate of the numeral defect the first skeptic measured (see "The numeral defect measured by the first skeptic").

`testSystem` goes from 384 to 386 tests (see "What else it touches").

Nothing else was edited: not `Floor`, `Ceiling`, `ICeiling`, `IFloor`, `Truncate` or `RawBits`, not the declarations in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:190-191` and `:341-342`, and not the compiled path.

## What I inherited, and one setup decision

Nothing. When this rung started, `/home/user/fortress-round` did not exist, and the branch `wip/rung-round-half-even` existed neither locally nor on `origin`. `git worktree list` showed four of the batch's six worktrees (exclusion, defects, memo, rendering); `fortress-comments` (rung C) was missing too. The brief says the worktree is "already pushed".

**Decision:** I created the worktree myself with the recipe in `explorations/coordinator/remote-container.md:102-110`, cut from the stated base `d610695c0` and not from `main`, which had moved on by one handover commit (`343820f2c`). The commands were `git worktree add -b wip/rung-round-half-even /home/user/fortress-round d610695c0…`, `cp -a ProjectFortress/build` (copied, never symlinked, as `:112-113` require), `mkdir tmp`, and `git push -u origin wip/rung-round-half-even`. The alternative was to stop and report a missing worktree. I rejected it because the setup is documented, touches no file of the main tree's working copy and no branch but this rung's own, and costs a minute. Doing it myself did register a worktree in the main repository's `.git/worktrees/`, which only a worktree add can do. The coordinator should know that C's worktree was missing as well.

**The repair round.** The first skeptic refused the rung (`explorations/compile-ladder/rung-round-half-even/SKEPTIC.md`, commit `65598960f`), and the judge ruled repair (`explorations/compile-ladder/rung-round-half-even/JUDGE.md`, commit `0ad50c104`). The repair round inherited the branch at `0ad50c104`, six commits over `d610695c0`, with a clean tree apart from the ignored `tmp/`. Before changing anything I re-checked the build: `javap` shows `java/lang/Math.rint:(D)D` in both `Float$Round` and `RR32$Round`. `RoundHalfEvenRungR.fss` passes after the round's final rebuild (`explorations/compile-ladder/rung-round-half-even/probes/xxx-numeral-after-revert.txt`). The round added the home-2 test and its three captures, one probe (`NumeralAsDoubleProbe`), the compiled-path capture of the new test, and the corrections below. It changed no line of `Float.java`, `RR32.java` or `RoundHalfEvenRungR.fss`. Its only edits to files of the 2012 tree were the deliberate fix, which was reverted and never committed, so the provenance block's `historical:` line is unchanged.

## Where the fix belongs (rule 1)

In `walk`, a `builtinPrimitive("…")` body is matched in `NativeApp.checkAndLoadNative` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:164-192`) and the named class in `interpreter/glue/prim/` is loaded reflectively (`explorations/coordinator/map/modules-and-phases.md:84`, `:445`). Float `round` reaches Java at two sites and only two:

- `object Float`'s `round(self):ZZ64 = builtinPrimitive("…Float$Round")` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:190-191`).
- `RR32`'s `round(self):ZZ64 = builtinPrimitive("…RR32$Round")` (`FortressBuiltin.fss:341-342`).

A float literal goes through `trait Number`'s body `round(self): ZZ = round(asFloat(self))` (`Library/FortressLibrary.fss:422`), and so reaches `Float$Round` too. The test's literal lines turned from red to green on the native edit alone, which confirms it. Every float `round` the interpreter performs therefore ends in one of the two natives, and no Java code special-cases the name (`grep -rnw '"round"'` over `ProjectFortress/src/com/sun/fortress` finds nothing), so nothing folds `round` before run time. The fix belongs in the natives.

**Decision: the native, not a Fortress body.** The alternative was the shape of Guy Steele's rational body (`Library/FortressLibrary.fss:592`), `x = self + 1/2; z = floor(x); if z = x AND odd z then z-1 else z end`, written on `object Float` in `FortressBuiltin.fss`. I rejected it for three reasons:

- In floating point `self + 0.5` is inexact. `0.49999999999999994 + 0.5` is `1.0` in double arithmetic, so that body would round that value to 1. The rational body is exact only because ℚ arithmetic is exact.
- The float `floor` returns `RR64` (`FortressBuiltin.fss:180-181`), so the body would need a conversion that the native does not.
- It would replace a declaration's body in the prelude where one token in a native does.

`Math.rint` returns "the double value that is closest in value to the argument and is equal to a mathematical integer. If two double values that are mathematical integers are equally close, the result is the integer value that is even" (Java SE API, `java.lang.Math.rint`).

## Precedent search (rule 2)

Has the team solved half to even here already, and in how many ways? **Twice, in two shapes, and both are the rule:**

1. A Fortress body over exact arithmetic: `trait QQ`'s `round` at `Library/FortressLibrary.fss:592` (gls, `dc41d5000`, 2008-07-21). It is pinned by the eight `round` assertions of `ProjectFortress/tests/RationalTest.fss:398-440`, among them `assert(round(15/6), 2, "round(15/6)")` at `:428`.
2. A Java native: `simpleDoubleArith.doubleRound`, `return (long) Math.rint(a);` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:132-134`), which the compiled `RR64.round` calls (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:226`, `:983`; declared `CompilerBuiltin.fsi:471`). It came from rung F: `b70ed4590` on `main` ("Rung F: the thirteen functional methods of trait RR64 in the compiler prelude"). The same change is `632d7cf22` on `origin/wip/rung-rr64-functions`, which is not an ancestor of this branch (`git merge-base --is-ancestor` fails). The first version of this report cited `632d7cf22`, inherited from `explorations/coordinator/CLIMB-BATCH-3.md:120`.

**I copied shape 2:** the same Java call in the same kind of native, so that the two paths answer with one expression.

**The wrong shape, counted.** `grep -rn "Math.round"` over `ProjectFortress/src/com/sun/fortress`, `Library` and `ProjectFortress/LibraryBuiltin` finds three sites:

- `Float.java:384` and `RR32.java:326`, the two this rung repairs.
- `ProjectFortress/src/com/sun/fortress/useful/VotingRoundCalc.java:33`, in a standalone `main` that prints a voting schedule. Nothing references the class outside its own file, and no Fortress program can reach it, so it is not a rounding site of the language and is left alone.

Every float-to-`long` native in the glue was also listed: `grep -rn "extends R2L\|extends F2L"` over `interpreter/glue` finds nine, and only the two `Round` classes round to nearest; the others are `ICeiling`, `IFloor`, `Truncate` (both files) and `RawBits` (`Float.java:406`). After the edit, `grep -rnw rint` over `ProjectFortress/src/com/sun/fortress` returns exactly three lines: `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:133`. No `HALF_EVEN`, `HALF_UP` or `RoundingMode` exists in the source.

## The specification (rule 3)

`Specification/basic-lib/numbers.tex:470-472` (read `:450-485`) is the rule: "The method round returns the integer that is closest to this rational number, but if this rational number is exactly halfway between two consecutive integers, then round returns whichever of the two integers is even." The sentence is identical in `Specification-1.0-frozen/basic-lib/numbers.tex:470-472`.

**Its scope, stated as ledger row 329 states it.** `numbers.tex` has one section, "Rational Numbers" (`:16`), and the rule is stated of ℚ. ℚ is a subtype of ℝ in the prose (`:37`) and of `RR64` in the library (`Library/FortressLibrary.fsi:373`, `trait QQ extends { RR64, … }`). The rule therefore does not reach the float types by inheritance, and the prose has no chapter for them.

The prose that does speak to the float types is `Specification/basic/operators/opr-overview.tex:178-179` and `:211-212` (read `:153-215`): "Ordinary multiplication and division of floating-point numbers always use the IEEE 754 'round to nearest' rounding mode", and the same for addition and subtraction. IEEE 754's round-to-nearest breaks a tie toward the neighbour whose least significant digit is even. That passage governs arithmetic, not the `round` method, so it is corroboration and not the rule. The ground for this edit is these two passages together with Pavol's decision on row 329 (`explorations/coordinator/POSITIONS.md:49`): "'Agreed' to half to even on both paths (the specification's rule for rationals, IEEE's default, the team's own rational body)". The history he asked for first is `explorations/compile-ladder/rung-rr64-functions/round-history.md`, and it does not contradict that reading.

The prose that makes the rational rule reach a numeral is `Specification/basic/expressions/literals.tex:162-163` (read `:120-185`): "Numerals containing a radix point are actually rational literals; thus 3.125 has the rational value 3125/1000." With it, `:132` (numerals "are not directly converted to any of the number types") and `:146-148` (the libraries "define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)"); a numeral is compound if it contains a `.` (`Specification/basic/lexical-structure.tex:1137-1138`). One passage could pull a numeral back to a double: `literals.tex:170-173`, one floating-point rounding when a rational static expression "is mentioned as part of a floating-point computation". It does not reach `round(numeral)`: the only `round` the prose defines that applies to a rational is ℚ's (`numbers.tex:461`), and no floating-point operand is present. The sentences are identical in `Specification-1.0-frozen/basic/expressions/literals.tex:132`, `:148`, `:162`, `:170`.

**What settles the divergence, by operand.** The first version of this report said the specification settles row 329's divergence against `walk`. That holds for one kind of operand and not the other:

- **A numeral operand** (the test's literal lines, `ProjectFortress/tests/RoundHalfEvenRungR.fss:7-15`). The specification settles it: `literals.tex:162-163` makes the numeral a rational and `numbers.tex:470-472` rounds a rational half to even. These numerals are exactly representable, so half to even on their nearest double is the specification's answer, and at the ties the compiled path was right and `walk` wrong.
- **A `Float` or `RR32` value** (the test's lines `:17-36`, and row 329's own probes, which build every operand with `SQRT`: `explorations/compile-ladder/rung-rr64-functions/probes/RoundHalfWalkProbe.fss:11-12`, `explorations/compile-ladder/rung-rr64-functions/probes/skeptic/SkZeroWalk.fss:13-15`). The prose is silent. The ground is Pavol's decision at `POSITIONS.md:49`, with `opr-overview.tex:178-179` and `:211-212` as corroboration.

The judge's instruction put "row 329's own probe" on the numeral side. The probe files cited just above build their operands with `SQRT`, so they are `Float` values, and this report puts them on the silent side. The compiled path has answered by `rint` since rung F; this rung repairs `walk` for both kinds of operand.

## The test, first

`ProjectFortress/tests/RoundHalfEvenRungR.fss` is a component exporting `Executable`, as `ProjectFortress/tests/roundBug.fss` is. The directory has no `.test` files (`FileTests.java:710-711`, `InterpreterTest`): a test there passes when `Driver.runProgram` returns without an exception.

Its 21 assertions fall into three groups:

- **RR64 through a literal** (`:7-15`), which is `trait Number`'s route to `Float$Round`: the four ties the brief names, `round(2.5) = 2`, `round(-3.5) = -4`, `round(0.5) = 0` and `round(-1.5) = -2`; two ties on which half-up and half-to-even agree, `3.5 → 4` and `-2.5 → -2`; and three non-ties, `2.4 → 2`, `2.6 → 3` and `-2.6 → -3`. The ties that agree catch a body that rounds half down or toward zero, and the non-ties catch truncation.
- **RR64 through a `Float`** built with `SQRT`, as `roundBug.fss:19` builds its operand (`:17-21`): the four ties and `3.5 → 4`.
- **RR32** made with `narrow`, as `ProjectFortress/tests/testRR32.fss:19-20` makes one (`:23-36`): the four ties, `4.5 → 4` and `-4.5 → -4` (the brief's pair), and `3.5 → 4`.

Each tie line's message carries its citation, `numbers.tex:470-472, ledger row 329`, and the file's one comment line points here.

**Decision: the comparison form.** The brief asks for the form of `ProjectFortress/library_tests/RR64FunctionsRungF.fss:87-90`, which is `assert(round(twoHalf).asZZ32, two32, "round 2.5 = 2")`, and asks that it survive row 330's change of the declared type to ℤ. That exact form cannot be written in the interpreter world: `asZZ32` is declared nowhere in `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss` or `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (grep, no hit). It is the compiled prelude's conversion, needed there because that prelude is flat.

I used instead the interpreter's own form for the same assertion, `assert(round(x), 2, "…")`. That is the three-argument `assert(x:Any, y:Any, failMsg: Any...)` of `Library/FortressLibrary.fss:296-300`, which compares with `=/=`. It is how `RationalTest.fss:398-440` asserts ℚ's `round`, whose declared type is already `ZZ` (`FortressLibrary.fss:592`), so the form is shown working against a ℤ declaration. The test names `ZZ64` nowhere, so row 330's change touches none of its text.

The alternative was a typed binding such as `r: ZZ64 = round(x)`. It would pin today's declared type and break on row 330, which is what the brief asked me to avoid. What the test deliberately does not assert is the result's type; that is row 330's.

## The recorded failure and the recorded pass

- Failure, before the edit: `explorations/compile-ladder/rung-round-half-even/probes/failure-before-edit.txt` shows `FAIL: a Long: 3 =/= a Int: 2; RR64 literal round(2.5) = 2: numbers.tex:470-472, ledger row 329`, exit 1. Under `testSystem`'s own harness (`SystemJUTest` on a one-file copy of the test), `explorations/compile-ladder/rung-round-half-even/probes/harness-before-edit.txt` shows `UNEXPECTED exception` and `Tests run: 1,  Failures: 1,  Errors: 0`.
- Pass, after the edit, `ant compileAll` and a check with `javap` that both `Round` classes now call `java/lang/Math.rint:(D)D`: `explorations/compile-ladder/rung-round-half-even/probes/pass-after-edit.txt` shows `PASS`, exit 0, and `explorations/compile-ladder/rung-round-half-even/probes/harness-after-edit.txt` shows `OK (1 test)`.

An assert stops at its first failure, so the per-line picture is the walk probe, `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenWalkProbe.fss`, run before (`explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenWalkProbe-before.txt`) and after (`explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenWalkProbe-after.txt`). The diff between the two captures is exactly 13 lines:

- the four RR64 literal ties;
- the four RR64 `Float` ties;
- the four RR32 ties, and RR32 `4.5`, which went from 5 to 4.

Each is a tie whose lower neighbour is even, where `Math.round` goes up and `rint` goes down. Nothing else changed:

- the ties whose lower neighbour is odd (`3.5`, `-2.5`, `-0.5`, RR32 `-4.5`, RR32 `3.5`);
- the non-ties;
- NaN, which gives 0;
- ±∞ and ±`exp(100)`, which saturate to `9223372036854775807` and `-9223372036854775808`;
- RR32 NaN and ±∞.

So the five `round` edge values that rung F's skeptic measured (`explorations/compile-ladder/rung-rr64-functions/probes/skeptic/SkEdgeWalk.out`: NaN, ±∞ and ±`exp(100)`) are unchanged, and so are RR32's NaN and ±∞.

## Differentials

1. **Walk before against walk after:** the probe pair above.
2. **Walk after against compiled.** `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenCompiledProbe.fss` is the compiled twin of the probe's eleven RR64 `Float` lines, built the same way. It was run after the full library-order cache rebuild, and its capture is `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenCompiledProbe.txt`, compile exit 0 and run exit 0. Once the compiled path's extra space after `=` is dropped (its juxtaposition spacing, ledger row 76), all eleven lines are identical to the walk-after lines (`diff` empty). Against walk-before they differ on the four ties. So the divergence of row 329 is closed for RR64 at the ties and nothing new diverges at the edges. The probe's comment (`RoundHalfEvenCompiledProbe.fss:5-6`) says the `RR32` lines have no compiled twin. That is wrong: a typed binding such as `h32: RR32 = 2.5` builds an `RR32` on the compiled path through `trait RR32`'s `coerce(x: FloatLiteral)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:989`), as the first skeptic's `probes/skeptic/SkRoundComp.fss:24-29` does. Its capture, `explorations/compile-ladder/rung-round-half-even/probes/skeptic/SkRoundComp.txt:15-17`, gives `8388606`, `8388608` and `2`, the same as `walk` after the edit (`explorations/compile-ladder/rung-round-half-even/probes/skeptic/SkRoundWalk-after.txt:19-21`). The comment is left as captured.
3. **The new test file on the compiled path**, which is where a future full-corpus ladder run (`tests/*.fss`) will put it: `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenRungR-compiled.txt`, `fortress compile` exit 255, `File RoundHalfEvenRungR.fss has 28 errors`, all at typecheck. There are 21 `Could not check call to function assert` errors, because the compiled prelude has no `assert(Any, Any, String)`; the argument types it reports, `(ZZ64, IntLiteral, String)`, show that `round` itself typechecked on every line, RR32 included. The other 7 are `Could not check call to function narrow`, because the compiled prelude's `narrow` is `ZZ64->ZZ32` and `NN64->NN32` only. The RR32 `round` lines typecheck because `trait RR64` has `coerce(x: RR32)` and RR32 widens exactly to RR64, whose `round` is the `rint` of shape 2, so the compiled answer for RR32 is also half to even.

Classification (decision): neither of the two refusals in differential 3 is a defect of `round`. Both are names absent from the compiler prelude, which by Pavol's decision takes no new declarations and is deleted at the switch-over (`POSITIONS.md:45`), so no ledger row is opened for them. The alternative was a row for each; I rejected it because a row whose only repair is forbidden by a standing decision names no fix. The `assert` refusal is already the ladder's first error in 4 `tests/` files (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`, `first_error` column). This file will add a 382nd `tests` row, at typecheck, to the next full-corpus baseline. It is a new file, not a move.

## What else it touches

- **The interpreter corpus.** `grep -rlw round` over `ProjectFortress/tests` and `ProjectFortress/shelltests` finds four files:
  - `ProjectFortress/tests/roundBug.fss:22` rounds `SQRT(3^2+4^2)`, which is 5.0, not a tie, so it is unaffected.
  - `ProjectFortress/tests/RationalTest.fss:398-440`: all eight assertions are ℚ values and go through the Fortress body at `FortressLibrary.fss:592`, not a native.
  - `ProjectFortress/tests/zeno.fss:53` declares an unrelated getter named `round`.
  - The fourth is this rung's test.
- **Outside the gated corpora**, `ProjectFortress/demos/mg.fss:142` rounds a ratio of logarithms of a power of two, which is not a tie.
- **`testSystem`** goes 384 → 386: 385 `.fss` files in `ProjectFortress/tests/` with the two new ones, and `concurrentPrinting.sh`. `FileTests.java:790-806` sorts the names of `dir.list()` (taken at `:1123`) and keeps index `j` in shard `j mod 4`. The directory's sorted listing now has 391 names:
  - `RoundHalfEvenRungR.fss` is index 79, shard 3.
  - `XXXRoundNearTieNumeral.fss` is index 125, shard 1.

  Every name after index 79 moves one shard along, and every name after index 125 moves a second time, which is why the gate compares the shards by their sum (`c766f6cc5`). `tests/` now holds 56 `XXX*.fss` files and still no `.test` file.
- **The XXX file on the compiled path** stops at typecheck on `assert`, as the rung's own test does. `explorations/compile-ladder/rung-round-half-even/probes/XXXRoundNearTieNumeral-compiled.txt` shows `fortress compile` exit 255 and `File XXXRoundNearTieNumeral.fss has 4 errors`, all `Could not check call to function assert` with argument type `(ZZ64, IntLiteral, String)`. The ladder lists a `tests/XXX*` file with its `XXX` column set to `yes` (55 such rows in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`). So this file is a new, ungated `tests` row for a future full-corpus baseline, beside the rung's test, and not a move.
- **`testFast`** is unaffected. It excludes `SystemJUTest` (root `build.xml:989`), and the only other test class that reads `tests/`, `TopLevelEnvGenJUTest`, is excluded too (`:986`).
- **The ladder subset** is empty, and I did not run `run-subset.sh` on an empty list (decision; the alternative, running `tests/initOrder.fss` alone, would test nothing). Two greps show why the list is empty:
  - `grep -rliw round` over `explorations/compile-ladder/baseline-2026-09-19/raw/` (524 captures) finds no recorded error naming `round`, `rint`, `Float$Round` or `RR32$Round`.
  - Of the 85 files of `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt`, none contains the word `round`. The only substring hit is `around`, in a comment at `ProjectFortress/tests/initOrder.fss:35`. The batch record says initOrder contains "the word round"; it is the substring.

  The ladder stage runs the compiled path, which this rung does not touch.
- **Competing declarations.** `grep -rln RoundHalfEvenRungR` over `ProjectFortress/tests`, every `ProjectFortress/*_tests` directory, `ProjectFortress/src/com/sun/fortress`, `Library` and `ProjectFortress/LibraryBuiltin` finds only the new file. The same grep for `XXXRoundNearTieNumeral` and `NumeralAsDoubleProbe`, adding `ProjectFortress/demos` and `ProjectFortress/shelltests`, finds only `ProjectFortress/tests/XXXRoundNearTieNumeral.fss`. The probe components' names occur nowhere else either.

## The numeral defect measured by the first skeptic (home 2)

**What was measured.** The first skeptic rounded four numerals that lie within half an ulp of a tie but are not ties (`explorations/compile-ladder/rung-round-half-even/probes/skeptic/SkNearTie.fss`). It ran them under `walk` before and after this rung's edit and on the compiled path. It also rounded the same four values written as quotients, which the library makes rationals (`explorations/compile-ladder/rung-round-half-even/probes/skeptic/SkNearTieRational.fss`). The capture is `explorations/compile-ladder/rung-round-half-even/probes/skeptic/SkNearTie.txt`:

| numeral | `walk` before (`:8-11`) | `walk` after (`:2-5`) | compiled (`:15-18`) | specification, = `walk`'s rational body on the quotient (`:21-24`) |
|---|---|---|---|---|
| `2.50000000000000001` | 3 | 2 | 2 | 3 |
| `2.49999999999999999` | 3 | 2 | 2 | 2 |
| `3.49999999999999999` | 4 | 4 | 4 | 3 |
| `0.50000000000000001` | 1 | 0 | 0 | 1 |

The compiled column was measured after the edit. It is also the compiled answer before it, because the rung touches no file of the compiled path. The specification's answers are derived under "The specification" above: `literals.tex:162-163` makes each numeral a rational, and `numbers.tex:470-472` rounds it.

**What this rung does to it.** The rung did not create this defect and does not repair it. It changes three of `walk`'s four answers:

- two move away from the specification: `2.50000000000000001` goes 3 → 2, and `0.50000000000000001` goes 1 → 0; the second skeptic measured two more that moved the same way, `2.5 + 0.00000000000000001` (3 → 2, `explorations/compile-ladder/rung-round-half-even/probes/skeptic/Sk2NegNumeral.txt:14` against `:4`) and the binary near tie `10.10000000000000000000000000000000000000000000000000000001_2` (3 → 2, `explorations/compile-ladder/rung-round-half-even/probes/skeptic/Sk2Radix.txt:14` against `:6`);
- one moves toward it: `2.49999999999999999` goes 3 → 2;
- `3.49999999999999999` stays wrong at 4.

The first version of this report did not record this. The two answers the old `walk` had right were right by coincidence. The nearest double of both `2.50000000000000001` and `2.49999999999999999` is `2.5` itself, and the nearest double of `3.49999999999999999` is `3.5`. From the one double `2.5`, the specification wants 3 for the first numeral, 2 for the second and 2 for `2.5`. No rounding rule applied to the double can give all three: half up got the first right and the other two wrong, and half to even gets the last two right and the first wrong. So these numerals are not a reason to keep `Math.round`. The rule on the double is chosen where a double is exact: at `2.5` written as a numeral, the specification says half to even, and for a `Float` or `RR32` value the decision at `POSITIONS.md:49` says the same. The near-tie numerals have to be repaired one step earlier, where the numeral becomes a double.

**The mechanism.** This is the judge's section 2 (`explorations/compile-ladder/rung-round-half-even/JUDGE.md`). I opened each of its citations:

- **The interpreter's library declares the numeral a floating-point value.** `object FloatLiteral extends RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:194`), and `trait RR64 extends Number comprises { Float, FloatLiteral, RR32, QQ }` (`Library/FortressLibrary.fss:425`, `Library/FortressLibrary.fsi:338`).
  - `object FloatLiteral` declares only `asString`, `asExprString` and `asFloat` (`FortressBuiltin.fss:195-200`). So its `floor`, `ceiling`, `truncate` and `round` are `trait Number`'s bodies over `asFloat(self)` (`Library/FortressLibrary.fss:417`, `:419`, `:421`, `:422`).
  - `FloatLiteral$AsFloat` returns `FFloatLiteral.getFloat()`, which is `Double.valueOf` of the numeral's digits (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java:39-40`). Yet `FFloatLiteral` keeps a radix-ten numeral's digits exactly, as a `String` (`:17`, `:28`).
- **The interpreter has no coercion mechanism.** `explorations/coordinator/map/spec-to-implementation.md:288` records "no occurrence of `Coercion` or `coerce` anywhere under `interpreter/`". So the coercion to ℚ that `literals.tex:146-148` describes cannot exist in `walk` in the form the specification gives it.
- **The compiled prelude has no ℚ.** `QQ` occurs zero times in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, `CompilerBuiltin.fss`, `Library/CompilerLibrary.fsi` and `CompilerLibrary.fss`. The prelude declares `trait FloatLiteral excludes {RR32, RR64}` (`CompilerBuiltin.fss:992`), and `trait RR64`'s `coerce(x: FloatLiteral) = x.asRR64` (`:928`) turns the numeral into a double before `RR64.round`.
- **The numeral types exist nowhere.** The types of `literals.tex:83-131`, such as `NaturalNumeral` and `RadixPointNumeral`, occur nowhere under `ProjectFortress/src`, `Library` or `ProjectFortress/LibraryBuiltin` (grep, no hit). Ledger row 325 records the integer half of that absence.

So the defect is the compound-numeral half of a design-level gap: on both paths a numeral with a radix point is a floating-point value, not the rational the specification makes it. The four integer-valued methods are where the gap shows without a comparison of digits. The same cause also shows in comparison and arithmetic, which matters to the choice of repair below. Under `walk`:

- `2.50000000000000001 = 2.5` is `true`;
- `2.50000000000000001 - 2.5` is `0.0`;
- the same two values written as quotients compare unequal.

The capture is `explorations/compile-ladder/rung-round-half-even/probes/NumeralAsDoubleProbe.txt:2-3` and `:5`.

**The gate.**

- `ProjectFortress/tests/XXXRoundNearTieNumeral.fss` is the first skeptic's proposal (`explorations/compile-ladder/rung-round-half-even/probes/skeptic/XXXRoundNearTieNumeral.fss`), with its one comment line pointed at this report. Its four assertions (`:7-10`) are the specification's answers, with the three that fail today first. Each message cites `literals.tex:162-163, numbers.tex:470-472`.
- **Today it is an expected failure.** Run directly, it stops at its first assertion with `FAIL: a Long: 2 =/= a Int: 3; numeral round(2.50000000000000001) = 3: …`, exit 1. Under `SystemJUTest` on a one-file copy, the harness prints ` OK Saw expected exception` and `OK (1 test)`. Capture: `explorations/compile-ladder/rung-round-half-even/probes/xxx-numeral-expected-failure.txt`.
  - The mechanics are `InterpreterTest`'s. Its expected-failure flag is `s.startsWith("XXX")` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:711`). A thrown failure then prints ` OK Saw expected exception` and returns (`:360-361`). A run that throws nothing prints ` Missing expected failure ` and fails the test (`:400-402`).
  - The shared prefix's `:922`, `:577`, `:644`, `:841` and `:843` point at other test classes' copies of the same logic, ten lines further down in this tree (`:932`, `:587`, `:654`, `:851`, `:853`), as the judge found.
- **Shown red on a deliberate local fix** (the judge's D2). I added a temporary `FloatLiteral$Round` to `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FloatLiteral.java`: `FLong.make(new java.math.BigDecimal(x.getString()).setScale(0, java.math.RoundingMode.HALF_EVEN).longValueExact())`. It was bound in `object FloatLiteral` by `round(self): ZZ64 = builtinPrimitive("…FloatLiteral$Round")`, followed by `ant compileAll` and wiped caches. With the fix in:
  - the XXX file prints `PASS`, exit 0;
  - the harness prints ` Missing expected failure ` and `Tests run: 1,  Failures: 1,  Errors: 0`, exit 1;
  - `SkNearTie.fss` gives 3, 2, 3 and 1, the specification's four answers;
  - `SkNearIntNumeral.fss` still gives `3.0`, `2.0` and `3`.

  Capture: `explorations/compile-ladder/rung-round-half-even/probes/xxx-numeral-red-on-deliberate-fix.txt`, which also carries the fix's diff.
- **Reverted.** I ran `git checkout --` on the two files, `ant compileAll` again, and wiped the caches again. Then:
  - `git status` lists neither file;
  - the build has no `FloatLiteral$Round` class, and `Float$Round` still calls `rint`;
  - the XXX file fails again, exit 1, and the harness prints ` OK Saw expected exception`;
  - `RoundHalfEvenRungR.fss` prints `PASS`, exit 0.

  Capture: `explorations/compile-ladder/rung-round-half-even/probes/xxx-numeral-after-revert.txt`.

  The fix is in no commit: `git diff --stat d610695c0...HEAD` lists `Float.java`, `RR32.java`, the two test files and this directory.

**Two decisions, the judge's, executed here** (`JUDGE.md` section 4):

- **D1: one `XXX` file, on `round` only.** `floor`, `ceiling` and `truncate` on a numeral are the same defect, with one cause and one repair under every candidate. Ledger row 360 names them, with `explorations/compile-ladder/rung-round-half-even/probes/skeptic/SkNearIntNumeral.txt`.
  - Reason: an `XXX` file flips only when every assertion in it passes. A file that also carried the other three methods would stay red through a `round`-only repair and say nothing.
  - The deliberate fix confirms the premise: with `round` repaired alone, `SkNearIntNumeral`'s three answers stay wrong.
  - Alternative rejected: a second `XXX` file for the three methods (`testSystem` 387). It would guard only against a repair of `floor` that leaves `round` alone.
  - This is a decision under the batch's home-2 rule, not under the specification.
- **D2: the deliberate fix is a real temporary native, not a swap of the asserted values.** A real native also shows that the assertions are reachable through `object FloatLiteral`'s own dispatch, and that the `FLong`-against-`IntLiteral` comparison passes when the value is right. It cost one `ant compileAll` each way (28 s and 27 s).

**The fork on the repair: Pavol's decision, and the row's fix column.** This is `JUDGE.md` section 5.2, with one correction:

- **(a) The narrow patch.** `object FloatLiteral` gets `round`, `floor`, `ceiling` and `truncate` over the exact decimal: `BigDecimal` of the digits `FFloatLiteral` keeps, with `HALF_EVEN`, `FLOOR`, `CEILING` and `DOWN`. That goes into `walk` now, and onto the compiled side with the one library at the switch-over.
  - Cost: about 30 lines and a rebuild.
  - The numeral then rounds as a rational but still compares and subtracts as a double (`NumeralAsDoubleProbe.txt:2-3`), an inconsistency inside one value.
  - The return types interact with row 330's decision (ℤ).
  - **What (a) does not reach** (the second skeptic's required correction, `SKEPTIC.md`). (a) reaches only a bare radix-ten numeral. A negated or summed numeral is already a `Float` before `round` runs, because `trait Number`'s `opr -(self)` and `opr +(self, b)` convert first (`Library/FortressLibrary.fss:378-379`), and a numeral with a radix other than ten keeps no digits (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java:28-32`). Measured, identical on both paths after rung R (`explorations/compile-ladder/rung-round-half-even/probes/skeptic/Sk2NegNumeral.txt:2-4`, `:23-25`; `explorations/compile-ladder/rung-round-half-even/probes/skeptic/Sk2Radix.txt:6`, `:23`), with the specification's answers from `literals.tex:157-158` (rational arithmetic is exact), `:162-163` and `:117-125` (a numeral's value in its radix):

    | expression | both paths | specification |
    |---|---|---|
    | `round(-2.50000000000000001)` | −2 | −3 |
    | `round(-0.50000000000000001)` | 0 | −1 |
    | `round(2.5 + 0.00000000000000001)` | 2 | 3 |
    | `round(10.10000000000000000000000000000000000000000000000000000001_2)` | 2 | 3 |

    So under (a) the `XXX` file's flip does not close the row: whoever lands (a) adds an `XXX` file for these forms or narrows the row by a recorded decision.
  - The correction: the judge's text says the numeral would also print as a double. It does not. `FloatLiteral$ToString` returns the numeral's own digits (`glue/prim/FloatLiteral.java:49-53`, bound at `FortressBuiltin.fss:195-196`), and `2.50000000000000001` prints as written (`NumeralAsDoubleProbe.txt:4`). That holds for a radix-ten numeral only: a numeral with another radix keeps a double's rendering (`FFloatLiteral.java:28-32`), and `10.10000000000000000000000000000000000000000000000000000001_2` prints `2.5` (`probes/skeptic/Sk2Radix.txt:7`).
- **(b) The design.** A compound numeral becomes a rational value, as `literals.tex:146-148` and `:162-163` say. Either `FloatLiteral` leaves `RR64` for ℚ (`FortressLibrary.fss:425`, `FortressBuiltin.fss:194`), or the one library gets the specification's coercion once the checker's coercion machinery runs on the library route. Cost:
  - every float expression that mentions a literal goes through exact rational arithmetic and one conversion, which `literals.tex:170-173` allows;
  - the hot float paths of rows 302 and 303;
  - `List[\FloatLiteral\]` inference (row 20);
  - `FFloatLiteral.seqv`;
  - ℚ is absent from the compiler prelude until the one library;
  - the checker's numeral typing (row 325) is the static half of the same design.
- **(c) The team's design stands.** A compound numeral is an `RR64` value, recorded in `POSITIONS.md` as a decision against the prose. Then the `XXX` file is deleted and the row closes as design.

The rung does not wait on this. The gate is right under (a) and (b), because both make its four assertions pass, and it is removed under (c); under (a) it flips without the row being closed, for the four expressions above.

## Every measured defect and its home

| defect | home | where |
|---|---|---|
| `walk`'s `round` on `RR64` sends an exact half toward +∞ (ledger row 329) | 1, repaired here | assertions `ProjectFortress/tests/RoundHalfEvenRungR.fss:7-10` (literal) and `:17-20` (`Float`), passing |
| `walk`'s `round` on `RR32` does the same (`RR32$Round`, the same 2008 commit `e67394471`, not named in row 329's text) | 1, repaired here | assertions `RoundHalfEvenRungR.fss:30-34`, passing |
| a numeral with a radix point is rounded as its nearest double, not as the rational it denotes, on both paths (measured by the first skeptic) | 2, deferred; the specification settles it (`literals.tex:162-163`, `numbers.tex:470-472`) | `ProjectFortress/tests/XXXRoundNearTieNumeral.fss:7-10`, an expected failure (`probes/xxx-numeral-expected-failure.txt`), shown red on a deliberate local fix and green again after the revert (`probes/xxx-numeral-red-on-deliberate-fix.txt`, `probes/xxx-numeral-after-revert.txt`); ledger row 360 (`record.md`) |
| `floor`, `ceiling` and `truncate` on such a numeral (measured by the first skeptic) | 2, the same defect as the line above: one cause and one repair under every candidate | carried by the same row, 360, with `probes/skeptic/SkNearIntNumeral.txt`; not given an `XXX` file of its own, by decision D1 (previous section) |

My own first pass measured no home-2 or home-3 defect; the first skeptic measured the numeral defect, and the repair round gave it home 2 (previous section). No home-3 defect was measured. The two compiled-prelude absences of differential 3 are classified above as not defects under the decided route, and the reason is given there.

## Record corrections found on the way

Line numbers that have moved since they were written:

- Row 329 cites the rational body at `FortressLibrary.fss:589` and `trait Number`'s `round` at `:419`; they are at `:592` and `:422` today.
- Row 329 cites the compiled pin at `RR64FunctionsRungF.fss:98-101`; it is at `:87-90`.
- Row 329 cites `trait QQ` at `FortressLibrary.fsi:370`; it is at `:373`, the line rung L edits.

Other corrections:

- The batch record's "the only one of the 85 whose text contains the word round … is `tests/initOrder.fss`" is the substring in "around" (`:35`).
- My own second commit message says "eleven ties"; the count is thirteen, as above.

Found in the repair round, where the judge's instruction and a primary source disagree. I followed the source in both cases:

- The judge put "row 329's own probe" among the numeral operands. Row 329's probes build every operand with `SQRT` (`explorations/compile-ladder/rung-rr64-functions/probes/RoundHalfWalkProbe.fss:11-12`, `explorations/compile-ladder/rung-rr64-functions/probes/skeptic/SkZeroWalk.fss:13-15`), so they are `Float` values, and the silent side of the split applies to them ("The specification").
- The judge's candidate (a) says the numeral would print as a double. It prints its own digits (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FloatLiteral.java:49-53`; `explorations/compile-ladder/rung-round-half-even/probes/NumeralAsDoubleProbe.txt:4`).

Both of the judge's notes for the coordinator's fold hold:

- `explorations/coordinator/CLIMB-BATCH-3.md:120` carries `632d7cf22`, the wip-branch commit; the commit on `main` is `b70ed4590`.
- The shared prefix's `FileTests.java` line numbers are ten lines off in this tree and belong to the other test classes. `grep -n` finds `startsWith("XXX")` at `:605`, `:711` and `:932`, and `shouldFail != failed` at `:587` and `:654`.

## Placed at the gather (2026-09-22)

The second skeptic measured two defects this rung does not touch and recommended a row for each; the gather opened both, in manifest order after this rung's row 360 (provisional 354).

- **Row 361: `walk` throws `NumberFormatException` on a radix-point numeral with an explicit radix-ten specifier** (`2.5_10`), where the compiled path answers. The specification settles it against `walk` (`Specification/basic/lexical-structure.tex:1083-1095`; `Specification/basic/expressions/literals.tex:117-125`, `:162-163`), so its home is 2: the skeptic's proposed gate is placed as `ProjectFortress/tests/XXXRadixTenPointNumeral.fss`, byte-identical to `probes/skeptic/XXXRadixTenPointNumeral.fss` except that its one comment line points at this report. On the merged tree after rungs L, C and R it dies with `NumberFormatException: For input string: "2.5_10"` and reports `OK Saw expected exception` under `SystemJUTest`; the same program with the numerals written without `_10`, which is what a repair makes of it, prints `PASS` and, under the `XXX` name, `Missing expected failure`, Failures: 1. `RoundHalfEvenRungR.fss` passes and `XXXRoundNearTieNumeral.fss` fails as expected on the same tree. Capture: `explorations/compile-ladder/rung-round-half-even/probes/gather/radix-ten-xxx-harness.txt`; control `probes/gather/RadixTenPointNumeralCtl.fss`. The build those runs used was main's with this rung's two glue classes compiled in by `javac`; the gate rebuilds everything.
- **Row 362: the compiled path throws `NullPointerException` when it renders a floating-point numeral** (`println(2.5)`), because the runtime `FFloatLiteral.asString()` still returns `null` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java:52-54`), where the team repaired its `FIntLiteral` twin (`FIntLiteral.java:57-61`). The prose is silent on how a numeral renders, so its home is 3: the row with `probes/skeptic/Sk2NumeralPrint.fss` and its capture. Rung S's new compiled `Object.asString` default does not reach it: on the merged tree after rung S the probe throws the same exception (`explorations/compile-ladder/rung-round-half-even/probes/gather/numeral-print-after-S.txt`), measured at the gather after S was applied.

`testSystem` gains a third file from this rung's commit; the batch takes it from 384 to 392: 389 at the gather, and three more placed at the merged-diff review's repair for rows 356 and 369 (`explorations/compile-ladder/climb-batch-3/RECORD.md`, "Repair after the judge's ruling").

## Cost

- `ant compileAll`: 65 s before the edit and 31 s after (`javac` recompiled 2 files).
- Library-order cache rebuild: 204 s. AnyType took 34 s, CompilerBuiltin 130 s, CompilerLibrary 35 s, CompilerAlgebra 2 s and CompilerSystem 3 s.
- Each test run: about 5 s.
- Repair round: two `ant compileAll` runs for the deliberate fix and its revert, 28 s and 27 s (`javac` recompiled one file each time; `compileAll` also deletes `default_repository/caches`). The first `walk` run after a cache wipe took about 19 s, and later runs about 4 s. The XXX file's compiled-path capture used the warm bytecode cache before the first wipe. After that wipe the bytecode cache was not rebuilt, because nothing later in the round runs on the compiled path.

`ant testFast` and `ant testSystem` were not run, by the batch's rule.
