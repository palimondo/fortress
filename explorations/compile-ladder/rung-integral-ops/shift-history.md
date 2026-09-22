<!-- Where LSHIFT and RSHIFT sit in the numeric tower, what the library assumes about
out-of-range counts, when the interpreter's saturating test was written, and how the
specification's `shift` relates to either spelling; by a delegated worker on 2026-09-22 for
Pavol's four questions on ledger row 335.  Read-only on sources; the four ZZ numbers below
were measured with `./bin/fortress` on a throwaway probe outside the tree. -->

# LSHIFT and RSHIFT: the tower, the uses, the history, the spec

## 1. Where they sit

The interpreter declares the pair once, abstractly, on `trait Integral[\I\]`:
`opr LSHIFT(self,b:AnyIntegral):I` and its `RSHIFT` twin (`Library/FortressLibrary.fsi:430-431`,
`.fss:636-637`).  Every integral type therefore has it, and since `AnyIntegral` comprises `ZZ`
(`.fsi:409`) a negative count is well-typed everywhere.  The bindings:

- `ZZ32`, count narrowed to `ZZ64` (`.fsi:490-491`, `.fss:687-691`) → `glue/prim/Int.java:173-183`,
  `((v & ~31) == 0) ? (u << (int) v) : 0` and `… : (u >> 31)`.
- `ZZ64` (`.fsi:529-530`, `.fss:755-758`) → `Long.java:183-193`: the same with `~63`, `(u >> 63)`.
- `NN64` (`.fsi:456-457`, `.fss:809-812`) → `UnsignedLong.java:176-186`: `~63`, else `0`; the
  right shift is logical (`>>>`), else `0`.
- `NN32`, a value object under `NN64` (`LibraryBuiltin/FortressBuiltin.fsi:82`, `:101-102`;
  `.fss:387`, `:434-437`) → `NN32.java:183-193`: `~31`, else `0`; `>>>`, else `0`.
- the unbounded `ZZ` (`FortressLibrary.fss:825`, bodies `:880-883`; it inherits the
  `Integral[\ZZ\]` signature rather than redeclaring it) → `BigNum.java:222-232`,
  `u.shiftLeft((int) v)` / `u.shiftRight((int) v)`, **no range test at all**.
- `IntLiteral extends {ZZ32}`: its own pair is commented out, "Do not enable these until coercion
  is implemented" (`FortressBuiltin.fsi:121-142`, `.fss:483-525`), so a literal shift runs
  `ZZ32`'s saturating `Int$LShift`.

`(v & ~31) == 0` is false for every count above 31 **and for every negative count** (the sign
bits are set), so all four fixed-width types saturate on both.  `ZZ` has no width and does
neither: measured, `3 LSHIFT 33` = `25769803776` (= 3·2^33), `3 LSHIFT -1` = `1`,
`6 RSHIFT -1` = `12` — precisely `floor(x·2^k)` with a signed count.  Its one defect is the
`(int)` cast at `BigNum.java:224`: the count arrives as a Java `long` and is truncated, so
`3 LSHIFT 4294967296` = `3` and `3 LSHIFT 4294967297` = `6`, a silent wrap of the count
modulo 2^32 rather than a saturation.

The compiler prelude has the pair only on `ZZ64` (`CompilerBuiltin.fsi:196-197`, `.fss:642-643`)
and `ZZ32` (`.fsi:259-260`, `.fss:731-732`), both written at rung N as `self << other` /
`self >> other` over the masking `simpleIntArith.java:337-351`.  `NN32`, `NN64` and the prelude's
`ZZ` have no `LSHIFT`; that `ZZ` has only `<<<` (`.fsi:136`, `.fss:546`).
`CompilerLibrary/FortressLibrary.fsi:440-441,466-467,500-501,539-540` is an `.fsi`-only mirror of
the interpreter's declarations.

## 2. What the library assumes

Every non-test use keeps the count in range by construction, and one masks it by hand:
`ChunkedSparseArray.fss:75` writes `widen(1) LSHIFT (i BITAND 63)`, relying on no out-of-range
rule; `:64` shifts by `b` drawn from `0#64`.  `Random.fss:270,278,279` shift by `wordsize`, which
is 32 on a `ZZ64` (`Random.fsi:247-252` instantiates `MersenneTwister[\ZZ64,32,624\]`);
`:284,302-305,336` use small constants.  `demos/npbft.fss:18-27` uses 23 and 46 on `ZZ64`.
`QuickCheck.fss:287,307` shift a `ZZ64` by 32, but `:313` shifts by **64** and `:322` composes
32-bit shifts without bound, both on the unbounded `ZZ` — `genZZ` would yield only 32-bit values
if `ZZ` saturated, so that line quietly depends on `ZZ` being unbounded.

