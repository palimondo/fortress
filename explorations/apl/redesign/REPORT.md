<!-- Pricing skeleton for a redesigned APL library and grammar, built 2026-09-12
     under explorations/apl/redesign/.  base/ untouched.  Walk interpreter,
     JDK 25, FORTRESS_THREADS=1. -->

# The redesign, priced

## Verdict

- **Rung 1: 26 of 26 in-scope checks PASS**, plus 18 of 18 beyond-chapter checks
  (`Rung1R.out`). Same examples, same expected strings, same `⍎(…)` escape as
  `../rung-1/Rung1.fss`; index origin 0.
- **Lines**, under one rule for both sides: blank lines and comment blocks
  removed, counted after stripping `(* … *)` (nested, and not inside string
  literals) and then dropping every whitespace-only line.

  | | library `.fss` + `.fsi` | grammar `.fsi` + `.fss` | total |
  |---|---|---|---|
  | old `base/`, **rung 1 only** (`AplCore` above its `rung 2: indexing` marker; `AplSyntax.fsi` with the 10 rung-2 productions, `AplCoord`, `AplId`/`AplIdTail`/`AplCh`/`AplChD`, the bracket `AplAtom`, and the `⌷`/`⍸` glyphs deleted) | 226 + 27 = **253** | 53 + 3 = **56** | **309** |
  | new `redesign/` (rung 1) | 221 + 99 = **320** | 57 + 3 = **60** | **380** |
  | old `base/` as it stands (rungs 1 **and** 2) | 382 + 52 = 434 | 92 + 3 = 95 | 529 |

  So for the same 26 + 18 checks the redesign is **+71 effective lines, +23%**.
  The grammar is a wash (60 against 56, 45 productions against 43). The whole
  difference is in the library, and it is entirely the api: the component body
  shrank by 5 lines (221 against 226) while the api grew by 72 (99 against 27),
  because `base` exported 21 names and the redesign exports **97 declarations,
  41 of them `opr`**. What was bought with those 72 lines is the deletion of
  `base`'s four dispatch switches — `aplDy` 19, `aplMon` 20, `aplRed` 19,
  `aplFoldData` 13 = **71 effective lines of run-time string comparison** — and
  what the redesign got for free on top (see point 1).
- **Design points: 2, 3, 4 and 5 held. Point 1 held in its revised form** (native
  `Array`, rank at expansion time) **with one documented FAIL** (a computed shape,
  `r15`) and **two forced name families** (characters, nesting — `r07`).

## 1. The carrier: Fortress's own arrays, rank in the type

Revised brief: no wrapper, no runtime rank. An APL scalar is an `RR64`, a vector
an `Array[\RR64,ZZ32\]` from `array[\RR64\](n)`, a matrix an
`Array[\RR64,(ZZ32,ZZ32)\]` from `array[\RR64\](r,c)` (ledger row 57). **No
wrapper object was needed anywhere**, and the report says below where one was
considered and rejected.

**What worked.** Rank dispatch, but in exactly one spelling. The obvious one is
rejected:

```
aplShow(v: Array[\RR64,ZZ32\]): String = …
aplShow(m: Array[\RR64,(ZZ32,ZZ32)\]): String = …
```
> `r01_native.out`: `first parameters m:[Array[\RR64,(ZZ32,ZZ32)\]] and
> v:[Array[\RR64,ZZ32\]] are unrelated (neither subtype, excludes, nor equal)
> and no excluding pair is present`

Two instantiations of one generic trait are not known to exclude (the same hole
as merged ledger row 33 read from the other side). The spelling that works goes
through `Vector`/`Matrix`, which reach `Rank1` and `Rank2`, and
`Rank1 excludes Rank2` (`FortressLibrary.fsi:1072-1076`):

```
aplShow(x: RR64): String
aplShow[\nat s\](v: Vector[\RR64,s\]): String
aplShow[\nat r, nat c\](m: Matrix[\RR64,r,c\]): String
```

