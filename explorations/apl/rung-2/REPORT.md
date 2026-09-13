# Rung 2 — "Indexing", on the native-array base

Chapter: https://xpqz.github.io/learnapl/indexing.html · goldens:
`../goldens/ch2-indexing.md` (40 examples, the book's printed output verbatim,
index origin 0) · library and grammar: `../base/` (`AplCore`, `AplSyntax`) ·
walk interpreter, JDK 25, `FORTRESS_THREADS=1`, nothing outside
`explorations/apl/` touched, nothing built.

## Verdict

- **25 of 25 checks pass, over 19 of the chapter's 40 examples. Nothing fails.**
  `Rung2.out`: `checks passed: 25 of 25, over 19 of the chapter's 40 examples`.
  The 19 are Ex 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 27, 28, 29, 30, 31, 32, 37,
  38 — **exactly v1's 19, and exactly v1's 25 checks** (Ex 3, 6, 27 and 37 each
  print more than one result). **Nothing regressed.**
- **21 of 21 beyond-chapter checks pass** (`X1`-`X21`), against v1's 18.
  Fourteen of v1's carried over unchanged (its `X9`+`X10` pair is one check here);
  **three are gone** and are printed as `SKIP` with their reason at the end of
  `Rung2.out` — `a ← b ← 1 2` (a binding is not an expression here,
  `s07_chain.out`), "an unset name is zilde" (a name outside the closed set is now
  a syntax error at the use site, which is better), and the cross-block session
  (`s06_scope.out`); and **seven are new**: the row view carrying the library's
  algebra (`X10`, `X11`), a matrix from a vector row index (`X13`), host code
  reading the APL name inside the block (`X17`), a comment after a non-final
  statement (`X18`), APL's INDEX ERROR and LENGTH ERROR as contract violations
  (`X19`, `X20`), and a scalar right argument to a selective assignment (`X21`).
