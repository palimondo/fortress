<!-- Worker draft, 2026-09-15. The cost rows and the gap rows are the coordinator's: this draft carries the correspondence table, the departures, the counts and the model run's timings, and nothing it did not measure. The two full check runs (pool sizes 1 and 4) are the coordinator's too; what is here is the smoke. -->

# The focused base: report

The flat-style microGPT (`../reference/hsu-flat/microgpt_concise.dyalog`, 25 code
lines) runs inside `apl⦇ … ⦈` over a base built for it alone -- `AplMgSyntax.fsi`
(446 lines, 197 rule alternatives of which 124 are name lines) and `AplMg.fss`
(39 lines, 11 declarations) -- against Run C4's `FlatArrays` and `FlatData`
imported unchanged. No `aplCall`, no frame stack, no `Any`-typed read, no
`Object` result: every rule expands to a typed host entry, and every expansion is
C4's own line.

The model prints the oracle's five losses (`checks/model_run.out`):

```
microgpt apl (focused base) | params 4192 | corpus 2000 x 17 | batch 1, 5 steps
step 1 loss 3.3659669475848513  (4308 ms)
step 2 loss 3.424272783871772   (4001 ms)
step 3 loss 3.177802125458053   (3856 ms)
step 4 loss 3.066355684224198   (4223 ms)
step 5 loss 3.2208830897506235  (4134 ms)
```

against `../../run-c/goldens/losses_batch1_5steps.txt`

```
3.365966947584851  3.424272783871772  3.177802125458053  3.066355684224198  3.2208830897506235
```

-- steps 2 to 5 identical to the last digit, step 1 differing by 4.44e-16, which
is exactly C4's own difference on this host
(`../../run-c4/checks/rerun-post-restart/threads1.txt`). The whole FORWARD pass
was also compared intermediate by intermediate against C4's hand-written lines in
one component (`diag_fwd.fss`, `checks/diag_fwd.out`): **every intermediate has
maxdiff 0.0** -- mask, ids, tg, vm, pos, X, Xp, X1, Q, K, Vv, Qh, A, Hc, X2, M0,
Mr, X4, Pr -- and the loss differs by 0.0.

## Correspondence, one row per Dyalog line

Columns: the Dyalog line; the APL text in `MicroGptApl.fss` (physical line); the
expansion as the rules actually write it; C4's line in
`../../run-c4/src/MicroGptFlat.fss`. "host" means the line is C4's, verbatim but
for the APL spellings of the names.