and the `nat` is **inferred from a runtime-built array** — `r02a_rankover.out`
prints `scalar 2.5` / `vector of 3: 0.0` / `matrix (2,4): 0.0` for
`array[\RR64\](3)` and `array[\RR64\](2,4)`. That sharpens merged ledger row 23
("`T[n]` with a `nat` parameter does not unify with a runtime-built array"): the
`T[n]` *array type syntax* does not unify, but `Vector[\RR64,s\]` and
`Matrix[\RR64,r,c\]` do. Parameters are therefore `Vector`/`Matrix`; results are
the honest runtime-sized `Array[\…\]`, never a fabricated `nat`.

**What the library then does for nothing** (`r16_libalgebra.out`): `v + w`,
`v - w`, `m + m` elementwise; `v DOT w = 32.0` and `m v = 8 26`, which are
chapter 6's inner product `+.×` already present; `m.t()`, which is `⍉`;
`.map`, `.ivmap`, `.fill`; `|v|`, `v[i]`, `m[i,j]`; and a **LENGTH ERROR by
dispatch** when the two `nat`s disagree (`r09_reduce.out`:
`Failed to find any matching overload, args = (__DefaultVector[\RR64,3\],
__DefaultVector[\RR64,4\])`). `base` hand-wrote all of this: `aplZip` with its
scalar-extension branches, `aplTranspose`, `aplSame`, and the `List` plumbing.
Against that, the rank split costs **three declarations per primitive instead of
one**, and nine of the 97 api lines are `≡`'s cross-rank cases alone, because
APL's match compares shape first and `Vector`/`Matrix`/`RR64` are three
unrelated domains.

`aplInt` is the clearest single saving: `base` spent 14 lines on a
doubling-and-halving binary search because there is no `RR64 → ZZ32` narrowing
(apl gap row 10). One line does it, via gap row 11 and `strToInt`:

```
aplInt(v: RR64): ZZ32 = strToInt("" (|\ v /|))
```

**Characters.** `AplArr[\Char\]` has no equivalent, and the reason is a wall:

```
tally[\nat s\](v: Vector[\RR64,s\]): RR64 = 1.0 |v|
tally[\nat s\](v: Array1[\Char,0,s\]): RR64 = 1.0 |v|
```
> `r07_edge.out`: `tally[\nat s\](v:Array1[\FortressBuiltin.Char,0,s\]):RR64 …
> and tally[\nat s\](v:Vector[\FortressLibrary.RR64,s\]):RR64 … have parameters
> with generic type, at least one pair of parameters must have excluding types`

`Vector` needs `T extends Number`, so a `Char` array can only be an
`Array1[\Char,0,s\]`; that and `Vector[\RR64,s\]` are both `Rank1` and neither
excludes the other. **Fallback, kept and counted:** the character primitives
carry their own names — `aplChars`, `aplShowC`, `aplTallyC`, 5 effective lines
for three of them, i.e. **one extra name per primitive that admits characters**.
The compensation is that APL's DOMAIN ERROR is then free: `r08_edge.out` ends with
`Failed to find any matching overload, args = (PrimitiveArray[\Char,5\])`, the
numeric family refusing a character array, which is exactly the brief's "fails by
dispatch".

**Nesting.** `Array[\Array[\RR64,ZZ32\],ZZ32\]` builds, indexes and displays
(`r14_nested.out`: `nested = (1 2 3)(4 5)`, `|n| = 2`, `n[1] = 4 5`) in **2 lines**
of construction plus a 2-line `showN`. It hits the same two walls: its parameter
type `Array1[\Array[\RR64,ZZ32\],0,s\]` cannot join the numeric family (so, own
names again), and the shipped `SUM` over a generator of arrays is a `CastError`
at `FortressLibrary.fss:36` via `:1120` — merged ledger row 44, now confirmed
outside `Vector` as well.

