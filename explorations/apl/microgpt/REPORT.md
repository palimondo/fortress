<!-- Report of the microGPT rung, the last rung of the APL side quest, written by the coordinating session on 2026-09-14 from the two workers' notes (probes/PROBES.md, NOTES-worker.md), the component and the check outputs under checks/. The design is DESIGN.md; the inventory INVENTORY.md. -->

# The microGPT rung: report

The flat-style microGPT (`../reference/hsu-flat/microgpt_concise.dyalog`, 25 code lines) runs inside `apl⦇ … ⦈` over the base of rungs 1–6 plus five additions, in `MicroGptApl.fss` (76 code lines; the `step` block is 16 lines of APL text, one per Dyalog line L13–L28), against C4's vocabulary and data imported unchanged. The model prints the oracle's five losses (`checks/model_run.out`), and C4's 40-check program, with its import line changed, passes: see the cost section for the two recorded runs.

## Correspondence, one row per Dyalog line

Columns: the Dyalog line; the same line in `MicroGptApl.fss` (physical line); the hand-written Fortress it expands to or replaces, in C4's `MicroGptFlat.fss` (physical line). "apl" means the text is the Dyalog's with the design's re-spellings (`NE→Ne` and the other capital words, `v→vw`, `g→gr`) and a `⋄` closing every statement; "host" means C4's line.

| Dyalog | MicroGptApl.fss | MicroGptFlat.fss (C4) | form |
|---|---|---|---|
| L6 `⎕IO←0` | nothing | nothing | the base counts from 0 |
| L6 `NE BLK NH HD VS BOS←16 16 4 4 27 26` | 21 `(Ne, Blk, Nh, Hd, Vs, Bos) = (16.0, …)` | 17 | host: the tuple binding the strand assignment expands to; values `RR64` because APL numbers are |
| L6 `EPS LR0 B1 B2 EPSA←1E¯5 0.01 0.85 0.99 1E¯8` | 22 `(Eps, Lr0, B1, B2, Epsa, Nsteps) = (10.0^(-5), …)` | 18 | host, with `Nsteps` from L30 |
| L7 `rmsn←{⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}` | 27 `rmsn = apl⦇ {⍵÷(Eps+(+/⍵*2)÷≢⍵)*0.5} ⦈` | 27 | apl |
| L7 `sm←{e÷+/e←*⍵-⌈/⍵}` | 28 `sm = apl⦇ {e←*⍵-⌈/⍵ ⋄ e÷+/e} ⦈` | 28 | apl, the inline binding as two statements |
| L7 `MK←¯1E10×~(⍳BLK)∘.≥⍳BLK` | 29 `Mk = apl⦇ (-10*10)×~(⍳Blk)∘.≥⍳Blk ⦈` | 29 | apl, `¯1E10` as a negated power |
| L8 `rmsn_b←{…}` | 30 | 30–33 | apl |
| L8 `sm_b←{⍺×⍵-+/⍺×⍵}` | 31 | 34 | apl |
| L9 `SHP CNT OFF` | 36–43 `matName matShape matCount matOffset nParams` | 37–44 | host: C4's layout functions, reading the `RR64` hyperparameters through `aplInt` |
| L10 `P←⊃,/,¨{…⎕NREAD ⍵}¨⍳9 ⋄ M←V←P×0` | 109–111 in `run()` | 88–90 | host: `loadParams`, `zeros` |
| L11 `v←{(⍵⊃SHP)⍴P[…]}` | 44 `view(p, i)` and 70 `vw = fn (): Any => view(P, aplInt(aplOmega()))` | 45 | host: C4's view behind an adapter in the dfn calling shape |
| L12 `TOKM←↑{…⎕A⍳⍵…}¨docs ⋄ LEN←1+≢¨docs` | 56–58 `corpus`, `Tokm = aplOfInt(corpus.tokm)`, `Len = aplOfInt(corpus.len)` | 48 | host: C4's corpus, converted once |
| L13 `STEP←{b←⍵ ⋄ B←≢b ⋄ N←B×BLK ⋄ R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK] ⋄ vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK` | 68–73 `step(P, b)`, `bb = aplOfInt(b)`, then `B←≢bb ⋄ N←B×Blk ⋄ R←Tokm[bb;] ⋄ ids←,R[;⍳Blk] ⋄ tg←,R[;1+⍳Blk] ⋄ vm←,Len[bb]∘.>⍳Blk ⋄ nv←+/vm ⋄ pos←N⍴⍳Blk` | 51–52 | apl over the converted corpus arrays |
| L14 `wte wpe lm wq wk wv wo f1 f2←v¨⍳9` | 74 `…←vw¨⍳9` | 53 | apl, nine-name destructuring of the tuple `¨` builds |
| L15 `X←wte[ids;]+wpe[pos;] ⋄ Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp` | 75 | 57 | apl |
| L16 `Q K Vv←X1∘(+.×⍉)¨wq wk wv ⋄ h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv` | 76 `Q K Vv←{X1+.×⍉⍵}¨wq wk wv ⋄ Qh Kh Vh←h¨Q K Vv`; 71 `h = fn (): Any => heads(aplOmega(), …)` | 54, 58 | apl with the tacit form as a dfn; `h` a host adapter over C4's `heads` (rank 4) |
| L17 `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5 ⋄ Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh` | 77 `A←sm⍤1⊢Mk+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷Hd*0.5 ⋄ Hc←u A+.×⍤2⊢Vh`; 72 `u = fn (): Any => unheads(aplOmega(), …)` | 55, 59 | apl; the inlined `u` written as the adapter |
| L18 | 78 | 60 | apl |
| L19 `Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv` | 79 | 61 | apl |
| L20 `dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm` | 80 | 63 | apl |
| L21 | 81 | 64 | apl |
| L22 `dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo` | 82 | 65 | apl |
| L23 `dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5` | 83 | 66 | apl |
| L24 `dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←{(N,NE)⍴0 2 1 3⍉⍵} ⋄ dQ dK dV←u¨dQh dKh dVh` | 84 without the `u←` | 67 | apl |
| L25 `gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV ⋄ dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv` | 85 | 68 | apl |
| L26 | 86 | 69 | apl |
| L27 `gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX` | 87 | 70 | apl |
| L28 `loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)}` | 88 `gr←⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2 ⋄ loss gr ⦈` | 71 | apl, the gradient bound first and the result a two-name strand |
| L29 `ADAM←{(t lr g)←⍵ ⋄ M∘←… ⋄ V∘←… ⋄ P∘←…}` | 95–103 `adam(P, M, V, gr, ti, lr)`, `t = 1.0 ti`, then `Mn←(B1×M)+(1-B1)×gr ⋄ Vn←(B2×V)+(1-B2)×gr*2 ⋄ Pn←P-lr×(Mn÷1-B1*t)÷Epsa+(Vn÷1-B2*t)*0.5 ⋄ Pn Mn Vn` | 75–81 | apl, the three `∘←` as three bindings and a strand |
| L30 `losses←{l g←STEP(≢docs)|(⍵×BSZ)+⍳BSZ ⋄ ADAM(1+⍵)(LR0×1-⍵÷NSTEPS)g ⋄ l}¨⍳RUN` | 104 `learningRate(s) = do sf = 1.0 s; apl⦇ Lr0×1-sf÷Nsteps ⦈ end`; 106–117 `run()` | 82, 85–97 | the schedule apl; the loop host |