Three gated test files pin the out-of-range rule and are the only statement of intent anywhere.
`tests/BitTwiddle.fss` is generic — `doit[\I extends Integral[\I\]\](n:I,sz:ZZ64)` (`:15`), called
`doit(n,32)` for `ZZ32` and `doit(n',64)` for `ZZ64` (`:45-48`) — and asserts `n LSHIFT sz = 0`,
`n RSHIFT sz = 0`, `n_bar RSHIFT sz = z_bar` (i.e. `-1`) at `:33,36,39`.
`tests/UnsignedTest.fss:30,32` pins the same for `NN32`, `:135,137` for `NN64`.
`tests/QuickCheckTest.fss:97-103` goes furthest: its comment asks "whether `RSHIFT` operator is
signed or unsigned", its property is `(p RSHIFT 40) = (p RSHIFT 32)` — all counts at or past the
width agree — and it asserts "no sign extension" holds for `p=42` and fails for `p=-42`.  So for
counts ≥ the width the intent **is** derivable: saturate to 0, or to the replicated sign bit on a
signed right shift.  Nothing in library or test shifts by a negative count, so negative counts are
pinned by nothing.  (The rest — `tests/intPrim.fss:47-48`, `longPrim.fss:42-43`,
`rshiftbug.fss:18,23`, `NumberPrintTest.fss:56`, `library_tests/IntegralOpsRungN.fss:187-195,
227-231` — are small in-range counts; `not_working_static_tests/BuiltinTest.fss:60-62` is not run.)

## 3. History

`b451f5506`, 2007-06-26, jmaessen, item 2 of the message in full: "Fixed bug (?) in bit shifting
by more than the bit width of the underlying integer type.  We now give 0 for out-of-range left
shifts, and the sign bit for out-of-range right shifts."  It put `((v&~31)==0)?(u << (int)v):0`
into `Int.java:92-100` and the `~63` twin into `Long.java`, with no comment beside either — and
there is still none at `Int.java:173-183` or `Long.java:183-193`.  The same commit rewrote
`BitTwiddle.fss`, and that diff is the telling part: the old file **already** asserted
`(n LSHIFT 32) = 0` and `(n_bar RSHIFT 32) = z_bar`, and item 1 of the same message is the fix to
`assert` itself, which had been "wrong (such that it always succeeds)".  The saturating rule was
the test's expectation from the oldest tree in this history (root `72ae6881b`, 2007-01-04); the
code was changed to match the test, not the reverse.  The logic never changed after: the file was
renamed to `ZZ32.java` at `900bff59b` (2008-04-15, body unchanged at its `:106-115`) and back at
`fca589bbb` (2008-07-15), and the shift region at the last root `26718e298` (2011-12-06) is
byte-identical to HEAD's.  The "(?)" is the only doubt anyone recorded.

The prelude never had `LSHIFT` before rung N: `CompilerBuiltin.fss` has zero occurrences at every
parentless root — `26718e298` (2011-12-06), `712a2969a` (2012-01-20), `cad0b0847` (2012-01-25),
`396c339f3` (2012-05-23), `5a68404fd` (2012-07-19).  The team's own shifts arrived between
`cad0b0847` and `396c339f3`, Oracle's last spring: across those two roots `simpleIntArith.java`
goes from 0 shift helpers to 4 and `CompilerBuiltin.fss` from 0 to 16 `<<`/`>>` and 17 `<<<`
bodies.  The `…ByIntMod32`/`…ByLongMod64` helpers are named for what they do and are what
`<<`/`>>` bind to.  The `<<<` family exists to serve one pair of methods:
`floorAverage(self, other: ZZ): ZZ = (self + other) <<< (-1)` and `ceilingAverage`
(`CompilerBuiltin.fss:567-570`, already at `396c339f3:495`), commented "computes
`|\ (self+other)/2 /|` efficiently and without overflow".  On the fixed-size types those two are
written with `BITAND`/`BITXOR`/`>> 1` instead (`:651-653,742-744,807-809,870-872`), so a negative
`<<<` count is used only on the unbounded `ZZ`.

