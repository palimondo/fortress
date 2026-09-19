<!-- Skeptic's judgement on repair R2 of the repair batch of 2026-09-18, the integer
literal wrap in the code generator.  First judgement of this rung.  Written by a session
that did not do the work.  One line per paragraph. -->

# Skeptic: R2, repair-r2-literal-wrap

**Verdict: approved, with four required corrections.**  The repair is right, the recorded
failure exists and is genuine, the specification citations are accurate and are taken from
the prose chapters, the precedent search found what the team had already done and followed
the right instance, and the blast radius is closed — I re-enumerated it independently and
found nothing left open that the rung did not name.  What must change is the record: it
contains one claim that is false as written and was never measured, it does not say which
of its three recorded states was inherited from the dead container, it omits the loud
failure the rung turns into a quiet value, and the captured outputs that all of it rests on
are excluded from the branch by `.gitignore`.

## 1. The recorded failure exists, and it is the right failure

`probes/junit-before.out`, written 23:11 on 2026-09-18, one minute before commit `7e666704`
(23:12:24) and two minutes before `CodeGen.java`'s mtime (23:13:06):

    . run compiler_tests/IntLiteralWrapRepairR2 (271ms) FAIL:  ZZ from the 32-bit numeral: -1 should be 4294967295
    Tests run: 2,  Failures: 1,  Errors: 0

It is the failure the rung repairs, and it could not have been produced by a repaired tree:
the failing assertion reports `-1` for the numeral `4294967295`, which is the wrap itself.
The pass, `probes/junit-final.out` (23:53), is `OK (2 tests)` on the tree as left.

The test exercises the defect and cannot be satisfied by a constant.  Every expected value
is computed at run time from numerals of bit length 16, 17, 31, 33 and 63
(`compiler_tests/IntLiteralWrapRepairR2.fss:41-69`), none of which either bound ever
mis-read: `m32 = 65535 · 65537` and `m64 = (65535 · 65537) · 4294967297` are the two
boundary values, built from operands no branch wrapped.  A repair that returned `4294967295`
as a literal would not have passed.

## 2. The diff does what the report says, and the built classes are the diff

`javap -c` on the built classes, not on the sources: `CodeGen.class` has `bipush 31` /
`if_icmpgt` and `bipush 63` / `if_icmpgt` at the two branch tests over
`BigInteger.bitLength`, and `FIntLiteral.class` has `asNN32` testing `largerVal` for null
before its two comparisons and `asNN64` reading `largerVal` through `BigInteger`.  Class
mtimes are later than source mtimes for both.  So the measurements in this worktree were
taken against the edit.

The bounds are exact, and I checked the arithmetic rather than accepting the sentence.
`BigInteger.bitLength()` is `ceil(log2(n))` for `n < 0` and `ceil(log2(n+1))` for `n >= 0`,
so bit length 31 is exactly `[-2^31, 2^31-1]` and bit length 63 exactly `[-2^63, 2^63-1]`;
`-2147483648` has bit length 31 and `-2147483649` has bit length 32, `-9223372036854775808`
has 63 and `-9223372036854775809` has 64.  Both bounds are therefore the signed range of
the slot they guard, for both signs.  The old `<= 32` also wrapped negatives, in the other
direction: `-2147483649` went through `intValue()` and came back `+2147483647`.  The rung
asserts "exact for both signs" and measured only non-negative values; probe
`probes/skeptic/s1` measures the negative side and all five edges are right
(`-2147483649`, `-9223372036854775809`, `-2147483649` at `ZZ64`, `-2147483648` at `ZZ32`,
`-9223372036854775808` at `ZZ64`).

