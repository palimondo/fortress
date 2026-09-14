# Rung 6 — "Products", on the native-array base

Chapter: https://xpqz.github.io/learnapl/products.html · goldens:
`../goldens/ch6-products.md` (18 examples, the book's printed output verbatim,
index origin 0) · design: `DESIGN.md` · probes: `PROBES.md` (w01–w04) · library
and grammar: `../base/` (`AplCore`, `AplSyntax`) · walk interpreter, JDK 25,
`FORTRESS_THREADS=1`, nothing outside `explorations/apl/` touched, nothing built.

## Verdict

- **16 of 16 checks pass, over 12 of the chapter's 18 examples. Nothing fails.**
  `Rung6.out`: `checks passed: 16 of 16, over 12 of the chapter's 18 examples`.
  The 12 are Ex 2, 3, 4, 6, 7, 8, 9, 10, 13, 14, 15, 17. Ex 7 and Ex 17 print
  three values each, which is why there are 16 checks.
- **17 of 17 beyond-chapter checks pass** (`Z1`–`Z17`): `+.×` in the other
  three rank pairs against hand values (`Z1`); the program's attention score
  `S←(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷Hd*0.5` over a rank-3 pair, shape, values and the whole
  line (`Z2`–`Z4`); `ids∘.=⍳Vs` as a one-hot and `(⍉ids∘.=⍳Vs)+.×dX` as a
  scatter-add (`Z5`, `Z6`); `¯1000×~(⍳4)∘.≥⍳4` as the causal mask (`Z7`);
  `vm ×⍤0 1⊢Pr` and `tg⌷⍤0 1⊢Pr` (`Z8`, `Z9`); `+.=` on vectors and matrices
  (`Z10`, `Z11`); `{⍺+⍵}.{⍺×⍵}` equal to `+.×` (`Z12`); a dfn as the operand of
  `∘.` in both valences (`Z13`); Ex 4 and Ex 3 shown to be the same matrix
  (`Z14`); the three lower-rank outer shapes (`Z15`); two more direct outer
  glyphs (`Z16`); and a mismatched product as APL's LENGTH ERROR (`Z17`).
- **6 examples are out of scope**, each a `SKIP` line with its reason: Ex 1
  (`⎕IO`, `]box`, `]rows`), Ex 5 (`prod ← ∘.×` and `rank ← ×⍤0 1` — a derived
  function as a value, which is rung 7 — and `]runtime`), Ex 11, 12 (character
  vectors; the numeric `+.=` is `Z10` and `Z11`), Ex 16, 18 (the `X` operator:
  a direct operator `⍺⍺`, `⎕CR`, and character vectors).
- **Rungs 1–5 still pass on the extended base**, re-run after the library
  additions and again after the grammar additions: `../rung-1/Rung1.out` 26 of
  26 and 18 of 18, `../rung-2/Rung2.out` 25 of 25 and 21 of 21,
  `../rung-3/Rung3.out` 43 of 43 and 31 of 31, `../rung-4/Rung4.out` 18 of 18
  and 31 of 31, `../rung-5/Rung5.out` 23 of 23 and 21 of 21, all unchanged.
- **The rung's mechanism is a product the library already had.** The shipped
  `opr DOT` does the inner product in all four rank pairs on runtime-built
  arrays (w01), and it is 1.46× a hand-written triple loop in the same library,
  so `aplMatMul` **is** `DOT` with a `requires` contract above it. The direct
  `+.×` rule costs **3.8×** less than the general `{⍺+⍵}.{⍺×⍵}` on a 16×16 by
  16×16 product (w04) — the general route pays 2·16³ = 8192 frame pushes.
- **The rung's one blocked road was a cell result that is not a number.** A
  comparison of two scalars is the host's `Boolean`, not APL's 0/1 (row 41), so
  `1 2 3∘.{⍺<⍵}1 2 3` failed the assembler's scalar contract until
  `aplIsScalar` was taught to accept one.

