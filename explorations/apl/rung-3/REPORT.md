# Rung 3 — "Glyphiary", on the native-array base

Chapter: https://xpqz.github.io/learnapl/manip.html · goldens:
`../goldens/ch3-glyphiary.md` (59 examples, the book's printed output verbatim,
index origin 0) · design: `DESIGN.md` · library and grammar: `../base/`
(`AplCore`, `AplSyntax`) · walk interpreter, JDK 25, `FORTRESS_THREADS=1`,
nothing outside `explorations/apl/` touched, nothing built.

## Verdict

- **43 of 43 checks pass, over 29 of the chapter's 59 examples. Nothing fails.**
  `Rung3.out`: `checks passed: 43 of 43, over 29 of the chapter's 59 examples`.
  The 29 are Ex 2, 3, 5, 6, 8, 18, 19, 24, 25, 26, 27, 28, 29, 30, 33, 34, 36,
  39, 43, 45, 46, 52, 53, 54, 55, 56, 57, 58, 59. Ten of them print more than one
  result, which is why there are 43 checks.
- **31 of 31 beyond-chapter checks pass** (`X1`-`X31`): matrix arithmetic with
  scalar extension (`X1`-`X7`), comparisons and connectives on matrices
  (`X8`-`X11`), monadic `*` and `⍟` (`X12`-`X15`), a reshape whose shape is an
  expression (`X16`), take and drop on two axes (`X17`-`X20`), commute `⍨` on a
  named function, on `⍴`, on an operator and in its monadic form (`X21`-`X25`),
  the four reductions rung 1 lacked (`X26`), residue's sign (`X27`), matrix
  catenation both ways (`X28`, `X29`), monadic `⍪` (`X30`), and a LENGTH ERROR as
  a contract violation (`X31`).
- **30 examples are out of scope**, each a `SKIP` line with its reason: Ex 1
  (`⎕IO`, `]box`, `]rows`), the 17 whose values are nested (Ex 4, 9-17, 20, 23,
  26 second line, 35, 37, 38, 49, 50), the 9 that are character arrays (Ex 3
  second line, 21, 22, 31, 32, 40, 41, 42, 52 second line), Ex 7 (`⍤` and the
  bracket axis), Ex 44 (dfns), Ex 47 and 48 (a tacit definition), and Ex 51
  (`5⍴⍨⍴m`, a run-time shape).
- **Rung 1 and rung 2 still pass on the extended base**, re-run after the library
  additions and again after the grammar additions: `../rung-1/Rung1.out` 26 of 26
  and 18 of 18, `../rung-2/Rung2.out` 25 of 25 and 21 of 21, both unchanged.
- **`DESIGN.md`'s scope list numbers several examples differently from the
  goldens**, and the goldens' numbering is what `Rung3.fss` follows. The design
  puts `⍳3 4` at Ex 19 (it is Ex 20) and `⍸` of a matrix at Ex 34 (it is Ex 26),
  and lists Ex 24, 43, 52, 56, 57 and 59 as out of scope when they are `⍸` of a
  Boolean vector, `v↑⍨1`, `∪` of a numeric vector, `~` of a Boolean vector, `⍋`
  of a numeric vector and `⊃⍋data` — all simple numeric arrays, all in scope, all
  passing. Ex 2 is reached the way rung 2 reached its two `9?9` examples: the
  matrix is bound to the permutation the book printed.
- **The rung's one new mechanism is the glyph as a value.** `AplDy` is a
  nonterminal of 31 alternatives, each an untyped host lambda, and `⍨` is two
  rules that apply it. The lambda keeps APL's rank polymorphism: the overload is
  chosen from the arguments at the call, so `v↑⍨1`, `q⊖⍨1`, `=⍨1 2 3 4 5` and
  `5⍴⍨3` all work off the same 31 lines (gap row 59). Rungs 4, 5 and 6 need
  exactly this for `/ ¨ ⍤ ∘.` and `.`.

## How to run

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-3 && $FORTRESS_HOME/bin/fortress Rung3.fss
```

A component that uses the expander regenerates two Rats! parsers (25-40 s); a
library-only probe costs 15 s, which is why `t01_ops`, `t03_and`, `t04_lib` and
`t08_prec` carry no grammar.

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

143 declarations, and the carrier is untouched. Scalar extension is written
once, in six private zips, so every comparison, connective and matrix arithmetic
overload is a signature and a one-line body:

```
aplZipV(f, a: Vector, b: Vector)     aplZipM(f, a: Matrix, b: Matrix)
aplZipSV(f, a: RR64, v: Vector)      aplZipSM(f, a: RR64, m: Matrix)
aplZipVS(f, v: Vector, a: RR64)      aplZipMS(f, m: Matrix, a: RR64)

