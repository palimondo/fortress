# Rung 5 — "Iteration", on the native-array base

Chapter: https://xpqz.github.io/learnapl/iteration.html · goldens:
`../goldens/ch5-iteration.md` (40 examples, the book's printed output verbatim,
index origin 0) · design: `DESIGN.md` · probes: `PROBES.md` (v01–v07) · library
and grammar: `../base/` (`AplCore`, `AplSyntax`) · walk interpreter, JDK 25,
`FORTRESS_THREADS=1`, nothing outside `explorations/apl/` touched, nothing built.

## Verdict

- **23 of 23 checks pass, over 14 of the chapter's 40 examples. Nothing fails.**
  `Rung5.out`: `checks passed: 23 of 23, over 14 of the chapter's 40 examples`.
  The 14 are Ex 2, 3, 5, 6, 7, 8, 10, 13, 14, 15, 17, 19, 21, 22. Ex 13 prints
  two results and Ex 14 nine, which is why there are 23 checks.
- **21 of 21 beyond-chapter checks pass** (`Y1`–`Y21`): the values Ex 18 and
  Ex 20 print, without `⎕ ←` and `assert` (`Y1`–`Y3`); each over a **strand** of
  three matrices and the destructuring binding that takes one apart
  (`Y4`–`Y7`); power with a count read from a name, in both spellings, and with
  a dfn stop condition (`Y8`–`Y10`); the five direct scans on both axes
  (`Y11`–`Y14`); a dfn as the operand of `/`, `⌿` and `\` (`Y15`, `Y16`);
  dyadic `¨` with scalar extension and with pairing (`Y17`); each over a matrix
  (`Y18`); `-⌿` (`Y19`); and the two contract violations — a nested each result
  and an empty general reduction (`Y20`, `Y21`).
- **26 examples are out of scope**, each a `SKIP` line with its reason: Ex 1
  (`⎕IO`, `]box`, `]rows`, a character vector), Ex 4, 38, 39, 40 (nested
  arrays), Ex 9, 24, 35 (dyadic `?`, random), Ex 11 (bracket axis), Ex 12
  (n-wise reduction), Ex 16 (`⍞` and `?`), Ex 18, 20 (`⎕ ←`, a second binding
  target, and Ex 1's `assert` — their values are `Y1`–`Y3`), Ex 23, 25, 26
  (direct operators `⍺⍺ ⍵⍵`, a tacit fork), Ex 27, 29 (set assignment `⊢←`,
  row 29), Ex 28, 30, 31 (characters, `⎕NGET`), Ex 32–34, 36, 37 (`⎕CY`, `cmpx`,
  tacit).
- **Rungs 1, 2, 3 and 4 still pass on the extended base**, re-run after the
  library additions and again after the grammar additions: `../rung-1/Rung1.out`
  26 of 26 and 18 of 18, `../rung-2/Rung2.out` 25 of 25 and 21 of 21,
  `../rung-3/Rung3.out` 43 of 43 and 31 of 31, `../rung-4/Rung4.out` 18 of 18
  and 31 of 31, all unchanged.
- **The rung's mechanism is the tuple.** APL's strand of arrays, `wq wk wv`, is
  a Fortress tuple, and `Q K Vv ← e` is a lambda of three parameters applied to
  one tuple-valued expression. No nested APL array is built, and the grammar
  reads the length of the strand off the source exactly as it reads the rank of
  a reshape (row 47). The cost is a **third closed name set** — see below.
- **The rung's one blocked road was the strand over ordinary names.** The
  design's `AplTuple` reads `AplName`; over every APL name it breaks rung 3 and
  rung 4, because a line break does not separate two names (row 68 again).

## How to run

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:\
$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:\
$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-5 && $FORTRESS_HOME/bin/fortress Rung5.fss
```

If the caches have just been wiped, **run it twice**: on a cold cache the first
component that imports `AplCore` directly fails a static overload-conflict check
and the second run of the same file succeeds (v04, gap row 82).

## What the library needed (`../base/AplCore.fsi`, `AplCore.fss`)

72 new declarations, 351 new lines, in five blocks.

