# Rung 2b — APL's variables as real Fortress variables

The worker that probed the lambda-parameter route for APL variables (the shipped
`for` grammar's idiom, `fn v => rest`) was cancelled by a user interruption on
2026-09-12 after probes `q01` to `q09`, with no report written and no `Rung2b`
component; its `README.md` said so and has been replaced by this file. The nine
probes and their outputs are exactly as that run left them; what follows reads
their verdicts out, adds the `Rung2b.fss` the brief asked for, and answers the
two further questions (the shipped regular-expression grammar, and a
newline-terminated form) with probes `q10` to `q13`. Walk interpreter, JDK 25,
`FORTRESS_THREADS=1`; nothing outside `explorations/apl/` touched, nothing built.

## Verdicts

- **A — the lambda route: yes, and it is better than rung 2's workspace on every
  axis but one.** An `Id` gap spliced into a lambda parameter binds
  (`q01_bind.out`), and the name is then an ordinary Fortress variable that later
  statements of the sub-language read with **no `⍎(…)` escape** and that host code
  inside the block reads as itself (`q06_block.out`, `Rung2b.out` X16). The
  catch is that the name can only be *read* through a closed set of grammar
  alternatives, one per name — a gap in a reference position fails
  (`q02_ref.out`, `q03_ref.out`) — and that a block cannot rebind a name
  (`q07_rebind.out`). `Rung2b.out`: **52 of 52 checks pass**, 20 of them the
  chapter's variable examples through the lambda route and 32 through the
  host-declared-cell variant of it, which recovers everything rung 2 could do and
  adds host visibility.
- **B — the regex grammar teaches three things.** (1) Its delimiter is *borrowed*,
  not invented: `/…/` is a nonterminal pair in a second grammar
  (`Slash:String :StringLiteralExpr:= / => <[ "/" ]>`), there is no expander
  keyword at all (`Expr |:= x:Regex`), and the price is that every use site needs
  host parentheses — `(/abc/)` throughout `RegexUse1.fss`, which runs
  (`q12_regexuse1.out`, 38 lines of output). (2) `#` after a terminal means
  *delete the optional-whitespace nonterminal that the following space would have
  inserted* (`Syntax.rats:330` `Symbol ::= Item hash?` → `NoWhitespaceSymbol`,
  then `WhitespaceElimination.java:26-38` drops the next `WhitespaceSymbol`), so
  it would **not** let the APL grammar drop its `SPACE` terminals: those are
  already free — a `SPACE` and a plain space both compile to the same optional
  `w` (gap row 1) — and `#` is the opposite operation, forbidding whitespace
  rather than requiring it. (3) Its escape spellings do **not** avoid the
  preparser collision of gap row 3: the minimal regex-shaped api with one
  backtick-escaped `+` and nothing else is rejected exactly as ours was
  (`q10_canary.out`). `Regex.fsi` survives because the preparser's token scan
  **dies on the `**` splice operator** at `Regex.fsi:93`, so the delimiter check
  is skipped from there on — the same accident an APL glyph gives us.
- **C — a newline-terminated form: yes, with two bounds.** `apl 2 3 ⍴ ⍳ 6` parses
  with a keyword in and the end of line out (`q11_nlform.out`), by either
  `e:Q11E# NEWLINE` (consumes the line break; then it may only be a block's
  **last** statement, `q11b_nlmid.out`) or `e:Q11E# AND NEWLINE` (a lookahead;
  works anywhere a statement may stand, but not inside an argument list,
  `q11_nlform.out.0`). With no terminator at all it parses too, and silently
  swallows the next line when that line can extend the phrase. The
  newline-terminated and the bracketed `aplz⦇ … ⦈` forms **coexist in one
  grammar** and in one component.

## How to run

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/explorations/apl/rung-2b:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:\
$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-2b && $FORTRESS_HOME/bin/fortress Rung2b.fss
```

`fortress parse AplSyntaxB.fsi` checks the grammar api in ~0.6 s and was again the
only fast check (gap row 13); a component that uses an expander regenerates two
Rats! parsers, 20-40 s.

## A. The lambda route

### The grammar rules that worked, verbatim

The binder, from `q01_g.fsi` and then `AplSyntaxB.fsi` — an `Id` gap in the one
position the paper's design has for it, a lambda parameter, with the rest of the
block as the lambda's body:

```
AplbStm :Expr:=
    n:Id SPACE ← SPACE e:AplbE SPACE ⋄ SPACE r:AplbStm
        => <[ (fn n => (r))(aplCellNew((e))) ]>
  | n:Id SPACE ← SPACE e:AplbE
    r:AplbStm
        => <[ (fn n => (r))(aplCellNew((e))) ]>
  | s:AplbE SPACE ⋄ SPACE r:AplbStm => <[ (fn _ => (r))((s)) ]>
  | s:AplbE
    r:AplbStm                       => <[ (fn _ => (r))((s)) ]>
  | s:AplbE                         => <[ (s) ]>
```

The second and fourth alternatives have a **line break** where the others have
`⋄`: a line break between two symbols of a production becomes `br`
(`ComposingSyntaxDefTranslator.java:152`), which is the host parser's own
required line break, `br = nl / s semicolon w` (`Spacing.rats:99`) — so the
book's layout works with no separator glyph, and a `;` works in its place. That
is `Rung2b.out`'s Ex 6a-d:

```
apl⦇ m ← 3 3⍴4 1 6 5 2 9 7 8 3
     m[1;1] ⦈                      →  2
```

The reference, which is where the design's price is paid — one alternative per
name, each spelled as a sequence of one-character **classes** glued with `#`, each
template writing that name as an ordinary free Fortress identifier:

```
AplbName :Expr:=
    [s]# [e]# [l]# [e]# [c]# [t]# NOT [A:Za:z0:9] => <[ (select) ]>
  | [d]# [a]# [t]# [a]# NOT [A:Za:z0:9]           => <[ (data) ]>
  | [m]# [1]# NOT [A:Za:z0:9]                     => <[ (m1) ]>
  | [v]# NOT [A:Za:z0:9]                          => <[ (v) ]>
  …
```

Two things make it work. The class and not the bare terminal: **a terminal that
is a valid identifier becomes a keyword of the whole language**
(`ItemDisambiguator.java:109-122` makes a `KeywordSymbol`, `ParserMaker.java:296`
adds every one to `FORTRESS_KEYWORDS`), after which `Id` excludes it and the name
is unreadable as a name *everywhere, templates included* — which is exactly how
`q04` died. And the free identifier in the template: free names of a template
resolve at the use site, and the hygiene environment leaves an unbound id alone,
while a gap-bound binder is **not** gensymmed either
(`Transform.java:115-118`, `generateId` returns the original for a
`TemplateGapId`). The two ends are therefore literally the name the use site
wrote, and they meet.

Everything else in `AplSyntaxB.fsi` is rung 2's grammar with `aplSet(n, …)`
replaced by `aplCellPut(c, …)` and `aplGet(n)` by `aplCellGet(c)`; the six
bracket shapes, the two selective-assignment shapes, `⊂`, the coordinate lists,
Compress/Replicate, the high minus and the glyph table are untouched. The name
nonterminal yields the **cell**, so the assignment rules stay generic — one
production per left-hand-side shape, not one per shape per name:

```
c:AplbName `[ SPACE i:AplbE SPACE `] SPACE ← SPACE r:AplbE
    => <[ aplCellPut((c), aplIxSet1(aplCellGet((c)), (i), (r))) ]>
```

The cell is needed in **both** halves of the design, and for an APL reason: every
indexed assignment is a rebinding, `AplArr` being a `value object`, and a second
lambda parameter of the same name is rejected. So what the lambda binds is a
mutable cell (`object AplCell(init: AplArr)` with a `var` field, declared in
`Rung2b.fss` at the use site), and every later `←` is a call on it. That is the
one route to assignment rung 1 had already found open (gap row 8's
`asgnc⦇ ⍎(c) ← 41 ⦈` → `c.put(41)`).

### The errors met, verbatim

```
q01_bind.fss:14:38:
    Variable v is already declared.
      (a host local v in the same function as a block whose binder is also v;
       q01_bind.out.0.  The two designs cannot share a scope, which is why
       Rung2b.fss has two functions)

MacroError: Could not parse ' <!@#$%^&*<Id n >*&^%$#@!>  '
  Caused by: java.lang.IllegalArgumentException: Parameter 'text' to the IdOrOp constructor was null
        at com.sun.fortress.nodes_util.NodeFactory.makeId(NodeFactory.java:1406)
        at …TemplateParser4.pQualifiedName
        at …TemplateParser4.pExpression$AssignLeft
      (the template <[ n ]>, an Id gap as the WHOLE template: q02b_g.fsi,
       q02_ref.out.0.  Same AssignLeft wall as gap row 18 -- the template parser
       tries AssignLeft on the first token of every Expr it starts)

Exception in thread "main" java.lang.IllegalArgumentException: Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null
        at com.sun.fortress.nodes.Id.<init>(Id.java:30)
        at com.sun.fortress.scala_src.nodes.SId$.apply(FortressAst.scala:643)
        at …disambiguator.SelfParamDisambiguator.walk(SelfParamDisambiguator.scala:87)
      (q03: the Id gap kept OFF the first token, as the argument of a juxtaposed
       identity function, <[ q03ref n ]>.  It passes the template parser and dies
       in the DISAMBIGUATOR instead: Transform.forVarRef (Transform.java:122-135)
       looks a VarRef's id up in the hygiene environment rather than recurring
       into it, so a TemplateGapId inside a VarRef is never substituted.  A third
       distinct failure for gap row 4, and the one that forces the closed set)

MacroError: Could not parse '(v) '
  Caused by: q04_g.fsi:1:3:
    Syntax Error
      (and 'v ' at 1:2 for the unparenthesised spelling, q04_name.out.0.  Not the
       template's fault: q05 parses (vv), q05id vv, (v) and q05id v as templates
       without complaint.  What poisoned it was the PRODUCTION -- the terminal v
       had become a keyword)

q07_rebind.fss:16:62:
    Variable v is already declared.
      (v ← 1 ⋄ v ← 2 ⋄ v: the second ← is a nested lambda parameter of the same
       name.  This is the one thing the route cannot do)

q08_g.fsi:1:2:
    Variable m is not defined.
q08_g.fsi:1:2:
    Variable v is not defined.
      (the preamble (fn (v, m) => (blk))(q08cell(), q08cell()): binders written as
       literal identifiers OF A TEMPLATE are gensymmed, the free names of the
       reference templates are not, and they do not meet.  Hygiene working
       exactly as §5.3 promises, and defeating the design that needed it off)

Rung2b.fss:131:34:
    Syntax Error
  Error occurred while instantiating and executing a temporary parser:
  com.sun.fortress.parser.templateparser.TemplateParser227
      (w ← ⍎(hostm): a name outside the closed set.  Rung2b.fss.0, Rung2b.out.0.
       This is the misspelling behaviour of the design)

AplSyntaxB.fsi:1:2:
    Variable a is not defined.
AplSyntaxB.fsi:1:2:
    Variable b is not defined.
AplSyntaxB.fsi:1:2:
    Variable v is not defined.
      (q13: a ← b ← 1 2 with nothing declared, and a block that binds followed by
       a block that reads.  Note WHERE it is reported: line 1 column 2 of the
       GRAMMAR api, not the use site -- against §1's "syntax errors at use sites
       of a macro must refer to the unexpanded program at use sites")
```

### The workspace table versus the lambda route

`Rung2b.fss` runs the chapter's variable examples twice. **A** is the lambda route
proper: nothing is declared by the host, `←` binds, and the book's successive
lines become statements of one block. **B** is the same grammar with the names
declared once by the host as cells, which is the only way a binding can outlive a
use site; it then takes rung 2's lines *unchanged*, one `apl⦇ … ⦈` per line of the
book. Both pass, 20 + 32 = 52 of 52.

| | rung 2: workspace table | 2b-A: lambda binding | 2b-B: host-declared cell |
|---|---|---|---|
| reads as the book | every line, character for character | every line, but the book's *session* must be one block: successive lines become `⋄`- or newline-separated statements | every line, character for character, one block per line — identical to rung 2 |
| `v ← 9 2 6` alone | works, stores | **no**: a binding needs a rest to be the body of, so a lone `←` falls through to the put rule and there is no cell | works, puts |
| rebinding `m ← …` twice | works | **no** (`q07`) | works |
| indexed/selective assignment | works (copy stored back) | works — the cell makes it a put, not a rebinding | works |
| `a ← b ← 1 2` | works | **no** (`q13`) — write `b ← 1 2 ⋄ a ← b` | works |
| scope | the component's lifetime, global, one flat table | the block, lexically, as a lambda parameter | wherever the host declares it — a function, a block, or a component field |
| survives two `apl⦇ … ⦈` blocks | yes | **no** (`q13`) | yes |
| host visibility | only through `aplGet("v")`, a String key | the block's value; and host code *inside* the block sees the name as itself: `apl⦇ v ← 9 2 6 ⋄ ⍎(aplCellGet(v)) ⦈` → `9 2 6` (X16) | full: `aplCellGet(v)` on the host's own variable, no grammar involved (`Rung2b.out`'s last line) |
| a misspelt name | **zilde**, silently | a `Syntax Error` at the use site | a `Syntax Error` at the use site |
| a name the host already has | — | rejected, "Variable v is already declared" | it *is* the host's name |
| names it can spell | any, unbounded: 6 grammar lines (`AplId`, `AplIdTail`, `AplCh`, `AplChD`) | a closed set: 1 grammar line per name (9 names, 9 lines), plus 2 binding alternatives | the same closed set, plus one host declaration per name |
| type of a variable | `AplArr` only | anything, it is a Fortress variable | anything |
| grammar size | `AplSyntax.fsi`, 190 lines | `AplSyntaxB.fsi`, 179 lines | the same file |

The honest summary: **the lambda route gives APL variables that are real, scoped,
typed Fortress variables visible to the host, and takes away the open name set
and the session.** Rung 2's table gives the session and any name, and takes away
everything else. The two are not orderable; which is right depends on whether the
sub-language is a *session* (APL's own model — rung 2 wins) or an *expression
sub-language embedded in host code* (the paper's model — 2b wins). A sub-language
with a fixed small vocabulary, which is what rung 2's report already guessed as
the fallback for route 4, gets the best of both: 2b-B.

What the paper says about this is in the extract's §6, and it is the flat
statement that the question was never asked: "you do not give the sublanguage
variables of its own — you spend the host's one binding form", there is "no
mechanism for a DSL name to outlive its use site anywhere in the paper". 2b-A is
that design carried out to the letter; 2b-B is the part the paper has no opinion
on, and it works.

## B. What the shipped regular-expression grammar teaches

`Regex.fsi` + `Regex.fss`, used by `RegexUse1.fss` and `RegexUse2.fss`.
`q12_regexuse1.out` is `RegexUse1.fss` running to the end: `/a{1,2}/` prints as
`/a{1, 2}/` and `/#{2+2}/` as `/4/` (a host expression interpolated into the
regex), everything else round-trips.

**How it delimits.** Not with expander brackets, and not with a keyword. The
extension is `Expr |:= x:Regex => <[ x ]>`, and `Regex` begins and ends with a
slash that is itself a nonterminal in a *second* grammar, so that `/` need not be
escaped in the main one:

```
grammar Symbols extends Expression
    Slash:String :StringLiteralExpr:= / => <[ "/" ]>
```
```
Regex:Regexp :Expr:= s1:Slash# e:Element#* s2:Slash# => <[ Regexp(<|e**|>) ]>
```

This is the paper's preference realised — §3 argues against enclosing macro uses
in special brackets, "reminiscent of user-defined function definitions in APL" —
and its cost is visible at every use site in `RegexUse1.fss`: `(/abc/)`, always
parenthesised, because a bare `/` in juxtaposition is the host's division.
Borrowing a delimiter pair costs host parentheses; inventing one (`⦇ ⦈`) costs
none. Our `apl⦇ … ⦈` also pays nothing in keywords: `apl⦇` is not a valid
identifier, so it is a `TokenSymbol` and reserves nothing, whereas a bare `apl`
keyword would be reserved language-wide (see C).

**What `#` means, and where it is defined.** `Syntax.rats:330`,
`Symbol ::= Item hash?`, wraps the item in a `NoWhitespaceSymbol` (`hash = "#"`,
`Syntax.rats:409`); `WhitespaceElimination.java:26-38` then unwraps it and
**throws away the following `WhitespaceSymbol`**; without it
`ComposingSyntaxDefTranslator.java:147` would have emitted the nonterminal `w`,
optional whitespace. So `#` deletes a `w`. It is therefore no help with the APL
grammar's `SPACE` terminals: a `SPACE` and a plain space between symbols are the
same `w` (gap row 1, `rung-1/p02b_mech.fss`), so they may be dropped from a
production for free and already are droppable; what no spelling can do is
*require* whitespace. Where `#` does earn its place is precisely where the APL
grammar already uses it — gluing the characters of a name and the high minus to
its digits, the `Xml.fsi`/`Regex.fsi` idiom — and one place it could be used more:
`b:AplbBase# `[` would forbid `m [1]`, which APL also rejects.

**How it escapes.** One mechanism, the backtick, for ten characters:
`` `* `` `` `+ `` `` `? `` `` `{ `` `` `} `` `` `| `` `` `[ `` `` `] `` `` `: ``
`` `# `` (`Regex.fsi:96-150`). It does **not** escape `^ $ . - ( ) / \` — those
are not metasyntax. Two further spellings appear and are worth knowing: the
*pling-escape* of a special **symbol** (`\# any:_` at `Regex.fsi:120`, where `\`
is an ordinary character and `#` the escaped one), and a character class used to
name punctuation wholesale, `x:[A:Za:z0:9~!@%&]`.

**And it does not avoid the preparser collision.** `q10_canary.out` builds the
minimal regex-shaped api — one `Expr` extension, one nonterminal, one
backtick-escaped `+` — and it is rejected exactly as rung 1's `p08a_g.fsi` was:

```
nothing above it                   REJECTED   (the escape was seen)
^ (Regex.fsi:116)                  REJECTED   (the escape was seen)
$ (Regex.fsi:117)                  REJECTED   (the escape was seen)
. (Regex.fsi:119)                  REJECTED   (the escape was seen)
_ as any character                 REJECTED   (the escape was seen)
pling-escaped # (\#)               REJECTED   (the escape was seen)
a class [A:Za:z0:9~!@%&]           Ok         (the escape went unchecked)
a bare # after a terminal          REJECTED   (the escape was seen)
an escaped : (`:)                  REJECTED   (the escape was seen)
an APL glyph (the rung-1 recipe)   Ok         (the escape went unchecked)
```

So the escape spellings are irrelevant to the collision; what matters is whether
anything above them stops the preparser's token loop before `report()` runs. In
`Regex.fsi` something does, and the second half of `q10_canary.sh` finds it by
truncation — prefixes of the file plus one bare backtick, the backtick reported
iff the scan ran to the end of the prefix — with the flip at line 93:

```
lines 1..92  + a backtick: REPORTED -> the scan ran to the end of this prefix
lines 1..93  + a backtick: silent   -> the scan died inside this prefix
```

and line 93 is `s1:Slash# e:Element#* s2:Slash# => <[ Regexp(<|e**|>) ]>`, of
which the killing token is the **splice operator**:

```
a plain template                   REPORTED   (the scan survived it)
a list literal <| … |>             REPORTED   (the scan survived it)
the splice ** alone                silent     (the scan died on it)
<| xs** |> as in Regex.fsi         silent     (the scan died on it)
```

That is the sharpest thing B gives us: **the preparser's delimiter check is dead
in every grammar that splices a repeated gap**, because `**` stops the scan. Gap
row 3's recipe ("keep an APL glyph above every escape") has a second, more
portable form — keep a `**` above it — and the reason nobody in 2009 hit the
collision is that their own example grammar disabled the checker on line 93.

## C. A newline-terminated form

`q11_g.fsi` puts four forms of the same toy sub-language in **one** grammar, and
`q11_nlform.out` runs all four from one component:

```
Expr |:= aplx SPACE e:Q11E# NEWLINE     => <[ (e) ]>
       | aplw SPACE e:Q11E# AND NEWLINE => <[ (e) ]>
       | aply SPACE e:Q11E              => <[ (e) ]>
       | aplz⦇ e:Q11E ⦈                 => <[ (e) ]>
```

`NEWLINE` is an Item of the macro language (`Syntax.rats:362`) that becomes the
Rats! string literal `"\n"` (`ComposingSyntaxDefTranslator.java:162`); `AND` is
the PEG must-match predicate (`Syntax.rats:257`), which matches without
consuming. The `#` is load-bearing: the space before `NEWLINE` would otherwise be
the optional-whitespace `w`, and `w = Whitespace*` crosses line breaks
(`Spacing.rats:92`), so it would eat the newline the terminal then failed to find.

```
a1. aplw 2 3 ⍴ ⍳ 6 as a non-final statement -> (2 3 ⍴ (⍳ 6))
a2. a second one, and a statement after it   -> 1 2 3
b1. aplx as the last statement of a do block:
b2. its value -> (2 3 ⍴ (⍳ 6))
c1. aply 2 3 ⍴ ⍳ 6, nothing to leave by     -> (2 3 ⍴ (⍳ 6))
c2. aply 1 2 / 3 4 on two lines             -> 1 2 3 4
d1. aplz⦇ 2 3 ⍴ ⍳ 6 ⦈ in an argument position -> (2 3 ⍴ (⍳ 6))
d2. and mid-expression: 1 2 | 3 4
```

Read off the four bounds.

- **The lookahead form is the usable one.** `aplw 2 3 ⍴ ⍳ 6` stands as an
  ordinary statement, non-final, with statements after it (a1, a2): the line
  break it looks at is left for the host's own `br`.
- **The consuming form eats the host's statement separator**, so it may only be a
  block's last statement. As a non-final one (`q11b_nlmid.fss`, the same
  `aplx 2 3 ⍴ ⍳ 6` with a `println` after it):
  ```
  q11b_nlmid.fss:17:12:
      Syntax Error
    Error occurred while instantiating and executing a temporary parser:
    com.sun.fortress.parser.templateparser.TemplateParser13
  ```
- **Neither newline form can stand in an argument list**, which is where the
  bracketed form is at its best. `println ("…" (aplw 2 3 ⍴ ⍳ 6))`:
  ```
  q11_nlform.fss:19:58:
      Syntax Error
  ```
  (`q11_nlform.fss.0`, `.out.0`.) So a newline-terminated sub-language is a
  *statement* sub-language, and the moment its value is wanted as an argument the
  brackets come back.
- **No terminator at all parses, and silently runs on.** c2 is the demonstration:
  `aply 1 2` with `3 4` on the next line prints `1 2 3 4` — one strand, not two
  statements, because the `w` between two symbols of the strand production
  crosses the line break. A form with no terminator is safe only for a
  sub-language whose phrases cannot be extended by whatever the next line starts
  with.
- **Coexistence: yes.** All four forms are alternatives of one `Expr` extension
  in one grammar, used from one component (d1, d2 alongside a1-c2). For APL that
  means the book's interactive line `apl 2 3 ⍴ ⍳ 6` and the embeddable
  `apl⦇ 2 3 ⍴ ⍳ 6 ⦈` can both exist, which is the arrangement worth having.

One cost the bracketed form does not have: `aplx`, `aplw` and `aply` are valid
identifiers, so each becomes a **keyword of the whole language** for every
component importing the grammar (`ItemDisambiguator.java:109-122`,
`ParserMaker.java:296`) — the same mechanism that killed `q04`. `apl⦇` is not a
valid identifier and reserves nothing. An unbracketed `apl` form costs the word
`apl` program-wide.

## New gap rows

Thirteen rows appended to `../gaps.md`, numbered **23-35**, each marked with the
paper's verdict where the extract has one: the lambda binder works and the name
needs no escape (23, *agrees*); a reference cannot be a gap, a third failure and
the reason (24, *disagrees*); a terminal that is an identifier becomes a
language-wide keyword (25, *silent*); hygiene is real and is what blocks a
macro-written preamble (26, *agrees*); a template **can** expand to an assignment
if the left of `:=` is literal (27, *silent*); the host may declare the
sub-language's variables and both sides then see them (28, *silent*); no
rebinding and no shadowing (29, *silent*); `⋄` and a line break as statement
separators, the line break being the host's own `br` (30, *silent*); the
newline-terminated form with its two bounds (31, *agrees with the goal, silent on
the mechanism*); no terminator at all runs on (32, *silent*); the preparser's
delimiter check is dead in every grammar that splices, because `**` stops the scan
(33, *silent*); what `#` is and what it cannot do (34, *silent*); a static error
from an expansion is reported at the grammar api's line 1 (35, *disagrees*).

## Probes

`.0` is an earlier spelling of the same probe, failures included.

| probe | question | outcome |
|---|---|---|
| `q01_bind` | does an `Id` gap bound as a lambda parameter work, and is the name visible in the body? | yes, and the body may mix host code; `.out.0` is the host-local collision |
| `q02_ref` | can an `Id` gap be *read* — as a call argument, or as the whole template? | as an argument yes; as the whole template no, the `AssignLeft` wall |
| `q03_ref` | can the gap be read if it is kept off the first token of an expression? | no: it passes the template parser and dies in the disambiguator, null `apiName` |
| `q04_name` | one alternative per name, the name written as a bare terminal | rejected: the terminal became a keyword, so the template could not name it |
| `q05_namespell` | is a name-only template the problem? four spellings | no: all four parse; the production was the problem |
| `q06_block` | the whole design — `Id`-gap binder, character-class reference, `⋄` and newline statements | works; `.out.0` is the rebinding rejection |
| `q07_rebind` | can a block rebind a name? | no, "Variable v is already declared" |
| `q08_cell` | can the expander write a **preamble** binding each name to a cell? | no: hygiene gensyms a template's own binders, so the reference templates find nothing |
| `q09_hostvar` | let the host declare the names: as cells (a), and as plain `var`s assigned to (b) | both work, including across blocks and read back by the host; (b) is a template expanding to an assignment |
| `q10_canary` (`.sh`) | does the regex grammar's escaping avoid the preparser collision, and if not what saves `Regex.fsi`? | no; the `**` splice operator at `Regex.fsi:93` stops the token scan |
| `q11_nlform` | a newline-terminated form, four ways, in one grammar | all four work; `.out.0` is the argument-position rejection |
| `q11b_nlmid` | the consuming newline form as a non-final statement | rejected: it ate the host's statement separator |
| `q12_regexuse1` | does the shipped regex sub-language still run? | yes, `RegexUse1.fss` to the end |
| `q13_noescape` | `a ← b ← 1 2`, and a binding surviving to the next block, with nothing host-declared | both rejected, and reported against the grammar api's line 1 |
| `Rung2b` | rung 2's variable examples through both halves of the design | 52 of 52; `.0` is the unlisted-name rejection |