opr ≠[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\] =
    aplZipV(aplNeS, a, b)
```

| what | spelling that worked | why |
|---|---|---|
| `≠ < > ≥`, and `= ≤` over the shapes they lacked | `opr` in the five or six array shapes each — `(V,V)`, `(s,V)`, `(V,s)`, `(M,M)`, `(s,M)`, `(M,s)` | the host table takes all six glyphs with an **array** result (gap row 58); `(s,s)` is left alone so the library's Boolean comparison survives |
| `∧ ∨` | `opr` in the same six shapes | same |
| `↑ ↓` | `aplTake` / `aplDrop`, with a third parameter for the two-numeral form `a b↑m` | the result keeps the argument's **rank**: `1↑mat` is a one-row matrix, not a vector |
| `⌽ ⊖` with a count | `aplRotate(n, v)`, `aplRotate(n, m)`; `opr ⊖(n, v)`, `opr ⊖(n, m)`, `opr ⊖(ks: Vector, m: Matrix)` | `⊖` is `OMINUS` and takes a dyadic declaration beside the monadic one; the vector left argument of Ex 8 rotates each column by its own count |
| `⍳` Index of, `⍸` Interval index | `aplIndexOf(v, x)` / `(v, w)`, `aplBin(v, x)` / `(v, w)` | not found is `≢⍺`; a boundary goes to the higher bin and below the first bin is `¯1` |
| `\|` residue and magnitude | `aplResidue` in six shapes, `aplAbs` in three | `\|` is a host encloser in both arities (row 39), so the glyph is a terminal and the function is named |
| `∊ ∪ ∩ ~` | `aplIn`, `aplEnlist`, `aplUnion`, `aplUnique`, `aplIntersect`, `aplWithout`, `aplNot` | Dyalog's Union keeps the left argument's duplicates (Ex 53), which is `a, (b not already present)` |
| `,` and `⍪` over two ranks | `aplCat` for `(M,M)`, `(M,V)`, `(V,M)`, `(M,s)`; `aplCatFirst` for `(V,V)`, `(M,M)`, `(V,M)`, `(M,V)`; `aplTable` for monadic `⍪` | the rank pairs the chapter uses; the shape mismatches are `requires` contracts |
| matrix arithmetic | `× ÷ *` in `(M,M)`, `(s,M)`, `(M,s)`; `-` and `+` only in the direction the library lacks | the shipped `Matrix` gives `+` and `-` between two matrices and no elementwise `×` (gap row 64) |
| monadic `*` and `⍟` | `opr *(x: RR64)` and two more; `aplLog` monadic and dyadic, three shapes each | a prefix `*` is declarable (row 58); the use site still needs the space after a parenthesis (row 40) |
| `⍋ ⍒` | `aplGradeUp`, `aplGradeDown`: a stable insertion sort of the index vector | the chapter's `⍋data` has two 18s and keeps their order |
| `⌊/ ⌊⌿ ⌈⌿ ×⌿` | `aplMinLast`, `aplMinFirst`, `aplMaxFirst`, `aplProdFirst`, three ranks each | `BIG MIN` exists beside `BIG MAX`, so the bodies are the shipped big operators |
| LENGTH ERROR on a matrix | `requires { (aplRowsOf(a) = aplRowsOf(b)) AND (aplColsOf(a) = aplColsOf(b)) }` | a `requires` clause cannot destructure `m.sizes`, so two one-line readers stand in |

One existing function changed behaviour, and only by widening: **`⍸` Where now
counts**. `⍸0 1 0 2 0 3 …` is `1 3 3 5 5 5 …` (Ex 27), which is what APL always
meant; a 0/1 argument behaves exactly as it did in rung 2, and rung 2's `X1` and
`X2` still pass.

The one guard that had to be rewritten is the grade's inner loop. `AND` is
strict (gap row 56), so `while (j > 0) AND (v[idx[j-1]] > v[idx[j]])` evaluates
the index at `¯1`; the loops break out with `else j := 0` instead.

## What the grammar needed (`../base/AplSyntax.fsi`)

77 new alternatives: 37 in `AplE`, 31 in the new `AplDy`, 9 names.

1. **Commute `⍨`, and the glyph table it reads.** Two rules, placed above the
   plain dyadic ones so the glyph is read as an operand before it is read as an
   operator:

   ```
   | l:AplAtom SPACE f:AplDy ⍨ SPACE r:AplE => <[ (f)((r), (l)) ]>
   | f:AplDy ⍨ SPACE r:AplE                 => <[ (f)((r), (r)) ]>

   AplDy :Expr:=
       × => <[ fn (x, y) => x × y ]>
     | ↑ => <[ fn (x, y) => aplTake(x, y) ]>
     | …
   ```

   The lambda is untyped and resolves the overload at the call, so one
   alternative per glyph covers every rank (gap row 59, measured first in
   `t01_ops.out` (f) and then through the expansion in `t05_gram.out`).

2. **`(a,b)⍴x`, and where it has to stand.** The gaps must be **atoms**: with
   `a:AplE` the first gap parses `a , b` as one catenation and the rule never
   matches (gap row 60). The rule must also stand **above** the plain dyadic `⍴`
   rules, or `AplAtom`'s own `( AplE )` eats the parenthesis first and `(2,3)⍴5`
   becomes `aplReshapeV(vector, 5)` (gap row 61, `t02_gram.out.5`). This is
   enough for the microGPT spelling `(n,NE)⍴x`; `(2+1,3)⍴x` is out of reach.

3. **Two-numeral `↑` and `↓`**, with the `⍴` and `⌷` rules at the top of `AplE`,
   for the same reason those are there: `1 2↑m` must not read its left argument
   as one strand.

4. **19 dyadic rules, 9 monadic ones, 4 reductions.** Every glyph of the chapter
   parses as a terminal; only `|` needs the backtick escape, and `<` and `>` do
   not collide with `<[` `]>` (gap row 57). `≠ < > ≥ ∧ ∨ ⊖` expand to host
   operators, the rest to calls.

5. **Nine names** — `mat nums code rate limits bin abv simple minidx` — added to
   the closed set, longest first, each a sequence of one-character classes.

The book's layout survives less well than in rung 2. A line break separates two
statements only when the next line cannot extend the previous phrase, and with
rung 3's dyadic rules in place that now fails for a line beginning with any
dyadic glyph, not only with a numeral: `mat ← 3 4⍴3 0 5 …` followed by `⌽mat` is
one rotate (gap row 63). Seven lines of `Rung3.fss` carry `⋄` for this, where
rung 2 needed one.

## Errors met, verbatim

```
T02Syn.fsi:25:7:
    Syntax Error
      (the probe grammar's nonterminals were called TE and TA.  Gap row 15: a
       name of two or more uppercase letters is an operator word.  Renamed TExp
       and TAtom)