**A mixed array** (APL's general array, numbers and characters and boxes in one
value) would need the `Cell` trait, and it is **not built**. Priced: a `trait Cell`
with `object CellNum(v: RR64)` and `object CellChar(v: Char)` and
`object CellBox(v: Array[\Cell,ZZ32\])` is 4 declarations ≈ 10 lines, but every
one of the 97 api declarations is typed in `RR64`/`Vector`/`Matrix` and a mixed
array is a fourth domain that excludes none of them — so it is **a third name
family of ~60 lines**, not 10. That is the same measurement `base` made at
rung 2 (apl gap row 21, "1 trait + 2 variants + 1 carrier replaces 1 carrier,
and the 65 top-level functions are all typed in the old one"); putting rank in
the type does not change it.

**Where a wrapper would have been needed, and was not.** Display is the only
place the native carrier lacks something (`asString` on a library array is not
ours to override), and a function `aplShow` answers it without a new type. Views
lose the algebra (rows 54, 55) — so no view is taken anywhere; axis reductions
index explicitly instead, which is why `aplSumFirst` is a `.fill` over the other
axis and not `m[:,k]`.

## 2. Glyphs as real Fortress operators

Held, and the inventory is now exact. `r04_glyphs.out` declares a prefix **and**
an infix arity for one dummy carrier and prints all twenty:

```
opr ×(a: D): D …            opr ×(a: D, b: D): D …
```
> `× a = D1` / `a × b = D2` / `÷ a = D3` / `a ÷ b = D8` / `a ≡ b = D14` /
> `a ≢ b = D16` / `⊖ a = D9` / `a ⊖ b = D20` / `⊂ a = D11` / `a ⊂ b = D24` /
> `⊃ a = D13` / `a ⊃ b = D28` / `a ∘ b = D30` / `- a = D16` / `a - b = D34` /
> `+ a = D18` / `a + b = D38` / `a * b = D40` / `a MAX b = D42` / `a MIN b = D44`

and `r05d_prefix.out` adds the monadic `≢ ≡ * ∘`. So **both arities are
declarable for `× ÷ - + * ⊖ ⊂ ⊃ ≡ ≢ ∘`**, and APL's monadic/dyadic split really is
Fortress overloading: `opr ×(x: RR64)` is signum, `opr ×(a: Vector, b: Vector)` is
times, one glyph, no dispatch table.

Three refusals, verbatim:

- `,` is not declarable in **either** arity.
  > `r05a_comma.out`: `r05a_comma.fss:6:5: Syntax Error` at `opr ,(a: D, b: D): D`;
  > `r05e_ravel.out`: `r05e_ravel.fss:6:5: Syntax Error` at `opr ,(a: D): D`.
  Fallback: `aplCat` (4 overloads) and `aplRavel` (3), and the grammar rule
  `l:AplAtom SPACE , SPACE r:AplE => <[ aplCat((l), (r)) ]>` keeps APL's glyph in
  the source. Cost 7 lines that would have been 7 `opr` lines anyway — no loss.
- `⌈` and `⌊` are **enclosers** in the host table (`appendices/operators.tex:67-70`,
  `LEFT CEILING … |/`), so neither arity is declarable.
  > `r05b_ceil.out`: `Unmatched delimiter "|/"` at `opr ⌈(a: D): D`, twice, plus
  `Unmatched delimiter "component"`.
  Fallback as the brief anticipated: dyadic `⌈ ⌊` expand to the host's
  `MAX`/`MIN` (`<[ (l) MAX (r) ]>`), monadic to `aplCeil`/`aplFloor`. 8 library
  lines; the APL text is unchanged.
- monadic `|` is an encloser too (`|x|`); dyadic `|` **is** declarable
  (`r05c_bar.out`: `a | b = D3`). Not used by rung 1; recorded.

Two further facts the point depends on.

- **A top-level `opr` does cross an api boundary.** `base/AplCore.fss`'s header
  says it does not, citing merged ledger row 30, and exports only functions for
  that reason. It is wrong about this direction: `r03_apiopr.out` declares
  `opr ⊕[\nat s\](a: RR64, v: Vector[\RR64,s\])` in `AplT.fsi`, and the importing
  component prints `2 ⊕ v = [0#4][ 2.0 3.0 4.0 5.0 ]`. Row 30's claim is about
  *library generic code* (`SUM` inside `FortressLibrary`) failing to see a
  top-level `opr`; a user call site sees it. The whole operator design rests on
  this, and the library's arrays are not ours to give functional methods to, so
  the alternative (row 132) was unavailable.
- **A comparison glyph can be re-typed to APL's 0/1.** `opr =` over vectors
  returning `Array[\RR64,ZZ32\]` coexists with the library's Boolean `=`, the more
  specific overload winning (`r06_hostops.out`: `a = b = [0#3][ 0.0 1.0 0.0 ]`).
  `base` had to name these `"eq"`, `"le"`, … in its dispatch string.

Named functions remain for exactly the glyphs the table lacks: `⍳ ⍴ ⌽ ⍉` (and
`⍋ ⍒` when they arrive), as the brief expected.

## 3. Templates that expand to host code

Held. `base`'s core translation was

```
l:AplAtom SPACE f:AplFn SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
⍳ => <[ "iota" ]>    × => <[ "times" ]>    `+ => <[ "plus" ]>   …
```

one rule for every glyph, a string per glyph, and `aplDy`/`aplMon`/`aplRed`
comparing that string at run time. The redesign writes one rule per glyph per
arity and the expansion **is** the host construct:

```
| l:AplAtom SPACE × SPACE r:AplE => <[ (l) × (r) ]>
| ⍳ SPACE r:AplE                 => <[ aplIota((r)) ]>
| ≢ SPACE r:AplE                 => <[ ≢ (r) ]>
| `+ / SPACE r:AplE              => <[ aplSumLast((r)) ]>
```

New fact: **operator characters need no escape inside `<[ … ]>`.** The backtick
escape of apl gap row 3 is required for a production's *terminal* (`` `+ ``,
`` `* ``) but the template body is host Fortress, and `<[ (l) + (r) ]>` and
`<[ (l) * (r) ]>` both expand (`r11_gram.out`: `1 + 1 = 2`, `2*10 = 1024`). A
prefix operator in a template works too (`<[ ≢ (r) ]>`, `<[ ⊃ (r) ]>`,
`<[ - (r) ]>`). Gap row 3's preparser collision is respected: the `⍴` of the
first production stands above every escape in the file.

Everything the brief asked to keep is kept and unchanged from `base`: the
`apl⦇ … ⦈` entry, strictly right-to-left evaluation with no precedence, strand
notation, the `⍝` comment tail as a right-recursive one-character `NOT`
(gap row 9), `⍎(…)` as the bounded host escape (gap rows 4, 5), `⍬`, `¯`, and
index origin 0. Rung 1 needs no APL *names*, so `AplId`, `AplIdTail`, `AplCh`,
`AplChD` and the workspace are simply absent — the 28 effective lines of
`base`'s workspace object and its `aplSet`/`aplGet` are out of scope here, not
replaced, and gap rows 17 and 23 say how they would come back.

Line effect: 45 productions against `base`'s 43 for the same rung — **+2
productions, +4 lines, and −71 lines of library dispatch switch**. This is the
one place the redesign is unambiguously cheaper.

## 4. The array as a generator of its cells

Held, and cheaper than the brief expected. Merged ledger row 47 buys the
generator protocol for a *user* carrier with `ZeroIndexed` + `DelegatedIndexed`
in about six lines; **a library array needs none**, it already is a `Generator`.
`r13_generator.out`:

```
|v| = 5    v[2] = 4
comprehension = <|30.0, 10.0, 40.0, 10.0, 50.0|>
SUM[u <- v] u = 14.0      BIG MAX[u <- v] u = 5.0
3 1 4 1 5    <- a for over the array
```

So `+/` is the shipped `SUM` and `⌈/` the shipped `BIG MAX`, in the body of the
function the template names:

```
aplSumLast[\nat s\](v: Vector[\RR64,s\]): RR64 = SUM[ i <- seq(0 # |v|) ] v[i]
aplMaxLast[\nat s\](v: Vector[\RR64,s\]): RR64 = BIG MAX[ i <- seq(0 # |v|) ] v[i]
aplProdLast[\nat s\](v: Vector[\RR64,s\]): RR64 = PROD[ i <- seq(0 # |v|) ] v[i]
```

**No `except { opr BIG + }` was needed** (ledger row 41): `RR64` is already a
`Number`, so the seal of row 44 never closes on us. The user reduction appears
exactly where the brief predicted — `-/`, which is not associative and has no big
operator — and is 6 lines of `while` (`aplDifLast`), against `base`'s
`aplFoldData` (13 lines) that had to serve *every* glyph through `aplDy`.

Axis reductions on a matrix are the other axis filled in:

```
aplSumFirst[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\] = do
    (rows, cols) = m.sizes
    aplVec(cols, fn (k: ZZ32): RR64 => SUM[ i <- seq(0 # rows) ] m[i,k])
  end
```

Two departures from the brief's wording here, both forced. (a) The brief asked
for *comprehensions* over rows; an **array** comprehension is dead at two layers
and has no big operator (ledger row 50), and a row **view** would carry no vector
algebra (rows 54, 56: `m[1,:]` extends `Array1`, never `Vector`, and the
pair-of-ranges subscripts ship commented out), so the spelling is `.fill` over
explicit indices. (b) The brief asked for `+/` to expand *to* `SUM`; it expands
to a one-line wrapper whose body is `SUM`, because the rank split cannot happen in
the template — and must not be skipped: a matrix generates **all** of its cells,
so a direct `SUM[u <- seq(m)] u` is APL's `+/,m` and silently not `+/m`
(`r13_generator.out`: `+/m = 6 22` but `SUM over seq(m) = 28.0`).

## 5. Rank and length errors as `requires` contracts

Held. The contract goes on the header line after the return type, as
`run-b2/probes/g1b_ok.fss` established:

```
opr ×[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
        requires { |a| = |b| } =
    aplVec(|a|, fn (i: ZZ32): RR64 => a[i] b[i])
aplIota(n: RR64): Array[\RR64,ZZ32\] requires { n >= 0.0 } = …
```

and it fires **through the macro expansion**, from APL source, as a catchable
`CallerViolation` (`r12_contract.out`):

```
1 2 3×1 2 3 = 1 4 9
1 2 3×1 2   -> CallerViolation (APL LENGTH ERROR)
⍳¯1         -> CallerViolation (APL DOMAIN ERROR)
¯2 3⍴⍳6     -> CallerViolation (APL DOMAIN ERROR)
```

Contracts are in the component, not in the api (the api declares the signature
only); that was not forced, it simply was not needed.

One honest limit, in the same probe. The two error shapes **coexist and cannot be
unified**: `+` and `-` between two vectors are the library's own `Vector.+`, whose
single `nat` makes a length mismatch a *dispatch* failure instead, and a contract
cannot be attached to a method we do not own — `1 2 3+1 2` ends
`r12_contract.out` with `Failed to find any matching overload`, not with a
`CallerViolation`. Declaring our own `opr +` over two independent `nat`s to get
the contract would shadow the library's free elementwise `+`, which is the thing
point 1 is built on. The choice taken is the free `+` and the inconsistent
diagnostic; 10 lines and a worse message is the alternative.

## Departures from the design as given

1. **Point 1's carrier** is the revised one: native `Array`, rank decided at
   expansion time, no wrapper. (The coordinator's correction; the generic
   `AplArr[\T\]` wrapper was never built, so it is not priced here. The one fact
   that was established before the correction and still matters is that
   `value object AplArr[\T\]` would have had to reach `Rank1`/`Rank2` itself or
   hit the very same overload wall — `r01_native.out`.)
2. **`⌈` and `⌊` are not operators**, by the spec's own table. Dyadic uses `MAX`
   and `MIN`; monadic uses named functions. 8 lines.
3. **`,` is not an operator** in any arity. `aplCat` and `aplRavel`. 7 lines.
4. **Character and nested arrays need their own name families**, not their own
   type parameter: `aplShowC`/`aplTallyC`/`aplChars`, `showN` in `r14`. ~7 lines
   for the skeleton; a full character family is one name per primitive.
5. **Axis reductions are `.fill`, not comprehensions**, and **`+/` expands to a
   wrapper around `SUM`**, not to `SUM` itself (point 4 above).
6. **A computed shape is a FAIL, not a fallback.** `r15_runtimerank.out`:
   ```
   Error occurred while instantiating and executing a temporary parser: …
   (r15_runtimerank.fss:12:45: Syntax Error)
   ```
   for `apl⦇ ⍎(sh)⍴⍳8 ⦈` where `sh = apl⦇ 2 4 ⦈`. The grammar fixes the result
   rank of `⍴` by counting the numerals it can *see*; there is no production for
   an atom on the left of `⍴`, and adding one would require a function whose
   result rank is a run-time value. No rung-1 example needs it (every `⍴` in the
   chapter has a literal left argument), so it stays a FAIL. **Priced:** a
   runtime-rank path means one sum type over the three ranks — the `Cell` trait
   of point 1 again — which is the third name family, ~60 lines, plus a `typecase`
   at the head of every primitive that can receive it, plus the loss of the
   library algebra of `r16` for any value that passes through it. That is the
   whole of `base`'s design, re-entered through one primitive.
7. **No APL names / `←` / workspace**, because rung 1 has none. `base`'s 28-line
   workspace is out of scope rather than improved on; rung 2's gap rows 17, 23
   and 27 are where it would be rebuilt.

## Probes

| probe | what it settles |
|---|---|
| `r01_native.fss` / `.out` | FAIL: two instantiations of `Array[\E,I\]` cannot be overloaded |
| `r02a_rankover.fss` / `.out` | rank dispatch through `RR64` / `Vector` / `Matrix`, `nat` inferred |
| `AplT.fsi`, `AplT.fss`, `r03_apiopr.fss` / `.out` | a top-level `opr` crosses an api boundary |
| `r04_glyphs.fss` / `.out` | the twenty prefix/infix declarations that work; `,` fails |
| `r05a_comma.fss` / `.out` | FAIL: `opr ,` in the infix arity too |
| `r05b_ceil.fss` / `.out` | FAIL: `⌈` is an encloser |
| `r05c_bar.fss` / `.out` | dyadic `\|` works |
| `r05d_prefix.fss` / `.out` | monadic `≢ ≡ * ∘` all declarable |
| `r05e_ravel.fss` / `.out` | FAIL: `opr ,` in the prefix arity |
| `r05f_starparen.fss` / `.out` | FAIL: `(` immediately before `*` opens a nested comment |
| `r06_hostops.fss` / `.out` | `÷` and `*` on `RR64`; `=` re-typed to a 0/1 array |
| `r07_edge.fss` / `.out` | FAIL: a `Char` array cannot join the numeric overload family |
| `r08_edge.fss` / `.out` | the fallback (own names) and APL's DOMAIN ERROR by dispatch |
| `r09_reduce.fss` / `.out` | `SUM`/`PROD`/`BIG MAX` return types, `map`, `t()`, LENGTH ERROR by dispatch |
| `r10_lib.fss` / `.out` | the whole library through its api, no grammar |
| `r11_gram.fss` / `.out` | the grammar: host operators in templates, rank fixed at expansion |
| `r12_contract.fss` / `.out` | `requires` → `CallerViolation` from APL source |
| `r13_generator.fss` / `.out` | the generator protocol for free; the `+/,m` trap |
| `r14_nested.fss` / `.out` | nested arrays build and index; `SUM` over them is a `CastError` |
| `r15_runtimerank.fss` / `.out` | FAIL: a computed shape does not parse |
| `r16_libalgebra.fss` / `.out` | `v DOT w`, `m v`, `m.t()`, `ivmap` inherited free |
| `Rung1R.fss` / `Rung1R.out` | 26 of 26 and 18 of 18 |

## Gap rows

Rows **36 to 47** appended to `../gaps.md` under a new section, continuing its
numbering.
