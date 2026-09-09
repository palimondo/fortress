<!-- Produced by a delegated experiments worker (Python-side only) answering
     Pavol's training-dynamics questions, 2026-08-26. The instrumented twin
     script lives only in the producing session's scratchpad (blog code,
     license unstated); chart committed alongside as training-dynamics-chart.svg.
     Design journal: explorations/microgpt-native.md. -->

# microgpt nano training dynamics: the sawtooth, an honest curve, and where to stop

*Python-only investigation, 2026-08-27. No Fortress training was run. The
instrumented twin is `scratchpad/microgpt_nano_val.py` (scratchpad only — the
blog code's license is unstated). Chart: `scratchpad/training-dynamics-chart.svg`.*

**Provenance.** The twin is the previous round's re-assembly of Karpathy's
`microgpt.py` (`Value`, `linear`, `softmax`, `rmsnorm`, `gpt`, Adam and the sampler
verbatim from the post's code blocks) at the Fortress v1 nano config: vocab 27,
`n_embd 8`, `n_head 2`, `n_layer 1`, `block_size 8`, first 2,000 lines of
`explorations/names.txt` **in file order** (no shuffle — `microgpt.fss` does not
shuffle), Adam(0.01, 0.85, 0.99, 1e-8) with linear decay. Seed 42 at 250 steps
still reproduces `py-nano-losses.txt` to all four printed digits at every step
(3.2010, 3.0984, 2.6657, …, 2.1640, 2.4328).

**What was added, and proof it changed nothing.** A fixed held-out set (names on
lines 2001–2200, asserted disjoint from the training set), a float-only mirror of
`gpt()` for validation and sampling, running means, and checkpoint sampling on a
private `random.Random`. Two checks:

- the float mirror agrees with the `Value` path to **exactly 0.0** (not 1e-12 —
  bit-identical) on 40 documents;
- the instrumented twin at seed 42 / 250 steps prints the **identical** 25 loss
  values as the un-instrumented one. Nothing draws from the global RNG after
  weight init, so the trajectory is untouched.

Runs: seeds 42, 1337, 2026 × 2,000 steps, validation every 10 steps; plus a
250-step run (the shipped nano config, where the lr schedule actually ends at 250)
and a 4,000-step run to exercise the document-pointer wrap.

---

## 1. Why the sawtooth

**The printed loss is one document.** From the training loop, unmodified:

```python
doc = docs[step % len(docs)]          # ONE name
tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
n = min(block_size, len(tokens) - 1)
...
loss = (1 / n) * sum(losses)          # mean over that name's positions only
print(f"step {step+1:4d} / {num_steps:4d} | loss {loss.data:.4f}")
```

There is no batch, no running average, no evaluation set. `docs` is built by
reading the file top to bottom with no shuffle, and the pointer is
`step % len(docs)` — deterministic. So **step *k* is the same name in every run**,
and the printed number is the model's average surprise over that one name's 5–8
next-character predictions.

**Measured, not assumed.** Across the three seeds, over steps 501–2000:

| quantity | value |
|---|---|
| variance of the per-step loss *across steps* (seed-averaged) | 0.1943 |
| variance *across seeds at a fixed step* | 0.0025 |
| **share of per-step variance explained by which document step *k* is** | **98.7 %** |
| step-loss correlation, seed 42 vs 1337 | r = 0.984 |
| step-loss correlation, seed 42 vs 2026 | r = 0.979 |

Three independently initialised models trace the same sawtooth, because the
sawtooth is the *document sequence*, not the optimizer.

**Scale.** Over steps 501–2000 the printed loss ranges 1.2651 → 4.3989, a spread of
**3.13 nats**. The entire held-out improvement from an untrained model to step 2000
is **1.08 nats**. The per-step noise is **2.9×** the whole training signal.

**The two "minima" Pavol pointed at.** In the shipped 250-step nano config
(seed 42):

| printed step | name | len | positions *n* | printed loss | held-out loss of those same weights | gap |
|---|---|---|---|---|---|---|
| 80 | **gianna** | 6 | 7 | 2.1430 | 2.6240 | **+0.481** |
| 200 | **alana** | 5 | 6 | 1.7005 | 2.5003 | **+0.800** |
| 250 | blakely | 7 | 8 | 2.4328 | 2.4853 | +0.053 |

And the decisive measurement — scoring step *k*'s own document against the 200
held-out names **under the very same weights**:

| step | document | its loss under those weights | percentile among the 200 held-out names |
|---|---|---|---|
| 80 | gianna | 2.1136 | **10.5th** |
| 200 | alana | 1.6852 | **0.5th** |
| 250 | blakely | 2.4326 | 47.5th |

(Same probe in the 2,000-step run: gianna 9.5th percentile, **alana 0.0th** — at
step 200 there is *no* held-out name the model finds as easy as `alana`.)

`alana` is five characters of the most common material in the corpus — `a-l-a-n-a`
sits in the 3rd percentile of a reference bigram model fitted on all 32,033 names
— and it is short, so the average is taken over only 6 predictions. `gianna` is
similar (`-anna` ending). Neither number says the model got good at step 80 or 200;
they say the loop happened to reach an easy name. **In the 250-step run the "great
result at step 200" is a model whose actual quality was 2.50 nats — worse than what
the *same* run prints at step 250 for a harder name.**

For completeness, the 10 easiest and 10 hardest steps in the first 250, by the
reference bigram model: easiest are steps 116 (`maria`), 215 (`ana`), 68 (`ariana`),
217 (`mariah`), 19 (`aria`); hardest are steps 77 (`autumn`), 86 (`ivy`), 165
(`sydney`), 88 (`piper`), 40 (`zoe`). Those are exactly the visible troughs and
spikes.

---

## 2. An honest progress curve

Held-out = the 200 names on lines 2001–2200 of `names.txt`, forward pass only,
never trained on, evaluated every 10 steps. Reported as the mean over documents of
Karpathy's own per-document loss, i.e. the same quantity the loop prints — just
averaged over 200 fixed names instead of one moving one.

| step | held-out (mean of 3 seeds) | sd | train, 50-step running mean | train, cumulative mean |
|---|---|---|---|---|
| 0 | 3.3157 | 0.0184 | — | — |
| 10 | 3.1181 | 0.0547 | 3.2124 | 3.2124 |
| 50 | 2.7322 | 0.0183 | 2.8577 | 2.8577 |
| 80 | 2.5917 | 0.0162 | 2.6010 | 2.7481 |
| 200 | 2.4525 | 0.0167 | 2.3827 | 2.5611 |
| 250 | 2.5075 | 0.0140 | 2.3805 | 2.5250 |
| 500 | 2.4233 | 0.0078 | 2.3325 | 2.4406 |
| 1000 | 2.3505 | 0.0078 | 2.3290 | 2.3564 |
| 1500 | 2.2910 | 0.0058 | 2.1824 | 2.3266 |
| 2000 | **2.2725** | 0.0064 | 2.1826 | 2.2994 |

Uniform baseline is −log(1/27) = 3.2958; the untrained model starts marginally
worse than uniform at 3.3157.

Improvement, per segment (mean of 3 seeds):

| segment | held-out | Δ |
|---|---|---|
| 0 → 250 | 3.3157 → 2.5075 | −0.808 |
| 250 → 500 | 2.5075 → 2.4233 | −0.084 |
| 500 → 1000 | 2.4233 → 2.3505 | −0.073 |
| 1000 → 1500 | 2.3505 → 2.2910 | −0.060 |
| 1500 → 2000 | 2.2910 → 2.2725 | −0.019 |

**Findings.**

1. **The three seeds agree to ±0.02 nats.** Cross-seed sd of the held-out loss is
   0.006–0.02 from step 300 onward, versus a per-step train sawtooth of ±1.5 nats.
   The honest curve is *quiet*: it is a clean, monotone-ish descent with no visible
   noise. Everything dramatic in the printed log is an artifact of scoring one
   document.
2. **Nothing has converged at 250.** The shipped nano config stops at held-out
   2.5075 with **0.235 nats** still on the table — **23 %** of the total
   improvement reached by step 2000 happens after step 250. Held-out is still
   falling at step 2000, though the last 500 steps are worth only 0.019 nats, so it
   is flattening rather than finished.
3. **The curve is locally non-monotone, so a single reading is not a measurement
   either.** Held-out is 2.4525 at step 200, 2.5075 at step 250, 2.4803 at step
   300. Single-document updates can move held-out loss in either direction; only
   the trend over a few hundred steps is meaningful. (In the 250-step config the
   same wobble shows as 2.5003 at 200 and 2.4853 at 250.)
4. **The running mean is the right thing to print.** The 50-step trailing mean
   tracks the held-out curve within ~0.1 nats for most of training, at zero extra
   cost — while the cumulative mean lags badly (2.2994 at step 2000 against a true
   2.2725) because it is still averaging in the terrible early model.
5. **At 2,000 steps there is no repetition at all.** `docs[step % 2000]` over 2,000
   steps visits indices 0…1999 exactly once: one epoch, every training name seen
   once. So the printed train loss is *itself* an online held-out measurement, and
   train/held-out cannot diverge by memorisation. The 4,000-step run exercises the
   wrap (step 2001 is `emma` again, = step 1) and held-out keeps falling —
   2.2873 at 2000, 2.2507 at 3000, **2.2195 at 4000** — with no overfitting signal
   even on the second epoch.
6. **Caveat, in the conservative direction.** `names.txt` is frequency-sorted, so
   names 2001–2200 are rarer than names 1–2000: +0.053 nats harder under the
   reference bigram model. The honest curve therefore slightly *understates* the
   model; it does not flatter it. That also explains why the trailing-50 train mean
   (2.18) sits below the held-out value (2.27) at step 2000 — different name
   difficulty, not memorisation.

---

## 3. Checkpoint quality — "is it something recognizable?"

Ten samples, temperature 0.5, sampling RNG re-seeded to 1234 at every checkpoint so
the checkpoints are directly comparable (same sampling randomness, different
weights). Seed-42 run, 2,000-step schedule:

| step | held-out | samples |
|---|---|---|
| 80 | 2.615 | yia, se, ay, a, elela, anra, ela, elie, coh, ana |
| 200 | 2.476 | ula, sara, aa, elia, aansa, ela, anela, sana, alela, ana |
| 250 | 2.527 | ula, sara, ja, juma, dania, leda, lela, sana, ala, ayla |
| 500 | 2.429 | saa, rara, abrce, alahy, anara, anelen, cabea, elara, avisa, amian |
| 1000 | 2.340 | sabrle, araden, jalah, sana, ananer, avana, alica, anave, alalia, sara |
| 2000 | 2.264 | tabry, karee, anela, amla, elana, kana, elana, elana, aurya, alia |

Same checkpoints, other two seeds (to show it is not one lucky draw):

| step | seed 1337 | seed 2026 |
|---|---|---|
| 80 | saa, siia, aa, aooca, aloa, ela, amey, a, ela, aenay | saa, sepa, aa, aria, aary, elia, aona, a, cea, aela |
| 250 | saa, sara, fayla, alala, ala, ama, lala, joa, ala, ana | saa, sayewa, nasela, a, saria, layna, gelanana, jia, belie, ara |
| 1000 | sacisa, araden, elala, sana, anana, allena, alela, anayn, alalia, sara | tadlyn, aradia, jalah, tana, anana, alulea, alela, anave, alalia, saraya |
| 2000 | taby, kainan, ania, adita, elana, kana, elana, elana, avisa, alia | sacly, karia, amia, ablya, elana, kari, elana, elana, aslya, alia |

And from the **shipped 250-step config** (lr actually decays to 0 there):

| step | samples |
|---|---|
| 80 | yla, se, a, ca, elela, anva, ela, ele, ea, ela |
| 200 | vaa, tena, aa, elia, aanye, ela, celela, elaya, ela, aoa |
| 250 | wea, uooa, cayle, aiabe, arena, elia, coema, ahela, ara, poara |

**Reading it.** At step 80 the model has learned "names are short and full of
vowels" — `a`, `ay`, `se`, `ea` are fragments, not names. By 250 there are real
words (`sara`, `dania`, `lela`, `ayla`) mixed with mush. At 1000 nearly every
sample is pronounceable and several are plausible English girls' names (`sara`,
`sana`, `jalah`, `araden`, `alica`). At 2000 the character statistics are clearly
right (`karee`, `anela`, `kana`, `alia`, `tabry`) but a new failure appears:
`elana` is emitted three times in ten — temperature 0.5 on a 1,264-parameter model
collapses onto a few high-probability modes. The 4,000-step checkpoint
(`sabryn, arae, ania, adeya, emana, kana, elana, elana, aursa, alian`) shows the
same. So "better held-out loss" and "more diverse samples" part company somewhere
after step ~1000 at this temperature.

Reference: the real held-out names at lines 2001–2005 are `blythe`, `bridgette`,
`dailyn`, `dawson`, `emmaleigh`.

**Verdict on the question asked.** Step 80 is *not* recognizable, despite printing
2.14. Step 250 is borderline — roughly half the samples are name-like. Step 1000 is
the first checkpoint where a reader would call the output "names". The printed loss
at step 80 (2.14, lower than step 250's 2.43) inverts the true ordering completely.

---

## 4. Where Andrej stops, and why

From the blog copy (`scratchpad/microgpt_post.html`), the shipped configuration is:

```python
n_embd = 16     # embedding dimension
n_head = 4      # number of attention heads
n_layer = 1     # number of layers
block_size = 16 # maximum sequence length
...
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8
num_steps = 1000 # number of training steps
```

with the full corpus (`num docs: 32033`), **4,192 parameters**, and 20 samples at
temperature 0.5 at the end.

**Stopping rationale: there is none.** The post contains no validation split, no
held-out set, no early stopping, no convergence test — the words "validation",
"held-out", "eval", "overfit", "generalize" and "split" (other than
`.split('\n')`) do not appear anywhere in it. `num_steps` is a bare constant with
the comment `# number of training steps`.

The only thing resembling a justification is a wall-clock budget:

> "**The script takes about 1 minute to run on my macbook.** You'll see the loss
> printed at each step:"

and the outcome is described purely as an observed loss level:

> "**Over 1,000 steps the loss decreases from around 3.3 (random guessing among 27
> tokens: −log(1/27) ≈ 3.3) down to around 2.37.** Lower is better, and the lowest
> possible is 0 (perfect predictions), so there's still room to improve, but the
> model is clearly learning the statistical patterns of names."

He is explicit that stopping there is arbitrary and that more would be better:

> "Try playing with the script! You can try a different dataset. Or you can
> **train for longer (increase num_steps)** or increase the size of the model to
> get increasingly better results."

> "*Can I make it generate better names?* Yes. **Train longer (increase
> num_steps)**, make the model bigger (n_embd, n_layer, n_head), or use a larger
> dataset. These are the same knobs that matter at scale."