t02_gram.fss:100:14-33:
Failed to find any matching overload, args = (true), overload = { aplShow(…) }
      (t02_gram.out.0: `2 < 3`.  A scalar comparison is the host's Boolean and
       not an APL array, which is the departure rung 3 keeps)

t02_gram.fss:101:45-46:
    Variable tst is not defined.
      (t02_gram.out.1: `("" tst⦇ 2 < 3 ⦈)`.  A use of the expander may not be an
       operand of a juxtaposition, though it may be a function argument or the
       right-hand side of a binding — gap row 65, isolated in t07_juxt)

FAIL: Index of dimension 1 out of bounds; got -1 which is not in 0#3
/home/user/fortress/Library/FortressLibrary.fss:56:5-23: FailCalled
      (t02_gram.out.2: `while (j > 0) AND (v[idx[j-1]] > v[idx[j]])`.  AND is
       strict — gap row 56 — so the guard does not protect the index)

/home/user/fortress/explorations/apl/rung-3/T02Syn.fsi:1:1-76:
Failed to find any matching overload,
  args = (__DefaultVector[\RR64,2\],5.0:RR64), overload = { aplReshapeV(…) }
      (t02_gram.out.5: `(2,3)⍴5` with the `(a,b)⍴` rule BELOW the plain dyadic ⍴.
       The parenthesis was eaten by the atom rule, so the left argument arrived as
       a 2-element vector.  Gap row 61, and note the span: the grammar api's line
       1, gap row 35 again)

t06_break.fss:14:31:
    Syntax Error
      (t06_break.out.0: `⌽mat` on the line after `mat ← 3 4⍴3 0 5 1 …`.  The line
       break is optional whitespace, so the two lines read as one dyadic rotate
       and the binding is left without a following statement.  Gap row 63.
       .out.1 is the same thing for `,simple`, at :14:34)

