# Rung 1 — "It's arrays all the way down"

Chapter: https://xpqz.github.io/learnapl/array.html · goldens: `../goldens/ch1-arrays.md`
(28 examples, the book's printed output verbatim) · walk interpreter, JDK 25,
`FORTRESS_THREADS=1`, nothing outside `explorations/apl/` touched, nothing built.

## Verdict

- **26 of 26 checks pass, covering 18 of the chapter's 28 examples. Nothing fails.**
  `Rung1.out`, exit 0: `checks passed: 26 of 26, over 18 of the chapter's 28 examples`.
  The 18 examples carry 26 checks because six of them print several results
  (Ex 18, 20, 21, 22, 23 and the repeated Ex 3/6).
- **10 examples are out of scope for this rung**, each printed as a `SKIP` line
  with its reason: Ex 1 (`⎕IO ← 0` is a `⎕` system name — realised instead as
  AplCore's index origin 0), Ex 2, 24, 25, 26, 27, 28 (nested arrays; Ex 28 also
  characters; Ex 27 also bracket indexing, which is rung 2), Ex 8 and 10
  (`]box`, a Dyalog user command), Ex 9 (the same value as Ex 7, but the book's
  printed output is the `]box -style=max` frame).
- **Five of the 18 are adapted, and say so on their own line**: Ex 3, 4, 5, 6
  replace `↑data` — Mix over a nested vector — by the `4 4⍴` reshape that yields
  the same matrix, and Ex 14 replaces `m ← ↑(1 2 3 4)(5 6 7 8)(9 10 11 12)` by
  `3 4⍴1+⍳12`. Their printed results are the book's, unchanged: `19`,
  `19 20 19 14`, and the 3×4 matrix with the book's own column alignment.
- **18 further checks beyond the chapter** exercise the rest of this rung's
  glyph set — `⌽ ⍉ ⊖ , ⌈ ⌊ × ÷ *`, the comparisons `= ≤`, `f/` and `f⌿` over
  several glyphs, parenthesised APL, and right-to-left evaluation
  (`2 × 3 + 4` → `14`). All 18 pass.
- Index origin is **0**, as the chapter's first line sets it, so `⍳8` is
  `0 1 2 3 4 5 6 7` and every shape, rank and reduction below follows from that.
- The book's own `⍝` comments are inside the expander: the sublanguage accepts
  `apl⦇ ⍬≡⍴5 ⍝ Does zilde match shape of 5? ⦈`, so nine of the lines are the
  book's text character for character apart from the `⍎(…)` escape.

## How to run

The library and grammar live in `../base`, so the source path has to name that
directory **and** re-list the four entries the shipped
`default_repository/configuration` puts on it (setting the variable replaces the
default — gap row 12):

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-1 && $FORTRESS_HOME/bin/fortress Rung1.fss
```

Each run regenerates two Rats! parsers (~40 s). `fortress parse` is a 0.6 s
check for the grammar api but is useless on `Rung1.fss` itself (gap row 13):

```
$ bin/fortress parse Rung1.fss
Turn on "-debug interpreter" for Java-level stack trace.
```

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

Grown from `../../apl-probes/d20_apl.fss`. The carrier is unchanged — a
`value object AplArr(shape: List[\ZZ32\], data: List[\RR64\])` — and everything
that crosses the api boundary is a plain **function**, because a top-level `opr`
is component-scoped (merged ledger row 30). Added for this chapter:

| what | spelling that worked | why |
|---|---|---|
| index origin | `aplOrigin(): ZZ32 = 0`, used by `aplIota` | the chapter's `⎕IO ← 0`; a `⎕` name is out of scope, a library constant is not |
| integer display | `aplFmt(v) = if (1.0 (\|\ v /\|)) = v then ("" (\|\ v /\|)) else ("" v) end` | `1` must not print as `1.0`. `RR64.truncate()` does not exist at run time and the floor bracket's `ZZ64` will not `narrow` (gap row 10), but it **stringifies** as `7` (gap row 11) |
| `RR64 → ZZ32` for shapes and counts | `aplAsInt`, doubling then halving | same gap; d20 counted up one at a time |
| matrix display | `aplShow`: `BIG \|\|\|` per row, `BIG //` per matrix, each column padded to `BIG MAX` of its own cells' widths | reproduces Dyalog's layout exactly (gap row 14) |
| `≢` tally | `aplTally`: `1` for a scalar, else `shape[0]` | the chapter's rank idiom `≢⍴m` |
| `≡` match | `aplMatch` via `aplSame`, comparing shape and data with two `while` loops | `List` has no `=`; a scalar `1`/`0` is what APL returns |
| `⊃` first | `aplFirst(a) = aplScalar(a.data[0])` | enough for simple arrays; Disclose on nested arrays is a later rung |
| `⍬` zilde | `aplZilde() = AplArr(<\|[\ZZ32\] 0 \|>, <\|[\RR64\] \|>)` | shape ⟨0⟩, no elements; displays as the empty line the book prints |
| reductions | `aplRed(f, axis, a)` over `aplFoldData`, folding **right to left** | APL's reduction is right-associative: `-/1 2 3` is `2`, not `-4` (check X12). `+/` reduces the last axis, `+⌿` the first |
| `⌽ ⊖ ⍉ , ⌈ ⌊ * = ≠ < ≤ > ≥` | `aplReverse` (last axis), `aplReverseFirst`, `aplTranspose`, `aplRavel`/`aplCat`, and `aplZip` closures in `aplDy` | the brief's glyph set; comparisons return `1.0`/`0.0` |
| the grammar's entry points | `aplScalar`, `aplCat`, `aplMon(f, a)`, `aplDy(f, a, b)`, `aplRed(f, axis, a)` | a transformer is a template, not a computation, so the glyph arrives as a `String` and the library dispatches on it |

## What the grammar needed (`../base/AplSyntax.fsi`, `AplSyntax.fss`)

Grown from `../../apl-probes/e30_aplg.fsi`; still five APL nonterminals plus a
comment tail, and still no Fortress-level operator declarations. The four
additions that mattered, with the spellings that worked:

1. **`f/` and `f⌿` for any glyph, one rule each** (gap row 2):

   ```
   AplE :Expr:=
       l:AplAtom SPACE f:AplFn SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
     | f:AplFn / SPACE r:AplE               => <[ aplRed((f), "last", (r)) ]>
     | f:AplFn ⌿ SPACE r:AplE               => <[ aplRed((f), "first", (r)) ]>
     | f:AplFn SPACE r:AplE                 => <[ aplMon((f), (r)) ]>
     | a:AplAtom                            => <[ (a) ]>
   ```

   The reduce alternatives must precede the plain monadic one; right-to-left
   evaluation is still the *shape* of the productions, not a precedence table.

2. **Naming a Fortress variable**: `⍎ ( SPACE e:Expr SPACE )`, written `⍎(v)`.
   An `Id` gap cannot be an expression (gap row 4) and an undelimited `Expr` gap
   is greedy (gap row 5); the parentheses are what bound it.

3. **Zilde and grouping**: `⍬ => <[ aplZilde() ]>` and
   `( SPACE e:AplE SPACE ) => <[ (e) ]>`.

4. **The book's trailing comments**, with a right-recursive `NOT` tail because a
   `{ NOT ⦈ _ }*` group runs away to end of file (gap row 9):

   ```
   Expr |:= apl⦇ e:AplE SPACE ⍝ t:AplCmt ⦈ => <[ (e) ]>
          | apl⦇ e:AplE ⦈                  => <[ (e) ]>
   AplCmt :Expr:= NOT ⦈ _ t:AplCmt => <[ 0 ]> | NOT ⦈ _ => <[ 0 ]>
   ```

The glyph table is one alternative per glyph reducing to a name — `⍳ ⍴ ≢ ≡ ⊃ ⌽
⊖ ⍉ ⌈ ⌊ × ÷ - , ≠ ≤ ≥ = < >` as bare terminals, `+` and `*` backtick-escaped —
and it must stay **below** at least one APL glyph in the file, or the preparser
rejects the escape (gap row 3).

## Errors met, verbatim

```
p01_numfmt.fss:18:46-56:
Cannot find definition for method truncate given receiver 7.0

p01c_numfmt.fss:8:42-50:
Cannot find definition for method narrow given receiver 7: ZZ64

p08d_g.fsi:6:1-2:  Unmatched delimiter "api".
p08d_g.fsi:12:17-15:2:  Unmatched delimiters "(./" and "end".
p08d_g.fsi:12:33-50:  Unmatched delimiters "`" and "/.)".
      (an escaped + inside the expander brackets; "(./" and "/.)" are how the
       preparser renders ⦇ and ⦈, so the escape breaks their pairing too.
       p08d_pre.out, and the same errors as p02's first spelling)

p08a_g.fsi:5:1-2:  Unmatched delimiter "api".
p08a_g.fsi:14:9-18:2:  Unmatched delimiters "`" and "end".
      (the same escape in a table at grammar top level, with no APL glyph above
       it; p02_mech.out.0 is p02's version of this)

MacroError: Could not parse '( <!@#$%^&*<Id i >*&^%$#@!> ) + 1 '
MacroError: Could not parse ' <!@#$%^&*<Id i >*&^%$#@!>  + 1 '
      Caused by: java.lang.IllegalArgumentException:
      Parameter 'text' to the IdOrOp constructor was null
      (an Id gap in an expression position, parenthesised then bare)

p03b_escape.fss:11:45-54:  Variable esc2 is not defined.
      (an Expr gap followed by ≡: the gap ate the operator)

p06_cross.fss:22:47:
** bug! Expect all oprefs to be top level EQV
      (the same greediness inside apl⦇ ⍎v ≡ 1 4⍴⍎v ⦈)

MacroError: Could not parse 'do
               ( <!@#$%^&*<Expr t >*&^%$#@!> ) := ( <!@#$%^&*<Expr r >*&^%$#@!> )
               …
      Caused by: p07_g.fsi:2:50:  Syntax Error
      (no gap position on the left of :=; three spellings tried)

p09_comment.fss:
Error occurred while instantiating and executing a temporary parser:
com.sun.fortress.parser.templateparser.TemplateParser12
(p09_comment.fss:11:1:  Syntax Error)
      ({ NOT ⦈ _ }* ran past the closing bracket to end of file)

Shell generated.:0:0:
Could not find an implementation for API FortressLibrary on path
/home/user/fortress/explorations/apl/rung-1:/home/user/fortress/explorations/apl/base
      (FORTRESS_SOURCE_PATH replaces the default instead of extending it)
```

## Departures from APL that remain

- **A variable is named `⍎(v)`, not `v`.** Forced: gap rows 4 and 5. Three
  spellings were tried (parenthesised `Id` gap, bare `Id` gap, bare `Expr` gap)
  and the third is actively dangerous, silently reparsing the line.
- **There is no `←`.** The session's variables are bound at the Fortress level
  (`m1 = apl⦇ 3 4⍴1+⍳12 ⦈`). A template has no gap position on the left of `:=`
  (gap row 8); the closest reachable thing is assignment through a user cell
  object, `⍎(c) ← 41` → `c.put(41)` (`p07d_cell.fss`), which buys nothing for
  the book's notation and is not in the grammar.
- **Display.** One line per row, single-space separation, each column
  right-aligned to its own width — which is exactly Dyalog for the chapter's
  matrices. What is missing: the `]box`/`]DISPLAY` frames (a Dyalog user
  command, and only string formatting, not a language question); and a
  non-integral number prints all seventeen digits of the `RR64`
  (`0.3333333333333333`) where Dyalog prints ten. Integers **do** print as
  integers (gap row 11) — `1`, not `1.0` — which is what the rest of the
  chapter's output depends on.
- **Glyphs the grammar could not accept: none of those tried.** Every glyph of
  this rung works as a terminal, including `⍬ ⍎ ⌿ ⍝ ≢ ⊃ ⊖` on top of the set
  apl-probes had verified. Two carry conditions rather than refusals: `+` and
  `*` need the macro language's backtick escape, which then needs an APL glyph
  above it in the file (gap row 3); and nothing in the sub-grammar can be made
  whitespace-sensitive, since `SPACE` is optional whitespace (gap row 1).
- **Numeric arrays only.** Scalars, vectors and matrices of `RR64`; no
  characters, no nesting, no `⎕` names, no dfns — the out-of-scope examples are
  named individually in `Rung1.out`.
- One thing not probed: a strand immediately followed by `-` (`1 - 1`), where it
  is `LiteralExpr`'s own greediness that decides whether the minus starts a new
  literal. The chapter has no such line; rung 3 will.

## New gap rows

Fourteen rows appended to `../gaps.md`, numbered 1-14: whitespace in productions
is optional (1); `f/` as one rule for every glyph (2); the backtick escape versus
the preparser (3); `Id` gaps are not expressions (4); `Expr` gaps are greedy and
unbacktrackable (5); undefined `EQV` on a user object is an InterpreterBug (6);
`≡`/`≢` are user-definable host operators (7); no gap position left of `:=` (8);
`NOT` inside a repeated group runs away (9); `RR64.truncate()` is declared but
absent (10); integer display without narrowing (11); cross-directory imports and
the source-path trap (12); `fortress parse` as the only fast check (13); Dyalog's
matrix layout from `BIG |||` and `BIG //` (14).

## Probes

Every attempt is kept with its output; `.out.0`, `.out.1` are earlier spellings
of the same probe, failures included. (There is no `p04`: the number was skipped
when a planned probe proved unnecessary.)

| probe | question | outcome |
|---|---|---|
| `p01_numfmt` | is there an `RR64 → ZZ32` conversion? | `truncate` missing at run time |
| `p01b_numfmt` | does the floor bracket print as an integer? | yes, `7` |
| `p01c_numfmt` | does its `ZZ64` narrow? | no |
| `p01d_numfmt` | the `aplFmt` formatter and `\|s\|` for padding | works |
| `p02_g`, `p02_mech` | whitespace, `Id` gap, `f/` — all three at once | the `Id` gap aborted the run before the others could be evaluated; `.out.0` is the preparser rejecting the escape |
| `p02b_g`, `p02b_mech` | whitespace and `f/` alone | both work |
| `p03a_idgap` | a bare `Id` gap as an expression | fails |
| `p03b_escape` | an `Expr` gap delimited by a glyph, and by `≡` | glyph yes, `≡` no |
| `p03c_escape` | escaped `Expr` gaps on both sides of `≡` | works — this is `⍎(v)` |
| `p05_core` | the library alone, imported across directories | works; `.out.0` is the source-path failure |
| `p06_cross` | both halves across directories | works; `.out.0` is the greedy-escape reparse |
| `p07_g`, `p07_assign` | a template that assigns | three spellings, three failures |
| `p07d_cell` | assignment through a user cell object | works |
| `p08a_g`, `p08b_g`, `p08d_g` | the backtick escape at top level without a glyph above it, with one, and inside the expander brackets | rejected / `Ok` / rejected, and the bracket pairing broken too |
| `p09_g`, `p09_comment` | APL comments inside the expander | group form runs away; recursive `NOT` works |
| `p10_eqv` | is `≡` user-definable at the ordinary level? | yes |