- **21 examples are out of scope**, each a `SKIP` line with its reason, the same
  21 as v1: Ex 1 (`⎕IO ← 0`, realised as the library's index origin 0), Ex 2
  (`]box`), the **16** whose `m` is itself nested (Ex 9-16, 23-26, 33-36; Ex 36
  also characters), Ex 22 (`I←⌷⍨∘⊃⍨⍤0 99`), Ex 39 and 40 (characters).
- **What changed against v1 is not the score but the notation**, in three places,
  all consequences of names being lambda parameters rather than a workspace table:
  1. the chapter's **session is not a session**. A binding lives as long as its
     block, so each example is one `apl⦇ … ⦈` that opens with the book's own
     binding lines. The book's *layout* is kept — one statement per line, the
     book's `⍝` comments where the book puts them, including on lines that are
     not the block's last, which v1's 2b could not do at all.
  2. **`←` is not an expression.** v1 read `v ← 9 2 6 …` and printed its value
     for Ex 3a, 17, 27a and 30; here the binding is followed by a reference
     (`v ← … ⋄ v`), which is what the book's `⎕ ←` prints anyway.
  3. **one line of the chapter needs `⋄` for its line break**: Ex 20's `1 1⌷n`
     begins with a numeral, and a line break between two symbols of a strand is
     optional whitespace, so `…7 8 3` and `1 1` read as one strand
     (`Rung2.out.0`). Gap row 32, biting the book's own layout.
- **No cell, no copy, no workspace.** v1's `aplSet`/`aplGet` and rung 2b's
  `AplCell` are both gone: a library array is **mutable through a
  `Vector`/`Matrix` parameter**, so `v[3] ← ¯1` is an in-place `put` on the array
  the lambda parameter is already bound to. Rebinding — which the host refuses,
  gap row 29, re-confirmed in `s05_rebind.out` — is never needed.
- **Rung 1 still passes on the extended base**: `../rung-1/Rung1.out`, re-run
  after the promotion and again after every rung-2 addition, 26 of 26 and 18 of
  18, output identical both times.

## How to run

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-2 && $FORTRESS_HOME/bin/fortress Rung2.fss
```

A component that uses the expander regenerates two Rats! parsers (25-40 s); a
library-only probe costs 5 s, which is why `s01_ix.fss` and `s02_lib.fss` exist.

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

The carrier is unchanged — an APL scalar is an `RR64`, a vector an
`Array[\RR64,ZZ32\]`, a matrix an `Array[\RR64,(ZZ32,ZZ32)\]`, and every
primitive is an overload family on `RR64` / `Vector[\RR64,s\]` /
`Matrix[\RR64,r,c\]`. Rung 2 adds 36 declarations under one rule: **the shape of
an indexed result is the shapes of the indices catenated**, so indexing by a
scalar lowers the rank and indexing by a vector keeps it. That is not a run-time
shape test but overloading on the **index's** rank, because `Array1 excludes
{Number, String}` (`FortressLibrary.fsi:1435`) makes `RR64` and `Vector` an
excluding pair:

```
aplIx1[\nat s\](v: Vector[\RR64,s\], i: RR64): RR64
aplIx1[\nat s, nat t\](v: Vector[\RR64,s\], i: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplIx2[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: RR64, j: RR64): RR64
aplIx2[\nat r, nat c, nat t\](m: Matrix[\RR64,r,c\], i: RR64, j: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplIx2[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], i: Vector[\RR64,s\], j: RR64): Array[\RR64,ZZ32\]
aplIx2[\nat r, nat c, nat s, nat t\](m: Matrix[\RR64,r,c\], i: Vector[\RR64,s\],
        j: Vector[\RR64,t\]): Array[\RR64,(ZZ32,ZZ32)\]
```

so `m[1;1]` is a scalar, `m[1;1 2]` and `m[1 2;0]` are vectors and `m[1 2;1 2]` is
a matrix, with no rank stored anywhere (`s02_lib.out`).

| what | spelling that worked | why |
|---|---|---|
| an elided axis, `m[1;]` and `m[;1]` | `aplIxRow[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: RR64): Vector[\RR64,c\] = AplRow[\r,c\](m, aplInt(i))` over a 6-line view object | the view **is** a `Vector`, so the library's whole vector algebra applies to a row (`X11`, `X13`); see below |
| an elided axis with a vector index | `aplIxRow[\nat r, nat c, nat s\](…, i: Vector[\RR64,s\]): Array[\RR64,(ZZ32,ZZ32)\]` | `m[1 2;]` keeps the rank, and a gather cannot be a view, so it copies |
| indexed assignment | `aplIxPut1`, `aplIxPut2`, `aplIxPutRow`, `aplIxPutCol`, all `: ()` and all `v.put(i, x)` / `m.put((i,j), x)` | **an array reached through a `Vector`/`Matrix` parameter is mutable** (`s01_ix.out` (a)), so assignment needs no cell, no copy and no rebinding |
| selective assignment | one function per invertible left-hand side: `aplSelPut(d, sel, x)` for `(select/data) ← …` (with a scalar-`x` overload for APL's extension), `aplDiagPut(m, x)` for `(0 0⍉m) ← …` | APL inverts an arbitrary expression; a template grammar needs a production and a function per shape |
| `⊂` coordinates and scatter | `aplPick(m, i)` for one coordinate vector; `aplIdxOne`/`aplIdxCons` folding `(0 0)(1 1)(2 2)` into a **k×rank matrix** and `aplScatter(m, cs)` reading it | this is what makes Ex 7, 8, 18, 19 run without a nested value: no enclosure is ever a value |
| squad `⌷` | `aplSquad1(i, v)`, `aplSquad1(i, m)`, `aplSquad2(i, j, m)`, `aplSquadEncl(i, m)` | the left argument's **length** decides the result's rank, exactly as dyadic `⍴`'s does, so the grammar splits it (gap row 47) instead of the run time |
| `⍸` Where | `aplWhere[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]` | `X1`, `X2` |
| Compress and Replicate | `aplCompress(sel, d)` / `(sel, m)` / `(sel: RR64, d)` and `aplCompressFirst` | `select/data`, `select⌿m` and `select/m` keep APL's ranks: Ex 31 is a 1×3 matrix, Ex 32 a 3×1 one, Ex 28 the 17-element replicate |
| INDEX ERROR and LENGTH ERROR | `requires { (i >= 0.0) AND (i < (1.0 \|v\|)) }` on `aplIx1`/`aplIxPut1`, `requires { \|sel\| = \|d\| }` on the compress family | rung 1's contract route extends to indexing: `X19`, `X20` catch `CallerViolation` from APL source. v1 had "whatever `List`'s own indexing does" |

**The row view is the one place the library gave more than was asked.** Merged
ledger row 54 says the library's own `m[1,:]` extends `Array1` and never
`Vector`; `s01_ix.out` asks it again over a **runtime-sized** matrix and gets the
same answer — `m[1,:] = [0#3][ 3.0 99.0 5.0 ]`, `m[1,:] is NOT an AnyVector` — so
a row taken that way carries no vector algebra. Row 55's user object does, and
its `nat`s are **inferred from the runtime-built matrix**:

```
object AplRow[\nat r, nat c\](base: Matrix[\RR64,r,c\], i: ZZ32) extends Vector[\RR64,c\]
    get(j: ZZ32): RR64 = base.get(i, j)
    put(j: ZZ32, v: RR64): () = base.put((i, j), v)
    init0(j: ZZ32, v: RR64): () = base.init0((i, j), v)
    replica[\U\](): Array1[\U,0,c\] = array1[\U,c\]()
end
```

`RowView IS an AnyVector` (`s01_ix.out` (d)), `+/m[1;]` and `+/1⌷m` are the
shipped `SUM` over it, and a write through it reaches the matrix. The price is
APL's semantics: **ours aliases where APL copies** (`s08_alias.out`: after
`w ← m[1;]` and `m[1;1] ← 99`, `w` reads `3 99 5`), while a vector index, which
must copy, behaves as APL does.

## What the grammar needed (`../base/AplSyntax.fsi`)

Still one `Expr` extension. The entry now takes a **statement**, and the
additions are these, verbatim.

1. **A statement layer, with `⋄`, a line break, and a per-line comment.** APL's
   `←` binds a **lambda parameter** whose body is the rest of the block, which is
   rung 2b's design carried over unchanged except that what is bound is the array
   itself and not a cell:

   ```
   AplStm :Expr:=
       n:Id SPACE ← SPACE e:AplE SPACE ⍝ c:AplLn SPACE r:AplStm
           => <[ (fn n => (r))((e)) ]>
     | n:Id SPACE ← SPACE e:AplE SPACE ⋄ SPACE r:AplStm
           => <[ (fn n => (r))((e)) ]>
     | n:Id SPACE ← SPACE e:AplE
       r:AplStm
           => <[ (fn n => (r))((e)) ]>
     | s:AplE SPACE ⍝ c:AplLn SPACE r:AplStm => <[ (fn _ => (r))((s)) ]>
     | s:AplE SPACE ⋄ SPACE r:AplStm         => <[ (fn _ => (r))((s)) ]>
     | s:AplE
       r:AplStm                              => <[ (fn _ => (r))((s)) ]>
     | s:AplE                                => <[ (s) ]>
   ```

2. **A comment that ends at the end of its line** — new here, and what lets the
   book's commented lines stand anywhere in a block:

   ```
   AplLn :Expr:=
       NOT ⦈# NOT NEWLINE# _# t:AplLn => <[ 0 ]>
     | NOT ⦈# NOT NEWLINE# _          => <[ 0 ]>
   ```

   Every symbol needs its `#`. Without it the optional whitespace between two
   symbols crosses the line break, the `NOT NEWLINE` then looks *past* the
   newline, and the comment swallows the statements below it — `s04_stm.out.0`,
   `s04_stm.fss:21:42: Syntax Error`. That `#` is honoured on a `NOT`-prefixed
   symbol is the library's own doing: `Syntax.rats:248-254` lifts the
   `NoWhitespaceSymbol` back out over the predicate.

3. **Six bracket shapes, six productions**, with `[` and `]` backtick-escaped,
   and the rank of each result left to the library:

   ```
   AplAtom :Expr:=
       b:AplBase `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `] => <[ aplIx2((b), (i), (j)) ]>
     | b:AplBase `[ SPACE i:AplE SPACE ; SPACE `]              => <[ aplIxRow((b), (i)) ]>
     | b:AplBase `[ SPACE ; SPACE j:AplE SPACE `]              => <[ aplIxCol((b), (j)) ]>
     | b:AplBase `[ SPACE ⊂ SPACE i:AplE SPACE `]              => <[ aplPick((b), (i)) ]>
     | b:AplBase `[ SPACE c:AplCoord SPACE `]                  => <[ aplScatter((b), (c)) ]>
     | b:AplBase `[ SPACE i:AplE SPACE `]                      => <[ aplIx1((b), (i)) ]>
     | b:AplBase                                               => <[ (b) ]>
   ```

4. **Assignment is a call, one production per left-hand shape**, and the call
   mutates:

   ```
   c:AplName `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `] SPACE ← SPACE r:AplE
       => <[ aplIxPut2((c), (i), (j), (r)) ]>
   c:AplName `[ SPACE i:AplE SPACE ; SPACE `] SPACE ← SPACE r:AplE
       => <[ aplIxPutRow((c), (i), (r)) ]>
   c:AplName `[ SPACE ; SPACE j:AplE SPACE `] SPACE ← SPACE r:AplE
       => <[ aplIxPutCol((c), (j), (r)) ]>
   c:AplName `[ SPACE i:AplE SPACE `] SPACE ← SPACE r:AplE
       => <[ aplIxPut1((c), (i), (r)) ]>
   ( SPACE s:AplAtom SPACE / SPACE c:AplName SPACE ) SPACE ← SPACE r:AplE
       => <[ aplSelPut((c), (s), (r)) ]>
   ( SPACE 0 SPACE 0 ⍉ SPACE c:AplName SPACE ) SPACE ← SPACE r:AplE
       => <[ aplDiagPut((c), (r)) ]>
   ```

   v1's spelling of the same line was `aplSet(n, aplIxSet1(aplGet(n), …))` — a
   lookup, a copy and a store — three calls where the mutable array needs one.

5. **Squad, with the rank read off the source text**, as dyadic `⍴` already was:

   ```
   ( SPACE ⊂ SPACE i:AplE SPACE ) SPACE ⌷ SPACE r:AplE => <[ aplSquadEncl((i), (r)) ]>
   a:AplNum SPACE b:AplNum SPACE ⌷ SPACE r:AplE        => <[ aplSquad2((a), (b), (r)) ]>
   a:AplNum SPACE ⌷ SPACE r:AplE                       => <[ aplSquad1((a), (r)) ]>
   ```

6. **Compress and Replicate below the reductions**, which they cannot mask
   because a glyph is not an atom:

   ```
   l:AplAtom / SPACE r:AplE => <[ aplCompress((l), (r)) ]>
   l:AplAtom ⌿ SPACE r:AplE => <[ aplCompressFirst((l), (r)) ]>
   ```

7. **`⍸` with the monadic glyphs**: `⍸ SPACE r:AplE => <[ aplWhere((r)) ]>`.

8. **The closed name set**, unchanged from rung 2b: one alternative per name,
   each a sequence of one-character classes glued with `#`, each template writing
   the name as an ordinary free Fortress identifier, because a reference cannot be
   a gap (gap row 24) and a terminal that is a valid identifier would become a
   keyword of the whole language (row 25).

   ```
   AplName :Expr:=
       [s]# [e]# [l]# [e]# [c]# [t]# NOT [A:Za:z0:9] => <[ (select) ]>
     | [d]# [a]# [t]# [a]# NOT [A:Za:z0:9]           => <[ (data) ]>
     | [m]# [1]# NOT [A:Za:z0:9]                     => <[ (m1) ]>
     | [v]# NOT [A:Za:z0:9]                          => <[ (v) ]>
     … [m] [n] [q] [a] [b] [w], ten names, ten lines
   ```

   `AplBase` gains `| c:AplName => <[ (c) ]>` above the strand, and the
   coordinate list is

   ```
   AplCoord :Expr:=
       ( SPACE v:AplE SPACE ) SPACE r:AplCoord => <[ aplIdxCons((v), (r)) ]>
     | ( SPACE v:AplE SPACE )                  => <[ aplIdxOne((v)) ]>
   ```

**Line cost**, measured under the redesign report's own rule (strip `(* … *)`,
then drop whitespace-only lines):

| | library `.fss` + `.fsi` | grammar `.fsi` + `.fss` | `=>` templates |
|---|---|---|---|
| `base/` at rung 1 | 221 + 99 = **320** | 57 + 3 = **60** | 50 |
| `base/` at rung 2 (now) | 393 + 148 = **541** | 115 + 3 = **118** | 96 |
| `v1/base/` at rungs 1 **and** 2 | 382 + 52 = **434** | 92 + 3 = **95** | 67 |

So rung 2 costs +221 library lines and +58 grammar lines, and the native design
stays about a quarter longer than v1's for the same chapter (541 + 118 against
434 + 95, +24%) — the same ratio the redesign was priced at for rung 1 alone.
Where the extra goes is visible in the table above: one overload per combination
of index ranks, and one production per bracket shape. What v1 spends instead is
run-time work: `aplDy`/`aplMon`/`aplRed` string comparison on every operation,
and for indexing a shape list built and concatenated per index.

## Errors met, verbatim

```
s02_lib.fss:14:10-67:
Unification error: Closure/Constructor for aplRavel param 1 (v:Vector[\RR64,10\])
  got arg (9.0,2.0,6.0,3.0,5.0,8.0,7.0,4.0,0.0,1.0):
  (FloatLiteral,FloatLiteral,…) of type (FloatLiteral,FloatLiteral,…)
      (s02_lib.out.0: a host vector literal [ 9.0 2.0 … ] in an ARGUMENT position
       is read as a tuple; it needs a type annotation, v: Vector[\RR64,10\] = […].
       Only the probe is affected -- the grammar's own strands go through aplCons)

s04_stm.fss:21:42:
    Syntax Error
  Error occurred while instantiating and executing a temporary parser:
  com.sun.fortress.parser.templateparser.TemplateParser87
      (s04_stm.out.0: the per-line comment spelled NOT ⦈ NOT NEWLINE _ without
       the #s.  The optional whitespace between the two NOTs crosses the line
       break, so the comment ran to ⦈ and ate the statements below it)

Rung2.fss:137:42:
    Syntax Error
      (Rung2.out.0: Ex 20's `1 1⌷n` on the line after `n ← 3 3⍴4 1 6 5 2 9 7 8 3`.
       The line break is optional whitespace inside the strand, so the two lines
       read as one strand `…7 8 3 1 1` and the ⌷ is left over.  Gap row 32)

/home/user/fortress/explorations/apl/base/AplSyntax.fsi:1:1-107:
Unification error: /home/user/fortress/explorations/apl/base/AplCore.fss:547:12-25:
Cannot unify Float(class …types.FTypeObject)
  with Vector[\FortressLibrary.RR64,u\](class …nodes.TraitType) abm=s=(3,Any) t=(2,Any)
      (Rung2.out.1: `(select/data) ← ¯1`, a SCALAR right argument, before
       aplSelPut had the scalar overload APL's extension requires.  Note the span:
       line 1 of the GRAMMAR api, not the use site -- gap row 35 again, and the
       shape a missing rank overload takes when it is reached through an expansion)

s05_rebind.fss:9:72:
    Variable v is already declared.
      (v ← 1 2 ⋄ v ← 3 4 ⋄ v: the second ← is a nested lambda parameter of the
       same name.  Gap row 29, re-confirmed on the native carrier -- and no longer
       needed for assignment, only for a rebinding that changes the rank)

/home/user/fortress/explorations/apl/base/AplSyntax.fsi:1:2:
    Variable v is not defined.
      (s06_scope.out: a name bound in one apl⦇ … ⦈ read in the next one.  This is
       the one thing v1's workspace table had that the lambda route gives up)

s07_chain.fss:8:51-59:
    Variable apl is not defined.
      (a ← b ← 1 2.  A use of the expander that matches no production is not a
       syntax error at all: the bracket is left unparsed and `apl` is read as an
       ordinary identifier.  A new diagnostic shape, worse than a Syntax Error)
```

## Departures from APL that remain

- **A name lives as long as its block.** The chapter's session is replayed per
  example; an example that needed a name to outlive its block would be out of
  scope, and none of the 19 does.
- **No rebinding inside a block** (gap row 29), so `m ← …` twice in one block is
  a static error. The chapter rebinds `m` at Ex 29 and Ex 37, which are separate
  blocks here.
- **`←` is not an expression**: no `a ← b ← 1 2`, and the value of an assignment
  cannot be read (`aplIxPut*` return `()`).
- **A row or column is a view, not a copy**, so it aliases (`s08_alias.out`).
  APL copies. A vector index copies here too, so the two shapes of `m[…;…]`
  disagree about aliasing.
- **`⊂` is not a function**, only a terminal inside an index bracket and before
  `⌷`; `⊂v` alone has no meaning.
- **No `⌷[axis]`** (Ex 15), no nesting, no characters, no `?` Deal (Ex 29 and 37
  are bound to the permutation the book printed), and `m[1]` on a matrix is not a
  RANK ERROR but a dispatch failure, because no overload takes it.
- **Selective assignment is per-shape**: `(select/data) ←` and `(0 0⍉m) ←` are
  two productions and two functions; a third shape needs a third pair.

## New gap rows

Eight rows appended to `../gaps.md`, numbered **48-55**: an APL array is mutable
through a `Vector`/`Matrix` parameter, so assignment is an in-place put (48);
overloading on the *index's* rank works, `Array1 excludes Number` being the
excluding pair (49); a row/column view with `nat`s inferred from a runtime-built
matrix keeps the algebra the library's own view loses, and aliases (50); a
comment may follow a non-final statement if every symbol of its tail carries `#`
(51); a line break does **not** separate statements when the next line can extend
the phrase (52); an expander use that matches no production degrades to `Variable
apl is not defined` (53); a missing rank overload reached through an expansion is
a host unification error at the grammar api's line 1 (54); APL's INDEX ERROR and
LENGTH ERROR as `requires` contracts on indexing (55).

## Probes

`.out.0` / `.out.1` are earlier spellings of the same probe, failures kept.

| probe | question | outcome |
|---|---|---|
| `s01_ix` | is an array mutable through a `Vector`/`Matrix` parameter; does index-rank overloading work; is `m[1,:]` a `Vector`; can a user view object infer its `nat`s? | yes / yes / **no** / yes — the four facts the rung is built on |
| `s02_lib` | the whole rung-2 library through its api, no grammar | every value the book prints; `.out.0` is the untyped vector literal |
| `s03_gram` | the new grammar with **no** APL names, values entering through `⍎(…)` | all six bracket shapes, squad, where, compress, replicate |
| `s04_stm` | statements, the closed name set, assignment, a comment after a non-final statement | all of it; `.out.0` is the comment tail without its `#`s |
| `s05_rebind` | can a block rebind a name? | no: `Variable v is already declared` |
| `s06_scope` | can a name cross from one `apl⦇ … ⦈` to the next? | no: `Variable v is not defined`, at the grammar api's line 1 |
| `s07_chain` | `a ← b ← 1 2` | no, and the failure is `Variable apl is not defined` |
| `s08_alias` | does a row view alias the matrix it came from? | yes — the one semantic departure the view buys |
| `Rung2` | the chapter | 25 of 25 over 19 examples, 21 of 21 beyond; `.out.0` and `.out.1` are the two failures above |