t08_prec.fss:9:41-64:
    Resolution of operator property failed for:
    Loose operators MOD and + have incomparable precedence.
      (t08_prec.out.0: `(i + k) MOD n + n MOD n`, the rotation arithmetic as it
       was first written.  Fortress assigns no integer precedences; where no
       relationship is specified, parentheses are required.  Gap row 66)

t07_juxt.fss:20:24-25:
    Variable apl is not defined.
      (t07_juxt.out.0: `("" apl⦇ 5 ⦈)`.  The same diagnostic as gap row 53, for a
       use that is in fact well formed — it is only in the wrong position)
```

## Departures from APL that remain

- **A comparison of two scalars is the host's Boolean**, not APL's 0/1: `2<3` is
  `true`. The array shapes are redeclared, `(s,s)` is not. It could be
  (gap row 62) at the price of changing every host use of `<` in the component.
- **Monadic `↑` and `↓`** — Mix and Split — are absent: both make nested arrays.
  The dyadic take and drop are here in full.
- **`⍸` of a matrix** is absent for the same reason: its result is a vector of
  coordinate vectors.
- **A reshape's rank is read off the source text**, so `5⍴⍨⍴m` (Ex 51) has no
  production. `(a,b)⍴x` covers a shape that is two *expressions*, not a shape
  that is one vector (gap rows 47, 60).
- **No characters, no nesting, no `?` Deal** — Ex 2 is bound to the permutation
  the book printed — and no `⎕` names or `]` commands.
- **A line break is not a statement separator** when the next line starts with a
  dyadic glyph; seven of the chapter's lines need `⋄` (gap row 63).
- **`~` is Without and NOT only**; `⍷`, `⍕`, dfns, `¨`, `⍤` and tacit definitions
  belong to later rungs.

## New gap rows

Eleven rows appended to `../gaps.md`, numbered **56-66**: `AND` is strict, and
only the thunk overload short-circuits (56); every remaining glyph of the chapter
is a usable terminal, `|` behind the backtick escape and `<` `>` beside the
template delimiters (57); the host table takes `≠ < > ≥ ∧ ∨` with array results,
a dyadic `⊖`, and a prefix `*` (58); an untyped host lambda is a first-class
glyph value that still dispatches on rank at the call (59); a gap inside a
delimited rule is greedy too (60); a parenthesised-left rule must stand above the
plain rule for the same glyph (61); a component `opr` with a library operator's
exact parameter types but a different result type wins silently (62); the
line-break trap of row 52 widens to every dyadic glyph (63); the shipped `Matrix`
gives `+` and `-` and no elementwise `×` (64); an expander use may not be an
operand of a juxtaposition (65); two loose operators of incomparable precedence
are a static error (66).

## Probes

`.out.0` / `.out.1` … are earlier spellings of the same probe, failures kept.

| probe | question | outcome |
|---|---|---|
| `t01_ops` | can `≠ < > ≥ ∧ ∨` be oprs with array results, a dyadic `⊖` beside the monadic one, a prefix `*`; what does the library already give for two matrices; does an untyped lambda dispatch on rank? | yes / yes / yes / `+` and `-` / **yes** — the five answers the rung is built on |
| `t02_gram` | `\|` behind the backtick escape, `<` and `>` beside `<[` `]>`, the other eleven glyphs as terminals, commute through a nonterminal of lambdas, `(a,b)⍴x` with expression gaps | all of it except the expression gaps; `.out.0`-`.out.5` are the earlier spellings, including the two that made gap rows 60 and 61 |
| `t03_and` | is `AND` short-circuiting; what happens to a component `opr` with the library's exact parameter types? | no / it wins, silently |
| `t04_lib` | the whole rung-3 library through its api, no grammar | every value the chapter prints, plus the shapes it does not |
| `t05_gram` | the extended base grammar with **no** APL names, values entering through `⍎(…)` | all 37 new `AplE` alternatives, and rungs 1 and 2 unchanged |
| `t06_break` | does a line break separate a binding from a line beginning with a glyph? | no: `.out.0` is `⌽`, `.out.1` is `,`, `.out` is the `⋄` that fixes both and the `⍉` that needs none |
| `t07_juxt` | where may a use of the expander stand? | argument, binding, argument-inside-juxtaposition yes; operand of a juxtaposition **no** (`.out.0`) |
| `t08_prec` | `(i + k) MOD n + n MOD n` | `Loose operators MOD and + have incomparable precedence` (`.out.0`); parentheses fix it |
| `Rung3` | the chapter | 43 of 43 over 29 examples, 31 of 31 beyond, no failing run |
