# Rung 6 — "Products": design

Chapter: https://xpqz.github.io/learnapl/products.html, goldens `../goldens/ch6-products.md` (18 examples, 3 core). Base as of rung 5.

Target beyond the chapter: `+.×` on matrices is the hot path of both microGPT programs (every linear layer, and `+.×⍤2⊢` over rank-3 heads); `∘.=` builds the one-hot matrices, `∘.≥` and `∘.>` the causal and validity masks; `⍤0 1` pairs a scalar per row (`vm ×⍤0 1⊢Pr`, `tg⌷⍤0 1⊢Pr`).

## Scope

In: outer product `∘.g` for any dyadic operand, with direct rules for `∘.× ∘.= ∘.≥ ∘.> ∘.< ∘.≤ ∘.≠ ∘.|`; `∘.g⍨`; inner product `f.g` for any pair of operands, with a **direct matrix multiply** for `+.×` in all four rank pairs (V·V scalar, V·M, M·V, M·M) and for `+.×⍤2⊢` over rank 3 (the `+.×` derived function as an `AplFnD` operand); `+.=`; the rank operator with two ranks `⍤0 1` in the dyadic form.

Out, with a `note`: tacit naming `prod ← ∘.×`, `rank ← ×⍤0 1` (Ex 5; a derived function as a value is rung 7), `]runtime`, characters (Ex 11, 12, 16), the `X` operator and `⎕CR` (Ex 16, 18), `?` (Ex 17 — bind the printed matrices), the inline binding `x←⍳20` inside Ex 6's expression (a binding is a statement here; write it as two statements and record the departure, which also covers the program's `e←` inside softmax).

## Outer product

`l:AplAtom SPACE ∘ . g:AplDy SPACE r:AplE => <[ aplOuter((g), (l), (r)) ]>` with `aplOuter(f, l: Vector, r: Vector)` a matrix of `aplCall(f, l[i], r[j])`, plus (s,V), (V,s), (s,s). **Above** it, the direct rules `l ∘ . × r => aplOuterTimes((l), (r))`, `∘ . =` → `aplOuterEq`, and `≥ > < ≤ ≠ |` likewise — no frame push, one line each in the library through a shared `aplOuterWith(f: (RR64,RR64)->RR64, l, r)` typed helper. `∘.g⍨ r` → the same with `r` twice. Check that `∘` followed by `.` does not collide with rung 4's `a∘g` bind rule (the bind rule has an atom on the left; put the outer rules first).

## Inner product

- `l:AplAtom SPACE `+ . × SPACE r:AplE => <[ aplMatMul((l), (r)) ]>`: `(M,M)` the textbook triple loop into a fresh matrix, `(V,M)` and `(M,V)` a vector, `(V,V)` a scalar (the shipped `Vector` may have a dot product — use it if it is there, `Matrix` has no `×`, row 76). LENGTH ERROR as a contract on the inner extents.
- `+.=` → `aplInnerPlusEq` on vectors (a count of equal positions) and on matrices; general `l f.g r` → `aplInner((f), (g), (l), (r))`: for each row of `l` and column of `r`, the `g` products through `aplCall` and then `f` folded right to left through `aplCall`, ranks as for `+.×`.
- `AplFnD` gains `` `+ . × => <[ fn (): Any => aplMatMul(aplAlpha(), aplOmega()) ]> `` so that `Qh+.×⍤2⊢⍉⍤2⊢Kh` goes through rung 4's `aplRankD2` with matrix cells and assembles a rank-3 result. This is the one place where the derived function is a value; check the order of the `⍤` rules against the new glyph pair.

## Rank with two ranks

`l:AplAtom SPACE f:AplFnD ⍤ 0 SPACE 1 SPACE ⊢ SPACE r:AplE => <[ aplRankD01((f), (l), (r)) ]>` and the parenthesised form. `aplRankD01(f, l: Vector, r: Vector)`: every scalar of `l` against the whole of `r` (the right frame is empty), a matrix of `|l|` rows; `(l: Vector, r: Matrix)`: scalar `l[i]` with row `i` of `r`, LENGTH ERROR if `|l|` is not the row count; results assembled by the first cell's result as rung 4 does. `⌷` joins `AplDy` as `aplSquad1` so that `tg⌷⍤0 1⊢Pr` picks one element per row; `⌷` is not a host operator character, check it is a usable terminal (it already is a terminal in rung 2's rules).

## Deliverables (worker)

As rung 5, in `rung-6/`: probes `w01_…`, `Rung6.fss` over the 18 examples plus a beyond-chapter section — `+.×` in the four rank pairs against hand-computed values, `+.×⍤2⊢` over a rank-3 pair (the program's `S←(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` with small numbers), `ids∘.=⍳VS` as a one-hot and `(⍉ids∘.=⍳VS)+.×dX` as a scatter-add, `¯1E10×~(⍳4)∘.≥⍳4` as the mask, `vm ×⍤0 1⊢Pr`, `tg⌷⍤0 1⊢Pr`, `{⍺+⍵}.{⍺×⍵}` as the general product equal to `+.×` — `REPORT.md`, gap rows continuing from rung 5's last, README row 6. Rungs 1–5 re-run and green.