So: 1,000 steps is a **one-minute demo budget**, chosen so a reader can run the
file and see something. Note also that the ~2.37 he quotes is itself a *last
printed per-document loss* — subject to exactly the sawtooth documented above.

---

## 5. Chinchilla numbers

Tokens seen, counting Karpathy's own accounting (`n = min(block_size, len(doc)+1)`
predictions per step; the nominal `len+1` differs only because names longer than 7
characters get truncated at `block_size 8`):

| | params | steps | tokens (nominal Σ len+1) | tokens actually predicted | tokens/param |
|---|---|---|---|---|---|
| **Fortress nano** | 1,264 | **250** | **1,743** | 1,696 | **1.38** |
| Fortress nano | 1,264 | 1,000 | 7,000 | 6,820 | 5.54 |
| Fortress nano | 1,264 | 2,000 | 14,035 | 13,650 | 11.10 |
| Fortress nano | 1,264 | 4,000 | 28,070 | 27,300 | 22.21 |
| **Karpathy's blog** | 4,192 | **1,000** | — | **7,000** | **1.67** |

The ~20 tokens-per-parameter figure for the nano model is therefore
**20 × 1,264 = 25,280 tokens**, which at this corpus's mean document length
(6.97 tokens/step) is about **3,626 steps** — roughly **14.5×** the 250 steps the
nano config runs, and the 4,000-step run overshoots it slightly (22.2 tok/param).
For Karpathy's own config it would be 20 × 4,192 = **83,840 tokens ≈ 11,977
steps**, about **12×** what the post runs. The whole 32,033-name corpus is only
228,146 tokens at `block_size 16`, i.e. 54 tok/param for his model — so a
Chinchilla-sized data budget is about 2.5 epochs of the full names file.

