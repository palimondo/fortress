<!-- The microgpt rung's probes: the seven questions DESIGN.md's worker section
     (a)-(g) leaves open, asked before the base was touched wherever that was
     possible.  Walk interpreter, JDK 25, FORTRESS_THREADS=1, source path
     `.` + ../../base + ../../../run-c4/src + LibraryBuiltin + Library +
     test_library (rung-6/REPORT.md "How to run", with run-c4/src added for
     FlatArrays).  Four probes, x01-x04; every .out is the recorded run, every
     .out.N a recorded failed attempt.  Nothing outside explorations/apl/ was
     touched and nothing was built. -->

# The microgpt rung's probes

Four files carry the seven questions, batched as the rungs batch theirs,
because a probe that imports the grammar pays about 10-20 s of parser
generation and a library-only probe about 10 s.

| probe | questions | what it needs |
|---|---|---|
| `x01_names` (+ `X01Syn.fsi`, `X01Syn.fss`) | (a), and (b) rehearsed | a throw-away grammar; the base untouched |
| `x02_host` | (f), (g) | the base as rung 6 left it, plus `run-c4/src` |
| `x03_lib` | (c), (d), (e) as library calls | the three library additions |
| `x04_gram` | (b), (c), (d), (e) as APL text | the four grammar additions and the name lines |

## The seven answers in one line each