- **Each `¨`.** `aplEach` monadic over rank 0, 1 and 2 and dyadic over the five
  array shapes with APL's scalar extension; `aplEachT2` / `aplEachT3` over a
  name strand; `aplShowT` for a two- or three-tuple. The assemblers `aplAsmV`
  and `aplAsmM` carry `requires { aplAllScalar(rs) }`: a cell result that is not
  a scalar would be APL's **nested** array, which this base has no carrier for,
  so it is a contract violation that names itself rather than a wrong answer.
- **`⍨` as a function value.** `aplCommute` (`⍵ f ⍵`), `aplCommuteD` (the
  dyadic swap) and `aplBindRight` (`a f⍨` binds the **right** argument), which
  is the only reading under which the book's `2÷⍨⍣=10` parses.
- **A general `f/ f⌿ f\ f⍀`.** `aplFoldLast` / `aplFoldFirst` and `aplScanLast`
  / `aplScanFirst`, right-to-left through `aplCall`, over rank 0, 1 and 2. An
  empty argument has no identity for a general operand: `requires { |v| > 0 }`,
  which is APL's DOMAIN ERROR.
- **The direct scans.** `aplSumScanLast` and its nine siblings — five glyphs
  (`+ × ⌈ ⌊ -`) on two axes over three ranks — through three typed helpers
  `aplScanWith`, `aplScanRows`, `aplScanCols`. Plus `aplDifFirst`, the one
  direct reduction rungs 1 and 3 left out, which Ex 7 needs.
- **Power `⍣`.** `aplPower(f, n, x)` and `aplPowerUntil(f, g, x)`, the latter
  calling the condition with the new value as `⍺` and the old one as `⍵`, as APL
  does. A stop function that never fires is `aplNoFixedPoint()`, declared
  `requires { false }`, after a million steps: a catchable contract violation
  rather than a hang.

## What the grammar needed (`../base/AplSyntax.fsi`)

64 new alternatives (lines carrying a `=> <[` template, the name sets
excluded), 14 new names in `AplName`, 5 in `AplFnName`, and the 9 of the new
`AplTName`.

- **`AplStm`** gains six destructuring alternatives above the single-name
  binding — three names and two names, each in the three separator spellings.
- **`AplE`** gains four `⍣` rules (a count with `⊢`, the parenthesised count, a
  stop function with `⊢` and without it), four `¨` rules (a three-name strand, a
  two-name strand, dyadic, monadic), `-⌿`, the ten direct scans, and the four
  general `f/ f⌿ f\ f⍀`.
- **`AplFnM`** gains `a:AplAtom SPACE g:AplDy ⍨` and `g:AplDy ⍨`, so that `×⍨¨`
  and `2÷⍨⍣=` parse. `AplFnD` was **not** given the same: `AplFnD` is the
  operand of rung 4's own `⍨` rules, and a greedy `AplFnD` that swallowed
  `↑⍨` would be memoized there and rung 3's `v↑⍨1` would lose its parse.
- **`AplBase`** gains `t:AplTuple`, and **`AplTuple`** and **`AplTName`** are
  new. `AplTName` is a third closed name set — `Q K Vv wq wk wv dQh dKh dVh` —
  every member of which is also an ordinary `AplName`.
- **`AplName`** gains `mysum myscan dQh dKh dVh Blk Vv Q K wq wk wv c d`;
  **`AplFnName`** gains `Sscan step Fib h u`.
