#!/bin/bash
# The papers' formulas, typeset through the same LaTeX + dvisvgm pipeline and at the same size as the Fortress renders.
set -e
one() { n="$1"; body="$2"
cat > "$n.tex" <<TEX
\documentclass{article}
\usepackage{amsmath,amssymb}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{6pt}
\begin{document}
\begin{preview}
\$\displaystyle $body\$
\end{preview}
\end{document}
TEX
latex -interaction=nonstopmode "$n.tex" >/dev/null || { grep -n '^!' "$n.log" | head -3; exit 1; }
dvisvgm --no-fonts --exact-bbox -o "$n.svg" "$n.dvi" >/dev/null 2>&1
}
one f_embed     'H_0 = \mathrm{RMSNorm}\bigl(\mathbf{W}\!_{e}[\,\mathit{tokens}\,] + \mathbf{W}\!_{p}[\,\mathit{positions}\,]\bigr)'
one f_rmsnorm   '\mathrm{RMSNorm}(x)_j = \frac{x_j}{\sqrt{\frac{1}{d}\sum_{k} x_k^2 + \epsilon}}'
one f_attention '\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^{T}}{\sqrt{d_k}} + M\right) V'
one f_head      '\mathrm{head}_h = \mathrm{Attention}(X\mathbf{W}^{Q}_{h},\; X\mathbf{W}^{K}_{h},\; X\mathbf{W}^{V}_{h})'
one f_mha       '\mathrm{MultiHead}(X) = \mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_{n_h})\,\mathbf{W}^{O}'
one f_ffn       '\mathrm{FFN}(X) = \max(0,\, X\mathbf{W}_1)\,\mathbf{W}_2'
one f_block     'X^{\prime} = X + \mathrm{MultiHead}(\mathrm{RMSNorm}(X)), \qquad X^{\prime\prime} = X^{\prime} + \mathrm{FFN}(\mathrm{RMSNorm}(X^{\prime}))'
one f_logits    'Z = X^{\prime\prime}\,\mathbf{W}_{lm}, \qquad L = -\frac{1}{T}\sum_{t} \log \mathrm{softmax}(Z)_{t,\,y_t}'
one f_softmax   '\mathrm{softmax}(s)_j = \frac{e^{\,s_j - \max_k s_k}}{\sum_{k} e^{\,s_k - \max_k s_k}}'
one f_softmax_b '\bar S_{ij} = P_{ij}\Bigl(\bar P_{ij} - \sum_{k} \bar P_{ik} P_{ik}\Bigr)'
one f_rmsnorm_b '\bar X_{ij} = \frac{\bar Y_{ij}}{r_i} - \frac{X_{ij}\sum_{k}\bar Y_{ik}X_{ik}}{d\, r_i^{3}}, \qquad r_i = \sqrt{\tfrac{1}{d}\textstyle\sum_k X_{ik}^2 + \epsilon}'
one f_matmul_b  'C = AB \;\Rightarrow\; \bar A = \bar C B^{T}, \quad \bar B = A^{T}\bar C'
one f_add_b     'C = A + B \;\Rightarrow\; \bar A = \bar C, \quad \bar B = \bar C; \qquad C = A^{T} \;\Rightarrow\; \bar A = \bar C^{T}'
one f_relu_b    'C = \max(0, A) \;\Rightarrow\; \bar A = \bar C \odot \mathbf{1}[A > 0]'
one f_nll_b     'L = -\frac{1}{T}\sum_t \log P_{t,y_t} \;\Rightarrow\; \bar P_{t,v} = -\frac{\mathbf{1}[v = y_t]}{T\,P_{t,v}}'
one f_gather_b  'C = E[\,\mathit{ts}\,] \;\Rightarrow\; \bar E_{v,j} = \sum_{t:\; \mathit{ts}_t = v} \bar C_{t,j}'
one f_concat_b  'C = [\,H_0\;\cdots\;H_{n_h-1}\,] \;\Rightarrow\; \bar H_h = \bar C_{:,\; hw : (h+1)w}, \qquad \nabla = \sum_h \bar H_h'
one f_chain     '\bar\theta = \sum_{\text{paths}} \Bigl(\frac{\partial L}{\partial C}\Bigr)\frac{\partial C}{\partial \theta}, \qquad \text{pullback}_C(\bar C) : \bar C \mapsto \nabla_\theta'
one f_adam      '\begin{aligned} m_t &= \beta_1 m_{t-1} + (1-\beta_1)\, g_t & v_t &= \beta_2 v_{t-1} + (1-\beta_2)\, g_t \odot g_t \\ \hat m_t &= \frac{m_t}{1-\beta_1^{t}} & \hat v_t &= \frac{v_t}{1-\beta_2^{t}} \\ \theta_t &= \theta_{t-1} - \mathrm{lr}\,\frac{\hat m_t}{\sqrt{\hat v_t} + \epsilon} \end{aligned}'
one f_lr        '\mathrm{lr}_t = \mathrm{lr}_0\,\Bigl(1 - \frac{t}{N}\Bigr)'
one f_sample    'p = \mathrm{softmax}(z/\tau), \qquad \mathit{token} = \min\{\,k : \textstyle\sum_{i \le k} p_i > u \sum_i p_i\,\}'
one f_causal    'M_{ij} = \begin{cases} 0 & j \le i \\ -\infty & j > i \end{cases}'
one f_tokens    '\mathit{tokens} = [\,\mathrm{BOS},\, c_1, \ldots, c_n,\, \mathrm{BOS}\,], \qquad c_i = \mathrm{index}(\mathit{uchars}, \mathit{doc}_i)'
echo formulas done
