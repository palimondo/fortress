#!/usr/bin/env python3
# Builds explorations/run-c4/tour.md, tour.html and tour/*.svg from the rows below (round two's
# generator, run-c/tour/mktour.py, with the rows of the synthesis and the inlined SVGs' glyph ids
# made unique per cell).  Every Fortress snippet is checked verbatim against src/MicroGptFlat.fss.
import os, re, subprocess, sys, html
ROOT = '/home/user/fortress/explorations/run-c4'
SRC = open(f'{ROOT}/src/MicroGptFlat.fss').read()
TOUR = f'{ROOT}/tour'
RENDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'render.sh')  # the probes' render helper, copied beside this script
ENV = 'source /home/user/fortress/experiment/env.sh; '

rows = [
 dict(dy='L6', dyalog='⎕IO←0 ⋄ NE BLK NH HD VS BOS←16 16 4 4 27 26 ⋄ EPS LR0 B1 B2 EPSA←1E¯5 0.01 0.85 0.99 1E¯8',
  tex=r'NE{=}16,\ BLK{=}16,\ NH{=}4,\ HD{=}4,\ VS{=}27,\ BOS{=}26;\ \varepsilon{=}10^{-5},\ \alpha_0{=}0.01,\ \beta_1{=}0.85,\ \beta_2{=}0.99,\ \varepsilon_A{=}10^{-8}',
  fortress=['nEmbd = 16; blockSize = 16; nHead = 4; headDim = 4; vocabSize = 27; bosId = 26',
            'epsilon = 10.0^(-5); lr0 = 0.01; beta1 = 0.85; beta2 = 0.99; epsilon_A = 10.0^(-8); nSteps = 1000'],
  split=False,
  note='Index origin is 0 on both sides. One declaration per constant, untyped (each takes its literal\'s type), six to a line as the Dyalog strands six: the semicolon separates top-level declarations as it separates statements (probes/semicolon). The driver\'s NSTEPS joins the second line; the two file paths, which the Dyalog reads "however you like", are a third line not shown.'),
 dict(dy='L7', dyalog='rmsn←{⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}',
  tex=r'\mathrm{rmsn}(x) = \frac{x}{\sqrt{\varepsilon + \frac{1}{n}\sum_i x_i^2}},\quad n = |x|',
  fortress=['rmsn(x: Array[\\RR64,ZZ32\\]): Array[\\RR64,ZZ32\\] = x / SQRT (epsilon + (x DOT x) / |x|)'],
  note='+/⍵*2 is the dot product x DOT x (round three\'s form). The parameter is a runtime-sized array rather than a nat-generic Vector so that rmsn can be handed to the lift (ledger row 156).'),
 dict(dy='L7', dyalog='sm←{e÷+/e←*⍵-⌈/⍵}',
  tex=r'\mathrm{sm}(z) = \frac{e}{\sum_i e_i},\quad e = \exp\bigl(z - \max_i z_i\bigr)',
  fortress=['sm(z: Array[\\RR64,ZZ32\\]): Array[\\RR64,ZZ32\\] = do e = exp(z - (BIG MAX[t <- z] t)); e / (SUM e) end'],
  note='The Dyalog binds e inside the expression; Fortress binds it in a do block, so the line reads left to right. The sum is the library\'s SUM over the array; the max must be written as a generator, BIG MAX e alone does not parse (ledger row 102).'),
 dict(dy='L7', dyalog='MK←¯1E10×~(⍳BLK)∘.≥⍳BLK',
  tex=r'MK_{ij} = -10^{10}\,[\,j > i\,]',
  fortress=['mask: Array[\\RR64,(ZZ32,ZZ32)\\] = mat(blockSize, blockSize, fn (i: ZZ32, j: ZZ32): RR64 => if j > i then -(10.0^10) else 0.0 end)'],
  note='~(⍳BLK)∘.≥⍳BLK is written as its predicate j > i. This is the model\'s one index lambda; it has no subscript.'),
 dict(dy='L8', dyalog='rmsn_b←{r←(EPS+(+/⍵*2)÷≢⍵)*0.5 ⋄ y←⍵÷r ⋄ (⍺-y×(+/y×⍺)÷≢y)÷r}',
  tex=r'\mathrm{rmsn}_b(dy, x) = \frac{dy - y\,\frac{y\cdot dy}{n}}{r},\quad y = \frac{x}{r},\quad r = \sqrt{\varepsilon + \tfrac{1}{n}\sum_i x_i^2}',
  fortress=['rmsn_b(dy: Array[\\RR64,ZZ32\\], x: Array[\\RR64,ZZ32\\]): Array[\\RR64,ZZ32\\] = do',
            '    r = SQRT (epsilon + (x DOT x) / |x|); y = x / r',
            '    (dy - y ((y DOT dy) / |y|)) / r',
            '  end'],
  note='The dfn\'s three statements, in its order; +/y×⍺ is the dot product y DOT dy. The name keeps the Dyalog\'s underscore, which Fortify sets literally.'),
 dict(dy='L8', dyalog='sm_b←{⍺×⍵-+/⍺×⍵}',
  tex=r'\mathrm{sm}_b(p, dy) = p \odot \bigl(dy - p\cdot dy\bigr)',
  fortress=['sm_b(p: Array[\\RR64,ZZ32\\], dy: Array[\\RR64,ZZ32\\]): Array[\\RR64,ZZ32\\] = p × (dy - (p DOT dy))'],
  note='+/⍺×⍵ is p DOT dy; the outer × is the vocabulary\'s elementwise product and dy - scalar its scalar extension.'),
 dict(dy='L9', dyalog='SHP←(VS NE)(BLK NE)(VS NE)(NE NE)(NE NE)(NE NE)(NE NE)((4×NE)NE)(NE(4×NE)) ⋄ CNT←×/¨SHP ⋄ OFF←+\\0,¯1↓CNT',
  tex=r'\mathrm{shape}_i = (r_i, c_i),\quad \mathrm{cnt}_i = r_i c_i,\quad \mathrm{off}_i = \sum_{j<i} \mathrm{cnt}_j,\quad |P| = \mathrm{off}_9',
  fortress=['matName(i: ZZ32): String =',
            '    if i = 0 then "wte" elif i = 1 then "wpe" elif i = 2 then "lm_head" elif i = 3 then "attn_wq" elif i = 4 then "attn_wk"',
            '    elif i = 5 then "attn_wv" elif i = 6 then "attn_wo" elif i = 7 then "mlp_fc1" else "mlp_fc2" end',
            'matShape(i: ZZ32): (ZZ32, ZZ32) =',
            '    if (i = 0) OR (i = 2) then (vocabSize, nEmbd) elif i = 7 then (4 nEmbd, nEmbd) elif i = 8 then (nEmbd, 4 nEmbd) else (nEmbd, nEmbd) end',
            'matCount(i: ZZ32): ZZ32 = do (r, c) = matShape(i); r c end',
            'matOffset(i: ZZ32): ZZ32 = SUM[j <- 0#i] matCount(j)',
            'nParams(): ZZ32 = matOffset(9)'],
  note='The shapes are a function of the index, not an array of pairs: a typed array literal at top level binds a tuple (ledger row 142). The file names are the price of the Dyalog\'s ⎕NREAD ⍵ being by index.'),
 dict(dy='L10', dyalog='P←⊃,/,¨{(⍵⊃SHP)⍴⎕NREAD ⍵}¨⍳9 ⋄ M←V←P×0',
  tex=r'P = \bigl(\mathrm{vec}\,W_0 \mid \mathrm{vec}\,W_1 \mid \cdots \mid \mathrm{vec}\,W_8\bigr),\quad M = V = 0',
  fortress=['    p: Array[\\RR64,ZZ32\\] := loadParams(weightsDir, matName, 9, nParams())',
            '    m: Array[\\RR64,ZZ32\\] := zeros(nParams())',
            '    v: Array[\\RR64,ZZ32\\] := zeros(nParams())'],
  note='The driver\'s three lines. The loader (FlatData, round three\'s) reads the nine files named by the layout table straight into one vector in layout order, so the model has no load line of its own; ⊃,/,¨ appears only in the step, as flat.'),
 dict(dy='L11', dyalog='v←{(⍵⊃SHP)⍴P[(⍵⊃OFF)+⍳⍵⊃CNT]}',
  tex=r'W_i = \mathrm{reshape}\bigl(P[\mathrm{off}_i : \mathrm{off}_i + \mathrm{cnt}_i],\ r_i \times c_i\bigr)',
  fortress=['view(p: Array[\\RR64,ZZ32\\], i: ZZ32): Array[\\RR64,(ZZ32,ZZ32)\\] = do (r, c) = matShape(i); view(p, matOffset(i), r, c) end'],
  note='The Dyalog\'s v copies the slice; the vocabulary\'s four-argument view is a zero-copy, writable Matrix over it, so the same table that reads the weights would write them (Hsu\'s tactic 8).'),
 dict(dy='L12', dyalog='TOKM←↑{(BLK+1)↑BOS,(⎕A⍳⍵),BOS}¨docs ⋄ LEN←1+≢¨docs',
  tex=r'T_{d,:} = (BOS,\ c_1, \ldots, c_{\ell_d},\ BOS, \ldots, BOS),\quad L_d = 1 + \ell_d',
  fortress=['corpus: Corpus = loadCorpus(corpusPath, blockSize, bosId)'],
  note='TOKM and LEN are the two fields of one corpus object (round three\'s), whose methods are the key functions of L13. ↑ pads with 0 in the Dyalog; the layout pads with BOS, which loadCorpus does. The causal mask and the validity mask make the difference invisible.'),
 dict(dy='L13', dyalog='STEP←{b←⍵ ⋄ B←≢b ⋄ N←B×BLK ⋄ R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK] ⋄ vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK',
  tex=r'R = T[b,:],\ ids = \mathrm{vec}\,R[:,0{:}BLK],\ tg = \mathrm{vec}\,R[:,1{:}BLK{+}1],\ v_{d,p} = [\,p < L_{b_d}\,],\ n_v = \textstyle\sum v,\ pos_r = r \bmod BLK',
  fortress=['step(p: Array[\\RR64,ZZ32\\], b: Array[\\ZZ32,ZZ32\\]): (RR64, Array[\\RR64,ZZ32\\]) = do',
            '    ids = corpus.tokens(b, 0); tg = corpus.tokens(b, 1); vm = corpus.valid(b); nv = SUM vm; pos = corpus.positions(b)'],
  note='The keys line names the keys: ,R[;⍳BLK] and ,R[;1+⍳BLK] are the corpus\'s tokens at offset 0 and 1, ,LEN[b]∘.>⍳BLK its validity mask, N⍴⍳BLK its positions, each a vector over the (document, position) rows of the batch. The Dyalog\'s R, B and N are not bound: the row count is the vectors\' length.'),
 dict(dy='L14', dyalog='wte wpe lm wq wk wv wo f1 f2←v¨⍳9',
  tex=r'W_{te}, W_{pe}, W_{lm}, W_q, W_k, W_v, W_o, F_1, F_2 = W_0, \ldots, W_8',
  fortress=['    (wte, wpe, lm, wq, wk, wv, wo, f1, f2) = (view(p, 0), view(p, 1), view(p, 2), view(p, 3), view(p, 4), view(p, 5), view(p, 6), view(p, 7), view(p, 8))'],
  note='One tuple binding for the strand assignment; every name is a view.'),
 dict(dy='L15', dyalog='X←wte[ids;]+wpe[pos;] ⋄ Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp',
  tex=r'X = W_{te}[ids,:] + W_{pe}[pos,:],\quad X_p = \mathrm{rmsn}(X),\quad X_1 = \mathrm{rmsn}(X_p)\quad\text{(row-wise)}',
  fortress=['    x = gather(wte, ids) + gather(wpe, pos); xp = rows(rmsn, x); x1 = rows(rmsn, xp)'],
  note='rmsn⍤1 is rows(rmsn, ·): the lift is a function of the vocabulary, since ⍤ is not an operator character in Fortress and a nat-generic function cannot be an argument (row 156).'),
 dict(dy='L16', dyalog='Q K Vv←X1∘(+.×⍉)¨wq wk wv ⋄ h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv',
  tex=r'Q = X_1 W_q^{\top},\ K = X_1 W_k^{\top},\ V = X_1 W_v^{\top};\quad Q_h = \mathrm{heads}(Q),\ K_h = \mathrm{heads}(K),\ V_h = \mathrm{heads}(V)',
  fortress=['    h(m: Array[\\RR64,(ZZ32,ZZ32)\\]): Array[\\RR64,(ZZ32,ZZ32,ZZ32)\\] = heads(m, blockSize, nHead, headDim)',
            '    u(t: Array[\\RR64,(ZZ32,ZZ32,ZZ32)\\]): Array[\\RR64,(ZZ32,ZZ32)\\] = unheads(t, nHead)',
            '    (q, k, v) = (x1 wq^T, x1 wk^T, x1 wv^T); (qh, kh, vh) = (h(q), h(k), h(v))'],
  note='h is a rank-3 view of the (doc·pos × heads·dim) matrix, not a copy, and u its inverse; u is declared here beside h where the Dyalog declares it at L24. The two definitions sit before the forward pass in the source.'),
 dict(dy='L17', dyalog='A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5 ⋄ Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh',
  tex=r'A = \mathrm{sm}\Bigl(MK + \frac{Q_h K_h^{\top}}{\sqrt{HD}}\Bigr),\quad H_c = \mathrm{unheads}(A\,V_h)\quad\text{(per head, per row)}',
  fortress=['    a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim)); hc = u(a vh)'],
  note='One line, as in the Dyalog: +.×⍤2 is the batched product, ⍉⍤2 the plane-transpose view, MK+⍤2 the plane-wise sum, sm⍤1 the row lift over planes; nothing is copied but the products\' results.'),
 dict(dy='L18', dyalog='X2←Xp+Hc+.×⍉wo ⋄ X3←rmsn⍤1⊢X2 ⋄ M0←X3+.×⍉f1 ⋄ Mr←0⌈M0 ⋄ X4←X2+Mr+.×⍉f2',
  tex=r'X_2 = X_p + H_c W_o^{\top},\ X_3 = \mathrm{rmsn}(X_2),\ M_0 = X_3 F_1^{\top},\ M_r = \max(0, M_0),\ X_4 = X_2 + M_r F_2^{\top}',
  fortress=['    x2 = xp + hc wo^T; x3 = rows(rmsn, x2); m0 = x3 f1^T; mr = 0.0 MAX m0; x4 = x2 + mr f2^T'],
  note='0⌈M0 is 0.0 MAX m0, the scalar extension of the library\'s MAX.'),
 dict(dy='L19', dyalog='Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv',
  tex=r'P = \mathrm{sm}(X_4 W_{lm}^{\top}),\quad \mathcal{L} = -\frac{1}{n_v}\sum_r v_r \log P_{r,\,tg_r}',
  fortress=['    pr = rows(sm, x4 lm^T); loss = -(vm DOT log(pick(pr, tg))) / nv'],
  note='tg⌷⍤0 1⊢Pr is pick; +/vm×⍟… is written as the dot product of vm with the elementwise log.'),
 dict(dy='L20', dyalog='dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm',
  tex=r'dL = \mathrm{diag}(v/n_v)\,(P - E_{tg}),\quad g_{lm} = dL^{\top} X_4,\quad dX_4 = dL\,W_{lm}',
  fortress=['    dL = diag(vm / nv) (pr - onehot(tg, vocabSize)); gLM = dL^T x4; dX4 = dL lm'],
  note='(vm÷nv)×⍤0 1 is diag(vm / nv), whose product scales the rows without forming the diagonal (a row-scaling × is gap row 159); tg∘.=⍳VS is onehot.'),
 dict(dy='L21', dyalog='gF2←(⍉dX4)+.×Mr ⋄ dM0←(dX4+.×f2)×M0>0 ⋄ gF1←(⍉dM0)+.×X3 ⋄ dX3←dM0+.×f1',
  tex=r'g_{F2} = dX_4^{\top} M_r,\quad dM_0 = (dX_4 F_2) \odot [M_0 > 0],\quad g_{F1} = dM_0^{\top} X_3,\quad dX_3 = dM_0 F_1',
  fortress=['    gF2 = dX4^T mr; dM0 = (dX4 f2) × (m0 > 0.0); gF1 = dM0^T x3; dX3 = dM0 f1'],
  note='M0>0 is the 0/1 matrix m0 > 0.0 and × its elementwise product.'),
 dict(dy='L22', dyalog='dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo',
  tex=r'dX_2 = dX_4 + \mathrm{rmsn}_b(dX_3, X_2),\quad g_{Wo} = dX_2^{\top} H_c,\quad dH = \mathrm{heads}(dX_2 W_o)',
  fortress=['    dX2 = dX4 + rows(rmsn_b, dX3, x2); gWO = dX2^T hc; dh = h(dX2 wo)'],
  note='dX3(rmsn_b⍤1)X2 is the dyadic lift rows(rmsn_b, dX3, x2), the rows of the two matrices paired.'),
 dict(dy='L23', dyalog='dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5',
  tex=r'dV_h = A^{\top} dH,\quad dS = \frac{\mathrm{sm}_b\bigl(A,\ dH\,V_h^{\top}\bigr)}{\sqrt{HD}}\quad\text{(per head, per row)}',
  fortress=['    dVh = a^T dh; dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)'],
  note=''),
 dict(dy='L24', dyalog='dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←{(N,NE)⍴0 2 1 3⍉⍵} ⋄ dQ dK dV←u¨dQh dKh dVh',
  tex=r'dQ_h = dS\,K_h,\quad dK_h = dS^{\top} Q_h,\quad dQ, dK, dV = \mathrm{unheads}(dQ_h), \mathrm{unheads}(dK_h), \mathrm{unheads}(dV_h)',
  fortress=['    dQh = dS kh; dKh = dS^T qh; (dQ, dK, dV) = (u(dQh), u(dKh), u(dVh))'],
  note='u is declared beside h (L16); here it is applied. Its results are views, read by the four products of L25.'),
 dict(dy='L25', dyalog='gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV ⋄ dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv',
  tex=r'g_{Wq}, g_{Wk}, g_{Wv} = dQ^{\top} X_1, dK^{\top} X_1, dV^{\top} X_1,\quad dX_1 = dQ\,W_q + dK\,W_k + dV\,W_v',
  fortress=['    (gWQ, gWK, gWV) = (dQ^T x1, dK^T x1, dV^T x1); dX1 = dQ wq + dK wk + dV wv'],
  note=''),
 dict(dy='L26', dyalog='dXp←dX2+dX1(rmsn_b⍤1)Xp ⋄ dX←dXp(rmsn_b⍤1)X',
  tex=r'dX_p = dX_2 + \mathrm{rmsn}_b(dX_1, X_p),\quad dX = \mathrm{rmsn}_b(dX_p, X)',
  fortress=['    dXp = dX2 + rows(rmsn_b, dX1, xp); dX = rows(rmsn_b, dXp, x)'],
  note=''),
 dict(dy='L27', dyalog='gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX',
  tex=r'g_{Wte} = E_{ids}^{\top}\, dX,\quad g_{Wpe} = E_{pos}^{\top}\, dX\qquad (E_k = \text{one-hot rows of } k)',
  fortress=['    gWTE = transpose(onehot(ids, vocabSize)) dX; gWPE = transpose(onehot(pos, blockSize)) dX'],
  note='transpose(…) and not ^T: a call result may not be followed by a superscript, parenthesised or not (rows 144, 158).'),
 dict(dy='L28', dyalog='loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)}',
  tex=r'\bigl(\mathcal{L},\ (\mathrm{vec}\,g_{Wte} \mid \mathrm{vec}\,g_{Wpe} \mid \cdots \mid \mathrm{vec}\,g_{F2})\bigr)',
  fortress=['    (loss, flat(gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2))',
            '  end'],
  note='flat ravels and catenates the nine gradients in layout order, as ⊃,/,¨ does; the result is a gradient in the layout of p.'),
 dict(dy='L29', dyalog='ADAM←{(t lr g)←⍵ ⋄ M∘←(B1×M)+(1-B1)×g ⋄ V∘←(B2×V)+(1-B2)×g*2 ⋄ P∘←P-lr×(M÷1-B1*t)÷EPSA+(V÷1-B2*t)*0.5}',
  tex=r"m' = \beta_1 m + (1-\beta_1) g,\quad v' = \beta_2 v + (1-\beta_2)\, g \odot g,\quad p' = p - \alpha\,\frac{m'/(1-\beta_1^t)}{\sqrt{v'/(1-\beta_2^t)} + \varepsilon_A}",
  fortress=["    m' = beta1 m + (1 - beta1) g",
            "    v' = beta2 v + (1 - beta2) (g × g)",
            "    p' = p - (lr (m' / (1 - beta1^t))) / (SQRT (v' / (1 - beta2^t)) + epsilon_A)",
            "    (p', m', v')"],
  note='Pure: the three results are returned rather than assigned to globals. g*2 is g × g. The association is numpy\'s, (α m̂)/(√v̂ + ε), because the goldens are numpy\'s; the Dyalog\'s is α (m̂/(ε + √v̂)).'),
 dict(dy='L30', dyalog='losses←{l g←STEP(≢docs)|(⍵×BSZ)+⍳BSZ ⋄ ADAM(1+⍵)(LR0×1-⍵÷NSTEPS)g ⋄ l}¨⍳RUN',
  tex=r'b_s = (sB + i) \bmod D,\quad (\ell_s, g_s) = \mathrm{step}(p, b_s),\quad \alpha_s = \alpha_0\bigl(1 - s/N\bigr),\quad (p, m, v) \leftarrow \mathrm{adam}(p, m, v, g_s, s{+}1, \alpha_s)',
  fortress=['learningRate(s: ZZ32): RR64 = lr0 (1 - (1.0 s) / nSteps)',
            '        (l, g) = step(p, keys(bsz, fn (i: ZZ32): ZZ32 => (s bsz + i) MOD corpus.size()))',
            '        (p, m, v) := adam(p, m, v, g, s + 1, learningRate(s))'],
  note='The driver keeps (p, m, v) as the loop\'s three variables where the Dyalog\'s ADAM updates globals; the loop, the prints and the timing around these lines are not shown.'),
]

