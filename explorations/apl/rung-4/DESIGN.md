# Rung 4 — "Direct functions and operators": design

Chapter: https://xpqz.github.io/learnapl/functions.html, goldens in `../goldens/ch4-functions.md` (29 examples). Probes that settled the open questions: `PROBES.md` (u01–u09). Base as of rung 3.

Target beyond the chapter: what `../reference/nydhal-dyalog/microgpt.apln` takes from this rung — dfns with `⍺ ⍵`, multi-line bodies with local bindings, `⍤1` and `⍤2`, `0∘⌈`, `⊢`, rank-3 arrays with `(a,b,c)⍴x`, `1 0 2⍉`, `,⍤2`, `⍉⍤2`, elementwise arithmetic on rank 3. Not this rung: `+.×` and `∘.` (rung 6), `¨ ⍣` and guards inside `¨` loops (rung 5), `⎕NS ⍎ ⎕N*` (host code when the program is translated).

## Scope

In: dfns as values, anonymous and named; `⍺ ⍵`; statements separated by `⋄` and line breaks inside `{ }`; default left argument `⍺ ← e`; guards `c: e`; recursion `∇`; `∘` with a bound left argument; `⊢ ⊣`; dyadic `⊃` pick from a simple vector (Ex 16); the rank operator `⍤1 ⍤2` in both valences; rank-3 arrays.

Out, with a `note`: `⎕ ]` (Ex 1, 3, 5, …), characters and `⎕signal` (Ex 2, 20, 22, 24), nested arrays (Ex 27–29 `⊂`), modified and set assignment `+← ⊢←` on a name (Ex 19, 21; an APL name is a lambda parameter and cannot be reassigned, gap row 29), a local that re-binds a name bound in an enclosing block (Ex 17 `{a←¯99}` inside a dfn that bound `a`; row 29), n-wise reduction `2 (+/) ⍳10` and a reduction as a named value `sumred ← +/` (Ex 25, 26), dops `⍺⍺ ⍵⍵ ∇∇` (Ex 27–29), tacit (Ex 26). Ex 15 defines a function over undefined names and prints nothing: note it.

## The dfn: a zero-parameter lambda over a frame stack (u01–u04)

Fortress refuses every nested re-declaration of a name: lambda parameters, `do`-block locals, positional and keyword method parameters, object-expression fields, all `already declared` (u01–u03; keyword parameters are not even implemented, u02). So a dfn cannot be `fn (alpha, omega) => …` once dfns nest. The form that survives nesting is the frame stack (u04):

- `{ body }` expands to `<[ fn () => (body) ]>`. `⍺` expands to `aplAlpha()`, `⍵` to `aplOmega()`, `∇` to `aplSelf()`; none of the three is a Fortress identifier (u05), all are sub-grammar terminals.
- The library keeps one stack of frames `(f, alpha, omega)`. `aplCall(f, a, o)` pushes, calls `f()`, pops, returns the value; `aplCall1(f, o)` pushes with alpha absent. `aplAlpha()` on an absent alpha is APL's VALUE ERROR, a `requires` or an explicit failure. `aplHasAlpha()`, `aplDefaultAlpha(e)` (sets alpha in the current frame if absent and returns `()`; a second `⍺ ←` therefore has no effect, as in APL). The stack is a plain mutable list; FORTRESS_THREADS=1 is assumed and the departure is recorded.
- This matches APL's own rule that `⍺ ⍵` are never inherited from an enclosing dfn: a nested dfn's `⍵` is its own because its call pushed its own frame. Cost measured at about 4× a two-parameter call in the walker (u04); the hot path of the program is the array primitives, not calls.
- **Every APL function value now has this shape**, glyphs included: the 31 `AplDy` alternatives of rung 3 become `fn () => aplAlpha() × aplOmega()` and so on, and `⍨` calls them with `aplCall((f), (r), (l))` / `aplCall((f), (r), (r))`. Add an `AplMo` table for the monadic glyph values (`⍉ => fn () => aplTrans(aplOmega())`, also `⌽ ⊖ , ⍴ ⍳ ≢ - ÷ × * ⍟ ⌈ ⌊ ~ ∊ ∪ ⍋ ⍒ ⍸ ⊃ ⍪ |`). Rung 3 must still pass.
- `AplFnD :Expr:= d:AplDfn | n:AplFnName | g:AplDy` and `AplFnM :Expr:= d:AplDfn | n:AplFnName | g:AplMo` — the grammar knows a function's valence from where it stands, a dfn or a name takes either.