## 4. The specification's `shift`

`Specification/basic-lib/basic-integers.tex:696-702`, verbatim:

> `\Method{\EXP{\VAR{shift}(\KWD{self}, k\COLON \TYP{IndexInt})\COLON \mathbb{Z}}}`
>
> The result of `\EXP{\VAR{shift}(x,k)}` is `\EXP{\lfloor x \cdot 2^k \rfloor}`.
> This corresponds to what is sometimes called an ``arithmetic shift'' on the two's-complement
> representation of the integer; positive values of `\VAR{k}` shifts the bits to the left, and
> negative values of `\VAR{k}` shifts the bits to the right.

It is a method of the unbounded integers — `\section{Integers}` (`:13`), result `ℤ`, neighbours
`signum`, `numerator`, `floor` — with a signed count.  So it is a *different* operation from
`LSHIFT` on the fixed-size types, which has no negative case at all, and the *same* operation as
`LSHIFT` on the unbounded `ZZ`, whose measured `3 LSHIFT -1` = `1` = `floor(3·2^-1)`.

Nothing relates the two spellings.  The spec never names `LSHIFT` or `RSHIFT`
(`grep -rn 'LSHIFT\|RSHIFT' Specification/ Specification-1.0-frozen/` matches no file) and never
gives `<<<` a meaning: `<<<` appears once, in the operator-character appendix as U+22D8 VERY MUCH
LESS-THAN (`Specification/appendices/operators.tex:476`).  Symmetrically, no library declares the
spec's integer `shift` — the only `shift` in `Library/FortressLibrary.fsi` (`:1292,1315,1335`) is
the array-origin shift.  The one place the two meet is the unbounded `ZZ`, where both paths reach
`BigInteger.shiftLeft` — the interpreter via `BigNum.java:222-226`, the prelude via `jAPShiftLeft`
→ `nativeHelpers/simpleArbitraryPrecisionArith.java:93-95` — and so already agree on the spec's
sentence under two different names.

## Summary

1. Declared once on `trait Integral[\I\]` with an `AnyIntegral` count
   (`FortressLibrary.fsi:430-431`), so every integral type has it: `ZZ32`, `ZZ64`, `NN32`, `NN64`
   bind natives that saturate outside `0..width-1` (`Int.java:173-183` and siblings), `IntLiteral`
   inherits `ZZ32`'s because its own is commented out, and the unbounded `ZZ` binds
   `BigInteger.shiftLeft` with no range test (`BigNum.java:222-232`) — measured `3 LSHIFT 33` =
   3·2^33 and `3 LSHIFT -1` = 1, i.e. the spec's `shift`, except that the count is silently
   truncated to an `int` (`3 LSHIFT 2^32` = 3).  The prelude has it only on `ZZ32`/`ZZ64`.
2. Library uses keep counts in range or mask them by hand and so assume nothing; the intent lives
   in three gated tests — `BitTwiddle.fss:33,36,39` (both signed widths, generically),
   `UnsignedTest.fss:30,32,135,137`, `QuickCheckTest.fss:97-103` — which pin saturation to 0 or to
   the replicated sign bit for counts at or past the width, while nothing pins a negative count.
3. `b451f5506` (2007-06-26, jmaessen, "Fixed bug (?) in bit shifting by more than the bit width of
   the underlying integer type") wrote the test to match `BitTwiddle.fss`'s pre-existing
   expectation once a broken `assert` fixed in the same commit stopped hiding the mismatch; the
   logic has never changed and carries no comment, and the prelude had no `LSHIFT` at any root,
   its `<<`/`>>`/`<<<` having arrived in spring 2012 with `<<<` there to give `floorAverage` a
   negative-count shift on `ZZ`.
4. The spec's `shift(x,k) = floor(x·2^k)` (`basic-integers.tex:696-702`) is an arithmetic shift on
   the unbounded integers with a signed count — a different operation from the fixed-width
   `LSHIFT`, and the same one the interpreter's `ZZ` `LSHIFT` and the prelude's `<<<` both already
   implement; the spec never names `LSHIFT`, never defines `<<<`, and no library declares `shift`
   on an integer, so nothing in the tree relates the spellings.