Nineteen of the 25 lines are APL text; the six host lines are the two hyperparameter lines, the layout table, the load, the corpus, and the training loop, each for the reason the design gives (a top-level statement, a nested array, a system function, characters, a write to an outer name).

## Departures from the Dyalog text, all of them

- Capital words re-spelled (`NE→Ne` etc.), `v→vw`, `g→gr`: gap rows 78 and the closed name sets.
- Every statement closed by `⋄`: a line break does not separate two statements when the next line can continue the one above (rows 52, 63, 68, 81).
- `sm`'s inline binding as two statements; `¯1E10` as `-10*10`; `1E¯5` as `10.0^(-5)`.
- L16's `X1∘(+.×⍉)` as `{X1+.×⍉⍵}`: the program's one tacit form, rung 7 not built.
- `h` and `u` as host adapters over C4's `heads`/`unheads`: rank 4 not in the base, C4's rank-3 views the target by decision; L17's inlined `u` written as `u`.
- L28's `loss(…)` as `gr←… ⋄ loss gr`: a strand of a name and a parenthesised expression has no rule.
- The conversions `aplOfInt` at the top level and at the top of `step`: `⍎( … )` cannot stand on a binding's right-hand side, and the corpus and the check's keys are `ZZ32`.
- Two facts found while writing: `aplOfInt`'s locals could not be `rows`/`cols` because `rows` is an imported name (`checks/model_run.out.0`, "Variable rows is already declared"), and the layout functions read `aplInt(Vs)` etc. because the hyperparameters are `RR64` here and `ZZ32` in C4.

## What the base gained, and what it cost in lines

Five additions (`DESIGN.md`, "What the base gains", as corrected after the probes): nine-name destructuring (three grammar alternatives), a name as the shape of `⍴` (one), `⊃,/,¨` over a strand as one direct rule (one, plus a nine-name `AplTuple` alternative), `¨` assembling matrix cells into a tuple (library: `aplIsMat`, `aplAllMat`, `aplTup`, one branch in `aplEach`), and `aplRankD1` over two rank-3 arrays (one overload); plus 65 array names, 26 strand names and 5 function names. `AplSyntax.fsi` 752 → 899 lines, of which 96 are name lines; `AplCore.fss` 2243 → 2343; `AplCore.fsi` 830 → 850. Rungs 1–6 re-run byte-identical.

## Numbers

Step-1 loss `3.3659669475848517` against C4's `3.3659669475848504` and the golden's: a difference of 8.9e-16 in a 1e-12 tolerance, from `+/` over `vm×⍟…` folding in a different order from C4's `vm DOT log(…)`; the other four losses agree with C4's digit for digit. The check's 40 rows are the same rows with the same tolerances as C4's.

## Cost

PENDING: filled in from checks/threads1.txt and checks/threads4.txt.

## Gap rows

Rows 86 onward of `../gaps.md`, from the probes and the component; the ledger merge enters them after the 85 earlier rows.
