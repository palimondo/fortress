<!-- Rung 6 probes: the shipped DOT, the library, the grammar, and the price of
     the direct +.× against the general one.  Walk interpreter, JDK 25,
     FORTRESS_THREADS=1, source path base + Library + LibraryBuiltin +
     test_library.  Four probes, w01-w04; every .out is the recorded run, every
     .out.N a recorded failed attempt. -->

# Rung 6 probes: the product the library already has

`DESIGN.md` left one thing open in its own words — "the shipped `Vector` may
have a dot product — use it if it is there" — and rung 5's v02 had already
answered the other, that the `.` of `∘.g` and `f.g` is a plain item.

## w01 — the shipped `DOT`

**Question.** `FortressLibrary.fsi:1508` declares `opr DOT(Vector[\T,n\],
Vector[\T,n\]): T` and `:1614-1631` the three matrix forms, all with the shared
extent as **one** nat. Row 37 says a nat is inferred from a runtime-built array,
but a matrix product needs two **different** arrays to agree on one nat, and
nothing at run time checks that. Does `DOT` work on the arrays this base builds,
in all four rank pairs? And what happens when the extents disagree?

**Answer.** It works in all four (`w01_dot.out`): `1 2 3 DOT 4 5 6` is 32, the
method `a.dot(b)` is the same, a 2×3 by 3×2 product is `10 13 / 28 40`, a
matrix by a vector is `8 26`, a vector by a matrix is `16 22`. So `+.×` is one
line per rank pair, not a triple loop.

A **mismatched** product is caught, by the shared nat, at the dispatch — and
the failure is a `ProgramError`, not an exception any `catch` clause takes.

**Verbatim** (`w01_dot.out.0`, `m DOT m` with two 2×3 matrices, inside
`try … catch e Exception`):

```
com.sun.fortress.exceptions.ProgramError: /home/user/fortress/explorations/apl/rung-6/w01_dot.fss:32:33:
Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,3\],__DefaultMatrix[\RR64,2,3\]), overload = {
	DOT(self:(FortressLibrary.Number & {FortressLibrary.RR64}),b:FortressLibrary.Number):FortressLibrary.RR64fn meth(self 0):(Number,Number)->RR64 (/home/user/fortress/Library/FortressLibrary.fss:378:5-62)
	…
```

So APL's LENGTH ERROR has to be a `requires` contract of `aplMatMul`, **above**
the `DOT`, if it is to be catchable — which is what the library does.

## w02 — the rung-6 library, before the grammar

**Question.** Do the new library functions behave — the outer product in the
four shapes and through the general rule, `+.×` in the four rank pairs against
hand-computed values, `+.=`, the general `f.g`, and `⍤0 1` in its four shapes?
And are the two LENGTH ERRORs catchable?

**Answer.** Yes (`w02_lib.out`). `A+.×B` over the chapter's own A and B gives
`100 62 45 / 136 146 198 / 170 112 140`, which is Ex 7's printed output;
`A{⍺+⍵}.{⍺×⍵}B` gives the same matrix; `(0 1 2)⌷⍤0 1⊢A` picks one element per
row; and both mismatched products are `CallerViolation`.

**One fix came out of it.** The general outer product `1 2 3∘.{⍺<⍵}1 2 3` was a
`CallerViolation` from `aplAsmV`'s `requires { aplAllScalar(rs) }`, because a
comparison of two **scalars** is the host's `Boolean` and not APL's 0/1
(gap row 41), so the cell results were not `RR64`. `aplIsScalar` now accepts a
`Boolean` and `aplScalarOf` maps it to 1.0 / 0.0. Rung 5's each gains the same:
`{⍺<⍵}` is now a legal operand of `¨` as well.

## w03 — the rung-6 grammar

**Question.** One line per new production: `⍤0 1` in both spellings, the eight
direct outer products and the general one, the commuted outer products, the
direct `+.×` and `+.=` and the general `f.g`, `+.×` as a function **value**
under `⍤2` over rank 3, and `⌷` as a member of the glyph table. Plus five rules
rungs 1–5 already had, re-asked beside the new ones.

**Answer.** All of them fire (`w03_gram.out`). The rank-3 case is the one worth
reading: `(2 2 3⍴⍳12)+.×⍤2⊢2 3 2⍴⍳12` has shape `2 2 2` and value
`10 13 / 28 40` then `172 193 / 244 274` — rung 4's `aplRankD2` driving matrix
cells, with `+.×` as the operand.

**Two orderings are load-bearing.**

- `` `+ . × `` must be the **first** alternative of `AplFnD`. Below `AplDy` the
  `+` alone would match and the `.×` would be left over.
- the direct `l ∘ . × r` and `l +.× r` rules must stand **above** the general
  `l ∘ . g:AplFnD r` and `l f:AplFnD . g:AplFnD r`. At the `+` of `A +.× B`,
  `AplFnD`'s first alternative succeeds and is memoized as `+.×`; the general
  rule then looks for a `.` that is no longer there, and PEG does not re-enter a
  nonterminal that has already succeeded (gap row 60).

## w04 — what the direct rule buys

**Question.** The design's whole reason for a direct `+.×` is speed. How much,
on the product the microGPT programs are made of — 16×16 by 16×16?

**Answer** (`w04_cost.out`, 200 products each, `nanoTime()`,
`FORTRESS_THREADS=1`, one run, so the ratios are indicative):

```
the three spellings agree: 1.0
16x16 by 16x16, 200 products each:
  A+.×B          (direct)  : 12.967033599 s
  the hand-written loop     : 18.886873189 s
  A{⍺+⍵}.{⍺×⍵}B  (general) : 49.322942858 s
  general / direct         : 3.803718289262682
  general / hand loop      : 2.6114933035462125
  direct (DOT) / hand loop : 0.6865632796514034
```

**3.8×**, and the shipped `DOT` is itself **1.46×** a hand-written triple loop
in the same library, which is why `aplMatMul` **is** `DOT` with a contract above
it rather than a loop of its own. The general route pays one `aplCall` per
multiply and one per addition — 2·16³ = 8192 frame pushes per product — which is
rung 4's frame stack (row 72) priced on a real workload.

The probe calls `aplInner(add, mul, a, b)` directly, which is exactly what the
grammar expands `A{⍺+⍵}.{⍺×⍵}B` to (`w03_gram.out` (d)); it imports no grammar,
so it costs one run and no parser regeneration.
