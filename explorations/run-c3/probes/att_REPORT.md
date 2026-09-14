# run-c3 probe: three shapes for microGPT's attention

Files: `att_a.fss` (form A, round one's block-view loops), `att_b.fss`
(form B, a `cells` lift over a uniform zero-copy layout), `att_c.fss`
(form C, per-head cells as values in a rank-3 array), plus
`att_b_untyped.fss` (the untyped-lambda question on its own),
`att_d_typealias.fss` / `att_e_typedef.fss` (the cell-type abbreviation),
`att_f_staticparams.fss` / `att_g_staticname.fss` (the two declaration
errors), each with its `.out`.
Outputs `att_*.out` (= the one-thread run), `att_*.t1.out`, `att_*.t4.out`;
renders `att_*.tic` / `att_*.svg` / `att_*.png`.

Test data: B = 2 documents, N = 32, `nEmbd` 16, `blockSize` 16, `nHead` 4,
`headDim` 4; `q`, `k`, `v`, `dH` are 32x16 with `sin(0.1 i + 0.37 j + c)`,
c = 0, 1, 2, 3; the mask is round one's additive `-1E10` above the diagonal.
Environment: `experiment/env.sh` (JDK 25, `-Xmx4g`), walk interpreter.

## The three forms

| | A `att_a.fss` | B `att_b.fss` | C `att_c.fss` |
|---|---|---|---|
| shape | `for d, h` over `head`/`headCell` block views, `assignInto` | `cells(f, a, b)` over a uniform N-row layout, cells are `block(m, 16d, h (c DIV 4), 16, c DIV 4)` | `heads`/`unheads` copies into `Array3`, `cells(f, s, t)` over `Plane` views |
| `att` layout | (B·NH·16) x 16 stacked | N x 64 (head cells side by side) | rank 3, (B·NH) x 16 x 16 |
| block lines (fwd+bwd) | **17** (19 in the probe: two extra lines only to expose `dS` for the checksum) | **6** logical / 7 physical | **7** logical / 8 physical |
| helper lines beyond the shared header | **0** | **14** (`colsOfA` 1, `nth2` 1, `cell` 5, `cells` 7); +7 for the three-argument overload, +6 for `cellsW` | **34** (`arr3` 1, `Plane` 7, `plane` 1, `rowsOfA`/`colsOfA`/`nth2` 3, `heads` 6, `unheads` 5, `cells` 7, rank-3 `opr /` 4) |
| copied in | nothing — `q k v dH att` are read through `Block` views | nothing — same `Block` views, one `cell` function for all widths | **4 x 512 = 2048 floats** (`heads` of `q k v dH`) |
| copied out | nothing — `unheads` has no counterpart | nothing | **4 x 512 = 2048 floats** (`unheads` of `hc dV dQ dK`) |
| assembled / written | `assignInto` writes 4096 floats into 5 preallocated matrices (att 2048, hc/dV/dQ/dK 512 each); per-cell temporaries a further 6144 | seven `mat` fills, 8192 floats, plus 2048 for the `/ SQRT` of `dS` = **10240**; no per-cell temporaries survive | same 10240 as B, in `Array3`, **plus the 4096 of relayout** |
| t1, 10 reps fwd+bwd | **12994 ms** (5 passes: 12345–13454) | **13889 ms** (13600–14523) | **15664 ms** (15243–16128) |
| t4, 10 reps fwd+bwd | **5361 ms** (5361–10260) | **6319 ms** (5457–8145) | **7746 ms** (6702–12183) |

Net float traffic is the same for A and B — A's per-cell temporaries
(`dh (vh^T)`, `smRowsB`, the scaling) are exactly the arrays B names at
N-row scale, 6144 floats either way. Form C is the only form that copies:
4096 floats of pure layout shuffling, +40% on the traffic, +21% on the clock.

### Checksums — identical across all three forms and both thread counts

```
att sum 128.0
dS  sum 1.5144135945277526E-15
hc  sum -7.426586484624076  hc[5,7] -0.980921927237238
dQ  sum 0.7870326833403783  dQ[5,7] -0.015176485293592131
dK  sum -1.2490009027033011E-15  dK[5,7] 0.008389135263650555
dV  sum 16.951785001661463  dV[5,7] 0.22233390744644332
```

Every digit agrees: `att_a.t1.out`, `att_b.t1.out`, `att_c.t1.out` and the
three `.t4.out` files differ only in the timing lines (`diff` of the
non-timing lines is empty in all six pairings). So the four-thread results
equal the one-thread results for all three forms, and the three forms agree
entry by entry — round one's ledger row 155 re-confirmed for two further
parallel shapes (a parallel `for` filling an `Array[\Any\]` of cell results,
and a parallel `for` over planes).

`dS sum` and `dK sum` are structurally ~0 (softmax backward sums to zero per
row); the fixed entries `dK[5,7]` and `dQ[5,7]` carry the discrimination.

### How each forward reads in the render

- **A** (`att_a.png`): six lines of scaffolding around two of arithmetic —
  the `for`, three view bindings, `ah`, then `assignInto(ah, smRows(...))`
  and `assignInto(head(hc, d, h), ah vh)`. The transpose and `√headDim`
  render, but the two matrix expressions are buried inside `assignInto(...)`
  and the loop indices `d, h` appear eleven times.
- **B** (`att_b.png`): two clean equations, `att = cells(fn (qc, kc) ⇒
  smRows((qc (kc^T))/(√1.0 headDim) + causalMask), q, k)` and
  `hc = cells(fn (ac, vc) ⇒ ac vc, att, v)` — the Dyalog's two forward
  lines, one Fortress line each, with the rank operator spelled `cells`
  and the cell function in-line. No index appears at all.
- **C** (`att_c.png`): B's two lines plus the `h¨` line
  `(qh, kh, vh, dHh) = (heads(q), heads(k), heads(v), heads(dH))` and a
  `unheads(...)` wrapper on every line that has to return to the N x 16
  layout — visually the closest to the Dyalog, textually the noisiest.

All six lines of every form rendered; nothing fell back to ASCII.

## Findings on the spellings the brief asked about

**1. Untyped lambda parameters WORK.** `att_b_untyped.fss` runs
`att = cells(fn (qc, kc) => smRows((qc (kc^T)) / (SQRT (1.0 headDim)) +
causalMask), q, k)` and prints `att sum 128.0`. The parameter types come
from the declared arrow type of `cells`'s `f`. `att_b.fss` therefore uses
untyped lambdas throughout, which is what makes its six lines read like the
Dyalog. (Typed lambdas — `fn (qc: Array[\RR64,(ZZ32,ZZ32)\], kc:
Array[\RR64,(ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32)\] => ...` — also work,
and were what the first working version used; they are simply unreadable.)

**2. A type alias for the cell type does NOT work.** This is the reason the
untyped lambda matters so much: the typed spelling cannot be abbreviated.

- `type Cell = Array[\RR64,(ZZ32,ZZ32)\]` (`att_d_typealias.fss`, four
  lines) →
  `** bug! Not yet implemented: TypeAlias at .../att_d_typealias.fss:4.1`,
  and the walk interpreter aborts the whole component. Same error inside
  `att_b.fss` at `:91.1`.
- `typedef Cell = Array[\RR64,(ZZ32,ZZ32)\]` (`att_e_typedef.fss`) →
  `att_e_typedef.fss:5:23-25: Cell is undefined.`, once per use — `typedef`
  is not a Fortress keyword; the grammar has
  `TypeAlias ::= type Id StaticParams? = TypeRef`
  (`Specification/appendices/grammars/concrete-syntax.tex:425`), so `type`
  is the right spelling and it is the interpreter that is missing.

So the declared type of a cell function must be written out in full at every
occurrence: `cells(f: (Array[\RR64,(ZZ32,ZZ32)\], Array[\RR64,(ZZ32,ZZ32)\])
-> Array[\RR64,(ZZ32,ZZ32)\], a: Array[\RR64,(ZZ32,ZZ32)\], b:
Array[\RR64,(ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32)\]` is one 178-character
line. This is a new gap-ledger candidate (not in
`fortress-gap-ledger.md`).

**3. The three-argument lift WORKS, overloaded on arity.** A second
`cells(f, a, b, c)` declared in the same component alongside the
two-argument one resolves correctly, and `dS = cells(backS, att, dH, v) /
(SQRT (1.0 headDim))` with `backS(ac, dc, vc) = smRowsB(ac, dc (vc^T))` is
one line instead of two. `att_b.t1.out`'s second checksum block is that
version and matches to the last digit.

**4. Named top-level cell functions WORK as arguments.** `att =
cells(scores, q, k)` with `scores(qc, kc): ... = smRows(...)` type-checks
and runs (`attnB3` in `att_b.fss`). They read *better* than the lambdas for
the backward lines — `dQ = cells(backQ, dS, k)` — and *worse* for the
forward, because the reader must jump to `scores` to see the Dyalog line.
The named version is also the only one that can take the three-argument
lift without an unreadable in-line lambda; the two mix cleanly.

**5. `cells` by fill beats `cellsW` by write-through.** The write-through
variant is one line shorter (6 against 7) but has to call `f` once on cell
(0,0) just to learn the result width before it can allocate, so it does 9
cell evaluations per call instead of 8. Measured on the forward alone,
10 reps: 5584 ms (`cells`) against 6318 ms (`cellsW`) at one thread,
2418 against 2869 at four — 13–19% slower, i.e. exactly the redundant
cell. Keep the fill. (Both are in `att_b.fss`; `cellsW`'s output is the
third checksum block and agrees.)

**6. Two declaration errors met on the way, both worth the ledger.**

- Static parameters may not follow the value parameters of an ordinary
  function. `sumOf(m: Matrix[\RR64,r,c\])[\nat r, nat c\]: RR64 = do ...`
  gives a bare `Syntax Error` at the opening `[\` of the static-parameter
  list (`att_f_staticparams.fss:5:29`, with `null` printed before it); in
  `att_a.fss` the same shape spread over two lines reported at the
  declaration's own column (`105:7`). Only the postfix `opr` form takes
  static parameters there (ledger row 149). The fix used here is to declare
  such a reporting function over the runtime type
  `Array[\RR64,(ZZ32,ZZ32)\]` instead of a `nat`-generic `Matrix`.
- A top-level value may not share a name with a `nat` static parameter of
  any generic function in the component. With `q: Array[\RR64,(ZZ32,ZZ32)\]`
  at top level, round one's own `assignInto[\nat r, nat c, nat p, nat q\]`
  fails with `Variable q is already declared.` at the static-parameter list
  (`att_g_staticname.fss:6:38`; in `att_a.fss` the same at `42:38` for
  `assignInto` and `59:35` for `smRowsB`). Renaming the static parameter
  (`nat s`) is the fix; renaming the data would have cost the Dyalog
  correspondence. This is ledger row 147's rule reaching in the other
  direction — the *static* parameter is what collides, and the collision is
  reported at the generic, not at the value.

## Recommendation

Take form B: at six lines it is the only form that puts one Fortress line
against one Dyalog line, it copies not one float more than round one's
loops, and it costs 7% over form A at one thread and scales the same at
four — a price worth paying to delete seventeen lines of index arithmetic
from the middle of the program. Write its cell functions as untyped lambdas
for the two forward lines and as named top-level functions for the
backward, declare both the two- and three-argument `cells`, and assemble by
`mat` fill rather than by write-through. Form C buys nothing: it is the
same six lines wrapped in `heads`/`unheads`, needs 34 lines of rank-3
machinery instead of 14, copies 4096 floats per step for layout alone, and
runs 21% slower — the `Array3` value is only worth it if a later stage
genuinely wants per-head arrays as values rather than as views.