## Statements inside a dfn

The body is an `AplStm` (rung 2's binding chain, `(fn n => rest)(e)`), extended with:

- **guard**: `c:AplE SPACE `: SPACE e:AplE <sep> r:AplStm => <[ if aplTruthy((c)) then (e) else (r) end ]>` — the rest of the body is the else branch, which is exactly APL's flow. `aplTruthy` is overloaded on `RR64` (APL's 0/1) and `Boolean` (a scalar comparison is the host's Boolean, row 41). A guard as the last statement has no production, like a lone binding. `` `: `` parses and fires (u06).
- **default left argument**: `⍺ SPACE ← SPACE e:AplE <sep> r:AplStm => <[ (fn _ => (r))(aplDefaultAlpha((e))) ]>`, above the general binding rule so that `⍺` is not read as an `Id`.
- Line breaks and `⋄` as in rung 2. The `⍝` comment forms of rung 2 apply inside the braces as well.
- Departure to record: in APL the first bare expression ends the dfn; here a non-final bare expression is evaluated for effect and the body continues (`AplStm`'s `(fn _ => r)(s)`). The chapter's bodies end with their result, so nothing in it depends on the difference.

## Calls

- `f:AplFnM SPACE r:AplE => <[ aplCall1((f), (r)) ]>` and `l:AplAtom SPACE f:AplFnD SPACE r:AplE => <[ aplCall((f), (l), (r)) ]>`, placed above the plain dyadic glyph rules but below `⍨` and `⍤`.
- `∇`: `l:AplAtom SPACE ∇ SPACE r:AplE => <[ aplCall(aplSelf(), (l), (r)) ]>` and `∇ SPACE r:AplE => <[ aplCall1(aplSelf(), (r)) ]>`.
- **Function names** are a second closed set, `AplFnName`, one line per name in the style of `AplName`, disjoint from it: `MyFirstFunction Sum sum Palinish foo` for the chapter, `f g h relu rmsnorm softmax` for beyond the chapter. A dfn is bound by the ordinary binding rule (`n:Id ← e`), so `sum ← {…}` needs nothing new.
- `{` and `}` need the backtick escape (row 17); `AplDfn :Expr:= `{ SPACE b:AplStm SPACE `} => <[ fn () => (b) ]>`.

## Operators

- **Rank** `⍤`. The rank is read from the source (`1` or `2`), as `⍴` does. Rules: `f:AplFnM ⍤ 1 SPACE ⊢ SPACE r:AplE => <[ aplRank1((f), (r)) ]>`, same for `2`; dyadic `l:AplAtom SPACE f:AplFnD ⍤ 1 SPACE ⊢ SPACE r:AplE => <[ aplRank1((f), (l), (r)) ]>` and the parenthesised form `l:AplAtom SPACE ( SPACE f:AplFnD ⍤ 1 SPACE ) SPACE r:AplE` (the program writes `dX3 (rmsnorm_bwd⍤1) ACT.X2`), same for `2`.
  Library: `aplRank1(f, m: Matrix)` applies `aplCall1(f, row)` to every row view (`AplRow`), `aplRank1(f, t: Array3)` to every row of every plane, `aplRank2(f, t: Array3)` to every plane view (a six-line `AplPlane … extends Matrix`, u08). The result's rank is decided by **overloading on the first cell's result** (u09): `aplAssemble1(r0: RR64, …)` builds the lower rank, `aplAssemble1(r0: Vector, …)` the same rank, `aplAssemble2(r0: Matrix, …)` an `Array3`; a LENGTH ERROR if later cells differ in shape. Dyadic: cells paired by position when the two frames agree; a left argument of the cell rank itself (a vector for `⍤1`, a matrix for `⍤2`, as in `(MASK n)+⍤2⊢S`) is paired with every right cell.
- **Compose with a bound left argument** `a:AplAtom ∘ g:AplDy => <[ aplBindLeft((g), (a)) ]>`, `aplBindLeft(f, a) = fn () => aplCall(f, a, aplOmega())`; `relu ← 0∘⌈` then `relu m` goes through `AplFnName`.
- `⊢`: `l:AplAtom SPACE ⊢ SPACE r:AplE => <[ (r) ]>`, `⊢ SPACE r:AplE => <[ (r) ]>`; `⊣` gives `(l)`. `⊢` is in the host operator table as RIGHT TACK? Check; a translation rule needs no declaration either way.
- Dyadic `⊃`: `i⊃v` → `aplPickAt(i, v)` on a vector (Ex 16).

## Rank 3 (u07, u08)

- Carrier: `Array3[\RR64,0,a,0,b,0,c\]` as the parameter type (it reaches `Rank3` and excludes ranks 1, 2, `Number`, `String`), `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` as the result type; built with `array[\RR64\](x,y,z)` and `.fill` with a three-argument function (the library's `array3(f)` declares the wrong arity, record it as a gap row).
- `(a,b,c)⍴x`: the three-atom rule beside the two-atom one (atoms, not `AplE`, row 60), `aplReshape3(a, b, c, x)` from scalar, vector, matrix, and from an `Array3`; `(a,b)⍴t` and `n⍴t` from an `Array3` (the program's `(n,NE)⍴1 0 2⍉H`). Flat row-major order throughout.
- `1 0 2⍉t`: the grammar reads the three numerals, `aplPerm102(t)` returns the `AplPerm102` **view** (u08), which dispatches as rank 3; other permutations are out of scope with a note. Monadic `⍉` on rank 3 reverses all axes: out of scope unless free.
- `aplShow` for rank 3: planes separated by one blank line, the APL display. `≢`, `⍴`, `,` (ravel), `⊃` on rank 3.
- Elementwise `× ÷ + - *` and the six comparisons with `(T,T) (s,T) (T,s)` through `aplZipT` helpers as rung 3 did for matrices; `⌈ ⌊` too (`MAX/MIN`). `+⍤2` is covered by the rank operator, but the program also writes `dS_masked÷HD*0.5` directly.

## Deliverables (worker)

1. `../base/AplCore.fss` + `.fsi`, `../base/AplSyntax.fsi` extended as above. Rungs 1–3 re-run and still passing (`rung-1/Rung1.out`, `rung-2/Rung2.out`, `rung-3/Rung3.out` refreshed).
2. Probes `rung-4/u10_…` onward for whatever else turns up, with `.out`; `PROBES.md` extended with a section per new probe.
3. `rung-4/Rung4.fss` in the shape of `rung-3/Rung3.fss`: every example of the chapter, `chk` against the book's output, `note` for the out-of-scope ones, one block per example; a "beyond the chapter" section covering the program's needs: `rmsnorm ← {⍵÷(EPSR+(+/⍵*2)÷≢⍵)*0.5}` applied with `⍤1` to a matrix, `softmax ← {e÷+/e←*⍵-⌈/⍵}` (note: `e←` inside an expression is an inline binding — if it cannot be expressed, write it as two statements and record the departure), `relu ← 0∘⌈` on a matrix, a dyadic dfn with `⍤1`, `(n,NH,HD)⍴Q` then `1 0 2⍉` then `⍉⍤2⊢` then `,⍤2⊢` then `(n,NE)⍴`, `÷` on rank 3, recursion `∇` with a default `⍺`, a guard chain, a dfn nested in a dfn with its own `⍵`. Expected values computed by hand or with Python (python3 is available) and stated.
4. `rung-4/REPORT.md` in `rung-3/REPORT.md`'s outline, plain register.
5. Gap rows appended to `../gaps.md` (next number is 67); the rung 4 row in `../README.md`.