# verify every snippet is verbatim in the source
for r in rows:
    for line in r['fortress']:
        if line not in SRC:
            sys.exit(f"NOT IN SOURCE: {line}")

PRE = r'''\documentclass{article}
\usepackage{fortify}
\usepackage{amsmath}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{5pt}
\begin{document}
\begin{preview}
'''
POST = '\n\\end{preview}\n\\end{document}\n'

def dedent(lines):
    ind = min(len(l) - len(l.lstrip()) for l in lines if l.strip())
    return [l[ind:] for l in lines]

def split_stmts(lines, split=True):
    # for display, a `; ` line of the source is shown one statement per line (a do ... end on one line stays);
    # a row with split=False keeps its lines as written (the hyperparameter strands)
    out = []
    for l in lines:
        if split and '; ' in l and ' = do ' not in l:
            parts = l.split('; ')
            out.append(parts[0])
            out.extend(parts[1:])
        else:
            out.append(l)
    return out

jobs = []
for n, r in enumerate(rows, 1):
    lines = split_stmts(dedent(r['fortress']), r.get('split', True))
    code = '\n'.join(lines)
    tic = f'{TOUR}/row{n:02d}.tic'
    open(tic, 'w').write(PRE + '`' + code + '`' + POST)
    ftex = f'{TOUR}/row{n:02d}_f.tex'
    open(ftex, 'w').write(PRE + '$\\displaystyle ' + r['tex'] + '$' + POST)
    jobs.append((n, tic, ftex))