**What this number is and is not.** The ~20 tokens/parameter heuristic comes from
Hoffmann et al. (2022, "Chinchilla"), and it answers a *resource-allocation*
question: **given a fixed compute budget, how should you split it between model
size and dataset size?** Its answer — scale parameters and training tokens roughly
in proportion, ≈20 tokens per parameter — is a statement about where to sit on an
isoFLOP curve. It is **not** a stopping criterion, and it does not say training
halts, converges, or should halt at that point. Held-out loss keeps falling past it
(measured here: 2.2725 at 11.1 tok/param, 2.2195 at 22.2 tok/param, still
descending). Two further caveats for this exercise: the fit was made on models of
70M–16B parameters trained on 5B–500B tokens, five to seven orders of magnitude
above 1,264 parameters, so quoting it here is an extrapolation far outside its
fitted regime; and it assumes one pass over fresh data, which stops being true for
this model after step 2,000. Treat the numbers above as a *sense of scale* — "the
nano config trains on about 1/15th of the data its parameter count would want" —
and let the held-out curve, not the heuristic, decide when to stop.

---

## 6. Chart

`scratchpad/training-dynamics-chart.svg` (self-contained, light background).

- **Top panel** — the per-step training loss in faint gray on the range it actually
  spans (1.0–4.5), its 50-step running mean in orange, and the held-out median in
  blue, all on one scale, so the sawtooth's amplitude relative to the trend is
  visible rather than argued.
