# Rung 5 — "Iteration": design

Chapter: https://xpqz.github.io/learnapl/iteration.html, goldens `../goldens/ch5-iteration.md` (40 examples, 3 core). Base as of rung 4: every APL function value is a zero-parameter lambda over the frame stack, called through `aplCall`/`aplCall1`; `AplDy`/`AplMo` are the glyph tables, `AplFnD`/`AplFnM` the function-operand nonterminals, `AplUser` a dfn or a function name.

Target beyond the chapter: what the two microGPT programs (`../reference/nydhal-dyalog/microgpt.apln`, `../reference/hsu-flat/microgpt_concise.dyalog`) take from this chapter — `¨` over a strand of arrays (`h¨Q K Vv`, `v¨⍳9`, `u¨dQh dKh dVh`), destructuring `Q K Vv ← …`, `+\`, `⍣` with a count (`step⍣BLK⊢…`), `f⍣g` with a stop condition, a general `f/` and `f⌿` with a dfn operand.

## Scope

In: `¨` in both valences over simple arrays (cells are scalars) and over a **name strand**, i.e. a Fortress tuple; destructuring binding; `⌿` for the remaining glyphs and `f/`, `f⌿` with any function operand; scan `\` and `⍀`; power `⍣` with a count and with a stop function; `f⍨` as a monadic function operand (`×⍨¨`).

Out, with a `note`: n-wise reduction `2+⌿v` (Ex 12), bracket axis `⌿[1]` (Ex 11), dops `⍺⍺ ⍵⍵` (Ex 23, 25, 26), set-assignment `⊢←` (Ex 27–30), `?` and `⍞` (Ex 9, 16, 24, 35), `⎕NGET ⎕CY cmpx ]runtime` (Ex 31–37), characters (Ex 1, 28, 30–37), nested arrays with a ragged shape (Ex 4, 38–40), the `assert` dfn (Ex 18, 20). Ex 17, 19, 21 (recursive dfns) are in scope through rung 4; Ex 22 `Fib¨⍳10` is in scope here.

## Strands of arrays are tuples

APL writes a list of three matrices as `wq wk wv` and takes it apart with `a b c ← …`. Fortress has the tuple for exactly this, and the grammar can read the length off the source as it reads the rank. No nested APL array is built.

- `AplTuple :Expr:= a:AplName SPACE b:AplName SPACE c:AplName => <[ ((a), (b), (c)) ]> | a:AplName SPACE b:AplName => <[ ((a), (b)) ]>` — names only (a numeral strand stays a vector), two or three elements, longest first. It is an `AplBase` alternative and must stand **above** the single-name alternative. Because a name strand is an operand only where the grammar says so, `f x` (a call) and `a b` (a tuple) do not collide: `AplFnName` and `AplName` are disjoint sets.
- **Destructuring**: `a:Id SPACE b:Id SPACE c:Id SPACE ← SPACE e:AplE <sep> r:AplStm => <[ (fn (a, b, c) => (r))((e)) ]>` and the two-name form, above the single-name binding rules; the three separator variants as in rung 2. A lambda with a tuple parameter is ordinary Fortress; `_` is not an `Id` gap (row 69), so `_ ← …` stays unavailable.
- `f¨` over a tuple: `aplEach(f, t: (Any, Any, Any)): (Any, Any, Any) = (aplCall1(f, t.0), …)` hmm — Fortress tuples do not index; write the three-element and two-element overloads with tuple **patterns** in the parameter list, `aplEach(f, (a, b, c))`, or destructure inside with `(a, b, c) = t`. Probe which the interpreter accepts and record it.
- Dyadic `¨` pairing two tuples: `aplEach(f, (a, b, c), (d, e, g))` element by element; a non-tuple left argument is paired with every element.

## Each over a simple array

`f¨v` on a vector applies `aplCall1(f, v[i])` to every scalar; the result is assembled by the first cell's result (rung 4's `aplAsm1From` family): scalars give a vector, anything else is APL's nested result and out of scope — fail with a `requires`/explicit error naming it. On a matrix, every element, result a matrix. On a scalar, the scalar. Dyadic `l f¨ r` with scalar extension on either side.

Grammar: `f:AplFnM ¨ SPACE r:AplE => <[ aplEach((f), (r)) ]>`, `l:AplAtom SPACE f:AplFnD ¨ SPACE r:AplE => <[ aplEach((f), (l), (r)) ]>`, above the calls. `AplFnM` gains `g:AplDy ⍨ => <[ aplCommute((g)) ]>` (`aplCommute(f) = fn () => aplCall(f, aplOmega(), aplOmega())`) and `AplFnD` gains the same for the dyadic swap, so `×⍨¨1+⍳9` and `-⍨/` work.

## Reductions, scans, power

- `f/` and `f⌿` with **any** operand: `f:AplFnD / SPACE r:AplE => <[ aplFoldLast((f), (r)) ]>`, same for `⌿`, placed **below** the rung 1/3 rules for `+/ ×/ ⌈/ ⌊/ -/` and their `⌿` forms, which keep the library's SUM/PROD/BIG MAX; `-⌿` joins those direct rules. `aplFoldLast` is APL's right-to-left fold through `aplCall`: on a vector a scalar, on a matrix one fold per row; `aplFoldFirst` one per column. Empty vector: the glyph's identity for the direct rules, a DOMAIN ERROR for the general one.
- Scans `+\ ×\ ⌈\ ⌊\ -\` direct (`aplScanLast`, prefix results, APL's definition: element k is the reduction of the first k+1 items, so `-\` alternates); `+⍀` etc. first-axis on matrices; general `f\` and `f⍀` through `aplCall`. `\` may need the backtick escape — probe.
- Power `f⍣n⊢x`: `f:AplFnM ⍣ SPACE n:AplAtom SPACE ⊢ SPACE r:AplE => <[ aplPower((f), (n), (r)) ]>` (n applications; the atom may be a name such as `BLK`). `f⍣g⊢x` with a stop function: `f:AplFnM ⍣ SPACE g:AplFnD SPACE ⊢ SPACE r:AplE => <[ aplPowerUntil((f), (g), (r)) ]>`, applying `f` until `aplCall(g, new, old)` is truthy (APL calls the condition with the new value as `⍺` and the old as `⍵`); `⍣=` is `g` = the `=` glyph value, which on scalars is the host Boolean (row 41) — `aplTruthy` takes both. Also the parenthesised spellings `(f⍣n) x` if cheap.

## Deliverables (worker)

As rung 4: library + grammar extended, rungs 1–4 re-run and green with refreshed `.out`, probes `v01_…` with `.out` and a `PROBES.md`, `Rung5.fss` over all 40 examples with `chk`/`note` and a beyond-chapter section (`h¨Q K Vv` with three real matrices and a dfn, `a b c ← …`, `v¨⍳9` is out unless a tuple of nine is wanted — say so, `step⍣BLK⊢v` with a dfn, `2÷⍨⍣=10`, `+\`, `-⍀`, `{⍺+⍵}/⍳5`, `Fib¨⍳10`), `REPORT.md` in rung 4's outline, gap rows from 77, README row 5.