## How to run

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-6 && $FORTRESS_HOME/bin/fortress Rung6.fss
```

`w04_cost.fss` takes about 80 s; everything else is the usual 15–40 s.

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

58 new declarations, 257 new lines, in four blocks.

- **Outer product.** One shared typed helper `aplOuterWith` over the four
  shapes — (V,V) a matrix, (s,V) and (V,s) vectors, (s,s) a scalar, because the
  shape of `⍺∘.g⍵` is `(⍴⍺),(⍴⍵)` — and eight direct entries through it
  (`aplOuterMul aplOuterEq aplOuterNe aplOuterLt aplOuterLe aplOuterGt
  aplOuterGe aplOuterRes`), each one line per shape and no frame push. The
  general `aplOuter` goes through `aplCall` and assembles with rung 5's
  `aplAsmV` / `aplAsmM`.
- **Inner product.** `aplMatMul` over the four rank pairs, each a `requires` on
  the shared extent (APL's LENGTH ERROR) and then the shipped `DOT`;
  `aplInnerPlusEq` for `+.=`; the general `aplInner`, which builds the
  `g`-products along the shared axis through `aplCall` and then folds `f` over
  them right to left, also through `aplCall`. `aplLoopMul` is the textbook
  triple loop, kept in the library only so that w04 can price one against the
  other.
- **`⍤0 1`.** `aplRankD01` over (s,V), (V,V), (V,M) and (s,M); the left
  argument's cells are scalars and the right argument's cell is the whole of a
  vector or one row of a matrix, and the result is assembled by the first cell's
  result, as rung 4's `⍤` is.
- **One repair to rung 5's assembler.** `aplIsScalar` accepts a host `Boolean`
  and the new `aplScalarOf` maps it to 1.0 / 0.0, because a comparison of two
  scalars is the host's `Boolean` (row 41) and `{⍺<⍵}` is a legal operand of
  `∘.` and of `¨`.

## What the grammar needed (`../base/AplSyntax.fsi`)

40 new alternatives (lines carrying a `=> <[` template, the name sets
excluded) and 14 new names in `AplName`.  `AplSyntax.fsi` now carries 356
templates in all, 273 of them outside the three closed name sets.

- **`AplE`** gains two `⍤0 1` rules (with `⊢` and parenthesised), eight direct
  `∘.g` rules and eight commuted `∘.g⍨` rules, the two general `∘.` rules, the
  direct `+.×` and `+.=`, and the general `f.g`.
- **`AplFnD`** gains `` `+ . × `` as its **first** alternative, so that
  `Qh+.×⍤2⊢⍉⍤2⊢Kh` reaches rung 4's `aplRankD2` with matrix cells. First,
  because below `AplDy` the `+` alone would match and the `.×` would be left
  over.
- **`AplDy`** gains `⌷`, for `tg⌷⍤0 1⊢Pr`.
- **`AplName`** gains `row0col0prod prob ids Qh Kh Hd Vs Pr vm tg dX A B S`.
- The `.` is a plain item, as rung 5's v02 established; the backtick escape is a
  Syntax Error for it.

## Errors met, verbatim

- `Failed to find any matching overload, args =
  (__DefaultMatrix[\RR64,2,3\],__DefaultMatrix[\RR64,2,3\])` (`w01_dot.out.0`):
  a mismatched `DOT`. It is a `ProgramError`, so `catch e Exception` does not
  take it — which is why the LENGTH ERROR is a `requires` above the `DOT`.
- `AplCore.fss:1674:20-34: CallerViolation` (the first run of `w02_lib.fss`):
  `1 2 3∘.{⍺<⍵}1 2 3` against `aplAsmV`'s `requires { aplAllScalar(rs) }`, a
  cell result that is the host's `Boolean`.
- `w04_cost.fss:24:47: Syntax Error` (the first run of `w04_cost.fss`): `⍎(a)`,
  the escape to a host expression, inside a binding's right-hand side. The
  probe was rewritten to call `aplInner` directly, which is what the grammar
  expands the same source to.

## Where `DESIGN.md` was wrong

- **The shipped `Vector` does have a dot product, and so does `Matrix`** — and
  the design's parenthetical "(`Matrix` has no `×`, row 76)" is about `×`, not
  about `DOT`. `opr DOT` covers all four rank pairs and works on runtime-built
  arrays (w01), so the design's "textbook triple loop" is not what shipped: it
  is in the library as `aplLoopMul` and only so that w04 can price it. The loop
  is **1.46× slower** than `DOT`.
- **A mismatched `DOT` is not a usable LENGTH ERROR.** The design says "LENGTH
  ERROR as a contract on the inner extents", which is right; what it could not
  know is that without the contract the failure is a `ProgramError` that no
  `catch` clause takes (`w01_dot.out.0`), so the contract is not a nicety.
- **`∘.` does not collide with rung 4's `∘` bind rule at all.** The design says
  "Check that `∘` followed by `.` does not collide with rung 4's `a∘g` bind rule
  … put the outer rules first". They are first, but the collision could not
  happen: `AplDy` has no `.`, so the bind rule fails on its own.
- **The general outer product needed rung 5's Boolean repair.** The design's
  `aplOuter(f, l, r)` "a matrix of `aplCall(f, l[i], r[j])`" is right, but a
  dfn operand that compares two scalars returns the host's `Boolean` and the
  assembler refused it. The nearest thing that works is to let `aplIsScalar`
  accept a `Boolean`.
- **Ex 17 is in scope**, through the same adaptation rung 5 used for its Ex 10:
  the design lists `?` under "Out, with a note (Ex 17 — bind the printed
  matrices)", and binding them is what makes the example reachable, so it is
  counted as a check and not as a skip.
- **Ex 6's departure is recorded as the design asked.** `(2=+⌿0=x∘.|x)/x←⍳20`
  is written as two statements, which is rung 4's softmax departure again.

## Departures from APL that remain

- `prod ← ∘.×` and `rank ← ×⍤0 1`: a derived function as a **value** is a tacit
  definition (rung 7). `+.×` is the single exception, and only so that
  `+.×⍤2⊢` parses.
- A **number** as an operand of `∘.` or `.` has no rule; the operands are the
  glyph tables, a dfn or a named function.
- The outer product is declared over rank 0 and rank 1 only, which is every
  shape the chapter and the two programs use.
- `f.g` over rank 3 goes through `⍤2`, which is how the program writes it;
  there is no rank-3 overload of `aplMatMul` itself.
- `⍤0 1`'s left argument is a scalar or a vector, its cells being scalars by
  construction.

## New gap rows

Rows 83–85 of `../gaps.md`: the shipped `DOT` as APL's inner product, and its
uncatchable mismatch (83); a comparison of two scalars as the host's `Boolean`
reaching an assemble-by-cell (84); and the measured price of the direct rule
against the general one (85).

## Probes

`PROBES.md` carries one section per probe, w01–w04, each with its question, its
answer, and the verbatim text of every failure. w01 settled the shipped `DOT`
and turned the design's triple loop into one line; w02 settled the library and
turned up the `Boolean` cell result; w03 asked one question per new production
and pinned the two load-bearing orderings; w04 priced the direct rule.