if '--render' in sys.argv or '--formulas' in sys.argv:
    for n, tic, ftex in jobs:
        if '--formulas' not in sys.argv: subprocess.run([RENDER, tic], check=False, stdout=subprocess.DEVNULL)
        base = ftex[:-4]
        subprocess.run(ENV + f'cd {TOUR} && TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode {os.path.basename(ftex)} > /dev/null 2>&1; dvisvgm --no-fonts --exact-bbox -o {base}.svg {base}.dvi > /dev/null 2>&1; rm -f {base}.dvi {base}.aux {base}.log', shell=True, executable='/bin/bash')
        print('row', n, os.path.exists(f'{TOUR}/row{n:02d}.svg'), os.path.exists(f'{base}.svg'), flush=True)

# ---- tour.md ----
md = ['# Run C4: the guided tour', '',
 'One row per line of `explorations/apl/reference/hsu-flat/microgpt_concise.dyalog`, in the',
 'order of `design.md`\'s line-for-line table, the helper dfns included: the formula in TeX,',
 'the Dyalog line, the Fortress line or lines from `src/MicroGptFlat.fss` (verbatim; a `;`',
 'line of the source is rendered one statement per line), and a note where they differ.',
 'The rendered version, with the Fortress set by Fortify, is `tour.html`; the SVGs are in',
 '`tour/` (`rowNN.svg` the Fortress, `rowNN_f.svg` the formula). The by-eye test of round',
 'four is this table: a Fortress line that does not read beside its formula and its Dyalog',
 'line is not done.', '',
 '| # | Dyalog line | formula (TeX) | Dyalog | Fortress | note |', '|---|---|---|---|---|---|']
