# microgpt_paper.fss — implementation report

Worker report for the paper-register rewrite
(`explorations/microgpt_paper.fss`, 416 lines, component `microgpt_paper`),
plus its Fortify render sheet
(`explorations/fortify/microgpt-paper-forms.tic` + light/dark SVGs).
Built and run in the worktree
`/home/user/fortress/.claude/worktrees/agent-adbf76042b49fe58b`
(JDK 25, `ant compileAll` BUILD SUCCESSFUL, 53 s).
Smoke test `FORTRESS_THREADS=1 ./bin/fortress explorations/mgnative_a.fss`:
PASS (golden gradient checks + XOR final loss 5.5178095183714354E-11,
17.95 s loop).
`git status` shows exactly four new files and nothing else touched; no
commits, no pushes.

## The gates

| gate | result |
|---|---|
| 1 — `goldenCheck` at 1e-9 | **PASS, first attempt**, and on every later run including the delivered file |
| 2 — 30-step nano run, loss ~3.29 declining | **PASS** in all three runs |
| 3 — timing under `FORTRESS_THREADS=1` | **4.62–4.74 s/step** vs `microgpt_native`'s 4.81 |

Three full gate runs, `FORTRESS_THREADS=1`, all from `goldenCheck` through
step 30:

| run | file state | golden | loss @10 | @20 | @30 | 30 steps | s/step |
|---|---|---|---|---|---|---|---|
| 1 | as first written | PASS | 3.0560 | 3.0993 | 2.5774 | 142.2 s | 4.74 |
| 2 | after render edits | PASS | 3.2092 | 3.1149 | 2.6619 | 139.8 s | 4.66 |
| 3 | **as delivered** | PASS | 3.2119 | 3.0394 | 2.5683 | 138.6 s | **4.62** |

Run 3's file differs from run 2's only in comments (the overload finding
written into the header); runs 1→2 are the render-driven edits of contests
7–9 below, which is why gate 1 was re-run after each.

`num params: 1264` — identical to `microgpt_native` and to v1, so the
notation change moved no weights.

Gate 1 detail: `golden transformer forward/backward vs Python reference:
PASS` — all 15 logits over 3 positions, the mean loss 1.228662661701597 and
the 5 parameter gradients, all within 1e-9 of v1's hardcoded Python-reference
values. The rewrite is value-preserving by construction: every notation-layer
operator expands to exactly the index expression `microgpt_native` wrote by
hand, in the same generator order, so the graph is node-for-node the same
except where noted under "Notation contests" below.

Gate 2 detail: the opening band is ≈ ln 27 = 3.2958, the uniform-distribution
entropy, in every run, and every run is well below it by step 30.
Per-document loss is noisy — each step is one name — and each run has a
different Gaussian init, so absolute values differ between runs; the trend is
the signal.

Gate 3 detail. 4-CPU container, `FORTRESS_THREADS=1`, box otherwise idle
during each measurement. **Indicative only**, same caveat as the native
report.