| Dyalog | APL text here | the expansion the rules write | C4 |
|---|---|---|---|
| L6 `⎕IO←0` | nothing | — | — (index origin 0 is the base's own) |
| L6 `NE BLK NH HD VS BOS←16 16 4 4 27 26` | 24 host | — | 17, `ZZ32` as C4 has them |
| L6 `EPS LR0 B1 B2 EPSA←1E¯5 …` | 25 host | — | 18, with `Nsteps` from L30 |
| L7 `rmsn←{…}`, `sm←{…}` | 31, 32 host | — | 27, 28 |
| L7 `MK←¯1E10×~(⍳BLK)∘.≥⍳BLK` | 33 `Mk = apl⦇ (-10*10)×~(⍳Blk)∘.≥⍳Blk ⦈` | `(-(pow(1.0 10, 10))) (outerLt(iota(Blk), iota(Blk)))` | 29 (the same matrix by a fill) |
| L8 `rmsn_b`, `sm_b` | 34–38 host | — | 30–34 |
| L9–L11 layout, `v` | 43–52 host | — | 37–45 |
| L12 corpus | 57–59 host; `Tokm = corpus.tokm`, `Len = corpus.len`, `ZZ32` as they are | — | 48 |
| L13 `B←≢b ⋄ N←B×BLK` | 72 `B←≢b ⋄ N←B×Blk` | `tally(b)`, `(B) (Blk)` | 52 |
| L13 `R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK]` | 72 as written | `gather(Tokm, b)`, `ravel(cols(R, iota(Blk)))`, `ravel(cols(R, 1 + iota(Blk)))` | 52 (`corpus.tokens(b,0)`, `(b,1)`) |
| L13 `vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK` | 72 as written | `ravel(outerGt(gatherV(Len, b), iota(Blk)))`, `SUM vm`, `cycle(N, iota(Blk))` | 52 (`corpus.valid`, `corpus.positions`) |
| L14 `wte … f2←v¨⍳9` | 73 `…←vw¨⍳9` | `(vw(0), vw(1), …, vw(8))` | 53 |
| L15 `X←wte[ids;]+wpe[pos;] ⋄ Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp` | 74 as written | `gather(wte, ids) + gather(wpe, pos)`, `rows(rmsn, X)`, `rows(rmsn, Xp)` | 57 |
| L16 `Q K Vv←X1∘(+.×⍉)¨wq wk wv` | 75 **the Dyalog's own tacit spelling** | `((X1) (transpose(wq)), (X1) (transpose(wk)), (X1) (transpose(wv)))` | 58 |
| L16 `h←{…} ⋄ Qh Kh Vh←h¨Q K Vv` | 70 host `h`, 75 `Qh Kh Vh←h¨Q K Vv` | `(h(Q), h(K), h(Vv))` | 54, 58 |
| L17 `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` | 76 as written with `Mk Hd` | `rows(sm, Mk + ((Qh) (transpose(Kh))) / SQRT (1.0 Hd))` | 59 |
| L17 `Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh` | 76 `Hc←u A+.×⍤2⊢Vh`, 71 host `u` | `u((A) (Vh))` | 55, 59 |
| L18 | 77 as written | `Xp + (Hc) (transpose(wo))`, `rows(rmsn, X2)`, `(X3) (transpose(f1))`, `0.0 MAX M0`, `X2 + (Mr) (transpose(f2))` | 60 |
| L19 | 78 as written | `rows(sm, (X4) (transpose(lm)))`, `- ((vm DOT log(pick(Pr, tg))) / nv)` | 61 |
| L20 | 79 as written | `(diag(vm / nv)) ((Pr - onehot(tg, Vs)))`, `(transpose(dL)) (X4)`, `(dL) (lm)` | 63 |
| L21 | 80 as written | `(transpose(dX4)) (Mr)`, `((dX4) (f2)) × (M0 > 0.0)`, `(transpose(dM0)) (X3)`, `(dM0) (f1)` | 64 |
| L22 | 81 as written | `dX4 + rows(rmsn_b, dX3, X2)`, `(transpose(dX2)) (Hc)`, `h((dX2) (wo))` | 65 |
| L23 | 82 as written | `(transpose(A)) (dH)`, `rows(sm_b, A, (dH) (transpose(Vh))) / SQRT (1.0 Hd)` | 66 |
| L24 `… ⋄ u←{…} ⋄ dQ dK dV←u¨dQh dKh dVh` | 83 as written without the `u←` | `(dS) (Kh)`, `(transpose(dS)) (Qh)`, `(u(dQh), u(dKh), u(dVh))` | 67 |
| L25 `gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV` | 84 `gWQ gWK gWV←X1∘(+.×⍨⍉)¨dQ dK dV`, a tacit spelling | `((transpose(dQ)) (X1), (transpose(dK)) (X1), (transpose(dV)) (X1))` | 68 |
| L25 `dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv` | 84 as written | `((dQ) (wq)) + (((dK) (wk)) + ((dV) (wv)))` | 68 |
| L26 | 85 as written | `dX2 + rows(rmsn_b, dX1, Xp)`, `rows(rmsn_b, dXp, X)` | 69 |
| L27 | 86 as written | `(transpose(onehot(ids, Vs))) (dX)`, `(transpose(onehot(pos, Blk))) (dX)` | 70 |
| L28 `loss(⊃,/,¨gWTE … gF2)` | 87 `gr←⊃,/,¨gWTE … gF2 ⋄ loss gr` | `flat(gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2)`, then `(loss, gr)` | 71 |
| L29 `ADAM` | 96 one APL block | `(B1) (M) + ((1 - B1)) (gr)`; `(B2) (V) + ((1 - B2)) ((gr) × (gr))`; `P - (lr) (((Mn / (1 - pow(1.0 B1, t))) / (Epsa + SQRT (1.0 (Vn / (1 - pow(1.0 B2, t)))))))`; `(Pn, Mn, Vn)` | 77–80 |
| L30 schedule | 102 `apl⦇ Lr0×1-sf÷Nsteps ⦈`, `sf = 1.0 s` host | `(Lr0) ((1 - (sf / Nsteps)))` | 82 |
| L30 loop | 104–116 host | — | 85–97 |

Nineteen of the 25 Dyalog lines are APL text; the six host lines are the two
hyperparameter lines, the four vector functions, the layout table, the corpus and
the training loop, each for the reason the design gives.

## Departures

**From the previous rung's text, as the design asks, exactly two:**

1. L16 goes back to the Dyalog's own tacit spelling `X1∘(+.×⍉)¨wq wk wv`; the
   microGPT rung had to write `{X1+.×⍉⍵}¨wq wk wv`.
2. L25 takes a tacit spelling `X1∘(+.×⍨⍉)¨dQ dK dV` instead of the dfn
   `{(⍉⍵)+.×X1}¨dQ dK dV`.

Both are one grammar rule each, expanding to a tuple of products; probe y05.
Everything else is the rung's text **minus every conversion**: keys are `ZZ32`
throughout, so `aplOfInt` and `aplInt` are gone from the component, the corpus
arrays are read as they are, and the step counter stays `ZZ32`.

**From the design, three, all forced and all in the glue:**

1. `ravel` is ONE declaration generic in the element type
   (`ravel[\T extends Number, nat r, nat c\]`), not two. Two declarations
   differing only in `ZZ32` against `RR64` are refused at load time
   (`checks/model_run.out.0`):

   ```
   ravel[\nat r,nat c\](m:Matrix[\RR64,r,c\]) … and
   ravel[\nat r,nat c\](m:Matrix[\ZZ32,r,c\]) … have parameters
   with generic type, at least one pair of parameters must have excluding types
   ```

   This is FlatArrays' own idiom for `gather`, so the departure costs nothing.
2. The vector `gather` is named `gatherV`. FlatArrays already exports `gather`
   over a matrix; a second api exporting the same name into the same component
   was not worth the risk, and the rule for `v[i]` names `gatherV` instead.
3. **`s*t` expands to `pow(1.0 (l), (r))`, not to the host's caret.** This is the
   one real finding of the rung, and it cost three runs. A template that writes
   the host caret **silently drops its right operand**:

   ```
   | l:AplAtom SPACE `* SPACE r:AplE => <[ (1.0 (l)) ^ (r) ]>
   ```

   expands to `1.0 (l)`. There is no diagnostic: `apl⦇ 10*10 ⦈` evaluated to
   `10.0` and `apl⦇ 2*3 ⦈` to `2.0` (`checks/model_run.out.1` is the run this
   produced, with the causal mask `-10` instead of `-1E10`, `Mk[0,1] = -10.0`,
   and every loss wrong from the seventh digit: step 1 `3.3659665281147144`
   against the golden `3.365966947584851`). With `pow` declared in `AplMg` the
   same rule gives `1.0E10`, `8.0`, and the whole forward pass matches C4 to
   0.0. **Candidate gap-ledger row**, and a warning for every later
   sub-language: an infix host operator inside a template may lose its right
   operand without a word.

Two further mechanical facts, recorded in `../probes-4b/PROBES.md` and worth
carrying: a macro bracket used bare as a juxtaposed argument
(`println "…" s6⦇ … ⦈`) does not match its rule at all -- it must be
parenthesised -- and rule order decides only inside an ordinary nonterminal,
because the closing bracket makes the parser backtrack between alternatives of
one bracket name.

## What the base costs in lines

| | universal base (`../base`) | focused base (here) |
|---|---|---|
| grammar | `AplSyntax.fsi` 899 lines | `AplMgSyntax.fsi` 446 lines |
| grammar rule alternatives | — | 197, of which 124 are name lines and 73 are rules |
| expression rules | — | 37 alternatives of `AplE` |
| library | `AplCore.fss` 2343 + `AplCore.fsi` 850 | `AplMg.fss` 39 + `AplMg.fsi` 51, **11 declarations** |
| model | `../microgpt/MicroGptApl.fss` 76 code lines | 70 code lines |

The eleven glue declarations: `tally`, `iota`, `ravel`, `cols`, `gatherV`,
`outerGt`, `outerGe`, `outerLt`, `cycle`, `opr +` (an integer scalar plus an
integer array) and `pow`. `outerGe` is declared and unused -- the causal mask
folds the negation into `outerLt` -- and is kept because the design names it.
Everything else is `FlatArrays`, imported unchanged.

## The model run

Wall time 35 s for the whole run including parser generation and the corpus load;
per step 4308, 4001, 3856, 4223, 4134 ms (mean 4104 ms), `FORTRESS_THREADS=1`,
JDK 25. The previous rung's five steps on the same host were 9541, 8996, 9146,
8969, 9171 ms (`../microgpt/checks/model_run.out`), so the focused base's step is
**2.2x faster** than the universal base's -- the general route's sequential loops
and frame pushes are gone. The comparison that decides the rung is against C4
itself, at both pool sizes, and that is the coordinator's row.

## Gates

- Five losses against the goldens: **pass** (four identical, one at 4.44e-16,
  which is C4's own difference).
- Forward pass against C4 line by line: **every intermediate 0.0**
  (`checks/diag_fwd.out`).
- `MicroGptAplCheck.fss` copied here unchanged but for its header comment. The
  smoke at `FORTRESS_THREADS=1` finished inside the 12-minute mark, in 454 s:
  **40 PASS, 0 FAIL of 40 -- ALL PASS**
  (`checks/check_smoke_threads1_complete_40of40.out`), with the step-0 gradient
  at 1.11e-16 and P after Adam at 8.33e-17, exactly C4's own numbers. For scale
  only: C4's recorded threads-1 check on this host was 528 s and the universal
  base's rung 973 s. The two recorded full runs are the coordinator's.

## Cost and gap rows

Left for the coordinator.
