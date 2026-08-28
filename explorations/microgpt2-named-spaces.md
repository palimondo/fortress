<!-- Produced by the delegated named-spaces build worker, 2026-08-28; integrated
     after an independent golden-gate run in the main checkout. Probes and
     counterfactual files: scratchpad named-spaces/ (session-local); research
     basis: explorations/aliases-units-report.md (probes in
     explorations/alias-units-probes/). Design journal: explorations/microgpt-native.md. -->

# microgpt2 — the two named spaces (`KVCache`, `ProbDist`), and the trait that pays for one of them

Worktree `/home/user/fortress/.claude/worktrees/agent-a20efd0b08c992c65`; build outputs copied from the main checkout (no `ant`); every run `FORTRESS_THREADS=1`, JDK 25. No commits, no pushes, nothing touched in the main checkout.

**Deliverables (worktree):** `explorations/microgpt2.fss`, `explorations/fortify/{block-softmax,block-forward,sheet-notation}.{tic,-light.svg,-dark.svg}` — mirrored in `scratchpad/named-spaces/` together with probes, logs, diffs, counterfactual files and rasterized renders.

## Headline

| | before | after | delta |
|---|---|---|---|
| stripped core lines (diet report's `strip.py`) | **206** | **215** | **+9** |
| ratio to Python's 152 | 1.36× | **1.41×** | |
| — of which `KVCache` | | | **+7** |
| — of which `ProbDist`, **with** the shared trait | | | **+2** |
| — of which `ProbDist`, **without** it (measured) | | | *+8* |
| harness half | 88 | **88** | ±0 |
| math half (engine + notation + model) | 118 | **127** | +9 |

Three complete files were built and **all three pass the golden check**: the delivered one (215), the no-dedup counterfactual (221), a KVCache-only variant (213). The whole cost lands in the math half; the harness is untouched.

**Pavol's caveat is answered: yes, traits eliminate the duplication.** Four independent designs work; the adopted one costs `ProbDist` **two lines** instead of the report's predicted six-plus-a-duplicated-body.

**The report's one wrong prediction, corrected:** `KVCache` was forecast "net negative lines". It is **+7**.

---

## Step 0 — the mandated probe

### Spec consulted first
- `Specification/basic/traits.tex:573-583` — *"Traits may also include **abstract field declarations** that are implicit declarations of abstract getter methods… a field declaration implicitly declares a getter method for the field unless there is an explicit getter declared in the enclosing trait."*
- `Specification/basic/objects.tex:271` — *"Each field is either a **non-transient value parameter of a constructor declaration**, or it is explicitly defined by a field declaration…"*

Together these sanction exactly the move needed: the trait declares `xs` abstractly; `object Vec(xs: List[\Value\])` satisfies it with its own value parameter, at zero extra lines.
- `FortressLibrary.fss:1599` — `trait Rank1 … excludes { Rank2, Rank3, Number, String }`; a subtrait inherits the exclusion.
- `FortressLibrary.fss:1766-1780` — `DelegatedIndexed` supplies `opr |self| = |self.indices|` as a default.

### Four designs, all four run
All derived from `p14_named_spaces.fss` (element type `RR64`; overload resolution among carriers does not depend on element type). All run the flagship line verbatim in shape and reproduce the report's hand-verified numbers exactly. Full outputs in `probe-run.log`.

**Design A — `n1_rowlike_toplevel.fss`** (bare trait, operator at top level):
```
trait RowLike extends { Rank1, ZeroIndexed[\RR64\], DelegatedIndexed[\RR64,ZZ32\] } end
object Vec(xs: List[\RR64\]) extends { RowLike, AdditiveGroup[\Vec\] } … end
object ProbDist(xs: List[\RR64\]) extends { RowLike } … end
opr juxtaposition(w: Mat, x: Vec): Vec = …
opr juxtaposition(p: RowLike, m: Mat): Vec = …      (* written ONCE *)
```
```
softmax(q K^T/SQRT 2) = ProbDist<|0.6697615493266569, 0.3302384506733431|>
attend = Vec<|3.6604769013466862, 4.660476901346686|>
Mat x Vec = Vec<|3.0, 4.0|>
Vec x Mat = Vec<|1.0, 0.0|>
```
Works, first try. Both juxtaposition directions coexist — the Meet of `(Mat, Vec)` and `(RowLike, Mat)` is empty in the second position because the exclusion is inherited.

**Design A2 — `n2_rowlike_getter.fss`** (shared members pushed into the trait; the one that shrinks the file):
```
trait RowLike extends { Rank1, ZeroIndexed[\RR64\], DelegatedIndexed[\RR64,ZZ32\] }
  getter xs(): List[\RR64\]
  getter indices(): Generator[\ZZ32\] = 0 # |self.xs|
  opr |self| : ZZ32 = |self.xs|
  opr [i: ZZ32]: RR64 = (self.xs)[i]
end
…
object ProbDist(xs: List[\RR64\]) extends { RowLike } end      (* ONE line *)
```
Exercises everything the brief listed:
```
softmax(q K^T/SQRT 2) = 0.6697615493266569,0.3302384506733431
attend = Vec<|3.6604769013466862, 4.660476901346686|>
Mat x Vec = Vec<|3.0, 4.0|>
Vec x Mat = Vec<|1.0, 0.0|>
|p| = 2   p[0] = 0.6697615493266569
SUM over p (generator) = 1.0
Vec = Vec (reflexive) : true
Mat = Mat (reflexive) : true
zip on Vec : Vec<|2.0, 0.0|>
p indices  : <|0, 1|>
```
**Nothing breaks.** `opr =` still overrides the `HasRank` reflexive-false landmine through the intermediate trait (`x = x` is `true`); `|x|`, subscripting, `zip`, and generator integration all work on the object whose members are *inherited* rather than declared. (The bare `ProbDist` printout is `DelegatedIndexed`'s default `asString`; microgpt2 has no `asString` getters and prints no carrier, so this is cosmetic to the probe.)

**Design B — `n3_rowlike_method.fss`** (the operator as a functional method on the trait, `self` in first position):
```
  opr juxtaposition(self, m: Mat): Vec =
    Vec(<|[\RR64\] SUM[j <- self.indices] (self[j] (m[j])[c]) | c <- (m[0]).indices |>)
```
```
attend = Vec<|3.6604769013466862, 4.660476901346686|>
Mat x Vec = Vec<|3.0, 4.0|>
Vec x Mat = Vec<|1.0, 0.0|>
```
**Also works** — a functional-method `juxtaposition` legally coexists with the top-level `Mat × Vec` overload. Rejected on notation grounds only: it would hide one juxtaposition direction inside a trait body while its twin sits in the notation layer, against the render sheet's claim that each operator is defined once, in one place.

**Design C — `n4_rowlike_comprises.fss`** (A2 + `comprises { Vec, ProbDist }`): identical output. Works. Not adopted — costs a line, lists the roster twice, buys exhaustiveness nothing needs.

**Design A3 (adopted) — `n6_rowlike_absfield.fss`**: `getter xs(): List[\RR64\]` replaced by the spec's own terser idiom `xs: List[\RR64\]`. Identical output. Adopted because the order-of-authority rule prefers the spec's construct, it is shorter, and it renders as `xs: List⟦Value⟧`, visually mirroring `object Vec(xs: List⟦Value⟧)` one line below.

### Verdict
**Dedup works; it is not close.** Four mechanisms, four green runs, no dead ends to classify. Measured saving: **6 lines and one verbatim duplicated operator body**.

The page's exhibit is not lost — it is sharpened and made honest: *Fortress specifies transparent type aliases (`basic/types-vals-vars.tex:597-623`) and stops one line short of them (`IndexBuilder.scala:187`, expansion already written and unreachable at `TypeAnalyzer.scala:552-557`). So a signature can name a space only by minting a new nominal type. Minting costs something, and the language is good enough to make it cheap: a shared supertype writes the operator once, and `ProbDist` costs two lines. The alias would have cost zero, and would have needed no lift at softmax's exit. Both files exist and both pass the golden check; the difference is six lines.*

---

## Step 1 — `KVCache`

```
object KVCache(heads: List[\Mat\])
    extends { ZeroIndexed[\Mat\], DelegatedIndexed[\Mat,ZZ32\] }
  getter indices(): Generator[\ZZ32\] = 0 # |heads|
  opr |self| : ZZ32 = |heads|
  opr [h: ZZ32]: Mat = heads[h]
  extend(ks: List[\Vec\]): KVCache =
    KVCache(<| (heads[h]).addRight(ks[h]) | h <- self.indices |>)
end
emptyCache(nh: ZZ32): KVCache = KVCache(<| Mat(emptyList[\Vec\]()) | h <- 0#nh |>)
```
```
- forward(t: ZZ32, i: ZZ32, kh: List[\Mat\], vh: List[\Mat\])
-     : (Vec, List[\Mat\], List[\Mat\]) = do
+ forward(t: ZZ32, i: ZZ32, kh: KVCache, vh: KVCache): (Vec, KVCache, KVCache) = do
-   K = <| (kh[h]).addRight(_Wk[h] x2) | h <- 0#nHead |>
-   V = <| (vh[h]).addRight(_Wv[h] x2) | h <- 0#nHead |>
+   K = kh.extend(<| _Wk[h] x2 | h <- 0#nHead |>)
+   V = vh.extend(<| _Wv[h] x2 | h <- 0#nHead |>)
```
`emptyHist` is gone; the three `var (kh, vh)` declarations become `(KVCache, KVCache) := (emptyCache(n), emptyCache(n))`.

### Line accounting — measured
`microgpt2_kvonly.fss` (shipped file with **only** Step 1) strips to **213**. So `KVCache` is **+7**:

| | lines |
|---|---|
| the carrier object | +8 |
| `emptyCache` | +1 |
| `emptyHist` removed | −1 |
| `forward` signature: two lines → one | −1 |
| the two extension comprehensions | **±0** — still two lines, now `kh.extend(…)` instead of reaching inside with `(kh[h]).addRight(…)` |
| the three `var (kh, vh)` declarations | ±0 (shorter, same count) |
| **net** | **+7** |

**Why the report's "net negative" was wrong**, recorded as a repeatable estimation error: it listed everything the carrier *removes* and never priced the carrier itself. The extension comprehensions in particular do not vanish — two cache directions stay two lines; what changes is that the line stops reaching into the cache's representation.

**What +7 buys:** the file's one genuine type ambiguity is gone (`List[\Mat\]` spelled both the per-head *weight* bundles and the per-head *KV history*, needing a comment to disambiguate); `forward`'s type reads at a glance and fits on one line; extension is one named operation with the paper's own name on the paper's own noun.

**One line available, deliberately not taken.** `KVCache`'s `opr |self|` is provably dead and `DelegatedIndexed` supplies the default — verified by `n5_kvcache_nolen.fss`, which drops it and still runs (`K after two steps = KVCache<|Mat<|…|>|>` / `|K2[0]| = 2`). Rejected for carrier uniformity: the file's header claims the carriers get their whole interface "from three one-line members", and `Vec`/`Mat` both declare all three.

---

## Step 2 — `ProbDist`

```
trait RowLike extends { Rank1, ZeroIndexed[\Value\], DelegatedIndexed[\Value,ZZ32\] }
  xs: List[\Value\]
  getter indices(): Generator[\ZZ32\] = 0 # |self.xs|
  opr |self| : ZZ32 = |self.xs|
  opr [i: ZZ32]: Value = (self.xs)[i]
end
object Vec(xs: List[\Value\]) extends { RowLike, AdditiveGroup[\Vec\] } … end
object ProbDist(xs: List[\Value\]) extends { RowLike } end

- opr juxtaposition(p: Vec, m: Mat): Vec =
+ opr juxtaposition(p: RowLike, m: Mat): Vec =
- softmax(a: Vec): Vec = do  …  e / sum(e)
+ softmax(a: Vec): ProbDist = do  …  ProbDist((e / sum(e)).xs)
- sample(p: Vec): ZZ32 = do
+ sample(p: ProbDist): ZZ32 = do
```

`nll(logits: Vec, y: ZZ32): Value` is **unchanged**, as specified — not one character of the loss block moved while `p` quietly became a distribution.

**The flagship line is verbatim**: `attend(q: Vec, K: Mat, V: Mat): Vec = softmax(q K^T / SQRT d_k) V`, character-identical at `microgpt2.fss:267`, and `block-attention.*` were **not** regenerated (`git status` confirms). Its meaning is strictly richer: `softmax(…) V` now resolves to `RowLike × Mat` with a `ProbDist` on the left, via the *same definition* the `q K^T` on the same line uses.

### Line accounting — measured

| | lines |
|---|---|
| `trait RowLike` | +6 |
| `Vec` loses three indexed members; 3-line `extends` collapses to one | −5 |
| `object ProbDist(…) extends { RowLike } end` | +1 |
| signature changes (`softmax`, `sample`, `juxtaposition`) | ±0 |
| **net** | **+2** |

Counterfactual `microgpt2_nodedup.fss` (built, golden-green): **221** stripped lines = **+8** on top of the KVCache-only 213. Dedup saving: **6 lines**, and the duplicated operator body never exists.

### The one residue
`ProbDist((e / sum(e)).xs)` unwraps and relabels — the only place a carrier's representation is touched outside its own body, and it exists solely because `ProbDist` is a new nominal type. Rejected alternatives: `s = sum(e)` + comprehension (costs a line and destroys the visible `e / sum(e)` formula in the figure); a `probs(x: Vec): ProbDist` lift (costs a line, adds indirection); repurposing `opr /(x: Vec, s: Value)` (impossible — `rmsnorm` needs it returning `Vec`). Kept because it preserves the formula and *is* the price tag.

---

## Gates (worktree, `FORTRESS_THREADS=1`, JDK 25)

Final file (`gate-final.log`):
- **goldenCheck at 1e-9: PASS** — `golden transformer forward/backward vs Python reference: PASS` (15 logits over 3 positions, mean loss 1.228662661701597, 5 gradients).
- **30-step training:** 1264 params; step 1 loss 3.3249 → step 30 2.9884, min 2.6245; first-10 mean 3.1669, last-10 mean 2.9903 (ln 27 = 3.296; unseeded Box–Muller weights, so trajectories differ per run).
- **s/step 3.36** — vs the diet report's 6.19; the box is quieter today, not the code faster (earlier gates of the same file: 3.35, 3.26). No measurable cost from the extra dispatch layer.
- 10 samples emitted, BOS-terminated, all lowercase a–z.

| file | stripped lines | goldenCheck | s/step |
|---|---|---|---|
| `microgpt2.fss` (delivered) | **215** | PASS | 3.36 |
| `microgpt2_nodedup.fss` | 221 | PASS (`gate-nodedup.log`) | 3.29 |
| `microgpt2_kvonly.fss` | 213 | — (counting artifact) | — |
| shipped file before this round | 206 | PASS (diet report) | 6.19 |

## Segment table (`segments2.py`, same instrument and rules as the diet report; no unassigned lines)

| segment | Python | before | after | delta |
|---|---|---|---|---|
| boilerplate / imports | 1 | 7 | 7 | ±0 |
| data + tokenizer | 15 | 12 | 12 | ±0 |
| autodiff engine | 38 | 49 | 49 | ±0 |
| notation layer | 2 | 32 | **42** | **+10** |
| model blocks | 42 | 37 | **36** | **−1** |
| config + weight init | 16 | 21 | 21 | ±0 |
| optimizer (Adam) + training loop | 24 | 29 | 29 | ±0 |
| sampling + inference | 14 | 19 | 19 | ±0 |
| **total** | **152** | **206** | **215** | **+9** |

math half 118 → **127**; harness half 88 → **88**. `KVCache`'s carrier body counts as notation layer (it is a carrier, as `Vec`/`Mat` are); `emptyCache` counts as model blocks, exactly where `emptyHist` was counted. The layer that *states* the spaces grew; the layer that *uses* them shrank.

---

## Step 3 — Fortify figures

| figure | regenerated? | why |
|---|---|---|
| `block-softmax` | **yes** | `: Vec` → `: ProbDist`; body's last line is the lift |
| `block-forward` | **yes** | signature collapses to one line with `KVCache`; the two `extend` lines |
| `sheet-notation` | **yes** | roster changed: `RowLike` + `ProbDist` added, `Vec` shortened, `KVCache` + `emptyCache` added, `juxtaposition` restated on `RowLike` |
| `block-attention` | **no** | flagship line verbatim (confirmed by `git status`) |
| `block-loss` | **no** | `nll`'s text unchanged (only `p`'s type changed, invisibly) |
| `block-embedding`, `block-rmsnorm`, `block-ffn` | **no** | untouched source |
| `sheet-engine` | **no** | engine untouched; `sum(x: Vec) = sum(x.xs)` same text, `x.xs` now reaches the trait's abstract field |

Headers of the three regenerated `.tic` files were updated to say what they now show; recipe lines unchanged. Every render rasterized and inspected by eye (light and dark).

**Typesetting check — both names typeset as words**, roman, no underscore-bold, no mangling: `softmax(a: Vec): ProbDist`; `forward(t: ℤ32, i: ℤ32, kh: KVCache, vh: KVCache): (Vec, KVCache, KVCache)`; `object ProbDist(xs: List⟦Value⟧) extends { RowLike } end`. The spec's abstract field renders `xs: List⟦Value⟧`, mirroring `object Vec(xs: List⟦Value⟧)` one line below — the "declared here, supplied there" relationship is legible without a caption.

---

## Traps and findings worth carrying

1. **An object's value parameter satisfies a trait's abstract field.** Both `getter xs(): List[\Value\]` and the spec's terser `xs: List[\Value\]` work; `object Vec(xs: …)` needs no extra member. Spec: `basic/traits.tex:573-583` + `basic/objects.tex:271`. This is what makes carrier dedup free.
2. **A `Rank1` subtrait inherits the `excludes`.** Stating an overload on `RowLike` rather than `Vec` keeps both juxtaposition directions legal. Three independent confirmations (A/A2, B, C).
3. **`comprises` on such a trait is legal and inert here** — the spec's exhaustiveness machinery is otherwise little exercised in this tree.
4. **A functional-method operator (`opr juxtaposition(self, m: Mat)`) coexists with a top-level overload of the same operator.**
5. **`DelegatedIndexed` supplies `opr |self|` for free** (`= |self.indices|`). Every carrier here declares it anyway; at least one declaration is provably dead (`n5_kvcache_nolen.fss`).
6. **Estimation trap:** costing a carrier by what it deletes, not by what it is. `KVCache` was forecast net-negative and is +7. Price the object body first.
7. **`bin/fortick` leaves a `.tex` beside the `.tic`.** Three strays were created and deleted; `git status` is clean.

---

**Worktree state:** exactly 10 modified files — `explorations/microgpt2.fss` and the nine `explorations/fortify/{block-softmax,block-forward,sheet-notation}` artifacts. Nothing else, no untracked byproducts, no commits.