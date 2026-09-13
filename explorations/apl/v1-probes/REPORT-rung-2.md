# Rung 2 — "Indexing"

Chapter: https://xpqz.github.io/learnapl/indexing.html · goldens:
`../goldens/ch2-indexing.md` (40 examples, the book's printed output verbatim) ·
walk interpreter, JDK 25, `FORTRESS_THREADS=1`, nothing outside
`explorations/apl/` touched, nothing built.

## Verdict

- **25 of 25 checks pass, covering 19 of the chapter's 40 examples. Nothing
  fails.** `Rung2.out`, exit 0:
  `checks passed: 25 of 25, over 19 of the chapter's 40 examples`. Nineteen
  examples carry 25 checks because Ex 3, 6, 27 and 37 each print more than one
  result.
- The goldens label only **5** of the 40 examples "core — simple numeric arrays
  and the listed primitives". Nineteen run because **the grammar absorbs what
  looked like nesting**: `m[⊂1 1]`, `m[(0 0)(1 1)(2 2)]` and `(⊂1 1)⌷n` are a
  coordinate vector and a matrix of coordinate vectors, not arrays of arrays, so
  Ex 7, 8, 18, 19 and 21 need no boxed element at all (gap row 20). The rest of
  the distance is made up by the workspace (Ex 3, 5, 17, 27, 28, 30, 37, 38 are
  the book's own `v ← …` lines) and by two adaptations named on their own lines:
  Ex 29 and Ex 37 begin `m ← 3 3⍴9?9`, a random **Deal**, so `m` is bound to the
  very permutation the book printed, and every `]box`/`]DISPLAY` frame is
  dropped.
- **21 examples are out of scope**, each printed as a `SKIP` line with its
  reason: Ex 1 (`⎕IO ← 0`, a `⎕` system name — realised instead as AplCore's
  index origin 0) and Ex 2 (`]box`, a Dyalog user command); **16** whose `m` is
  itself nested, `3 3⍴(1 2 3)(3 2 1)…` (Ex 9-16, 23-26, 33-36 — Ex 36 also
  characters), priced in `p15_box.fss` and explained below; Ex 22
  (`I←⌷⍨∘⊃⍨⍤0 99`: the operators `⍨ ∘ ⍤` and a tacit definition, rungs 4 and 7);
  Ex 39 and 40 (characters).
- **18 further checks beyond the chapter** all pass (`X1`-`X18`): `⍸` Where
  alone and as an index, indexed assignment on two axes and through an elided
  axis, squad on a vector and on a matrix's leading axis, Replicate with a
  scalar count, a digit in a name, `a ← b ← 1 2`, an indexed expression as a
  function argument, `⍴n[;1 2]`, rung 1's `⍎(…)` escape followed by indexing,
  an unset name (zilde), `n[1 2;0]`, and a two-coordinate scatter.
- `Rung2.out.0` is the first run of the same file: three of the beyond-chapter
  checks (`X3`-`X5`) failed there because their *expectations* had been written
  with one column width for the whole matrix. Dyalog pads each column to its own
  width — the rule rung 1 verified against the book's Ex 14 — so the library was
  right and the expectation wrong; the three `want` strings were corrected, not
  the display.
- **Rung 1 still passes against the extended `base/`**: 26 of 26 and 18 of 18,
  output identical to the committed `../rung-1/Rung1.out`.
- Index origin is **0** throughout, as the chapter's first line sets it.

## How to run

As rung 1 (`FORTRESS_SOURCE_PATH` must re-list the four shipped entries — gap
row 12):

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-2 && $FORTRESS_HOME/bin/fortress Rung2.fss
```

A component that uses an expander regenerates two Rats! parsers (7-10 s here); a
library-only probe costs 3-5 s; `fortress parse FILE.fsi` checks a grammar api
in 0.6 s and was the only way to bisect the two grammar failures below.

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

The carrier is **unchanged** — `value object AplArr(shape: List[\ZZ32\],
data: List[\RR64\])` — so rung 1 is untouched. Added:

| what | spelling that worked | why |
|---|---|---|
| bracket indexing | `aplIx1(a, i)`, `aplIx2(a, i, j)`, and `aplIxRow`/`aplIxCol` for an elided axis, with **result shape = the index shapes concatenated** (`AplArr(i.shape \|\| j.shape, …)`) | that one rule gives APL's own answers: `m[1;1]` a scalar, `m[1;]` and `m[;1]` vectors, `v[5 2]` a vector, `n[;1 2]` a 3×2 matrix |
| an elided axis | `aplAxisIx(n) = aplVec(<\|[\RR64\] 1.0 k \| k <- seq(0 # n) \|>)` | elision is *all of that axis*, so it is an index vector, not a sentinel — which keeps the sentinel out of `AplArr` (gap row 19) |
| indexed assignment | `aplPutAt(a, idx, v)` over a flat position list, with `aplIxSet1/2/Row/Col` computing the positions | `AplArr` is a `value object`: an assignment is an updated **copy**, which the grammar stores back with `aplSet` |
| selective assignment | one function per invertible left-hand side: `aplSelSet(a, sel, v)` for `(select/data) ← …`, `aplDiagSet(a, v)` for `(0 0⍉m) ← …` | APL inverts an arbitrary expression; a template grammar needs a production and a function per shape |
| scatter indexing | `aplPick(a, c)` for one coordinate vector; `aplIdxOne`/`aplIdxCons` building a **k×rank matrix** of coordinates and `aplScatter(a, cs)` reading it | this is what makes Ex 7, 8, 18, 19 run on a flat carrier |
| squad `⌷` | `aplSquad(i, a)` (full coordinates → cell, one index → leading-axis cell) and `aplSquadEncl(i, a)` for `(⊂1 2)⌷m` | Ex 20, 21, X6, X7 |
| `⍸` Where | `aplWhere(a)` → the indices where the value is non-zero | not in the chapter; `X1`, `X2` |
| Compress and Replicate | `aplRepList(sel, d)` for a vector; for a matrix, `aplIx2` with `aplSelIx(sel, n)` along the compressed axis and `aplAxisIx` along the other | `select/data`, `select⌿m` and `select/m` then keep APL's ranks: Ex 31 prints one row, Ex 32 three lines, Ex 28 the 17-element replicate |
| the high minus | `aplScalarNeg`, and `aplFmt(v) = if v < 0.0 then ("¯" aplFmt(-v)) …` | Ex 5's `¯1` must print as `¯1`; a string literal has no `\u` escape, so the character stands in the source (gap row 22) |
| the workspace | `object AplWs()` with `var names: List[\String\]`, `var vals: List[\AplArr\]`, held in `aplWs: AplWs = AplWs()`, behind `aplSet`/`aplGet`/`aplWsClear` | APL's variables; `aplSet` returns what it stored, so assignment is an expression as in APL |

## What the grammar needed (`../base/AplSyntax.fsi`)

Still one `Expr` extension and no Fortress-level operator declarations. The
additions, with the spellings that worked:

1. **A name is spelled, not spliced** (gap row 16). An `Id` gap cannot be an
   expression (rung 1, gap row 4), so the name is built one character at a time
   as the shipped `Xml.fsi:120-133` builds attribute names, and looked up in the
   workspace:

   ```
   AplBase :Expr:= … | n:AplId => <[ aplGet((n)) ]> | s:AplStrand => <[ (s) ]>
   AplId:String :Expr:= x:AplCh# y:AplIdTail => <[ x y ]> | x:AplCh => <[ x "" ]>
   AplIdTail:String :Expr:= x:AplChD# y:AplIdTail => <[ x y ]> | x:AplChD => <[ x "" ]>
   AplCh:String :StringLiteralExpr:= x:[A:Za:z] => <[ "" x ]>
   AplChD:String :StringLiteralExpr:= x:[A:Za:z0:9] => <[ "" x ]>
   ```

   The split into `AplCh`/`AplChD` is load-bearing: a name is tried before a
   numeral, so one class that admitted a leading digit would read the `9` of
   `9 2 6` as a name.

2. **`←` is a call** (gap row 17):
   `n:AplId SPACE ← SPACE r:AplE => <[ aplSet((n), (r)) ]>`, and one rule per
   indexed or invertible left-hand side, for instance

   ```
   n:AplId `[ SPACE i:AplE SPACE `] SPACE ← SPACE r:AplE
       => <[ aplSet((n), aplIxSet1(aplGet((n)), (i), (r))) ]>
   ( SPACE s:AplAtom SPACE / SPACE n:AplId SPACE ) SPACE ← SPACE r:AplE
       => <[ aplSet((n), aplSelSet(aplGet((n)), (s), (r))) ]>
   ( SPACE 0 SPACE 0 ⍉ SPACE n:AplId SPACE ) SPACE ← SPACE r:AplE
       => <[ aplSet((n), aplDiagSet(aplGet((n)), (r))) ]>
   ```

   The compress form must take an **`AplAtom`** and not an `AplE` on the left of
   the slash: `AplE` would match `select/data` whole and then fail at the `/`,
   and Rats does not re-enter a nonterminal for a shorter match (rung 1, gap
   row 5).

3. **Six bracket shapes, six productions**, with `[` and `]` backtick-escaped
   because they are the macro language's character-class brackets:

   ```
   AplAtom :Expr:=
       b:AplBase `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `] => <[ aplIx2((b), (i), (j)) ]>
     | b:AplBase `[ SPACE i:AplE SPACE ; SPACE `]              => <[ aplIxRow((b), (i)) ]>
     | b:AplBase `[ SPACE ; SPACE j:AplE SPACE `]              => <[ aplIxCol((b), (j)) ]>
     | b:AplBase `[ SPACE ⊂ SPACE i:AplE SPACE `]              => <[ aplPick((b), (i)) ]>
     | b:AplBase `[ SPACE i:AplE SPACE `]                      => <[ aplIx1((b), (i)) ]>
     | b:AplBase `[ SPACE c:AplCoord SPACE `]                  => <[ aplScatter((b), (c)) ]>
     | b:AplBase                                               => <[ (b) ]>
   ```

   One production per shape is a **choice for elision only**: a repeated gap
   does splice as a list (`xs**`, `p17_ixlist.fss`, gap row 19), so the axis
   list could have any arity, but the elided axis of `m[1;]` would then need a
   sentinel value, a bound optional gap being unimplemented.

4. **`⊂` and coordinate lists are absorbed by the grammar** (gap row 20): `⊂`
   appears only as a terminal inside an index bracket or before `⌷`, and

   ```
   AplCoord :Expr:= ( SPACE v:AplE SPACE ) SPACE r:AplCoord => <[ aplIdxCons((v), (r)) ]>
                  | ( SPACE v:AplE SPACE )                  => <[ aplIdxOne((v)) ]>
   ```

   folds `(0 0)(1 1)(2 2)` into a 3×2 matrix. No enclosure is ever a value.

5. **Compress and Replicate** as two alternatives below the two reduce rules:
   `l:AplAtom / SPACE r:AplE => <[ aplCompress((l), (r)) ]>` and the same with
   `⌿`. A glyph is not an atom, so they cannot mask `+/`.

6. **The high minus** inside the numeral, glued on with `#`:
   `AplNum :Expr:= ¯# n:LiteralExpr => <[ aplScalarNeg(1.0 (n)) ]> | n:LiteralExpr => …`.

7. Two glyphs added to the table: `⌷ => "squad"`, `⍸ => "where"`.

## Errors met, verbatim

```
p12_g.fsi:20:7:
    Syntax Error
      (the nonterminal was called WE.  A word of two or more uppercase letters is
       an OPERATOR, not an identifier; renaming it WEx fixed it.  p12a_oprword.out
       bisects eleven names: WE AB ABC AAA A_B rejected, AA Ab AbC A W2 AB2 Ok,
       which also shows the implementation is looser than the spec -- gap row 15)

p14_idx.fss:35:45:
    Syntax Error
      (sel3⌿m, with a letters-only character class for names: the name stopped at
       "sel" and "3⌿m" was left over.  p14_idx.out.0; fixed by AplIdTail)

MacroError: Could not parse 'do  <!@#$%^&*<Id t >*&^%$#@!>  = ( <!@#$%^&*<Expr r >*&^%$#@!> ); … end '
  Caused by: java.lang.IllegalArgumentException: Parameter 'text' to the IdOrOp constructor was null
        at com.sun.fortress.parser.templateparser.TemplateParser3.pNoNewlineExpr$AssignLeft
      (a template expanding to a DECLARATION, p16_decl.out: the fourth spelling
       of APL's ← after rung 1's three, and the one that names the reason -- the
       template parser reads the left of = with AssignLeft, where a gap is null)

p18_uesc.fss:10:19:
    Invalid string literal content: \
p18_uesc.fss:10:14-51:
    Unmatched delimiters """ and "]".
      (a \u escape in a string literal; the character itself works -- gap row 22)

p16_g.fsi:9:25-61:
    Unmatched delimiters "do" and ")".
      (not a Fortress gap: the probe's own comment contained "p07_assign.out*)",
       whose *) closed the comment early.  Recorded because it cost a bisection)
```

## The variable and assignment routes, and their verdicts

Four routes were tried, in this order.

1. **A template expanding to a Fortress binding or assignment. NO**, four
   spellings. Rung 1 tried three against `:=` — parenthesised `Expr` gap, bare
   `Expr` gap, `Id` gap — all `Syntax Error` at the `:=` (gap row 8,
   `../rung-1/p07_assign.out`, `.out.0`, `.out.1`). Rung 2 adds the fourth, a
   **declaration** `do t = (r); … end` with the `Id` gap in what is a binder
   position in the shipped `For.fsi`: it reaches the template parser's
   `AssignLeft` production and the gap's text arrives null (`p16_decl.out`, gap
   row 18). So the left of `=` and of `:=` is closed to gaps, and an APL
   variable cannot be a Fortress variable.

2. **The host binds the value of an `apl⦇ … ⦈` block and APL names it through
   `⍎(v)`. Works, and is what rung 1 used.** `hostm = apl⦇ 2 3⍴⍳6 ⦈` then
   `apl⦇ ⍎(hostm)[1;2] ⦈` → `5` (`Rung2.out`, X15). The cost is that the book's
   `←` is missing, the name is spelled `⍎(m)` and not `m`, and the variable
   belongs to Fortress's scope, not to an APL session.

3. **A user-level workspace object whose `set`/`get` the templates call. Works,
   and is what rung 2 ships.** `v ← 9 2 6 3 5 8 7 4 0 1` then `v[5]` → `8`,
   `v[3] ← ¯1` then `v` → `9 2 6 ¯1 5 8 7 4 0 1`, the book's lines character for
   character, and the name survives from one expander use to the next
   (`p11_ws.out`, `p12_name.out`, `p14_idx.out`, `Rung2.out`). Three things had
   to be true at once: a bare identifier must be a **terminal** — it is, if it
   is spelled rather than spliced (route 1's wall is what forces this); the
   store must be **mutable module state** — one reference `object` with `var`
   `List` fields in a component-level immutable binding; and indexed assignment
   must be a **copy**, `AplArr` being a `value object`, which is why
   `v[1] ← 9` expands to `aplSet("v", aplIxSet1(aplGet("v"), …))`.
   The two routes meet: `w ← ⍎(hostm)` stores a Fortress value under an APL name
   (`p14_idx.out`).

4. **A keyword per name** — one alternative per variable in the glyph table's
   style — was not needed: the character class covers it, and rung 1's `AplFn`
   already proves a terminal can reduce to a `String`. It remains the fallback
   for a sub-language with a fixed, small set of names.

**Which reads closest to the book: route 3, and by a distance.** Every line of
the chapter that names a variable is now copied in verbatim. What it costs:
APL's variables are not Fortress variables and are invisible to the host except
through `aplGet`; there is no scoping, no shadowing and no type but `AplArr`; a
misspelt name is not an error but zilde (`X16`); and the value of an indexed
assignment is the whole updated array rather than APL's right argument (the
book's lines never read it, and `Rung2.fss` writes `_ = apl⦇ … ⦈` where APL
would suppress the display).

## Nested arrays: the price, paid in a skeleton and not in `base/`

Sixteen of the chapter's examples index an `m` that is itself nested,
`3 3⍴(1 2 3)(3 2 1)…`. `AplArr`'s elements are `RR64`, so this is a new
**element representation**, not a new function. `p15_box.fss` writes that
representation out and runs it rather than arguing about it: a trait `AplEl`
with a number variant and a box variant, a parallel carrier
`BoxArr(shape, data: List[\AplEl\])`, `⊂` enclose, `⊃` first, the `(⊂1 1)⊃m`
pick, and a framed display. It reproduces **the book's Ex 9 frame character for
character**, Ex 34 → `5 6 8` and Ex 35 → `1 2 3` (`p15_box.out`). The price is
therefore not the representation but everything typed against the old one: 1
trait + 2 variants + 1 carrier, and then the **65 top-level functions** of
`AplCore.fss`, every one of which takes or returns `AplArr`/`RR64`, rewritten.
That is a rung of its own (the ladder's rung 8, nested arrays and boxes), so
`base/` keeps the flat carrier and those 16 examples stay `SKIP` (gap row 21).

## Departures from APL that remain

- **Variables live in a workspace, not in Fortress.** See route 3 above. `←`
  and a bare name read as the book prints them; `⍎(v)` is still there for a
  Fortress value.
- **`⊂` is not a function**, only a terminal inside an index bracket and before
  `⌷`. `(⊂1 2)⌷m` and `m[⊂1 1]` work; `⊂v` alone has no meaning here.
- **No nesting**, hence no `⊃` Pick on a nested array, no `]DISPLAY` frames, no
  `¨`; and no characters, so Ex 36, 39, 40 are out. Priced above.
- **No `⌷[axis]`**: Ex 15's `2⌷[1]m` would need an axis bracket on a function,
  which the grammar does not have (the example's `m` is nested anyway).
- **Selective assignment is per-shape.** APL inverts an arbitrary expression on
  the left of `←`; here `(select/data) ←` and `(0 0⍉m) ←` are two productions
  and two functions. A third shape needs a third pair.
- **`?` Deal is absent** (no RNG in the library, and the book's own output is
  one run): Ex 29 and 37 are bound to the permutation the book printed.
- **An index out of range** is whatever `List`'s own indexing does, not an APL
  `INDEX ERROR`; `m[1]` on a matrix indexes the ravel instead of raising
  `RANK ERROR`.
- Display is unchanged from rung 1 — one line per row, each column padded to its
  own width, which is Dyalog's layout for these matrices — plus the high minus.
  Negative numbers now print `¯1`, as the book does.

## New gap rows

Eight rows appended to `../gaps.md`, numbered 15-22: all-uppercase nonterminal
names are operators, and the implementation's rule diverges from the spec's
(15); a bare identifier can be a terminal if it is spelled (16); APL's `←` and a
persistent workspace at user level (17); no gap left of `=` either, and
`AssignLeft` is the reason (18); a repeated gap splices as a list, so only
elision forces a production per bracket shape (19); enclosures and coordinate
lists absorbed by the grammar (20); the boxed element priced (21); no `\u`
escape in string literals (22).

## Probes

Every attempt is kept with its output; `.out.0` is an earlier spelling of the
same probe, failures included.

| probe | question | outcome |
|---|---|---|
| `p11_ws` | can a component hold one mutable store reachable through plain functions? | yes: reference object with `var List` fields, set/get/overwrite across uses |
| `p12a_oprword` (`.sh`) | why was the api rejected at a nonterminal's name? | a two-letter all-caps name is an operator; eleven names bisected |
| `p12_g`, `p12_name` | can a bare identifier be a terminal, and `←` a call? | yes, both; `.out.0` is the `WE` rejection |
| `p13_core` | the whole rung-2 library without any grammar | all of it, values matching the book |
| `p14_idx` | the book's own lines through the grammar | all of them; `.out.0` is the letters-only name class failing on `sel3⌿m` |
| `p15_box` | the price of nested arrays, written out | the skeleton runs and draws the book's frame; 65 functions would have to follow |
| `p16_g`, `p16_decl` | can a template expand to a **declaration**? | no: `AssignLeft` takes no gap |
| `p17_g`, `p17_ixlist` | can a repeated gap carry the `;`-list as a host list? | yes, any arity; elision is the part that cannot |
| `p18_uesc` | is there a `\u` escape in a string literal? | no; the character itself works |
