# Rung R: `round` on a float, half to even

problem: the interpreter answers `round(2.5) = 3`, where the rule gives 2 — `explorations/compile-ladder/rung-rr64-functions/probes/RoundHalfWalkProbe.out:2` (ledger row 329, `explorations/fortress-gap-ledger.md:340`)
spec: "if this rational number is exactly halfway between two consecutive integers, then round returns whichever of the two integers is even" — `Specification/basic-lib/numbers.tex:470-472`, stated of ℚ (see "The specification"); for the float types, ordinary arithmetic uses "the IEEE 754 round to nearest rounding mode" — `Specification/basic/operators/opr-overview.tex:178-179`, `:211-212`
precedent: `return (long) Math.rint(a);` in the compiled path's `doubleRound` — `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:132-134`
deviation: `RR32$Round` keeps its `(double)` widening cast, `(long) Math.rint((double) x)`, where the precedent takes a `double` parameter and needs no cast — `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:326`; the decision names `Float.java:384` alone, and the second site is the batch record's, the other float type — `explorations/coordinator/POSITIONS.md:49`; the test compares with the interpreter's `assert(x, y, msg)` against an integer literal, not the brief's `.asZZ32` form, which the interpreter's library does not declare — `Library/FortressLibrary.fss:296-300`
historical: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java`

## What landed

Two tokens, one in each of the interpreter's two float `round` natives:

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:384`, in `class Round extends R2L` (`:382-386`): `return Math.round(x);` becomes `return (long) Math.rint(x);`.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:326`, in `class Round extends F2L` (`:324-328`): `return (long) Math.round((double) x);` becomes `return (long) Math.rint((double) x);`.

And one new interpreter test, `ProjectFortress/tests/RoundHalfEvenRungR.fss`: 21 assertions and a closing `PASS`. `testSystem` goes from 384 to 385 tests (see "What else it touches").

Nothing else was edited: not `Floor`, `Ceiling`, `ICeiling`, `IFloor`, `Truncate` or `RawBits`, not the declarations in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:190-191` and `:341-342`, and not the compiled path.

## What I inherited, and one setup decision

Nothing. When this rung started, `/home/user/fortress-round` did not exist, and the branch `wip/rung-round-half-even` existed neither locally nor on `origin`. `git worktree list` showed four of the batch's six worktrees (exclusion, defects, memo, rendering); `fortress-comments` (rung C) was missing too. The brief says the worktree is "already pushed".

**Decision:** I created the worktree myself with the recipe in `explorations/coordinator/remote-container.md:102-110`, cut from the stated base `d610695c0` and not from `main`, which had moved on by one handover commit (`343820f2c`). The commands were `git worktree add -b wip/rung-round-half-even /home/user/fortress-round d610695c0…`, `cp -a ProjectFortress/build` (copied, never symlinked, as `:112-113` require), `mkdir tmp`, and `git push -u origin wip/rung-round-half-even`. The alternative was to stop and report a missing worktree. I rejected it because the setup is documented, touches no file of the main tree's working copy and no branch but this rung's own, and costs a minute. Doing it myself did register a worktree in the main repository's `.git/worktrees/`, which only a worktree add can do. The coordinator should know that C's worktree was missing as well.

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
2. A Java native: `simpleDoubleArith.doubleRound`, `return (long) Math.rint(a);` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:132-134`), which the compiled `RR64.round` calls (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:226`, `:982`; declared `CompilerBuiltin.fsi:471`). It came from rung F, `632d7cf22`.

**I copied shape 2:** the same Java call in the same kind of native, so that the two paths answer with one expression.

**The wrong shape, counted.** `grep -rn "Math.round"` over `ProjectFortress/src/com/sun/fortress`, `Library` and `ProjectFortress/LibraryBuiltin` finds three sites:

- `Float.java:384` and `RR32.java:326`, the two this rung repairs.
- `ProjectFortress/src/com/sun/fortress/useful/VotingRoundCalc.java:33`, in a standalone `main` that prints a voting schedule. Nothing references the class outside its own file, and no Fortress program can reach it, so it is not a rounding site of the language and is left alone.