| program | 30 steps | s/step |
|---|---|---|
| `microgpt_paper` (delivered file) | 138.6 s | **4.62** |
| `microgpt_native` (prior worker's paired measurement) | 144.2 s | 4.81 |

I.e. the paper register costs nothing: the extra operator layer is one more
function call per index expression and disappears into interpreter overhead.

## Notation contests, and how each was adjudicated

### 1. Vector·matrix as `opr juxtaposition` — **blocked by the interpreter; ⊞ adopted**

The spec's point 2 asks for `opr juxtaposition(p: List[\V\], m:
List[\List[\V\]\])` coexisting with the existing matrix·vector overload. The
interpreter refuses, verbatim:

```
com.sun.fortress.exceptions.ProgramError: .../pprobe.fss:48:1-49:70: and
.../pprobe.fss:45:1-46:65:
first parameters p:[List[\V\],List[\List[\V\]\]] and w:[List[\List[\V\]\],List[\V\]] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present
Context:
.../pprobe.fss:48:1-49:70:
.../pprobe.fss:5:1-18:2:
```

This is a **known, in-tree-documented limitation**, not a mistake of ours.
`ProjectFortress/tests/doubledOverloading3.fss` records the same error with
the comment: *"A parametric type can't have a functional method right now,
because we end up with top-level overloadings that aren't provably disjoint.
But we've ruled out multiple extension of a single type a different
parameterizations (right?), so we should consider these instantiations to be
disjoint (right right?)."* Two distinct instantiations of the same generic
trait (`List[\V\]` vs `List[\List[\V\]\]`) are treated as *possibly
overlapping* rather than excluding, and Fortress's overload rule then demands
that at least one parameter position exclude — which it never does here,
because both positions are List instantiations.

The consequence is sharper than "one overload failed": **at most one
overload of any given operator can be declared on (List, List).** Vec·Vec,
Mat·Vec and Vec·Mat are pairwise unrelated in exactly this way, so the same
error appears for every pairing, and `DOT` cannot absorb the vector·matrix
product either (checked by the same reasoning: position 0 is `List[\V\]` in
both, position 1 is the unrelated pair). Three products need three distinct
names.

Alternatives considered:

- give **matrix·vector** the second name and keep `p M` as juxtaposition —
  rejected: `W x` occurs seven times in `forward` (wq/wk/wv/wo/fc1/fc2/lmHead)
  against one occurrence of `p V`, and `W x` is the more universal paper form;
- **transpose**: `attend(q, K, Vv) = Vv^T softmax(…)`, which needs only
  matrix·vector — rejected: `p V = (Vᵀ p)` is true but it inverts the paper's
  own reading order and adds an O(n·d) transpose that is pure implementation
  accident;
- **a second big operator over the vector carrier** — adopted.

Adopted form:

```
attend(q: List[\V\], K: List[\List[\V\]\], Vv: List[\List[\V\]\]): List[\V\] = do
  p = softmax(<|[\V\] ((q DOT k) / SQRT |q|) | k <- K|>)
  BIG BOXPLUS[j <- 0#|p|] p[j] Vv[j]
end
```

which renders as `⊞_{j←0#|p|} pⱼ Vvⱼ` — i.e. **the brief's own target
formula, `Output_i = Σⱼ Softmax(A_i)ⱼ · Vⱼ`**, with ⊞ where the paper prints
Σ. It uses the scalar·vector juxtaposition the spec asked for, and the
"second-monoid problem" the journal worried about turns out to be a
*naming* problem only: a second nullary `BIG OPLUS()` registration does
collide, but a registration under a **different glyph** does not. The
vector-carrier reduction (`vecsum` + `VecConcat` + `opr BIG BOXPLUS`) is a
literal transposition of the scalar ⊕ design — map to singletons, join by
concatenation (exactly associative), fold once componentwise at the leaf —
and produces the identical graph to `microgpt_native`'s index comprehension:
one n-ary Sum node per output component, the same multiply nodes underneath.

Recording this as a language finding: **the register we wanted is expressible;
what blocks it is the 2012 overload checker's inability to see two
instantiations of an invariant generic as disjoint.** That is a concrete,
minimal repro for a future compiler-gap catalog entry (and it already has an
in-tree test file waiting for it).

### 2. `DOT` vs juxtaposition for the inner product — **DOT**

`u DOT v` renders as `u · v`, exactly the papers' inner-product dot, and it
keeps juxtaposition free for the matrix·vector product (which by contest 1 is
a scarce resource: one List-List overload per name). It also gives `rmsnorm`
its ‖x‖² directly: `x DOT x`.

Coexistence checked: the library already has `opr DOT(self, b: Number): RR64`
on `Number`, and a top-level `opr DOT(List[\V\], List[\V\])` overloads it
without complaint — trait-vs-trait exclusion works between `List` and
`Number`; it is only same-generic instantiations that fail.

### 3. Named function vs operator for softmax / rmsnorm / concat — **named, as the literature names them**

The literature prints `softmax`, `RMSNorm`, `concat`, `relu`, `FFN` as named
operators-in-words, and Fortify sets them in italic exactly that way. No
contest survived the render: `rmsnorm(x) = x/√((x·x)/|x| + 0.00001)` next to
the paper's `RMSNorm(x) = x/√(x·x/d + ε)` is a one-glyph difference.

### 4. `^0.5` vs `√` — **√, via `opr SQRT(u: V)`**

The spec writes `rmsnorm(x) = x / (((x DOT x)/(d) + eps)^0.5)`. Rendered,
`^0.5` is visibly not the paper. Defining `opr SQRT(u: V): V = u^0.5`
(one line, and its own exhibit of "what Fortress must be taught") turns the
model line into the radical the paper prints. Same for the attention scale:
`/ SQRT |q|`.

### 5. The ZZ32→RR64 coercion blemishes — **pushed down into the notation layer**

The journal flagged `d 1.0`-style coercions as known blemishes of
`microgpt_native`. Fortress does not coerce `ZZ32` to `RR64` implicitly, so
they cannot simply be deleted; they can be *quarantined*. Three one-line
declarations do it, and they belong on the "what Fortress must be taught"
side of the exhibit rather than in the formulas:

```
opr /(self, n: ZZ32): V = self / (n 1.0)      (* inside V *)
opr +(self, c: RR64): V = ...                 (* inside V *)
opr SQRT(n: ZZ32): RR64 = SQRT (n 1.0)
```

Result: `(x DOT x) / |x| + 0.00001` and `(q DOT k) / SQRT |q|` at the model
level, with no `1.0` multiplications and no `konst(…)` wrappers anywhere in
the rendered formulas. `d = |x|` and `dk = |q|` bindings disappeared too —
`|x|` is the paper's own notation for the dimension.

### 6. `Vv` for the value matrix — **kept, under protest, because `V` is taken**

Probed: a parameter named `V` is rejected outright (`Variable V is already
declared.`) since `V` is the autodiff object. `Vv` renders as a slightly
product-like "Vv", which is the same cost the journal recorded for `xa`/`xb`.
No better single glyph exists that is not already the engine's type name; the
spec had already chosen `Vv` for this reason and I kept it.

### 7. The forward-pass locals — **renamed to `K` and `Vv`, which fixed a LaTeX bug too**

`microgpt_native`'s `kh2`/`vh2` names produce `\VAR{kh}_2_{h}` in Fortify's
output, which is a **LaTeX "Double subscript" error**. Verified by
re-rendering the committed `explorations/fortify/microgpt-native-forms.tic`
in the scratchpad: it emits the same two errors at its line 55,

```
! Double subscript.
l.55 ...AR{attend}(\VAR{wq}_{h}\, x_2, \VAR{kh}_2_
                                                  {h}, \VAR{vh}_2_{h})) \big...
```

and latex recovers by printing `kh₂ₕ`, which means nothing. Renaming the
extended histories to `K` and `Vv` removes the error *and* makes the line
read as the paper does: `heads = ⟨attend(wq_h x₂, K_h, Vv_h) | h ← 0#nHead⟩`.
Flagging this as a defect in the existing `microgpt-native-forms.tic` too.

### 8. `softmax`'s max shift — **the `konst` wrapper dropped**

`c = konst(BIG MAX[u <- seq(a)] u.data)` became `c = BIG MAX[u <- seq(a)]
u.data`, an `RR64`, with `opr -(x: List[\V\], c: RR64)` doing the shift. This
is decision 5 of the journal taken at face value (the shift *is* an RR64
constant), it renders one node cleaner, and it changes the graph only by
removing a `konst` leaf and a negation node — values and gradients identical,
golden re-verified.

`u.data` in the `BIG MAX` stays: it is the honest marker of the one place the
formula steps outside the graph to read a number.

### 9. `nll` — **two lines beat one**

`-(log ((softmax(logits))[y]))` renders with a bracketed subscript and three
nested parens. Binding `p = softmax(logits)` first lets Fortify render `p[y]`
as `p_y`, giving `−(log(p_y))` — the paper's `L = −log softmax(logits)_y`.

### 10. `ffn` — **the minimal form parses**

`fc2 relu(fc1 x)` needs none of the spec's defensive parens
(`fc2 (relu (fc1 x))`): tight juxtaposition resolves `relu(fc1 x)` as an
application and the outer pair as the matrix·vector operator. It renders as
`fc₂ relu(fc₁ x)` — the paper's `W₂ relu(W₁ x)` exactly. Likewise
`x4 = wo concat(heads) + x1` needs no parens around the juxtaposition.

## Syntax traps hit

The three from the prior report (chained subscripts need `(m[i])[j]`,
comprehension bodies ending in a subscript need parens, list-literal type
ascriptions are load-bearing) were applied pre-emptively and all still bite.
New ones paid for here:

1. **`|w||>` does not lex.** A comprehension whose generator ends in a
   cardinality — `<|… | r <- 0#|w||>` — reports `Unmatched delimiters "<|"
   and "||>"`, because `||>` lexes as one token. Fix: a space,
   `0#|w| |>`.
2. **`/|` does not lex either.** `(x DOT x)/|x|` reports `Unmatched
   delimiters "(" and "/|"`. Fix: `(x DOT x) / |x|`.
3. **`at` is a reserved word** (already in the brief's trap list, hit again
   in a probe: `at = attend(…)` → `Unmatched delimiter "at"`).
4. **`V` cannot be reused as a variable name** while the object `V` is in
   scope: `Variable V is already declared.` (single uppercase letters are
   ordinary identifiers otherwise — `K` works fine).
5. The overload rule of contest 1, restated as a trap: **two overloads of one
   operator on two different instantiations of the same generic trait are
   rejected**, no matter how obviously disjoint.

Idioms confirmed working, all new to this file:

- a **second registered big operator** over a different carrier
  (`opr BIG BOXPLUS` over `List[\V\]` alongside `opr BIG OPLUS` over `V`) —
  the collision the journal feared is per-*name*, not per-carrier;
- `opr SQRT` overloaded for a user object **and** for `ZZ32`, alongside the
  library's `opr SQRT(RR64)`;
- scalar·vector juxtaposition with subscripted operands, `p[j] Vv[j]`,
  resolving to the intended `(V, List[\V\])` overload with no ambiguity
  against the `(V, V)` method or the `(Mat, Vec)` operator;
- a **method on the object** (`ffn`) used inside another method (`forward`)
  and rendered as a standalone formula;
- `SQRT |q|` — a prefix operator applied to a cardinality with no parens.

## The render sheet

`explorations/fortify/microgpt-paper-forms.tic`, regenerated by the
three-command recipe in its own header, plus
`microgpt-paper-forms-light.svg` and `-dark.svg` (the latter by the repo's
`sed "s/<svg /<svg fill='#e6edf3' /"` practice). `.tex/.dvi/.aux/.log`
byproducts deleted. Group 1 is the notation layer (DOT, both surviving
juxtaposition overloads, the ⊞ registration and `vecsum` that replace the
third, vector `+`, vector `−`, vector `/`, elementwise `relu`/`exp`,
`concat`, `SQRT`); group 2 is the model level (`rmsnorm`, `softmax`,
`attend`, `ffn`, `nll`, `forward`).

Rasterized at 1500×1600 and inspected; two iterations were driven by what the
raster showed (contests 7, 8, 9 above, plus dropping the `d`/`dk` bindings).
Two blemishes remain and are Fortify's, not the source's:

- **`opr SQRT(u: V): V = u^0.5` renders with its parameter set under the
  radical** — `opr √(u: V): V = u^0.5` becomes something like `opr √u: V`.
  The *uses* render perfectly; only the declaration line is odd. Kept on the
  sheet anyway, because dropping it would leave √ unexplained.
- **The `__bigOperatorSugar` registration line is a wall of type
  arguments.** Kept deliberately: it is precisely the price of teaching
  Fortress a second reduction, and the page's thesis is that this layer is
  content, not scaffolding.

## Deviations from the spec

One, forced and documented above: **spec point 2's vector·matrix
`opr juxtaposition` does not exist** (interpreter limitation), and the
attention blend is stated as `BIG BOXPLUS[j] p[j] Vv[j]` instead of
`softmax(…) Vv`. Everything else is as written — vectors stay `List[\V\]`
with no wrapper objects, each notation operator is defined once by its index
formula, the model level is one paper-shaped line per block, heads stay
structural, histories stay functionally threaded (now literally named `K`
and `Vv`), and Adam/tokenizer/sampling/golden check carry over from
`microgpt_native.fss` unchanged.

## Files

- `explorations/microgpt_paper.fss` (416 lines)
- `explorations/fortify/microgpt-paper-forms.tic`
- `explorations/fortify/microgpt-paper-forms-light.svg`
- `explorations/fortify/microgpt-paper-forms-dark.svg`
- scratchpad copies of all four, plus `microgpt-paper-forms.png` (the
  inspected raster), `paper_gate.log` / `paper_gate2.log` (gate runs),
  `pprobe.fss` / `nprobe2.fss` (the notation probes).