The edit is as small as the test needs, with one exception the report itself flags as a
decision: `asNN32`.  I checked that decision rather than taking it.  The old guard
`0 <= (smallerVal & 0xFFFFFFFFL) && (smallerVal & 0xFFFFFFFFL) <= 0xFFFFFFFFL` is vacuous —
masking a `long` to 32 bits always lands in `[0, 0xFFFFFFFF]` — so the report's correction
of the brief's premise is right: `asNN32` could not throw, before or after, and what it did
was truncate.  It also accepted the `BOGUS` sentinel `0xdeadbeefcafebabe` that a
string-carried numeral leaves in `smallerVal` (`FIntLiteral.java:25,37`), returning
`0xcafebabe = 3405691582`.  The rung asserts this in prose and never probed it; probe
`probes/skeptic/s2` does.  `n: NN32 = 36893488147419103231` — bit length 65, string-carried
before this rung as well as after — now raises `Not in range for NN32: 36893488147419103231`
where it used to return the sentinel's low half.

`asZZ32` is left alone and the report says why: for a string-carried numeral it refuses only
because `BOGUS` happens to fall outside `int` range.  That is honest and the dependency is
recorded.  I agree with leaving it; it is a latent trap, not a live defect.

## 3. The specification citations are accurate and are prose, not api renderings

I read each cited passage in the file rather than from the report.
`Specification/basic/expressions/literals.tex:83-86` and `:104-108` are quoted correctly and
say what the rung uses them for; `:104-108` is the clause that decides the radix-numeral
half, and it is unambiguous that a radix numeral denotes the value of its digits in its
radix and not a bit pattern.  `Specification/basic-lib/basic-integers.tex:368-370` and
`:398-401` are quoted correctly, including "because operations on type $\mathbb{Z}$ never
need to wrap or saturate".  `literals.tex:132-148` is correctly characterised as silent on
which number type.  All are under `basic/` and `basic-lib/`, so rule 3 is satisfied.

## 4. The precedent search is right, and I checked for a fourth site it might have missed

`grep -n bitLength` over `ProjectFortress/src` returns exactly four lines: the two in
`CodeGen.forIntLiteralExpr` (one now a comment), the new one in `FIntLiteral.asNN64`, and
`simpleIntLiteralArith.java:31`.  There is no fifth site with the same defect.  The
interpreter's `FIntLiteral.make(BigInteger)`
(`interpreter/evaluator/values/FIntLiteral.java:40-56`, bounds at `:21-27`) is exact for
both signs as claimed, and `simpleIntLiteralArith.java:31`'s `bitLength() < 64` is
numerically `<= 63`.  The rung followed the right one and said which two were right and
which one was wrong.

The second precedent, `Library/FortressLibrary.fss:703-704`, is confirmed —
`getter minimum(): ZZ64 = -9223372036854775807 - 1` — and is stronger than the rung
realised.  Probe `probes/skeptic/s7` shows the interpreter **refuses** the direct spelling
`d: ZZ32 = -2147483648` with "RHS expression type Long is not assignable to LHS type ZZ32",
while the compiled path now accepts it and prints `-2147483648`.  So the team's
`-max - 1` idiom is not a style choice, it is the spelling that works on both paths, and the
rung's prelude edit follows it for that reason as well as the stated one.  That refusal is
itself a divergence in the compiled path's favour — the specification settles it against the
interpreter, `literals.tex:83-86` giving the numeral `2147483648` the value $2^{31}$ and
negation giving a legal `ZZ32` — and it is a ledger row owed against the interpreter, not
against this rung.

## 5. The blast radius, re-enumerated independently

I did not read `probes/boundary-numerals.txt` for this; I wrote my own scan.  Over the
compile-path prelude (`Library/Compiler*.fss`, `LibraryBuiltin/*.fss`) and every component
named by a `.test` file in `library_tests` and `compiler_tests`, parsing every numeral in
every radix and computing its value: **no declaration of the form `name: T = <numeral>` is
out of range for `T` any more**, and the twelve in-range-but-re-routed lines are exactly the
twelve the report lists.  Widening the scan to the ungated corpora and to every numeral of
bit length >= 32 in any position (100 hits) leaves exactly one out-of-range site in the
tree, `library_tests/ChooseTest3.fss:125`, which is the one the rung names and leaves for
the ledger.  The rung's enumeration is complete and its count of 18 / 12 / 6 is right.