for n, r in enumerate(rows, 1):
    code = '<br>'.join('`' + l.replace('|', '\\|') + '`' for l in split_stmts(dedent(r['fortress']), r.get('split', True)))
    dyesc = r['dyalog'].replace('|', '\\|')
    texesc = r['tex'].replace('|', '\\|')
    md.append(f"| {n} | {r['dy']} | `${texesc}$` | `{dyesc}` | {code} | {r['note']} |")
md += ['', '## Lines with no Dyalog counterpart', '',
 '- `opr (m: Matrix[\\RR64,r,c\\])^T[\\nat r, nat c\\]: Matrix[\\RR64,c,r\\] = transpose(m)` and its rank-3 twin: the',
 '  Dyalog\'s ⍉ is primitive; Fortress\'s `^T` is declared, and in the model rather than the vocabulary because',
 '  an API cannot declare an exponent-shaped postfix operator (ledger row 133).',
 '- the `run()` driver\'s prints and timing.', '']
open(f'{ROOT}/tour.md', 'w').write('\n'.join(md))

# ---- tour.html (self-contained: SVGs inlined; round three's layout, the formula and the
# Fortress side by side, the Dyalog and the note beneath; the renders take the theme's ink) ----
NAMES = ['Hyperparameters', 'RMS normalisation of a vector', 'Softmax of a vector', 'The causal mask', 'Backward of the RMS normalisation', 'Backward of the softmax', 'The layout: shapes, counts, offsets', 'The flat parameter vector and the Adam state', 'Matrix i as a view of P', 'The corpus', 'The keys of a batch', 'The nine weight matrices', 'Embedding and two normalisations', 'Queries, keys, values, split into heads', 'Attention weights, heads applied to values', 'Output projection, normalisation, the MLP', 'Probabilities and loss', 'Backward: the loss and the output head', 'Backward: the MLP', 'Backward: the residual and the output projection', 'Backward: attention, values and scores', 'Backward: queries and keys, un-heading', 'Backward: the projections', 'Backward: the two normalisations', 'Backward: the embeddings', "The step's result", 'Adam', 'The training loop']
assert len(NAMES) == len(rows)

