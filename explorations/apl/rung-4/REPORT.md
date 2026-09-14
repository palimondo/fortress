# Rung 4 — "Direct functions and operators", on the native-array base

Chapter: https://xpqz.github.io/learnapl/functions.html · goldens:
`../goldens/ch4-functions.md` (29 examples, the book's printed output verbatim,
index origin 0) · design: `DESIGN.md` · probes: `PROBES.md` (u01–u21) · library
and grammar: `../base/` (`AplCore`, `AplSyntax`) · walk interpreter, JDK 25,
`FORTRESS_THREADS=1`, nothing outside `explorations/apl/` touched, nothing built.

## Verdict

- **18 of 18 checks pass, over 14 of the chapter's 29 examples. Nothing fails.**
  `Rung4.out`: `checks passed: 18 of 18, over 14 of the chapter's 29 examples`.
  The 14 are Ex 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 23. Three of them
  print more than one result, which is why there are 18 checks.
- **31 of 31 beyond-chapter checks pass** (`X1`–`X31`): the rank-3 carrier and
  its display (`X1`–`X9`), `,⍤2` and `⍉⍤2` (`X10`, `X11`), the program's own
  reshape–permute–reshape round trip (`X12`), the rank operator over a matrix in
  both result ranks and both spellings (`X13`, `X14`), the dyadic rank operator
  with a vector, a dfn and a matrix left argument (`X15`–`X17`), `0∘⌈`
  (`X18`), `softmax` (`X19`), `rmsnorm⍤1` (`X20`), `∇` with a default `⍺`
  (`X21`), a guard chain (`X22`), a dfn inside a dfn with its own `⍵` (`X23`),
  the three chapter dfns that the book defines but never applies (`X24`–`X26`),
  `⊢ ⊣` (`X27`), and APL's VALUE ERROR, LENGTH ERROR and the unsupported axis
  permutation as contract violations (`X28`–`X30`), plus a named dfn as the
  operand of `⍤` (`X31`).
- **15 examples are out of scope**, each a `SKIP` line with its reason: Ex 1
  (`⎕IO`, `]box`, `]rows`), Ex 2 (characters and `⎕signal`), Ex 14 (two names
  the book never defines — here a static failure, gap row 70), Ex 17–22 (a local
  that re-binds an enclosing name, and modified and set assignment `+← ⊢←`, all
  row 29), Ex 24 (`⎕ ←` and Ex 2's `assert`; the matrix it prints is checked as
  `X26`), Ex 25 (n-wise reduction), Ex 26 (tacit), Ex 27–29 (direct operators
  `⍺⍺` and `⊂`).
- **Rungs 1, 2 and 3 still pass on the extended base**, re-run after the library
  additions and again after the grammar additions: `../rung-1/Rung1.out` 26 of 26
  and 18 of 18, `../rung-2/Rung2.out` 25 of 25 and 21 of 21, `../rung-3/Rung3.out`
  43 of 43 and 31 of 31, all unchanged.
- **The rung's mechanism is the frame stack.** Every APL function value —
  dfn, named function, glyph — is a zero-parameter lambda, and `⍺ ⍵ ∇` are reads
  of the top frame of a stack the caller pushes. It is the only shape that
  survives nesting, because the host refuses every nested re-declaration of a
  name (u01–u03). It costs **3.5×** a direct `+` on two scalars and **nothing
  measurable** on 100-element vectors (`u21_cost.out`), which is the case the
  microGPT program is made of.
- **The rung's one blocked road was a result type.** An overloaded function
  whose declared result is `Any` does not dispatch at all — not across an api,
  not within a component (gap row 67, u13–u16). The rank operator, whose result
  rank is a run-time fact, is declared `: Object` instead.

