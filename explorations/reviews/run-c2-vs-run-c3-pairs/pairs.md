# C2 vs C3: the sixteen paired rows

Matching is by Dyalog line; `pairs.html` shows the rendered cells.
Fortress line counts are counted from each tour's Fortress code block
(C2: the `<br>`-separated Fortress column of `run-c/tour.md`; C3: the
fenced block of each section of `run-c3/tour.md`).

| # | pair | Dyalog (C3's wording) | C2 row | C3 section | C2 lines | C3 lines |
|---|---|---|---|---|---|---|
| 1 | hyperparameters | `⎕IO←0 ⋄ NE BLK NH HD VS BOS←16 16 4 4 27 26 ⋄ EPS LR0 B1 B2 EPSA←1E¯5 0.01 0.85 0.99 1E¯8` | row 1 | 1 | 2 | 4 |
| 2 | rmsn | `rmsn←{⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}` | row 2 | 2 | 1 | 1 |
| 3 | sm | `sm←{e÷+/e←*⍵-⌈/⍵}` | row 3 | 3 | 1 | 1 |
| 4 | rmsn_b | `rmsn_b←{r←(EPS+(+/⍵*2)÷≢⍵)*0.5 ⋄ y←⍵÷r ⋄ (⍺-y×(+/y×⍺)÷≢y)÷r}` | row 5 | 5 | 5 | 4 |
| 5 | the keys of a batch | `b←⍵ ⋄ B←≢b ⋄ N←B×BLK ⋄ R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK] ⋄ vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK` | row 11 | 11 | 9 | 1 |
| 6 | the nine views | `wte wpe lm wq wk wv wo f1 f2←v¨⍳9` | row 12 | 12 | 1 | 1 |
| 7 | the heads split | `h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv` | row 14 | 16 | 4 | 1 |
| 8 | attention weights | `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` | row 15 | 17 | 2 | 1 |
| 9 | heads applied to values | `Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh` | row 15 | 18 | 2 | 1 |
| 10 | probabilities and loss | `Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv` | row 17 | 20 | 2 | 1 |
| 11 | backward: loss and output head | `dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm` | row 18 | 21 | 3 | 1 |
| 12 | backward: values and scores | `dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5` | row 21 | 24 | 2 | 2 |
| 13 | backward: queries, keys, un-heading | `dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←{(N,NE)⍴0 2 1 3⍉⍵} ⋄ dQ dK dV←u¨dQh dKh dVh` | row 22 | 25 | 3 | 1 |
| 14 | backward: the embeddings | `gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX` | row 25 | 28 | 2 | 1 |
| 15 | the step's result | `loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)` | row 26 | 29 | 2 | 1 |
| 16 | Adam | `ADAM←{(t lr g)←⍵ ⋄ M∘←(B1×M)+(1-B1)×g ⋄ V∘←(B2×V)+(1-B2)×g*2 ⋄ P∘←P-lr×(M÷1-B1*t)÷EPSA+(V÷1-B2*t)*0.5}` | row 27 | 30 | 4 | 2 |

Notes

- C2 row 14 is one row for `Q K Vv←…` and the `h←…` split; C3 splits them
  into sections 15 and 16, so pair 7 sets C3 §16 against the whole C2 row.
- C2 row 15 is one row for `A←…` and `Hc←…`; C3 splits them into sections
  17 and 18, so pairs 8 and 9 both use C2 row 15.
- C3 §1's code block is an excerpt: four of the fourteen declarations, as
  its own note says. The count of 4 is the count in the block.
