# Rung 3 — "Glyphiary": design

Chapter: https://xpqz.github.io/learnapl/manip.html, goldens in `../goldens/ch3-glyphiary.md` (59 examples, 102 input lines). Base: `../base/AplCore.fsi`, `../base/AplSyntax.fsi` (native arrays, rank in the type, glyphs as host operators where the host operator table allows, templates expand to host code).

Target beyond the chapter: the primitives that `../reference/nydhal-dyalog/microgpt.apln` takes from this chapter. They are listed with the glyphs below; rank-3 arrays, `⍤`, `+.×`, `∘.`, dfns, `¨`, `⍣`, guards and `⎕NS` belong to rungs 4, 5, 6 and 8 and are NOT this rung.

## Scope

In: every primitive of the chapter applied to simple numeric arrays of rank 0, 1, 2. Out, with a `note(...)` line in `Rung3.fss` naming the reason: nested arrays (Ex 4, 9–17, 20, 23, 26, 35, 37, 38, 44, 49, 50, 52, 59; also `⍳3 4` in Ex 19 and `⍸` of a matrix in Ex 34, whose results are nested), character arrays (Ex 3 second line, 21, 22, 31, 32, 40–43, 56, 57), `⎕` names and `]` commands (Ex 1, 2), dyadic `?` (Ex 2, 24, 89 — bind the matrix the book printed instead, as rung 2 did), `⊖⍤1` and `⊖[1]` (Ex 7; rank operator is rung 4, bracket axis is out), dfns (Ex 44, 79, 80; rung 4), `¨` (Ex 49, 50; rung 5), the tacit `tally ← +/=⍨` (Ex 47, 48; rung 7), an array used as a function `1⍨` (Ex 45, 46; not a function in this design), `⍴⍨` with a run-time shape `5⍴⍨⍴m` (Ex 51; gap row 47).

## Values and results

Unchanged: scalar `RR64`, vector `Vector[\RR64,s\]` parameter / `Array[\RR64,ZZ32\]` result, matrix `Matrix[\RR64,r,c\]` / `Array[\RR64,(ZZ32,ZZ32)\]`. Boolean results are 0/1 `RR64` arrays. Index origin 0. Every new function is an overload family on the argument ranks, named `apl<Name>` when the glyph is not in the host operator table (`Specification/appendices/operators.tex`) and a real `opr` when it is. Contracts (`requires`) carry APL's LENGTH ERROR, INDEX ERROR, DOMAIN ERROR as in rung 2.

## The glyphs

Dyadic, new or extended. "s" is a scalar, "V" a vector, "M" a matrix; a rank pair lists the overloads to write.

