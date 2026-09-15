<!-- probes-4b: the two questions left open about writing HOST code from a
     grammar template -- a named host function reached through a template, and
     a typed lambda written inside one.  Walk interpreter, JDK 25,
     FORTRESS_THREADS=1, source path `.` + ../../run-c4/src + LibraryBuiltin +
     Library + test_library, run from this directory.  The APL base is NOT on
     the path: these probes use FlatArrays and nothing else.  Four probes,
     y01-y04, against one throw-away grammar Y01Syn.fsi (+ its stub .fss);
     every .out is the recorded run, every .out.N a recorded failed attempt.
     Nothing outside this directory was touched and nothing was built. -->

# probes-4b -- a named host function, and a lambda, written by a template

```
source /home/user/fortress/experiment/env.sh
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/run-c4/src:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/probes-4b && $FORTRESS_HOME/bin/fortress y01_named.fss
```

| probe | question | verdict |
|---|---|---|
| `y01_named` | Q1: a named host function through a template, one and two arguments | **yes** |
| `y02_lambda` | Q2a: binder and reference written by the SAME template | **yes** |
| `y03_lamfn` | Q2b: that lambda as a function value, dispatching an arrow-typed overload | **yes** |
| `y04_split` | Q2c: binder in one template, reference in another (negative control) | **no**, as predicted |

## The answers in one line each

- **Q1 (`y01_named.fss`).** Yes. A template-written free identifier naming a
  host function reaches FlatArrays' arrow-typed `rows` overloads and returns a
  matrix, for both the `Vec -> Vec` and the `(Vec,Vec) -> Vec` overload, and for
  both spellings of the name -- spliced in from a closed-name nonterminal whose
  own template is `<[ (rmsn) ]>`, and written literally in the calling rule's
  template. Every macro line equals its hand-written host line.
- **Q2a (`y02_lambda.fss`).** Yes. Hygiene renames a template-written binder and
  the references written in the SAME template consistently: the lambda works and
  agrees with the hand-written one to the last digit.
- **Q2b (`y03_lamfn.fss`).** Yes. A typed lambda assembled by the expander
  dispatches on its declared arrow type exactly as a hand-written one does, and
  it does so with the lambda bare before the argument list's comma -- the fn
  body does not eat the comma, so the parenthesised variant is not needed.
- **Q2c (`y04_split.fss`).** No, exactly as ledger row 204 predicts, and the
  error is reported against the grammar api's line 1 as row 243 says.

## Q1 -- a named host function through a template

Rules (`Y01Syn.fsi`), two spellings of the name and two arities:

```
Expr |:= y1⦇ f:Yname ⍤ r:Expr ⦈           => <[ rows((f), (r)) ]>
       | y2⦇ f:Yname2 ⍤ x:Expr ⍤ y:Expr ⦈ => <[ rows((f), (x), (y)) ]>
       | y3⦇ r:Expr ⦈                     => <[ rows(rmsn, (r)) ]>
       | y4⦇ x:Expr ⍤ y:Expr ⦈            => <[ rows(rmsn_b, (x), (y)) ]>

Yname  :Expr:= [r]# [m]# [s]# [n]# NOT [A:Za:z0:9]               => <[ (rmsn) ]>
             | [s]# [m]# NOT [A:Za:z0:9]                         => <[ (sm) ]>
Yname2 :Expr:= [r]# [m]# [s]# [n]# [`_]# [b]# NOT [A:Za:z0:9]    => <[ (rmsn_b) ]>
             | [s]# [m]# [`_]# [b]# NOT [A:Za:z0:9]              => <[ (sm_b) ]>