- **(a) names.** A digit after a capital needs nothing: `B1 B2 Lr0 M0 X1` parse,
  resolve to host bindings, and bind through the `←` rule's `Id` gap. An
  underscore also works, but the character class must be written `` [`_] `` --
  a bare `[_]` is a Syntax Error in the grammar api. **No fallback is needed:
  the base gets `B1 B2 Lr0 M0 X1 …` and `rmsn_b sm_b`, not `Bt1 Bt2 rmsnb smb`.**
- **(b) `N⍴⍳Blk`.** One new rule, `n:AplName SPACE ⍴ SPACE r:AplE` to
  `aplReshapeV`, and it fires: `N⍴⍳Blk` with `N=6 Blk=4` is `0 1 2 3 0 1`. The
  numeral rules below it are unchanged.
- **(c) `¨` over `⍳9` with unequal cells.** Yes, once `aplEach` over a vector
  assembles MATRIX cells into a tuple instead of refusing them; the nine cells
  destructure into nine names and keep their nine different shapes.
- **(d) `⊃,/,¨`.** Yes, as one direct rule to `aplFlatten`, at arity nine, three
  and two; the nine-element result is identical to the hand-built catenation.
- **(e) `A(sm_b⍤1)dH` over two rank-3 arrays.** Yes, one new `aplRankD1`
  member; each row of each plane matches the same `sm_b` applied to that row
  pair by hand.
- **(f) the host adapter.** Yes, unchanged base: `h = fn (): Any =>
  heads(aplOmega(), …)` called as `h¨Q K Vv` dispatches from `aplOmega()`'s
  `Any` onto C4's `heads[\nat br, nat bc\](Matrix[\RR64,br,bc\], …)` and gives
  the same four planes as the host call.
- **(g) a block as a tuple-returning body.** Yes, unchanged base, both bare
  (`f(): (RR64, Array[\RR64,ZZ32\]) = apl⦇ … ⋄ Q K ⦈`) and inside a `do … end`
  with host statements above it; a host parameter and a host local are read
  from the block under their own spelling.

## x01 -- the two contested name spellings

**Question.** DESIGN.md's name lists contain two shapes the three closed name
sets have never held: a digit after a CAPITAL letter (`B1`, `B2`, `Lr0`, `M0`,
`X1`, `X2`, `X3`, `X4`) and an UNDERSCORE (`rmsn_b`, `sm_b`). Gap row 78 bars a
word of two or more capitals; one capital is fine and `m1` shows a digit after a
LOWERCASE letter is fine, but neither shape here had been asked. Gap row 69
says a bare `_` is not accepted by an `Id` gap. If either fails the design's
fallbacks are `Bt1 Bt2` and `rmsnb smb`.

The probe is a throw-away grammar (`X01Syn.fsi`, in the shape of
`base/AplSyntax.fsi` but with only a binding, a reshape, `⍳`, `×`, `+` and a
ten-name closed set) so that the base is not touched before the question is
answered. Each name is read in all three positions the program needs: as a free
host name, through the binding's `Id` gap, and as the left argument of `⍴`.

**Answer.** Both spellings work (`x01_names.out`): `B1 = 0.85`, `Lr0 = 0.01`,
`B1×B2 = 0.8415`, `X1 ← 3 ⋄ X1+1 = 4`, `M0 ← 5 ⋄ X1 ← 2 ⋄ M0×X1 = 10`,
`rmsn_b = 7`, `sm_b = 8`, `rmsn_b+sm_b = 15`, `Epsa = 1.0E-8`. The base takes
the design's own spellings; neither fallback is used.

**One thing had to change to get there.** `_` inside a character class needs
the backtick escape. `[_]#` is a Syntax Error at the character itself
(`x01_names.out.0`):

```
/home/user/fortress/explorations/apl/microgpt/probes/X01Syn.fsi:54:30:
    Syntax Error
```

`` [`_]# `` parses and matches. `_` is one of the macro language's SpecialChars
(gap row 77 lists them), and gap row 77's "the complement of that list" now
gains the detail that the escape is needed inside a class and not only as a
bare item. An APL glyph stands above the escape, as gap row 3 requires.

**A second thing the probe pins, for free.** `rmsn_b` must stand ABOVE `rmsn`
in `AplFnName`, and `sm_b` above `sm`. `_` is not in `[A:Za:z0:9]`, so the
`NOT [A:Za:z0:9]` terminator SUCCEEDS after the `rmsn` of `rmsn_b`: the shorter
name would match and leave `_b` behind. This is the one place in the three sets
where "longer names first" is load-bearing rather than tidy -- for every other
pair the NOT predicate decides.

**(b) rehearsed here.** The same grammar carries `n:XName SPACE ⍴ SPACE r:XExp`
above the numeral rule, and `N⍴⍳Blk` is `0 1 2 3 0 1`, `Blk⍴1 2` is `1 2 1 2`,
`3⍴⍳Blk` still `0 1 2`. The rule went into the base on that evidence and x04
re-asks it there.

## x02 -- the host adapter and the tuple-returning body

**Question.** Two shapes of the component that need no base change, asked
against the base exactly as rung 6 left it.

(f) Rank 4 is outside the sub-language, so the program's
`h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵}` becomes C4's `heads` behind an adapter with the
dfn calling shape: a zero-parameter lambda that reads `⍵` off the frame stack.
`aplOmega()` is declared `Any`; `heads[\nat br, nat bc\]` wants a
`Matrix[\RR64,br,bc\]` with two nats to infer. Does the dynamic dispatch reach
it, and is `h¨Q K Vv` then rung 5's `aplEachT3` unchanged?

(g) `step` and `adam` are declared with C4's tuple result types and their bodies
are APL blocks whose last statement is a name strand. Does a block's tuple meet
a declared `(RR64, Array[\RR64,ZZ32\])`, bare and inside a `do … end`, and is a
host parameter readable from the block?

**Answer.** Both, with nothing added (`x02_host.out`).

```
(f) a host adapter in the dfn calling shape
  ⍴h⍎(m)  where m is 8x6 = 4 4 3
  ⍴Qh after Qh Kh Vh←h¨Q K Vv = 4 4 3
```

and the four planes `h¨Q K Vv` produces are element for element the four planes
of the host call `heads(m, 4, 2, 3)`, printed beside them in the same output.
So the adapter is a legal APL function value, `⍎( … )` carries a host matrix in,
and `aplEachT3` passes the three elements one by one without knowing their type.

```
(g) a block as the body of a function with a tuple result type
  bare(): loss = 1.5          bare(): vector = 0 1 2
  inDo(⍳4): loss = 6          inDo(⍳4): vector = 0 2 4 6
```

`inDo` reads its parameter `b` and a host local `q` from inside the block, both
under their own spelling, which is the whole interface the component relies on.

**Two false starts, both mine and both worth writing down** (`x02_host.out.0`,
one run carrying both):

- `wrapped` is a Fortress KEYWORD (a modifier: `Keyword.rats:48`,
  `NoNewlineHeader.rats:250`). A function declared `wrapped(b: RR64): RR64 = b`
  is a Syntax Error at the closing parenthesis of its parameter list, with or
  without any grammar imported. The probe's function is `inDo`.
- A host local read from a block must be in `AplName` like any other name: the
  first version's `two` is not, and the block does not parse. It is now `q`.

The reported position in both cases is the declaration header, not the offending
token -- the furthest-failure position again (gap row 69's note).

## x03 -- the three library additions, called directly

**Question.** Do the three new library entries behave, before any grammar rule
reaches them? `aplEach` over a vector whose cells are matrices of unequal shape;
`aplFlatten` over a tuple of arity nine, three and two against a hand-built
flat vector; `aplRankD1` over two rank-3 arrays against the per-row values.

**Answer.** All three (`x03_lib.out`):

```
(c) aplEach over a vector with cells of unequal shape
  nine shapes, through a lambda of nine parameters = 1 9 2 8 3 7 4 6 5 5 6 4 7 3 8 2 9 1
  nine first elements (100i is the cell's own tag) = 0 100 200 300 400 500 600 700 800
  arity 3, shapes = 1 9 2 8 3 7
  arity 2, shapes = 1 9 2 8
  scalar cells still assemble: sq¨⍳5 = 0 1 4 9 16
  a VECTOR cell result is still APL's nested array ({⍳⍵}¨1 2 3, rung 5's Y20) = CallerViolation
(d) aplFlatten over a strand
  aplFlatten(m0, m1) = 0 1 2 3 4 5 10 11
  aplFlatten(m0, m1, m2) = 0 1 2 3 4 5 10 11 0 1 2
  hand-built = 0 1 2 3 4 5 10 11 0 1 2
  aplFlatten over the nine views: length = 165      hand-computed length = 165
(e) aplRankD1 over two rank-3 arrays
  ⍴(x(+⍤1)y) = 2 3 4    and x(+⍤1)y is element for element 2×x
  x({(+/⍺)+(+/⍵)}⍤1)y  -- a lower-rank cell result =  12  44  76 / 108 140 172
```

**The one design decision the probe forced.** DESIGN.md says the tuple road is
for cells that are "matrices ... of unequal shape". Written the obvious way --
any non-scalar cell becomes a tuple -- it breaks rung 5's `Y20`, which checks
that `{⍳⍵}¨1 2 3` is a catchable `CallerViolation` because a VECTOR cell result
is APL's nested array and this base has no carrier for one. So the test is
`aplAllMat`, not "not scalar": matrix cells become a tuple, every other
non-scalar cell result still reaches `aplAsmV`'s contract. The design's wording
is exactly right and the obvious reading of it is not; `Y20` is the evidence
(the two states are `rung-5/Rung5.out` before and after). `aplIsMat` is an
overload pair -- `(x: Any)` false, `(m: Matrix[\RR64,r,c\])` true -- because
typecase cannot spell `Matrix[\RR64,r,c\]` without its nats, which is the same
read-the-rank-by-overload idiom as `aplSig` and gap row 75.

**A tuple is not an `Object`, and the walk interpreter does not care.** The spec
says every tuple type is a subtype of `Any` and that no other type encompasses
all tuple types (`types-vals-vars.tex:263-264`), so `aplEach`'s declared
`Object` result is a lie about the tuple case. The interpreter accepts it, and a
lambda of nine parameters applied to the `Object`-typed result destructures it.
This is what keeps `aplEach` out of gap row 67: an `Any` RESULT would kill the
family's dispatch, and there is no third choice.

**Two false starts** (`x03_lib.out.0`, `x03_lib.out.1`), both in `aplJoin` and
both about the host, not about APL:

- `at` is a Fortress keyword; `at: ZZ32 := 0` is `AplCore.fss:1819:16: Syntax
  Error`. The offset variable is `off`.
- Chained indexing `rs[k][j]` on an `Array[\Array[\RR64,ZZ32\],ZZ32\]` is
  `Failed to find any matching overload, args = ()` at `AplCore.fss:1823:50-55`
  -- the second subscript is not applied to the first subscript's result. The
  fix is one local, `rk = rs[k]`, then `rk[j]`.

## x04 -- the four grammar additions

**Question.** One line per new production, against the extended
`base/AplSyntax.fsi`: the name reshape; `¨` over `⍳9` destructured into nine
names; `⊃,/,¨` at arity nine, three and two; dyadic `⍤1` over two rank-3
arrays. Plus the rules the additions stand next to, re-asked beside them.

**Answer.** All of them fire (`x04_gram.out`):

```
(b)  N⍴⍳Blk = 0 1 2 3 0 1        Blk⍴1 2 = 1 2 1 2
     3⍴⍳Blk = 0 1 2              2 3⍴⍳6 = 0 1 2 / 3 4 5      (the numeral rules unchanged)
(c)  wte wpe lm wq wk wv wo f1 f2←vw¨⍳9 ⋄ (⍴wte),(⍴lm),⍴f2 = 1 9 3 7 9 1
     … ⋄ (⊃wte),(⊃wpe),…,⊃f2     = 0 100 200 300 400 500 600 700 800
     ⍴¨Q K Vv                    = 2 3 / 3 2 / 1 4            (rung 5's strand each unchanged)
(d)  ⊃,/,¨ over nine  = 0 1 2 3 4 5 9 8 0 1 2 1 1 1 1 0 1 7 0 5 6 0 1 2 3
     the same, hand-built = the same 25 numbers
     ⊃,/,¨ over three = 0 1 2 3 4 5 9 8 0 1 2      over two = 0 1 2 3 4 5 9 8
     ⊃,2 3⍴⍳6 = 0                                  (⊃ and , alone still read as themselves)
(e)  ⍴(A(sm_b⍤1)dH) = 2 3 4
     row 0 of plane 0 = 0 ¯18 ¯34 ¯48        and 0 1 2 3(sm_b⍤1)1 2 3 4 = 0 ¯18 ¯34 ¯48
     row 1 of plane 1 = ¯20528 ¯21794 ¯23058 ¯24320
                        and 16 17 18 19(sm_b⍤1)17 18 19 20 = the same four
     the (M,M) member unchanged, with a plain and a parenthesised left argument
```

`sm_b` in this probe is the program's own `sm_b = apl⦇ {⍺×⍵-+/⍺×⍵} ⦈` (L8),
written as the component will write it, so (e) also checks that an APL dfn bound
in host code is a legal operand of `⍤1`.

**Nine uses of the expander in one expression do not parse.** The first two
runs (`x04_gram.out.0`, `x04_gram.out.1`) died at the file's last line with

```
Error occurred while instantiating and executing a temporary parser:
 (x04_gram.fss:67:6: Syntax Error)
```

which is the furthest-failure position and not the offending one. The offender
was the hand-built comparison vector: `aplCat(aplRavel(apl⦇ … ⦈), aplCat(…))`
with NINE `apl⦇ … ⦈` uses in one expression. Eight parse, nine do not,
measured by bisection; every piece of it parses on its own, and the depth of the
`aplCat` nesting alone is not the trigger (six nested calls with six blocks
parse). The probe binds the nine pieces to nine locals instead. Worth knowing
before writing the component: keep the number of `apl⦇ … ⦈` uses in one
expression below nine.

Two things the same two runs did NOT establish, though the first attempt blamed
them: a parenthesised left argument of `(f⍤1)` is fine (`(2 4⍴⍳8)(sm_b⍤1)1+2
4⍴⍳8` is in the recorded output), and so is a nine-name destructuring beside
everything else in one file.

## What went into the base

Grammar, `../../base/AplSyntax.fsi` (899 lines, was 752):

| lines | what |
|---|---|
| 120-132 | nine-name destructuring, three spellings, above the three-name rule |
| 214-219 | `n:AplName SPACE ⍴ SPACE r:AplE` to `aplReshapeV`, above the numeral reshapes |
| 277-286 | `⊃ , / , ¨ SPACE t:AplTuple` to `aplFlatten`, above the `¨` rules |
| 691-693 | the nine-name `AplTuple` alternative, above the three-name one |
| 610-620 | `AplFnName` + 5: `rmsn_b sm_b rmsn sm vw` (the `_` names first) |
| 700-731 | `AplTName` + 26 |
| 751-822 | `AplName` + 65 |

Library, `../../base/AplCore.fsi` (850 lines, was 830) and `AplCore.fss`
(2343 lines, was 2243):

| lines | what |
|---|---|
| `.fsi` 621-624, `.fss` 1591-1611 | `aplRankD1` over two `Array3` |
| `.fsi` 654-661, `.fss` 1703-1731 | `aplIsMat`, `aplAllMat`, `aplTup` |
| `.fss` 1734-1746 | `aplEach` over a vector: matrix cells become a tuple |
| `.fsi` 680-686, `.fss` 1827-1868 | `aplJoin` and `aplFlatten` at arity 2, 3, 9 |

`AplName` gains 65 of the design's 67 spellings: `Blk` and `B` were already
there (rungs 5 and 6). The three sets stay as the base has them -- `AplFnName`
disjoint from `AplName`, `AplTName` a subset of `AplName` -- and every new
spelling was grepped against the existing lines first.

## Rungs 1-6 after the additions

Re-run from their own directories, source path `.` + `../base` + the three
shipped library directories:

| rung | chapter checks | beyond-chapter checks |
|---|---|---|
| 1 | 26 of 26 | 18 of 18 |
| 2 | 25 of 25 | 21 of 21 |
| 3 | 43 of 43 | 31 of 31 |
| 4 | 18 of 18 | 31 of 31 |
| 5 | 23 of 23 | 21 of 21 |
| 6 | 16 of 16 | 17 of 17 |

Every output is identical to the committed `RungN.out` apart from the Rats!
parser-generator banner a cold cache prints, so no `RungN.rerun.out` was kept.
One rung did break on the way and was fixed in the library, not in the rung:
rung 5's `Y20`, above.

## Where DESIGN.md was wrong, or silent

- **"the result is a tuple ... when the cells are matrices"** is exactly right
  and must be read exactly: any wider reading (any non-scalar cell) turns rung
  5's `Y20` from a catchable `CallerViolation` into an uncatchable
  `ProgramError`. The library tests `aplAllMat`.
- **"The result type stays `Object`, as every general form's is (row 67)"** is
  what the base does, but it is not type-correct: a tuple type is a subtype of
  `Any` and of nothing else (`types-vals-vars.tex:263-264`). The walk
  interpreter accepts the lie in both directions -- returning a tuple where
  `Object` is declared, and destructuring an `Object`-typed tuple with a lambda
  -- and there is no alternative, because an `Any` result kills the family's
  dispatch (row 67).
- **"the (Array3, Array3) overload of aplRankD1 beside its (M,M) one"**: it is
  at the END of the `aplRankD1` family instead, after the `(s,A3)` member, so
  that the family still reads in order of increasing right-argument rank. The
  contract is `aplD0` and `aplD1` agreeing, which is the (M,M) member's
  `aplRowsOf` one axis up.
- **The design does not mention that `¨`'s tuple case needs an arity list.**
  `aplTup` is declared over arity 2, 3 and 9 and its contract refuses every
  other length -- catchably, which is the behaviour a nested each had before.
- **Two host names in the design's own text are unusable as written:** anything
  named `wrapped` is a Fortress keyword, and a host local read from a block must
  itself be in `AplName`. Neither changes the design; both change the component.
- **Nine `apl⦇ … ⦈` uses in one expression do not parse.** The design's
  component will write long lines; this is the ceiling.