def svg(path, prefix):
    # the SVGs are inlined into one document, so their glyph ids (dvisvgm's g0-1, g1-2, ...) must be made
    # unique per cell: with the same id in several cells the browser draws every <use> from the first
    # definition and the text is garbled (the fault of round two's tour.html, reviews/run-c2-phase1.md)
    if not os.path.exists(path): return '<em>not rendered</em>', 0
    s = open(path).read()
    s = s[s.index('<svg'):].strip()
    s = s.replace("id='", f"id='{prefix}-").replace("href='#", f"href='#{prefix}-")
    s = s.replace('<svg ', "<svg class='r' ", 1)
    m = re.search(r"width='([0-9.]+)pt'", s)
    nat = round(float(m.group(1)) * 4.0 / 3.0) if m else 0
    return s, nat

CSS = """
:root{
  --bg:#faf9f7; --panel:#ffffff; --ink:#1c1b19; --muted:#6c6760;
  --rule:#e2ddd5; --accent:#7a4b1e; --codebg:#f2efe9; --shadow:0 1px 2px rgba(0,0,0,.05);
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#16161a; --panel:#1e1e24; --ink:#e8e5df; --muted:#9a938a;
    --rule:#2e2e35; --accent:#e0a468; --codebg:#23232a; --shadow:0 1px 3px rgba(0,0,0,.5);
  }
}
:root[data-theme="dark"]{
  --bg:#16161a; --panel:#1e1e24; --ink:#e8e5df; --muted:#9a938a;
  --rule:#2e2e35; --accent:#e0a468; --codebg:#23232a; --shadow:0 1px 3px rgba(0,0,0,.5);
}
*{box-sizing:border-box}
body{background:var(--bg); color:var(--ink); font-family:"DejaVu Serif",Georgia,"Times New Roman",serif; font-size:15px; line-height:1.55; margin:0;}
.wrap{max-width:1180px; margin:0 auto; padding-block:32px 64px; padding-left:20px; padding-right:20px;}
h1{font-size:1.9rem; line-height:1.2; margin:0 0 .6em; letter-spacing:-.01em;}
.intro p{margin:0 0 1em; max-width:70ch;}
.intro{border-bottom:1px solid var(--rule); padding-bottom:12px; margin-bottom:28px;}
code{font-family:"DejaVu Sans Mono","Noto Sans Mono","Liberation Mono",ui-monospace,monospace; font-size:.86em; background:var(--codebg); padding:.08em .28em; border-radius:3px;}
section.row{border-top:1px solid var(--rule); padding-top:14px; margin-top:22px;}
section.row:first-of-type{border-top:none; margin-top:0;}
h2{font-size:1.02rem; margin:0 0 12px; font-weight:600; letter-spacing:.01em;}
h2 .n{display:inline-block; min-width:2.1em; color:var(--accent); font-family:"DejaVu Sans Mono",ui-monospace,monospace; font-size:.85em;}
h2 .dy{color:var(--muted); font-weight:400; font-size:.85em; margin-left:.6em;}
.grid{display:grid; gap:12px 22px; grid-template-columns:1fr;}
@media (min-width:900px){
  .grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr); grid-template-areas:"formula fortress" "dyalog note"; align-items:start;}
  .c-formula{grid-area:formula} .c-dyalog{grid-area:dyalog} .c-fortress{grid-area:fortress} .c-note{grid-area:note}
}
.cell{min-width:0}
.lab{font-family:"DejaVu Sans Mono",ui-monospace,monospace; font-size:10px; letter-spacing:.13em; text-transform:uppercase; color:var(--muted); margin-bottom:5px;}
/* rendered SVG panel: the TeX and Fortify strokes carry no colour of their own (dvisvgm emits
   paths and rects without fill), so they take the ink of the theme */
.render{background:var(--panel); border:1px solid var(--rule); border-radius:5px; padding:8px 10px; overflow-x:auto; box-shadow:var(--shadow); color:var(--ink);}
.render svg{fill:currentColor}
/* fit the cell, but never shrink a render below 80% of its natural size: below that the panel scrolls */
svg.r{max-width:100%; min-width:calc(var(--nat, 0px) * .8); height:auto; display:block;}
details.src{margin-top:4px} details.src summary{font-size:11px; color:var(--muted); cursor:pointer; font-style:italic}
.apl, pre.ascii{font-family:"APL385 Unicode","BQN386 Unicode","APL333","DejaVu Sans Mono","Noto Sans Mono","Menlo","Consolas","Liberation Mono",ui-monospace,monospace; font-size:12.5px; line-height:1.65; background:var(--codebg); border:1px solid var(--rule); border-radius:5px; padding:8px 10px; white-space:pre-wrap; word-break:break-word; overflow-wrap:anywhere; margin:0;}
.note{margin:0;} .note.none{color:var(--muted); font-style:italic;}
footer{margin-top:44px; padding-top:14px; border-top:1px solid var(--rule); color:var(--muted); font-size:12.5px;}
"""