- Neither `\` nor `⍀` nor `¨` nor `⍣` takes the backtick escape. For `\` the
  escape is not merely unnecessary: it is a Syntax Error, because `\` is not one
  of the macro language's SpecialChars (v02, gap row 77).

## Errors met, verbatim

- `V02Syn.fsi:78:13: Syntax Error` and `V02Syn.fsi:91:26: Syntax Error`
  (`v02_term.out.0`, `.out.1`): the backtick-escaped `` `\ `` and `` `. ``.
- `v01_tuple.fss:25:24: Syntax Error` (`v01_tuple.out.0`): a tuple **pattern**
  in a parameter list.
- `v06_caps.fss:7:75: Syntax Error` (`v06_caps.out.0`): `BLK ← 4 ⋄ BLK`, an APL
  name that is a word of three uppercase letters.
- `Rung3.fss:176:43: Syntax Error` (`v07_tuple.out.0`) and
  `Rung4.fss:292:31: Syntax Error` (`v07_tuple.out.1`): a name strand over every
  `AplName`, swallowing the line break of rung 3's Ex 34 and rung 4's X24.
- `Rung5.fss:191:39: Syntax Error` (the first run of `Rung5.fss`): a dfn body
  written `⍺ ← 0` / newline / `0=≢⍵: ⍺`, where the two numerals merge into one
  strand across the line break. The book's own trailing comments separate the
  lines of the chapter's dfns; the beyond-chapter copies of them use `⋄`.
- The cold-cache `ProgramError` quoted in full in `PROBES.md` (`v04_lib.out.0`).

## Where `DESIGN.md` was wrong

- **A tuple PATTERN in a parameter list is a Syntax Error.** The design offered
  the choice and asked for a probe; the answer is that a tuple parameter must be
  destructured in the body, `(a, b, c) = t` (`v01_tuple.out.0`). It costs
  nothing here, because the each over a strand takes its elements one by one
  anyway.
- **The strand cannot be built from `AplName`.** The design writes
  `AplTuple :Expr:= a:AplName SPACE b:AplName SPACE c:AplName | …`. Over every
  APL name that rule breaks rung 3 and rung 4 outright (`v07_tuple.out.0`,
  `.out.1`), because `SPACE` crosses a line break and two ordinary names on
  consecutive lines merge. The nearest thing that works is a **third closed name
  set**, `AplTName`, disjoint from every name rungs 1–4 use; each of its members
  is also an ordinary `AplName`, so `Q+K` still reads as an addition. The trap
  survives inside the set.
- **`\` does not need the backtick escape — it refuses one.** The design says
  "`\` may need the backtick escape — probe". It is a plain item; the escaped
  spelling is a Syntax Error, because `\` is not a SpecialChar of the macro
  language (v02). The same is true of the `.` of `∘.g` and `f.g`, which rung 6
  needed to know.
- **`AplFnD` does not get the `⍨` alternative.** The design says "`AplFnD` gains
  the same for the dyadic swap, so `×⍨¨1+⍳9` and `-⍨/` work". `×⍨¨` needs only
  `AplFnM`; giving `AplFnD` a `⍨` alternative would make it swallow the `⍨` of
  rung 3's `v↑⍨1`, and PEG does not re-enter a nonterminal that has already
  succeeded (row 60). `-⍨/` is therefore not available, and is noted.
- **The book's `BLK` is written `Blk`.** A word of two or more uppercase letters
  is a Fortress operator, not an identifier, so it cannot be an APL name at all
  (`v06_caps.out.0`). The design did not anticipate this; nor did rung 4, which
  never needed such a name.
- **Ex 10 is in scope, through an adaptation the design did not name.** The
  design's out-list does not mention Ex 10; its `m` comes from Ex 9's random
  `9?9`, but the matrix Ex 9 printed is in the goldens, so Ex 10 binds it
  literally and checks the row sums the book prints.

## Departures from APL that remain

- `v¨⍳9`: each with an **array** operand over `⍳9` builds a nine-element nested
  vector. A strand here is a tuple of two or three names and nothing builds a
  tuple of nine, so this is out.
- Only the **monadic** `¨` reads a name strand; a dyadic `¨` pairing two strands
  has no rule.
- `2f/v`, n-wise reduction, is the derived function of `/` called dyadically,
  and a derived function is not a value here (rung 7).
- `f⍨` as the operand of `/` (`-⍨/`) has no rule, for the `AplFnD` reason above.
- A name strand is built from `AplTName`, not from every APL name, and two
  strand names on consecutive lines are still one strand.
- An APL name may not be a word of two or more uppercase letters.
- `aplPowerUntil` gives up after a million steps with a contract violation.

## New gap rows

Rows 77–82 of `../gaps.md`: `\` and `.` as plain items and the escape as a
Syntax Error (77), an all-uppercase word as a name (78), a tuple pattern in a
parameter list (79), what tuples do give — arity dispatch, a tuple result type,
a destructuring application (80), row 68 widened to name strands (81), and the
cold-cache overload-conflict check (82).

## Probes

`PROBES.md` carries one section per probe, v01–v07, each with its question, its
answer, and the verbatim text of every failure. v01 and v03 settled the tuple;
v02 settled the four new terminals and the `.` rung 6 needed; v04 settled the
library before the grammar was touched, and turned up the cold-cache check;
v05 asked one question per new production; v06 settled `BLK`; v07 settled what a
strand may be built from.