## How to run

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-4 && $FORTRESS_HOME/bin/fortress Rung4.fss
```

A component that uses the expander regenerates two Rats! parsers (25–40 s); a
library-only probe costs 15 s, which is why u10–u16 ask every library question
before u17 and u18 ask the grammar's.

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

87 new declarations, 515 new lines, in four blocks.

- **The frame stack.** `AplNoAlpha`, `AplFrames` (three parallel `Array[\Any\]`
  and a depth), `aplCall`, `aplCall1`, `aplAlpha` (with `requires
  { aplHasAlpha() }`, which is APL's VALUE ERROR), `aplOmega`, `aplSelf`,
  `aplHasAlpha`, `aplDefaultAlpha`, `aplDepth`, `aplTruthy`, `aplBindLeft`,
  `aplPickAt`. `aplTruthy` is one function over `Any` with a `typecase`, not an
  overload family: a guard's condition is APL's 0/1 from an array comparison but
  the host's `Boolean` from a scalar one (row 41), and `Boolean` and `RR64` are
  not a declared excluding pair.
- **Rank 3.** `aplArr3`, `aplD0`/`aplD1`/`aplD2`, the three view objects
  `AplPlane` (a plane as a real `Matrix`), `AplRow3` (a row as a `Vector`) and
  `AplPerm102` (the `1 0 2` axis order), `aplShow`, `≢`, `⊃`, `aplShapeOf`,
  `aplRavel`, `aplReshape3` from all four ranks, `aplReshapeM` and `aplReshapeV`
  from rank 3, `aplPerm`, the three zips `aplZipT`/`aplZipST`/`aplZipTS`, and
  through them `× ÷ + - * MAX MIN = ≠ < ≤ > ≥` in the three shapes each, plus
  monadic `*`, `÷` and `aplLog`.
- **The rank operator.** `aplRank1`/`aplRank2` monadic, `aplRankD1`/`aplRankD2`
  dyadic, over a vector, a matrix and a rank-3 array; the assemblers
  `aplAsm1From`/`aplAsm2From` overloaded on the FIRST cell's result, with
  `requires { aplSameSig(rs) }` for APL's LENGTH ERROR; the typed readers
  `aplScalOf`, `aplNth`, `aplNth2`, `aplSig`.
- **One line for `opr ×(RR64, RR64)`**, which the shipped library does not have
  in any arity (row 76).

## What the grammar needed (`../base/AplSyntax.fsi`)

69 new alternatives, 141 → 210.

- **`AplStm`** gains three groups above the binding rule: a line that is only a
  comment; `⍺ ← e` in its three separator spellings; and the guard `c: e` in
  its three, whose else branch is the rest of the body. It also gains a last
  statement that carries a trailing comment, which the top-level expander rule
  caught for a whole block but which had no production inside braces.
- **`AplDy` is rewritten**: its 32 alternatives are now zero-parameter lambdas
  over the frame stack (`fn (): Any => aplAlpha() × aplOmega()`), and `⍨` calls
  them through `aplCall`. **`AplMo`** is the same table for 24 monadic glyphs.
  A glyph used directly still expands to the host operator itself.
- **`AplDfn`** (`` `{ SPACE b:AplStm SPACE `} ``), **`AplFnName`** (a second
  closed name set, disjoint from `AplName`), and the three operand nonterminals:
  `AplUser` (a dfn or a name) for the two CALL rules, `AplFnD` and `AplFnM`
  (those plus the glyph tables) for the operators.
- **`AplE`** gains the three-atom and three-numeral `⍴`, the three-numeral `⍉`,
  eight `⍤` rules (both valences × both spellings × ranks 1 and 2), `∘`, `∇` in
  both valences, the two call rules, `⊢ ⊣`, dyadic `⊃`, and a bare dfn as a
  value. **`AplBase`** gains `⍺` and `⍵`.
- `⊢` and `⊣` are terminals only, with no declaration on either side: the
  design's open question ("`⊢` is in the host operator table as RIGHT TACK?
  Check") does not have to be answered, because a translation rule needs no
  declaration and both glyphs expand to one of their two arguments.
- The call rules read `AplUser`, **not** `AplFnD`. Had they read the glyph
  tables, they would stand above every plain dyadic and monadic glyph rule and
  shadow all of them, and rungs 1–3 would pay a closure and a frame push per
  primitive.

## Errors met, verbatim

- The rank operator, three times over (`u11_lib.out.0`, `.out.1`, `.out.2`,
  `u13_rank.out.0`, `u15_any.out.0`, `u16_res.out.0`):
  `Failed to find any matching overload, args = (FnExpr … ()->Any …,
  __DefaultMatrix[\RR64,3,4\]), overload = { aplRank1(f:Any,x:FortressLibrary.RR64):Any … }`
  — the cause is `Any` as the RESULT type (row 67), not the parameter, not the
  api boundary, not the size of the family.
- `Failed to find any matching overload … aplTstC[\nat s\](f:FortressBuiltin.Object,…)`
  (`u14_api.out.0`): a function value is not an `Object`, so the parameter stays
  an arrow type.
- `u17_gram.fss:61:39: Syntax Error` (`u17_gram.out.3`): a dfn bound on one line
  and applied on the next (row 68).
- `u19_break.fss:31:24: Syntax Error` (`u19_break.out.0`) and
  `Rung4.fss:117:47: Syntax Error` (`Rung4.out.0`): a dfn body line separated by
  a bare line break above a line that begins with a numeral (row 68).
- `u18_gram.fss:27:34: Syntax Error` (`u18_gram.out.1`): `_ ← …` (row 69).
- `AplSyntax.fsi:1:2: Variable g is not defined.` (`u20_free.out.0`): an unbound
  function name, reported against the grammar api (row 70).
- `Rung4.fss:87:43-46: Variable total is already declared.` — the APL name
  `total` of Ex 5 against the host counter of the same name in `run()`. The
  counters were renamed; it is u01's rule reaching from the sub-language into
  the component that hosts it.

## Where `DESIGN.md` was wrong

- **The rank operator cannot return `Any`.** The design's assemble-by-result
  plan is right and works, but every function in the family had to be declared
  `: Object` (gap row 67). The function operand had to become `()->Any` rather
  than `Any` as well, although that alone was not enough.
- **The dyadic rank operators carry their own names**, `aplRankD1` and
  `aplRankD2`, rather than joining `aplRank1`/`aplRank2`. A mixed-arity family
  is not in fact broken (`u12_disp.out` (e), (f)); the split was made during the
  hunt and kept, because the grammar knows the valence at expansion anyway.
- **`AplPlane` fixes the FIRST index, not u08's last.** APL's rank-2 cells of a
  rank-3 array are the planes along the leading axis; u08's probe view fixed the
  trailing one. The six lines are otherwise u08's.
- **The call rules read a restricted operand** (`AplUser`), not `AplFnD`, for
  the reason given above. The design's placement "above the plain dyadic glyph
  rules" is kept.
- **`1 0 2⍉t` is `aplPerm(a, b, c, t)` with a contract**, not `aplPerm102(t)`:
  the three numerals reach the library, so every other permutation is a
  catchable `CallerViolation` (`X30`) instead of a Syntax Error.
- **Ex 15 is in scope, Ex 14 is not.** The design's out-list says "Ex 15 defines
  a function over undefined names and prints nothing"; the example with the
  undefined names is Ex 14, and it is out for a sharper reason (row 70). Ex 15
  runs, with the same adaptation Ex 16 needs.
- **The chapter's `_ ← …` is not available** (row 69); Ex 23 writes `x ←`.
- **A dfn whose body ends with a binding has no production**, so Ex 15's and
  Ex 16's bodies get the bound name appended as a last statement. The design did
  not anticipate this; it is rung 2's rule that a binding needs a rest, reaching
  inside the braces.

## Departures from APL that remain

- `⍺⍺ ⍵⍵ ∇∇`: a direct operator takes its operands as names, and a name in a
  template is a free Fortress identifier (row 70). Rung 5 or 6.
- Only `⍤1` and `⍤2` exist: the rank is a terminal of the grammar, not a value.
- A reduction is not a member of the glyph tables, so `+/⍤1⊢m` has no parse; the
  dfn `{+/⍵}⍤1⊢m` does (`X13`).
- Every axis permutation but `1 0 2` is a contract violation, and monadic `⍉`
  on a rank-3 array has no rule at all.
- A dfn body line is separated by `⋄` or by the book's own trailing comment
  wherever the next line could continue it (row 68).
- One frame stack in one mutable object: `FORTRESS_THREADS=1` is assumed.
- In APL the first bare expression ends a dfn; here a non-final bare expression
  is evaluated for effect and the body continues. The chapter's bodies all end
  with their result, so nothing in the rung depends on the difference.

## New gap rows

Rows 67–76 of `../gaps.md`: the `Any` result type (67), the line-break trap
widened to dfn calls (68), `_` in an `Id` gap (69), an unbound name in a
template (70), a line break inside a production (71), the frame stack and its
measured cost (72), rank 3 in the dispatch family (73), `array3(f)`'s arity
(74), assemble-by-first-result (75), and the missing `opr ×` (76).

## Probes

`PROBES.md` carries one section per probe, u01–u21, each with its question, its
answer, and the verbatim text of every failure. u01–u09 settled the design;
u10–u16 settled the library (and cost the rung its longest hunt, the `Any`
result type); u17–u19 settled the grammar; u20 settled Ex 14; u21 priced a dfn
call.
