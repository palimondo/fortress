⍝ microgpt_concise.dyalog — the Hsu layout in Dyalog APL, as short as it honestly gets.
⍝ UNVERIFIED: no Dyalog in the sandbox. Derived line for line from rungs/apl/microgpt_flat.apl (verified in dzaima);
⍝ verify against the oracle (5 steps, batch 1 ⇒ 3.3659669475848504 3.4242727838717717 3.177802125458052 …) before trusting it.
⍝ Dyalog primitives that replace dzaima helper lines: +.× (mm), f⍤1 (rmsrows/smrows), ⍤2 (per-head lists),
⍝ A[i;] (gather/cols), ,⍤2 / (N,NE)⍴ (hcat/vcat), ↑ pads, A:B guards. 27 lines, forward 9 / backward 11.
⎕IO←0 ⋄ NE BLK NH HD VS BOS←16 16 4 4 27 26 ⋄ EPS LR0 B1 B2 EPSA←1E¯5 0.01 0.85 0.99 1E¯8
rmsn←{⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5} ⋄ sm←{e÷+/e←*⍵-⌈/⍵} ⋄ MK←¯1E10×~(⍳BLK)∘.≥⍳BLK
rmsn_b←{r←(EPS+(+/⍵*2)÷≢⍵)*0.5 ⋄ y←⍵÷r ⋄ (⍺-y×(+/y×⍺)÷≢y)÷r} ⋄ sm_b←{⍺×⍵-+/⍺×⍵}
SHP←(VS NE)(BLK NE)(VS NE)(NE NE)(NE NE)(NE NE)(NE NE)((4×NE)NE)(NE(4×NE)) ⋄ CNT←×/¨SHP ⋄ OFF←+\0,¯1↓CNT
P←⊃,/,¨{(⍵⊃SHP)⍴⎕NREAD ⍵}¨⍳9 ⋄ M←V←P×0                          ⍝ one flat vector (load however you like); Adam state
v←{(⍵⊃SHP)⍴P[(⍵⊃OFF)+⍳⍵⊃CNT]}                                   ⍝ matrix i as a view of P
TOKM←↑{(BLK+1)↑BOS,(⎕A⍳⍵),BOS}¨docs ⋄ LEN←1+≢¨docs               ⍝ corpus: one int matrix, BOS-padded (⎕A ⇒ lowercase alphabet var)
STEP←{b←⍵ ⋄ B←≢b ⋄ N←B×BLK ⋄ R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK] ⋄ vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK
  wte wpe lm wq wk wv wo f1 f2←v¨⍳9
  X←wte[ids;]+wpe[pos;] ⋄ Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp
  Q K Vv←X1∘(+.×⍉)¨wq wk wv ⋄ h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv
  A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5 ⋄ Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh
  X2←Xp+Hc+.×⍉wo ⋄ X3←rmsn⍤1⊢X2 ⋄ M0←X3+.×⍉f1 ⋄ Mr←0⌈M0 ⋄ X4←X2+Mr+.×⍉f2
  Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv
  dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm
  gF2←(⍉dX4)+.×Mr ⋄ dM0←(dX4+.×f2)×M0>0 ⋄ gF1←(⍉dM0)+.×X3 ⋄ dX3←dM0+.×f1
  dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo
  dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5
  dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←{(N,NE)⍴0 2 1 3⍉⍵} ⋄ dQ dK dV←u¨dQh dKh dVh
  gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV ⋄ dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv
  dXp←dX2+dX1(rmsn_b⍤1)Xp ⋄ dX←dXp(rmsn_b⍤1)X
  gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX               ⍝ keys → one-hot → scatter-add (or {+⌿⍵}⌸)
  loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)}
ADAM←{(t lr g)←⍵ ⋄ M∘←(B1×M)+(1-B1)×g ⋄ V∘←(B2×V)+(1-B2)×g*2 ⋄ P∘←P-lr×(M÷1-B1*t)÷EPSA+(V÷1-B2*t)*0.5}
losses←{l g←STEP(≢docs)|(⍵×BSZ)+⍳BSZ ⋄ ADAM(1+⍵)(LR0×1-⍵÷NSTEPS)g ⋄ l}¨⍳RUN