Three of those twelve lines live in `library_tests/NN32.fss`, `NN64.fss` and `ZZ.fss`, which
are named in no `.test` file — the rung enumerated them and never ran them.  I ran all three
on the compiled path: **all three PASS.**  `ZZ.fss` matters most, because its
`maxValue: ZZ = FFFFFFFFFFFFFFFF_16` was quietly `-1` before this rung and is now
$2^{64}-1$; its assertions still hold.  This closes the gap in the rung's own verification
rather than opening one.

I also checked the gate risk the coordinator inherits, since I am not running the gate: no
gated compile-path corpus file holds an untyped numeral of bit length >= 64 in a comparison,
which is the one shape that now throws (see finding 7), and `Integer.test` is green at 27 of
27 against a wiped and rebuilt cache (`tmp/phaseD.log` shows the wipe and the library-order
rebuild before the run, correctly done).  I expect the gate to be green.

## 6. The prelude rewrite is faithful, and a gated test pins it

`ZZ32_MIN: ZZ32 = -7FFF'FFFF_16 - 1` could have been $-2^{31}$ or $-2^{31}+2$ depending on
how the unary minus binds, and a wrong value there would be silent.  Probe
`probes/skeptic/s4` reads the prelude's own bindings — not a re-spelling of them in a user
component, which is what the rung's `r2i` does — and checks them against independently
written values: `ZZ32_MIN -2147483648`, `ZZ64_MIN -9223372036854775808`, and the two
assertions `ZZ32_MIN = -2147483647 - 1` and `ZZ64_MIN = -9223372036854775807 - 1` pass.

Independently of my probe, the value is pinned by a gated test the rung did not cite for
this purpose: `library_tests/AverageTest.fss:98` calls `testIntAverage(ZZ32_MIN, ZZ32_MAX)`
and `:21-23` asserts `floorAverage = -1` and `ceilingAverage = 0` for exactly that pair,
which holds only for $-2^{31}$.  So the prelude edit is under gate.

Probe `probes/skeptic/s5` re-states the two assertions `Integer3.fss:99,106` and
`Integer4.fss:99,106` feed, written from scratch against the new spelling:
`twiceHuge32 = -1610612736`, `twiceHuge64 = -6917529027641081856`, and all four
`BOXPLUS`/`BOXMINUS` assertions hold.  The rewrite is value-preserving and the assertions
assert what they asserted.

## 7. The claim that is false as written

`record.md`, in the amendment to ledger row 317, and the handover paragraph both say:
"`p37`, `p37a`, `p39`, `r2a` and `r2e` now give the same answer compiled as under `walk`".

`p37` does not.  Measured on the tree as it is left
(`probes/skeptic/p37.walk.skeptic`, `p37.compiled.skeptic`):

    walk       p37 a<c false / p37 b<c false / p37 a<b false
    compiled   java.lang.Error: Not in range for ZZ64: 18446744073709551615
                 at FIntLiteral.outOfRange(FIntLiteral.java:64)
                 at FIntLiteral.asZZ64(FIntLiteral.java:75)

`p37a`, `p39`, `r2a` and `r2e` do agree; I re-ran `p37a` too and it prints `false` both ways.
Neither `p37` output on the branch was taken by this rung: `compile-ladder/rung6/probes/p37.*`
are dated 22:56, which is when the worktree was checked out, and are rung 6's pre-repair
outputs.  The claim was written without a measurement.

The mechanism.  `CompilerBuiltin.fss:837-842` — rung 6's repair — implements every
`IntLiteral` comparison as `self.asZZ64 <op> other.asZZ64`, and `FIntLiteral.asZZ64`
(`:74-77`) throws for a string-carried numeral.  Once a numeral of bit length 64 correctly
keeps its decimal string, comparing it throws.  Before this rung `p37` printed
`a<c true` and `b<c true`, silently wrong; now it dies.