Every float-to-`long` native in the glue was also listed: `grep -rn "extends R2L\|extends F2L"` over `interpreter/glue` finds nine, and only the two `Round` classes round to nearest; the others are `ICeiling`, `IFloor`, `Truncate` (both files) and `RawBits` (`Float.java:406`). After the edit, `grep -rnw rint` over `ProjectFortress/src/com/sun/fortress` returns exactly three lines: `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:133`. No `HALF_EVEN`, `HALF_UP` or `RoundingMode` exists in the source.

## The specification (rule 3)

`Specification/basic-lib/numbers.tex:470-472` (read `:450-485`) is the rule: "The method round returns the integer that is closest to this rational number, but if this rational number is exactly halfway between two consecutive integers, then round returns whichever of the two integers is even." The sentence is identical in `Specification-1.0-frozen/basic-lib/numbers.tex:470-472`.

**Its scope, stated as ledger row 329 states it.** `numbers.tex` has one section, "Rational Numbers" (`:16`), and the rule is stated of ℚ. ℚ is a subtype of ℝ in the prose (`:37`) and of `RR64` in the library (`Library/FortressLibrary.fsi:373`, `trait QQ extends { RR64, … }`). The rule therefore does not reach the float types by inheritance, and the prose has no chapter for them.

The prose that does speak to the float types is `Specification/basic/operators/opr-overview.tex:178-179` and `:211-212` (read `:153-215`): "Ordinary multiplication and division of floating-point numbers always use the IEEE 754 'round to nearest' rounding mode", and the same for addition and subtraction. IEEE 754's round-to-nearest breaks a tie toward the neighbour whose least significant digit is even. That passage governs arithmetic, not the `round` method, so it is corroboration and not the rule. The ground for this edit is these two passages together with Pavol's decision on row 329 (`explorations/coordinator/POSITIONS.md:49`): "'Agreed' to half to even on both paths (the specification's rule for rationals, IEEE's default, the team's own rational body)". The history he asked for first is `explorations/compile-ladder/rung-rr64-functions/round-history.md`, and it does not contradict that reading.

The specification settles the walk-vs-compiled divergence of row 329 against `walk`. The compiled path has answered by the rule since rung F. This rung repairs `walk`.

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
2. **Walk after against compiled.** `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenCompiledProbe.fss` is the compiled twin of the probe's eleven RR64 `Float` lines, built the same way. It was run after the full library-order cache rebuild, and its capture is `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenCompiledProbe.txt`, compile exit 0 and run exit 0. Once the compiled path's extra space after `=` is dropped (its juxtaposition spacing, ledger row 76), all eleven lines are identical to the walk-after lines (`diff` empty). Against walk-before they differ on the four ties. So the divergence of row 329 is closed for RR64 at the ties and nothing new diverges at the edges.
3. **The new test file on the compiled path**, which is where a future full-corpus ladder run (`tests/*.fss`) will put it: `explorations/compile-ladder/rung-round-half-even/probes/RoundHalfEvenRungR-compiled.txt`, `fortress compile` exit 255, `File RoundHalfEvenRungR.fss has 28 errors`, all at typecheck. There are 21 `Could not check call to function assert` errors, because the compiled prelude has no `assert(Any, Any, String)`; the argument types it reports, `(ZZ64, IntLiteral, String)`, show that `round` itself typechecked on every line, RR32 included. The other 7 are `Could not check call to function narrow`, because the compiled prelude's `narrow` is `ZZ64->ZZ32` and `NN64->NN32` only. The RR32 `round` lines typecheck because `trait RR64` has `coerce(x: RR32)` and RR32 widens exactly to RR64, whose `round` is the `rint` of shape 2, so the compiled answer for RR32 is also half to even.