| glyph | APL meaning | host form | overloads |
|---|---|---|---|
| `↑` | take; negative takes from the back; overtake pads with 0 | `aplTake` (not in table) | (s,s)→V, (s,V)→V, (s,M)→M rows; `a b↑M`→M by the grammar's two-numeral rule, as `⍴` and `⌷` do |
| `↓` | drop | `aplDrop` | (s,V)→V, (s,M)→M rows, `a b↓M`→M |
| `⌽` | rotate last axis | `aplRotate` | (s,V)→V, (s,M)→M each row |
| `⊖` | rotate first axis; a vector left argument rotates each column by its own count (Ex 21) | `opr ⊖` (OMINUS, in table; monadic exists) | (s,M)→M, (V,M)→M |
| `⍳` | index of; not found is `≢left` | `aplIndexOf` | (V,s)→s, (V,V)→V |
| `⍸` | interval index (Ex 53–55, 62) | `aplBin` (monadic `aplWhere` exists) | (V,s)→s, (V,V)→V |
| `\|` | residue: `a\|b` is b mod a, result takes the sign of a (APL); monadic magnitude | `aplResidue`, `aplAbs` (`\|` is an encloser) | dyadic (s,s), (s,V), (V,s), (V,V), (s,M), (M,s); monadic s, V, M |
| `∊` | membership; monadic enlist, which on a simple array is ravel | `aplIn`, `aplEnlist` | (s,V)→s, (V,V)→V; monadic s, V, M |
| `∪` | union; monadic unique | `aplUnion`, `aplUnique` | (V,V)→V; monadic V |
| `∩` | intersection | `aplIntersect` | (V,V)→V |
| `~` | without; monadic NOT | `aplWithout`, `aplNot` | (V,V)→V, (V,s)→V; monadic s, V, M |
| `,` | catenate last (Ex 72) | `aplCat` (exists for s/V) | add (M,M), (M,V), (V,M), (M,s) |
| `⍪` | catenate first (Ex 73); monadic table | `aplCatFirst`, `aplTable` | (M,M), (V,M), (M,V); monadic V→M n×1, s→M 1×1 |
| `= ≠ < ≤ > ≥` | comparisons, 0/1 results, scalar extension | `opr` (all six are in the table; `=` and `≤` exist for (V,V)) | each: (V,V), (s,V), (V,s), (M,M), (s,M), (M,s). NOT (s,s): the library's Boolean `=` stays (row 41) |
| `∧ ∨` | and, or on 0/1 | `opr` (in table) | same six |
| `⌈ ⌊` | max, min | `MAX`/`MIN` (exist for V) | add (M,M), (s,M), (M,s), (V,s) |
| `× ÷ + - *` | arithmetic on matrices | `opr` (exist for s/V) | `×` `÷` `-` `*`: (M,M), (s,M), (M,s); `+`: (M,s) (the others exist or are the library's own) |
| `*` monadic | exp | `opr *` prefix | s, V, M |
| `⍟` | log; dyadic log to base | `aplLog` | monadic s, V, M; dyadic (s,s), (s,V), (s,M) |
| `⍋ ⍒` | grade up / down, stable | `aplGradeUp`, `aplGradeDown` | V→V of indices |
| `⌊/ ⌊⌿ ⌈⌿ ×⌿` | reductions missing from the family | `aplMinLast`, `aplMinFirst`, `aplMaxFirst`, `aplProdFirst` | s, V, M as the existing ones |

Write the 36 comparison overloads and the 12 `∧ ∨` ones through three private helpers `aplZipV(f, a, b)`, `aplZipM`, and the scalar-extension variants, so each `opr` is one line. Same for the arithmetic on matrices.

## The grammar

- One rule per glyph per arity, in the existing style, in the existing position (dyadic rules above the reductions, reductions above compress, monadic rules below). `↑` and `↓` with two numerals go with the `⍴`/`⌷` rules at the top of `AplE`.
- `|` will need the backtick escape (`` `| ``, gap row 17 lists it); `<` and `>` may collide with the template delimiters `<[` `]>` — probe both before writing the rules, and record what is found.
- **Commute `⍨`.** Add a nonterminal `AplDy :Expr:=` whose alternatives are the dyadic glyphs and whose templates are host lambdas: `× => <[ fn (x, y) => x × y ]>`, `↑ => <[ fn (x, y) => aplTake(x, y) ]>`, and so on for `× ÷ + - * ⌈ ⌊ = ≠ < ≤ > ≥ ∧ ∨ ↑ ↓ ⌽ ⊖ ⍳ ∊ ∪ ∩ ~ | , ⍪ ⍟`. Then two rules ahead of the plain dyadic ones: `l:AplAtom SPACE f:AplDy ⍨ SPACE r:AplE => <[ (f)((r), (l)) ]>` and `f:AplDy ⍨ SPACE r:AplE => <[ (f)((r), (r)) ]>`. A glyph used directly still expands to the operator; a glyph handed to an operator becomes a function value. This is the shape rungs 4, 5 and 6 will reuse for `/ ¨ ⍤ ∘. .`, so it is worth getting right now; report whether the untyped lambda dispatches on the argument ranks at the call.
- **Reshape with an expression shape.** `(a,b)⍴x` where `a` and `b` are expressions (the program writes `(n,NE)⍴…`): one rule `( SPACE a:AplE SPACE , SPACE b:AplE SPACE ) SPACE ⍴ SPACE r:AplE => <[ aplReshapeM((a), (b), (r)) ]>` placed with the `⍴` rules. The rank is read from the comma count, the same trick as counting numerals; a vector-valued `a` fails at the call with no applicable overload — note it.

## Deliverables (worker)

1. `../base/AplCore.fss` + `.fsi` extended; `../base/AplSyntax.fsi` extended. Nothing already there changes behaviour; rung 1 and rung 2 components still pass (`rung-1/Rung1.fss`, `rung-2/Rung2.fss`, re-run and keep the new `.out`).
2. Probes `rung-3/t01_…fss` with `.out`, one per question (terminal collisions, `⍨` lambda dispatch, residue sign, take padding, grade stability, whatever else turns up), kept even when they fail.
3. `rung-3/Rung3.fss` in the shape of `rung-2/Rung2.fss`: every example of the chapter, `chk` against the book's printed output, `note` for those out of scope, one block per example, the book's layout kept. `Rung3.out` from a run.
4. `rung-3/REPORT.md` in the outline of `rung-2/REPORT.md`: verdict with counts (checks passed / examples reached / out of scope / beyond the chapter), how to run, what the library needed, what the grammar needed, errors met verbatim, departures from APL, new gap rows, probes.
5. New rows appended to `../gaps.md` (next number is 56) in its format, and the rung 3 row of `../README.md` filled in.