Which of rule 4's outcomes.  The specification settles it against the compiled run:
`literals.tex:83-86` gives the numeral its exact value $2^{64}-1$, so `a < 5` is `false` and
that is what `walk` prints.  The repair is not wrong — $2^{64}-1$ genuinely is not a `ZZ64`,
and raising is better than answering `true` — but performing the comparison at `ZZ64` is,
and that is outside R2's scope.  So this is the legitimate fourth case: the rung lands and a
ledger row is owed, naming `CompilerBuiltin.fss:837-842` as the site and comparison over the
value in `BigInteger` (the shape `simpleIntLiteralArith.java:26-27` already uses) as the fix.

Two statements have to change with it.  `REPORT.md`'s "The repair reduces the divergence
between `walk` and the compiled run; it does not create any" is false as written, and the
report's divergence table has no row for `p37`.

## 8. The failure-mode question, answered

**A loud failure does become a quiet value, in one place, and the rung does not report it.**

`FIntLiteral.asNN64`'s pre-image is `if (largerVal == null) return FNN64.make((long)smallerVal); throw outOfRange("NN64");`
— it threw for *every* string-carried numeral.  `simpleIntLiteralArith.fromBigInteger`
(`:31`), which this rung does not touch, sends every `IntLiteral` arithmetic result of bit
length >= 64 to the string branch.  So the transition is reachable without the codegen
change at all, and it is not confined to numerals.

Probe `probes/skeptic/s3` on the tree as left:

    x = 9223372036854775807
    n: NN64 = x + x + 1
    ->  s3 NN64 from IntLiteral arithmetic, rendered  -1
        s3 equals the numeral 2^64-1  true
        s3 one less than it           false

Before this rung the same program raised `Error: Not in range for NN64: 18446744073709551615`
— the rung's own `probes/junit-codegen-only.out` is a measured instance of that error from
the same line.  The value it is replaced by is $2^{64}-1$, which is the
specification-correct one: `literals.tex:83-86` gives the numeral its exact value and
$2^{64}-1$ is inside `NN64`.  So the quiet answer is right.

The diagnosability cost is nonetheless real and is worse than the general case, because the
value **prints as `-1`**: `FNN64.toString` is signed (`runtimeValues/FNN64.java:20`), which
is the rung's own proposed row 320.  The next person to meet this gets `-1` where they
previously got an error naming the true value.  The rung has row 320 for the rendering and
records nothing about the transition; the two belong together.