h = ['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
 '<title>Run C4 tour</title>', '<style>' + CSS + '</style>', '</head><body><div class="wrap">',
 '<h1>Run C4: the guided tour</h1>', '<div class="intro">',
 '<p>One row per line of <code>microgpt_concise.dyalog</code>, in the order of the program, the helper dfns included: the formula, the Dyalog line, the Fortress line or lines of <code>src/MicroGptFlat.fss</code> set by Fortify (verbatim; a <code>;</code> line of the source is shown one statement per line; the ASCII source is under each render), and a note where they differ. Every Fortress snippet is checked against the source by the generator, <code>tour/mktour.py</code>. The by-eye test of round four is this page.</p>',
 '</div>']
for n, r in enumerate(rows, 1):
    code = '\n'.join(split_stmts(dedent(r['fortress']), r.get('split', True)))
    fs, fnat = svg(f'{TOUR}/row{n:02d}_f.svg', f'f{n}')
    xs, xnat = svg(f'{TOUR}/row{n:02d}.svg', f'x{n}')
    note = html.escape(r['note']) if r['note'].strip() else ''
    ncls = 'note' if note else 'note none'
    if not note: note = 'none'
    h.append(f'<section class="row" id="r{n:02d}"><h2><span class="n">{n}</span>{html.escape(NAMES[n-1])}<span class="dy">{r["dy"]}</span></h2><div class="grid">')
    h.append(f'<div class="cell c-formula"><div class="lab">Formula</div><div class="render" style="--nat:{fnat}px">{fs}</div></div>')
    h.append(f'<div class="cell c-dyalog"><div class="lab">Dyalog</div><div class="apl">{html.escape(r["dyalog"])}</div></div>')
    h.append(f'<div class="cell c-fortress"><div class="lab">Fortress</div><div class="render" style="--nat:{xnat}px">{xs}</div><details class="src"><summary>ASCII source</summary><pre class="ascii">{html.escape(code)}</pre></details></div>')
    h.append(f'<div class="cell c-note"><div class="lab">Note</div><p class="{ncls}">{note}</p></div>')
    h.append('</div></section>')
h += ['<section class="row"><h2>Lines with no Dyalog counterpart</h2><ul>',
 '<li>the two <code>^T</code> declarations (a matrix, and every plane of a rank-3 array): the Dyalog\'s ⍉ is primitive; Fortress\'s <code>^T</code> is declared, in the model because an API cannot declare an exponent-shaped postfix operator (ledger row 133).</li>',
 '<li>the <code>run()</code> driver\'s prints and timing.</li></ul></section>',
 f'<footer>{len(rows)} rows. Formulas typeset with LaTeX; Fortress typeset with Fortify (<code>bin/fortick</code>); both embedded as inline SVG, ids made unique per cell. Dyalog lines are plain text. Sources and renders: <code>explorations/run-c4/tour/</code>.</footer>',
 '</div></body></html>']
open(f'{ROOT}/tour.html', 'w').write('\n'.join(h))
print('tour.md and tour.html written; html', os.path.getsize(f'{ROOT}/tour.html'), 'bytes')
