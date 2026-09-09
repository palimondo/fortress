# LaTeX for the formulas beside each Fortress definition (rendered by tools/mathfig.sh).
MATH = {
 'chain': r"\frac{\partial L}{\partial c} \mathrel{+}= \frac{\partial v}{\partial c}\cdot\frac{\partial L}{\partial v}",
 'localgrads': r"\frac{\partial (a+b)}{\partial a}=1,\quad \frac{\partial (ab)}{\partial a}=b,\quad \frac{\partial a^{n}}{\partial a}=n\,a^{n-1},\quad \frac{\partial \ln a}{\partial a}=\frac1a,\quad \frac{\partial e^{a}}{\partial a}=e^{a},\quad \frac{\partial\,\mathrm{relu}(a)}{\partial a}=\mathbf{1}_{a>0}",
 'sum': r"\sum_{x_i\in x} f(x_i)",
 'dot': r"x\cdot y=\sum_{i} x_i\,y_i,\qquad (Wx)_i = w_i\cdot x,\qquad (aM)_j=\sum_t a_t\,M_{tj}",
 'rmsnorm': r"\mathrm{rmsnorm}(x)=\frac{x}{\sqrt{\tfrac1n\sum_i x_i^{2}+\varepsilon}}\qquad(\varepsilon=10^{-5})",
 'softmax': r"\mathrm{softmax}(z)_i=\frac{e^{z_i-m}}{\sum_j e^{z_j-m}},\qquad m=\max_j z_j",
 'attention': r"Q=XW_q^{\top},\; K=XW_k^{\top},\; V=XW_v^{\top};\qquad \alpha_t=\mathrm{softmax}\!\left(\frac{K_{0:t}\,q_t}{\sqrt{d_h}}\right),\qquad y_t=\alpha_t V_{0:t}",
 'multihead': r"\mathrm{MHA}(X)_t = W_o\,\big[\,y^{(1)}_t \,\|\, y^{(2)}_t \,\|\, \cdots \,\|\, y^{(H)}_t\,\big]",
 'mlp': r"\mathrm{mlp}(x)=W_{\mathrm{out}}\,\mathrm{relu}(W_{\mathrm{in}}\,x)",
 'block': r"X'=X+\mathrm{attention}(\mathrm{rmsnorm}(X)),\qquad \mathrm{block}(X)=X'+\mathrm{mlp}(\mathrm{rmsnorm}(X'))",
 'embed': r"x_t=\mathrm{rmsnorm}\big(E_{\mathrm{tokens}_t}+P_t\big),\qquad \mathrm{logits}_t = W_{\mathrm{lm}}\,x_t^{(L)}",
 'loss': r"L=\frac1n\sum_{t=0}^{n-1} -\log\,\mathrm{softmax}(\mathrm{logits}_t)_{\,\mathrm{tokens}_{t+1}}",
 'adam': r"m_i\leftarrow\beta_1 m_i+(1-\beta_1)g_i,\quad v_i\leftarrow\beta_2 v_i+(1-\beta_2)g_i^{2},\quad \hat m=\frac{m_i}{1-\beta_1^{t}},\quad \hat v=\frac{v_i}{1-\beta_2^{t}},\quad \theta_i\leftarrow\theta_i-\eta_t\frac{\hat m}{\sqrt{\hat v}+\epsilon}",
 'sample': r"\Pr(\text{token}=i)=\mathrm{softmax}(\mathrm{logits}/\tau)_i,\qquad \text{pick the least } i \text{ with } u\cdot\textstyle\sum_j p_j < \sum_{k\le i} p_k",
 'attn_paper': r"\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d}}\right)V",
 'kv': r"\alpha=\mathrm{softmax}\!\left(\frac{K q}{\sqrt{d_h}}\right),\qquad y=\alpha V\qquad\text{(this token's } q\text{; cached } K, V \text{ of the positions so far)}",
}