- **Bottom panel** — the same x axis, zoomed to 2.20–3.40: the three seeds'
  held-out curves as a min–max band with the median heavy, plus the running mean
  where it enters the window.
- Steps 80 / 200 / 250 / 1000 are marked with dashed lines through both panels,
  labelled with the name the loop is scoring at that step, and a dot on the printed
  loss.
- **Right column** — the checkpoint samples with each checkpoint's held-out loss,
  so "is it recognizable?" reads next to the curve, with real held-out names at the
  bottom for calibration.

Palette validated with the dataviz skill's checker
(`#2f6fb5` / `#b25a1a`: all six checks pass on a light surface); the faint per-step
trace is a recessive context layer in muted ink, direct-labelled.

---

## Artifacts (all scratchpad, nothing committed)

| file | what |
|---|---|
| `microgpt_nano_val.py` | the instrumented twin (validation, running means, checkpoint sampling, difficulty probe, `--selfcheck`) |
| `dyn-42.json`, `dyn-1337.json`, `dyn-2026.json` | 2,000-step runs, full per-step and per-eval record |
| `dyn250-42.json`, `dyn4000-42.json` | the shipped 250-step config; the 4,000-step wrap demo |
| `dyn-*.log` | run logs including the per-checkpoint percentile probes |
| `dyn_analysis.py`, `dyn_analysis.txt` | the variance decomposition and tables above |
| `name_difficulty.py`, `extra_evidence.py` | reference-bigram difficulty, train/held-out difficulty comparison, Chinchilla arithmetic |
| `mkdynchart.py`, `training-dynamics-chart.svg`, `.png` | the chart and its generator |
| `microgpt_nano.py`, `microgpt_post.html`, `post_text.txt` | the prior round's twin and the blog copy (license unstated — never commit) |
