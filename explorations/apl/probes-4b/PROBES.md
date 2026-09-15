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