Classification (decision): neither of the two refusals in differential 3 is a defect of `round`. Both are names absent from the compiler prelude, which by Pavol's decision takes no new declarations and is deleted at the switch-over (`POSITIONS.md:45`), so no ledger row is opened for them. The alternative was a row for each; I rejected it because a row whose only repair is forbidden by a standing decision names no fix. The `assert` refusal is already the ladder's first error in 4 `tests/` files (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`, `first_error` column). This file will add a 382nd `tests` row, at typecheck, to the next full-corpus baseline. It is a new file, not a move.

## What else it touches

- **The interpreter corpus.** `grep -rlw round` over `ProjectFortress/tests` and `ProjectFortress/shelltests` finds four files:
  - `ProjectFortress/tests/roundBug.fss:22` rounds `SQRT(3^2+4^2)`, which is 5.0, not a tie, so it is unaffected.
  - `ProjectFortress/tests/RationalTest.fss:398-440`: all eight assertions are ℚ values and go through the Fortress body at `FortressLibrary.fss:592`, not a native.
  - `ProjectFortress/tests/zeno.fss:53` declares an unrelated getter named `round`.
  - The fourth is this rung's test.
- **Outside the gated corpora**, `ProjectFortress/demos/mg.fss:142` rounds a ratio of logarithms of a power of two, which is not a tie.
- **`testSystem`** goes 384 → 385: 384 `.fss` files in `ProjectFortress/tests/` with this one, and `concurrentPrinting.sh`. The new file is index 79 of the directory's sorted listing of 390 names (`FileTests.java:790-806` sorts `dir.list()`, taken at `:1123`), so it lands in shard 3. Every later name moves one shard along, which is why the gate compares the shards by their sum (`c766f6cc5`).
- **`testFast`** is unaffected. It excludes `SystemJUTest` (root `build.xml:989`), and the only other test class that reads `tests/`, `TopLevelEnvGenJUTest`, is excluded too (`:986`).
- **The ladder subset** is empty, and I did not run `run-subset.sh` on an empty list (decision; the alternative, running `tests/initOrder.fss` alone, would test nothing). Two greps show why the list is empty:
  - `grep -rliw round` over `explorations/compile-ladder/baseline-2026-09-19/raw/` (524 captures) finds no recorded error naming `round`, `rint`, `Float$Round` or `RR32$Round`.
  - Of the 85 files of `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt`, none contains the word `round`. The only substring hit is `around`, in a comment at `ProjectFortress/tests/initOrder.fss:35`. The batch record says initOrder contains "the word round"; it is the substring.

  The ladder stage runs the compiled path, which this rung does not touch.
- **Competing declarations.** `grep -rln RoundHalfEvenRungR` over `ProjectFortress/tests`, every `ProjectFortress/*_tests` directory, `ProjectFortress/src/com/sun/fortress`, `Library` and `ProjectFortress/LibraryBuiltin` finds only the new file. The probe components' names occur nowhere else either.

## Every measured defect and its home

| defect | home | where |
|---|---|---|
| `walk`'s `round` on `RR64` sends an exact half toward +∞ (ledger row 329) | 1, repaired here | assertions `ProjectFortress/tests/RoundHalfEvenRungR.fss:7-10` (literal) and `:17-20` (`Float`), passing |
| `walk`'s `round` on `RR32` does the same (`RR32$Round`, the same 2008 commit `e67394471`, not named in row 329's text) | 1, repaired here | assertions `RoundHalfEvenRungR.fss:30-34`, passing |

No home-2 or home-3 defect was measured, so no `XXX` file and no new ledger row. The two compiled-prelude absences of differential 3 are classified above as not defects under the decided route, and the reason is given there.

## Record corrections found on the way

Line numbers that have moved since they were written:

- Row 329 cites the rational body at `FortressLibrary.fss:589` and `trait Number`'s `round` at `:419`; they are at `:592` and `:422` today.
- Row 329 cites the compiled pin at `RR64FunctionsRungF.fss:98-101`; it is at `:87-90`.
- Row 329 cites `trait QQ` at `FortressLibrary.fsi:370`; it is at `:373`, the line rung L edits.

Other corrections:

- The batch record's "the only one of the 85 whose text contains the word round … is `tests/initOrder.fss`" is the substring in "around" (`:35`).
- My own second commit message says "eleven ties"; the count is thirteen, as above.

## Cost

- `ant compileAll`: 65 s before the edit and 31 s after (`javac` recompiled 2 files).
- Library-order cache rebuild: 204 s. AnyType took 34 s, CompilerBuiltin 130 s, CompilerLibrary 35 s, CompilerAlgebra 2 s and CompilerSystem 3 s.
- Each test run: about 5 s.

`ant testFast` and `ant testSystem` were not run, by the batch's rule.