```

`y01_named.fss` declares `rmsn`, `sm`, `rmsn_b`, `sm_b` verbatim from run-c4's
`MicroGptFlat.fss`, imports `FlatArrays` and nothing else, and prints the
hand-written host call beside every macro line. `y01_named.out`:

```
(A) the name through a closed-name nonterminal, spliced into a gap
(1) macro y1 rmsn       shape 4 x 5  [2,3] = 0.40918699113560847  sum = 9.477580822311667
(1') host rows(rmsn,xm) shape 4 x 5  [2,3] = 0.40918699113560847  sum = 9.477580822311667
(2) macro y1 sm         shape 4 x 5  [2,3] = 0.14982413821876467  sum = 4.0
(2') host rows(sm,xm)   shape 4 x 5  [2,3] = 0.14982413821876467  sum = 4.0
(B) the name written LITERALLY in the calling template
(3) macro y3            shape 4 x 5  [2,3] = 0.40918699113560847  sum = 9.477580822311667
(3') host rows(rmsn,xm) shape 4 x 5  [2,3] = 0.40918699113560847  sum = 9.477580822311667
(C) two arguments, the (Vec,Vec)->Vec overload
(4) macro y2 rmsn_b     shape 4 x 5  [2,3] = 0.9948494685670661  sum = 3.2953775541486436
(4') host rows(rmsn_b)  shape 4 x 5  [2,3] = 0.9948494685670661  sum = 3.2953775541486436
(5) macro y2 sm_b       shape 4 x 5  [2,3] = -0.4058653480321332  sum = -23.948142122216034
(5') host rows(sm_b)    shape 4 x 5  [2,3] = -0.4058653480321332  sum = -23.948142122216034
(6) macro y4 literal    shape 4 x 5  [2,3] = 0.9948494685670661  sum = 3.2953775541486436
(6') host rows(rmsn_b)  shape 4 x 5  [2,3] = 0.9948494685670661  sum = 3.2953775541486436
done
```

So row 171's dispatch is reached through row 270's free-identifier resolution,
with no diagnostic and no difference from the hand-written call. Both spellings
work, so a grammar may either splice the name from a name nonterminal (what the
base does) or hard-code it in the calling template.

### The one thing that had to be fixed first: the separator

The first two attempts failed, and the cause is worth carrying into the design.
The rules originally separated their two `Expr` gaps with `⋄`:

```
y2⦇ f:Yname2 ⍤ x:Expr ⋄ y:Expr ⦈
y4⦇ x:Expr ⋄ y:Expr ⦈
```

`y01_named.out.0` (the two-name form):

```
null/home/user/fortress/explorations/apl/probes-4b/y01_named.fss:
    Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser14 (/home/user/fortress/explorations/apl/probes-4b/y01_named.fss:52:60:
    Syntax Error)
```

`y01_named.out.1`, the same thing reduced to `y4⦇ ym ⋄ xm ⦈`, names it plainly:

```
/home/user/fortress/explorations/apl/probes-4b/y01_named.fss:52:39:
    Variable y4 is not defined.
/home/user/fortress/explorations/apl/probes-4b/y01_named.fss:52:46:
    Operator ? is not defined.
```

-- the rule never matched at all, so the bracket was left as a call to an
undefined `y4`. The reason: `⋄` is Fortress's own DIAMOND operator
(`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:428`), so the FIRST
gap's `Expr` parses `ym ⋄ xm` as an operator application and eats the separator;
`∘` is the same story (RING / CIRC / COMPOSE, `Literal.rats:403-405`). The base
never meets this because its `⋄` always separates two of its OWN nonterminals,
not two host `Expr` gaps. Changing every separator to `⍤` -- no APL glyph
appears in any Fortress operator table -- fixed all of them at once. **A rule
that puts a host `Expr` gap to the left of a terminal must choose a terminal
that is not a Fortress operator.**

## Q2a -- binder and reference in one template

```
bl⦇ a:Expr ⍤ r:Expr ⦈
  => <[ (fn (w: Array[\RR64,(ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32)\]
            => (a) transpose(w))((r)) ]>
```

Both `w`s are template text; `(a)` and `(r)` are gaps. `y02_lambda.out`:

```
(1) the lambda written by the template, binder and reference both
(1) macro bl       shape 3 x 2  [1,1] = 10.75  sum = 22.5
(1') host lambda   shape 3 x 2  [1,1] = 10.75  sum = 22.5
(1'') host direct  shape 3 x 2  [1,1] = 10.75  sum = 22.5
```

So the gensym of row 204 is applied consistently across one template: binder and
reference are renamed together. Note also that a template may carry a full
Fortress TYPE, `Array[\RR64,(ZZ32,ZZ32)\]` with its `[\ \]` and its tuple index
-- nothing in the base has one.

## Q2b -- the same lambda as a function value

```
bf⦇ a:Expr ⍤ r:Expr ⦈ => <[ rows(fn (w: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => (a) + w, (r)) ]>
bg⦇ a:Expr ⍤ r:Expr ⦈ => <[ rows((fn (w: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => (a) + w), (r)) ]>
bs⦇ a:Expr ⍤ r:Expr ⦈ => <[ rows(fn (w: Array[\RR64,ZZ32\]): RR64 => (a) + (SUM w), (r)) ]>
```

To make the ARROW TYPE the thing that decides, `y03_lamfn.fss` declares, beside
the three `rows` it imports from FlatArrays, run-c3 `lift_c`'s scalar-result
overload -- `rows(f: Array[\RR64,ZZ32\] -> RR64, m: Matrix[\RR64,r,c\]):
Array[\RR64,ZZ32\]`, which differs from FlatArrays' matrix-over-a-matrix `rows`
only in the arrow type of `f`. `bf` and `bs` write lambdas that differ only in
their declared RESULT type. `y03_lamfn.out`:

```
(1) a template-written typed lambda as the function argument of rows
(1) macro bf, bare   shape 3 x 4  [1,1] = 11.5  sum = 141.0
(2) macro bg, parens shape 3 x 4  [1,1] = 11.5  sum = 141.0
(3) host lambda      shape 3 x 4  [1,1] = 11.5  sum = 141.0
(4) host s + xm      shape 3 x 4  [1,1] = 11.5  sum = 141.0
(2) the SAME lambda shape with a scalar result type, competing for
    two rows declarations that differ only in the arrow type of f
(5) macro bs, scalar result:  |sv| = 3  sv[1] = 17.0
(6) host lambda, same:        |hv| = 3  hv[1] = 17.0
done
```

(1) is a 3x4 matrix and (5) a 3-vector out of the same argument, so the declared
arrow type of a template-written lambda selects the overload exactly as row 171
says a hand-written one's does. A locally declared `rows` overload also coexists
with the imported ones with no declaration-time complaint (this source version's
FIRST run is the one recorded, so the verdict is a cold one in the sense of
ledger row 98). And `bf` works bare: the lambda body does not swallow the comma
of the argument list, so the parentheses of `bg` are optional.

## Q2c -- the negative control: binder and reference in DIFFERENT templates

```
om⦇ b:Ybody ⍤ r:Expr ⦈
  => <[ (fn (w: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => (b))((r)) ]>
Ybody :Expr:= ⍵ => <[ (w) ]>
```

`om⦇ ⍵ ⍤ v ⦈`, `y04_split.out`, the whole of it:

```
/home/user/fortress/explorations/apl/probes-4b/Y01Syn.fsi:1:2:
    Variable w is not defined.
```

This is ledger row 204 seen from the `⍵` side and row 243's reporting position:
a STATIC error, before anything runs, located at line 1 column 2 of the GRAMMAR
API -- not at the use site, not at the rule. The two halves of a name can only
meet if both come from outside the macro (row 201's gap, or the use site's own
declarations, row 270). A sub-language whose `⍵` is written by a rule other than
the one that binds it is therefore not expressible; the binder and every one of
its references must be written by a single template, which Q2a shows is enough.

## y05, y06 -- the two rules the focused base adds (2026-09-15)

Two more probes, against two more throw-away grammars (`Y05Syn.fsi`, `Y06Syn.fsi`,
each with its five-line stub `.fss`), for the two mechanisms `../mg/DESIGN.md`
rests on that rungs 1-6 never wrote: the **tacit trains** of Dyalog L16 and L25,
and the **folded reduction** of L19. Same command line as y01-y04.

| probe | question | verdict |
|---|---|---|
| `y05_tacit` | `l∘(+.×⍉)¨a b c` and `l∘(+.×⍨⍉)¨a b c` as one rule each, expanding to a TUPLE of products over FlatArrays | **yes**, to the last digit |
| `y06_fold` | `+/l×r` to `DOT` above `+/v` to `SUM`; and the whole glue of L13 against C4's `Corpus` | **yes** for both patterns and all ten glue entries; two mechanical traps found |

### y05 -- the tacit trains

Rules (`Y05Syn.fsi`); the left operand and the three strand elements are closed
name sets of the sub-language, never a host `Expr` gap, because the terminal that
follows the left operand is `∘`, which is Fortress's RING/CIRC/COMPOSE:

```
t5⦇ l:Y5Name ∘ ( `+ . × ⍉ ) ¨ a:Y5T SPACE b:Y5T SPACE c:Y5T ⦈
  => <[ (((l)) (transpose((a))), ((l)) (transpose((b))), ((l)) (transpose((c)))) ]>
t6⦇ l:Y5Name ∘ ( `+ . × ⍨ ⍉ ) ¨ a:Y5T SPACE b:Y5T SPACE c:Y5T ⦈
  => <[ ((transpose((a))) ((l)), (transpose((b))) ((l)), (transpose((c))) ((l))) ]>
```

`y05_tacit.out`, six macro lines beside six hand-written host lines, all equal:

```
(1) macro t5 elem 0    shape 3 x 5  [1,1] = 3.3856960348500054  sum = 10.09941473963524
(1') host X1 ⍉wq       shape 3 x 5  [1,1] = 3.3856960348500054  sum = 10.09941473963524
...
(4) macro t6 elem 0    shape 5 x 4  [1,1] = 0.9298553987114135  sum = 12.42786406270558
(4') host (⍉dQ) X1     shape 5 x 4  [1,1] = 0.9298553987114135  sum = 12.42786406270558
...
(7) macro t7 ((l))((r)) shape 3 x 5  [1,1] = 3.3856960348500054  sum = 10.09941473963524
(8) macro t8 (l) r      shape 3 x 5  [1,1] = 3.3856960348500054  sum = 10.09941473963524
(9) macro t9 via locals shape 3 x 5  [1,1] = 3.3856960348500054  sum = 10.09941473963524
```

So a derived function built from glyphs needs no function VALUE at all: one rule
writes its whole body, and the whole body is C4's own product. (7)-(9) settle the
one mechanical doubt: **two parenthesised expressions side by side,
`((X1)) (transpose((wq)))`, are the juxtaposition product** -- neither is a
function, so the host does not read it as an application. The bare and the
via-locals spellings agree with it. This is what lets every `+.×` rule of the
focused base expand to plain juxtaposition. Ran green on the first attempt, so
there is no `y05_tacit.out.N`.

### y06 -- the folded reduction, and the glue of L13

```
s6⦇ `+ / SPACE r:Y6N ⦈                          => <[ SUM (r) ]>
s8⦇ `+ / SPACE l:Y6N SPACE × SPACE r:Y6N ⦈      => <[ (l) DOT (r) ]>
```

`y06_fold.out`, part (A):

```
(1)  macro s6 +/vv        = 13.5        (1') host SUM vv          = 13.5
(2)  macro s8 +/vv×ww     = 37.625      (2') host vv DOT ww       = 37.625
```

Part (B) checks the ten glue entries of L13 against C4's own `Corpus` object
(`FlatData`) on a synthetic three-document corpus, batch `2 1`:

```
(12) max |glue - corpus| : ids 0 tg 0 vm 0.0 pos 0
(13) tally(bk) = 2 ; one plus iota 4 = 1 2 3 4
(14) outerLt row 0 = 0.0 1.0 1.0
(15) -(1.0 10)^10 = -1.0E10 ; SQRT (1.0 4) = 2.0
```

so `ravel(cols(gather(Tokm,b), iota(Blk)))` **is** `corpus.tokens(b,0)`,
`ravel(outerGt(gather(Len,b), iota(Blk)))` **is** `corpus.valid(b)` and
`cycle(tally(b) Blk, iota(Blk))` **is** `corpus.positions(b)`, exactly.  The
`opr +[\I\](s: ZZ32, a: Array[\ZZ32,I\])` overload the glue adds for `1+⍳Blk`
coexists with the library's and FlatArrays' `+`.

### The three mechanical traps y06 cost, all recorded

1. **A macro bracket must not stand bare as a juxtaposed argument.**
   `println "…" s6⦇ +/vv ⦈` does not match the rule at all: the bracket is left
   as a variable reference. `y06_fold.out.0`, the whole of it:

   ```
   /home/user/fortress/explorations/apl/probes-4b/y06_fold.fss:87:44:
       Variable s6 is not defined.
   /home/user/fortress/explorations/apl/probes-4b/y06_fold.fss:89:44:
       Variable s8 is not defined.
   ```

   Parenthesising the use -- `println "…" (s6⦇ +/vv ⦈)` -- fixes every one of
   them. The base never meets this because its blocks stand on the right-hand
   side of a binding. Everything the probe tried before finding this (the two
   rules inside one nonterminal, inside one bracket name, in both orders, with
   and without a preceding glyph rule, with the escape first or last in the
   nonterminal) failed with this same message or with a Syntax Error, and was
   diagnosed as a grammar fault; it was not.

2. **Everything that looked like a glyph restriction was trap 1.** While the
   uses were bare, `+/⍟vv` and `+/vv×⍟ww` both died with a Syntax Error AT the
   `⍟`, and four grammar shapes were tried to move it. With the uses
   parenthesised the same rules parse both, and
   `(s8⦇ +/vv×⍟ww ⦈)` equals `vv DOT log(ww)` to the last digit (line (3) of
   `y06_fold.out`). So no glyph position is restricted, and the folded rule of
   L19 may be written as `` `+ / SPACE l:AplAtom SPACE × SPACE r:AplE `` with the
   `⍟` left to `AplE`, which is what `../mg/AplMgSyntax.fsi` does.

3. **Rule order settles nothing at the bracket level.** The two reduction rules
   were first written as two alternatives of ONE bracket name, the shorter above
   the longer; `+/vv×ww` still reached the longer one, because the closing `⦈`
   is part of each alternative and the parser backtracks over it. Order decides
   only inside an ordinary nonterminal, where PEG commits to the first
   alternative that succeeds and the caller cannot ask for another parse. That
   is where the focused base puts the pair (`AplE`), as the ladder's base does.

Both probes are cheap: y05 7.5 s, y06 about 10 s, each dominated by parser
generation.