For completeness, the transitions in the other direction — quiet wrong value to loud
failure — are three: `asZZ32`, `asZZ64` and `asNN32` now raise `Not in range for ...` where
they silently truncated (the rung's row 319 covers this for annotated declarations);
`asNN32` on a string-carried numeral now raises where it returned the `BOGUS` sentinel's low
half (`probes/skeptic/s2`); and `p37` (finding 7), which the record misreports.

## 9. My own differentials, including two findings outside the rung

Nine probes, none of them the rung's.  Sources and outputs are under `probes/skeptic/`.

| probe | what it asks | walk | compiled | outcome |
|---|---|---|---|---|
| `s1` | the negative edges the rung claimed and did not measure | refuses at `ZZ32 = -2147483648` | all five right | compiled right; interpreter row owed |
| `s2` | `asNN32` on a string-carried numeral (the `BOGUS` sentinel) | refuses the coercion | raises, correctly | quiet-to-loud, an improvement |
| `s3` | the loud-to-quiet case, through `simpleIntLiteralArith` | refuses the coercion | $2^{64}-1$, printed `-1` | see finding 8 |
| `s4` | the prelude's own `ZZ32_MIN`/`ZZ64_MIN` bindings | not visible to `walk` | exact, assertions pass | prelude edit faithful |
| `s5` | the two assertions `Integer3`/`Integer4` feed, rewritten | no `BOXPLUS` in that library | all four pass | rewrite value-preserving |
| `s6` | `CHOOSE` at the boundary and at the wrapped value | `4611686016981624750` / `1` | `4611686016981624750` / `0` | boundary agrees; negative diverges |
| `s7` | `ZZ32 = -2147483648` alone | refuses | `-2147483648` | compiled right |
| `s8` | `CHOOSE` at five negative arguments | `1` every time | `0` every time | see below |
| `s9`, `s10` | `CHOOSE` for `k > m >= 0`, and the spec's own property | `3 CHOOSE 5 = 1` | `3 CHOOSE 5 = 0` | **specification against the interpreter** |

The `CHOOSE` finding is worth stating properly, because it is squarely inside the domain the
specification defines the operator on and it is not this rung's doing.
`Specification/basic-lib/basic-integers.tex:567-568` says `CHOOSE` "is defined only for
natural number types; it computes the binomial coefficient $m!/(n!(m-n)!)$", and `:571-573`
states the property $\forall (m,n \in \mathbb{Z})\; (m \OPR{CHOOSE} n) + (m \OPR{CHOOSE}
(n+1)) = ((m+1) \OPR{CHOOSE} (n+1))$.  For $m = 3$, $n = 5$ — both non-negative —
`walk` gives `3 CHOOSE 5 = 1` and the property's two sides as `2` and `1`; the compiled path
gives `0` and `0`.  `4 CHOOSE 2` is `6` on both, so the disagreement is confined to
$k > m$.  Cause, from primary source: the interpreter's primitive
`interpreter/glue/prim/Int.java:287-290` has no $k > n$ guard, so for $k > n$ it folds
`k = n - k` to a negative, falls past its `k == 0` and `k == 1` cases, runs an empty loop
and returns the initial `accum = 1`; the compiled path guards it at
`nativeHelpers/simpleLongArith.java:187`, `if (kk < 0 || kk > n) return 0;`.  Rule 4,
outcome 2: the specification settles it against the interpreter, and a ledger row is owed
there, not here.

This is adjacent to the rung, not inside it: the same missing guard is why
`verifyChoose(-1257966796+j, 2)` passed silently before the rung bound `3037000500` at
`ZZ64`, and the rung's proposed row 321 describes exactly that call.  Row 321 should carry
the measurement.

## 10. The record, checked line by line

Every `file:line` in `record.md` that I could check, I checked.  Row 317 exists at
`fortress-gap-ledger.md:328` and 318 is the last row, so 319/320/321 are the next free
numbers and nothing is renumbered or moved.  The stale-citation correction is right:
`CompilerBuiltin.fss:557` is now the comment above `ceilingAverage` and the `ZZ64` coercion
is at `:562`.  The five coercion sites (`:501`, `:562`, `:620`, `:684`, `:747`) are all
correct.  `Misc.scala:467-468` gives every numeral `Types.INT_LITERAL`.
`CompilerBuiltin.fsi:370-376` has six abstract getters and no static parameter.
`PhaseOrder.java:57` and `:142-143` put `INTEGERLITERALFOLDING` before `TYPECHECK`.
`RemoveLiteralCoercions.java:33-53` does match `FIntLiteral.make(I)` plus `coerce_ZZ32` and
replace it with `FZZ32.make(I)`, and `default_repository/configuration:50-51` does switch
its tests off, so the dormant-code argument for keeping three branches is sound and is
correctly labelled as latent rather than live.  `map/spec-to-implementation.md:166` is the
numerals row and gives the sites the report says it gives.

A reader six months from now can check all of that — **except** the parts that rest on the
eight `*.out` files, which is finding 1 below, and the `p37` sentence, which is finding 7.

## Required corrections

These are not preferences.  Each one is a statement in the record that is false, missing, or
about to be lost.

1. **Commit the captured outputs.**  `.gitignore:46` is `*.out`, and
   `git ls-files` on `probes/` lists **zero** of the eight `.out` files that are on disk.
   The recorded failure (`junit-before.out`), the recorded pass (`junit-final.out`), the
   coupling measurement (`junit-codegen-only.out`) and the three-way corpus differential
   (`integer-test-before.out`, `-after.out`, `-repaired.out`) exist only in this worktree.
   Every citation to them in `REPORT.md` and `record.md` would dangle in the landed commit,
   and the whole discipline of a pre-edit recorded failure would have nothing behind it.
   `git add -f` them, or rename them to an extension the ignore rule does not catch.  The
   batch exists partly because the last one lost uncommitted work; this is the same loss by
   a different route.

2. **Correct the `p37` claim, in all three places, and open the row it hides.**
   `record.md`'s row-317 amendment and its handover paragraph both assert that `p37` now
   answers compiled what it answers under `walk`; it does not — it throws
   `Not in range for ZZ64: 18446744073709551615` where `walk` prints three `false` lines
   (`probes/skeptic/p37.compiled.skeptic`, `p37.walk.skeptic`).  `REPORT.md`'s "it does not
   create any [divergence]" is false as written and its divergence table needs the row.
   Open the fourth ledger row: `IntLiteral` comparison is performed at `ZZ64`
   (`CompilerBuiltin.fss:837-842`) and so throws for a numeral outside `ZZ64`, where
   `literals.tex:83-86` requires `false`; the fix is comparison over the value in
   `BigInteger`, the shape `simpleIntLiteralArith.java:26-27` already uses; outside R2's
   scope.

3. **Say which recorded state was inherited.**  `probes/junit-codegen-only.out` and the four
   `r2*.compiled.codegen-only` outputs are dated 23:17 and were produced by the first
   container's `tmp/phaseA.sh`, which reverted `FIntLiteral` with `git checkout`, rebuilt and
   measured; the second session committed them in `a6c0f031` and did not re-take them.
   `REPORT.md`'s "What was inherited" section lists only `7e666704`'s five artefacts and then
   says "Everything was re-run rather than read off those logs".  Name the exception.  The
   measurement itself is sound — I confirmed the same fact from the pre-image in
   `git diff 49ee5e91...HEAD` — but the provenance sentence is what the brief asked for.

4. **Record the loud-to-quiet transition.**  Neither `REPORT.md` nor `record.md` answers the
   failure-mode question in that direction.  `FIntLiteral.asNN64` threw for every
   string-carried numeral before this rung and now returns a value; with
   `simpleIntLiteralArith.fromBigInteger` (`:31`) sending every `IntLiteral` arithmetic
   result of bit length >= 64 to the string branch,
   `x = 9223372036854775807; n: NN64 = x + x + 1` went from
   `Error: Not in range for NN64: 18446744073709551615` to the value $2^{64}-1$ **printed as
   `-1`** (`probes/skeptic/s3`).  The value is specification-correct; the cost is that the
   error that named the true value is gone while the rendering is wrong.  Record it as a
   fact, with the probe, and tie it to proposed row 320.

## Recommended, not required

Add the measurement to proposed row 321: `CHOOSE` at a negative first argument diverges
between the paths (`walk` 1, compiled 0, `probes/skeptic/s8`), and the same missing guard in
`interpreter/glue/prim/Int.java:287-290` makes the interpreter answer `1` for every
$k > m \ge 0$ against the specification's own property at
`basic-lib/basic-integers.tex:571-573` (`probes/skeptic/s9`, `s10`).  Open a row against the
interpreter for it, and one for the interpreter's refusal of `d: ZZ32 = -2147483648`
(`probes/skeptic/s7`).  Both are outside R2 and neither blocks it.

The gate test locks in the non-negative half of "exact for both signs" and not the negative
half; two more assertions in `IntLiteralWrapRepairR2.fss` would gate it.  I judge this a
preference rather than a requirement, because no plausible edit moves one bound without the
other and the positive assertion already fails if either does.

`probes/run-probes.sh` sources `/home/user/fortress-r2/tmp/r2env.sh`, which is untracked, so
the committed driver will not run for the next reader.
