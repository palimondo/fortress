# The formulas beside each Fortress definition, typeset by tools/mathfig.sh with
# the same TeX and dvisvgm pipeline as the code figures.  The spellings follow
# the papers named in the article: Vaswani et al. 2017 (attention, heads),
# Zhang & Sennrich 2019 (RMSNorm), Kingma & Ba 2015 (Adam), Karpathy 2026 (the
# reference), and the standard matrix-calculus backprop rules.
MATH = {
 'embed': r"X^{(0)} = \mathrm{rmsnorm}\big(E_{\mathrm{tokens}} + P_{0:n}\big)\qquad(E \in \mathbb{R}^{V\times d},\; P \in \mathbb{R}^{T\times d})",
 'rmsnorm': r"\mathrm{rmsnorm}(x)=\frac{x}{\sqrt{\frac{1}{d}\sum_{i=1}^{d} x_i^{2}+\varepsilon}} = \frac{x}{\sqrt{\frac{x\cdot x}{d}+\varepsilon}}\qquad(\varepsilon=10^{-5})",
 'softmax': r"\mathrm{softmax}(z)_i=\frac{e^{z_i-m}}{\sum_j e^{z_j-m}},\qquad m=\max_j z_j",
 'attention': r"\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}+M\right)V,\qquad M_{ij}=\begin{cases}0 & j\le i\\ -\infty & j>i\end{cases}",
 'multihead': r"\begin{aligned} Q&=XW_q^{\top},\quad K=XW_k^{\top},\quad V=XW_v^{\top},\qquad c_h = \{h\,d_h,\ldots,(h+1)d_h-1\}\\ \mathrm{head}_h&=\mathrm{Attention}(Q_{:,c_h},K_{:,c_h},V_{:,c_h})\\ \mathrm{MHA}(X)&=\mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_H)\,W_o^{\top}\end{aligned}",
 'block': r"X'=X+\mathrm{MHA}(\mathrm{rmsnorm}(X)),\qquad X''=X'+\mathrm{mlp}(\mathrm{rmsnorm}(X')),\qquad \mathrm{mlp}(X)=\mathrm{relu}(XW_{\mathrm{in}}^{\top})\,W_{\mathrm{out}}^{\top}",
 'logits': r"\mathrm{logits}=X^{(L)}W_{\mathrm{lm}}^{\top}\in\mathbb{R}^{n\times V}",
 'loss': r"L=-\frac{1}{n}\sum_{t=0}^{n-1}\log P_{t,\,y_t},\qquad P=\mathrm{softmax}(\mathrm{logits}),\quad y_t=\mathrm{tokens}_{t+1}",
 'chain': r"\bar{c}\;\mathrel{+}=\;\Big(\frac{\partial v}{\partial c}\Big)^{\!\top}\bar{v}\qquad\text{for every child } c \text{ of } v,\qquad \bar{v}=\frac{\partial L}{\partial v}",
 'matmul': r"\begin{aligned} Y=AB:&\quad \bar A = \bar Y B^{\top},\quad \bar B = A^{\top}\bar Y &\qquad Y=A^{\top}:&\quad \bar A=\bar Y^{\top}\\ Y=A+B:&\quad \bar A=\bar B=\bar Y &\qquad Y=A\odot B:&\quad \bar A=\bar Y\odot B,\quad \bar B=\bar Y\odot A\\ Y=\mathrm{relu}(A):&\quad \bar A=\bar Y\odot\mathbf 1_{A>0} &\qquad Y=A/c:&\quad \bar A=\bar Y/c\end{aligned}",
 'vecrules': r"\begin{aligned} y=x\cdot z:&\ \ \bar x=\bar y\,z,\ \bar z=\bar y\,x &\qquad y=x/s:&\ \ \bar x=\bar y/s,\ \ \bar s=-\frac{\bar y\cdot x}{s^{2}}\\ y=e^{x}:&\ \ \bar x=\bar y\odot e^{x} &\qquad y=\textstyle\sum_i x_i:&\ \ \bar x=\bar y\,\mathbf 1\\ y=c\,x:&\ \ \bar x=c\,\bar y,\ \bar c=\bar y\cdot x &\qquad y = x\odot z:&\ \ \bar x=\bar y\odot z\end{aligned}",
 'scalarrules': r"\frac{\partial\sqrt a}{\partial a}=\frac{1}{2\sqrt a},\qquad \frac{\partial\ln a}{\partial a}=\frac1a,\qquad \frac{\partial (a/b)}{\partial a}=\frac1b,\ \frac{\partial (a/b)}{\partial b}=-\frac{a}{b^{2}}",
 'adam': r"m_t=\beta_1 m_{t-1}+(1-\beta_1)g_t,\quad v_t=\beta_2 v_{t-1}+(1-\beta_2)\,g_t\odot g_t,\quad \hat m_t=\frac{m_t}{1-\beta_1^{t}},\quad \hat v_t=\frac{v_t}{1-\beta_2^{t}},\quad \theta_t=\theta_{t-1}-\eta_t\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}",
 'sample': r"\Pr(\mathrm{token}=i)=\mathrm{softmax}(\mathrm{logits}/\tau)_i,\qquad \mathrm{token}=\min\Big(\big|\{\,j : \textstyle\sum_{k\le j}p_k \le u\sum_k p_k\,\}\big|,\ V-1\Big)",
 'sum': r"\sum_{t\leftarrow g} f(t)\ \text{ over anything with a }+,\qquad \sum e = \textstyle\sum_i e_i \text{ as one node}",
 'linear_vjp': r"y=Wx:\quad \bar W=\bar y\,x^{\top},\qquad \bar x=W^{\top}\bar y",
 'eta': r"\eta_t=\eta\,\big(1-\tfrac{t}{T}\big),\qquad \eta=0.01,\ T=1000",
}
