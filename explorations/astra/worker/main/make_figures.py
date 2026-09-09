"""Extract verbatim definitions from executed sources into actual Fortify sheets."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).parent
S=(ROOT/'MicroGPT.fss').read_text(); A=(ROOT/'MicroGPTAlternatives.fss').read_text()
def excerpt(s,start,end): return s[s.index(start):s.index(end,s.index(start))].rstrip()
panels=[
 ('algebra',r'$y_i=\sum_{j=0}^{n-1}A_{ij}x_j,\qquad x\cdot y=\sum_i x_i y_i$',excerpt(S,'opr juxtaposition(A:Mat','opr  + (x:Vec')),
 ('rms',r'$\mathrm{RMS}(x)=x/\sqrt{(x\cdot x)/n+10^{-5}}$\\alternative: $((x\cdot x)/n+10^{-5})^{-1/2}x$',excerpt(S,'rmsnorm(x:Vec)','head(x:Vec,')+'\n\n'+excerpt(A,'opr juxtaposition(s:V,x:Vec)','head(x:Vec,')),
 ('softmax',r'$m=\max_i x_i,\quad e_i=\exp(x_i-m),\quad p_i=e_i/\sum_j e_j$',excerpt(S,'maximum(x:Vec)','rmsnorm(x:Vec)')),
 ('attention',r'$a=\mathrm{softmax}(Kq/\sqrt{d_h}),\quad o_j=\sum_t a_tW_{tj}= (W^\mathsf{T}a)_j$',excerpt(S,'attention(q:Vec','object Block')+'\n\n'+excerpt(A,'transpose(A:Mat)','object Block')),
 ('block',r'$y=x+W_o\operatorname{concat}_h(o_h),\quad x^+=y+W_{out}\operatorname{ReLU}(W_{in}\mathrm{RMS}(y))$',excerpt(S,'  y = x  +','object Model')),
 ('reduction',r'$\sum_i x_i$: identity $0$, combination $+$, scalar graph retained.',excerpt(S,'object VSumReduction','gradient(y:V')),
 ('adam',r'$m\leftarrow\beta_m m+(1-\beta_m)g,\quad v\leftarrow\beta_v v+(1-\beta_v)g^2$\\$p\leftarrow p-\alpha\widehat m/(\sqrt{\widehat v}+10^{-8})$',excerpt(S,'adam(p:Array','categorical(p:Vec')),
]
panels += [
 ('scalar',r'$z=xy:\quad \partial z/\partial x=y,\quad\partial z/\partial y=x$',excerpt(S,'binary(z:RR64','opr  + (x:V,y:RR64)')),
 ('containers',r'$x_i=f(i),\quad A_{ij}=f(i,j)$; eager storage of scalar graph references.',excerpt(S,'object Vec','opr juxtaposition(A:Mat')),
 ('embedding',r'$\ell_t=U\,\mathrm{Block}(\mathrm{RMS}(E_{token_t}+P_t))$',excerpt(S,'object Model','(* Each parameter')),
 ('loss',r'$L=-\frac1T\sum_{t=0}^{T-1}\log p_t[token_{t+1}]$',excerpt(S,'    losses[t] :=','    emitVector("logits"')+'\n'+excerpt(S,'  loss = (SUM','  emitParameters("gradient"')),
 ('sampling',r'$p=\operatorname{softmax}(\ell/0.5),\quad k=\min\{j:u<\sum_{i=0}^{j}p_i\}$',excerpt(S,'categorical(p:Vec','emitMatrix(') if 'emitMatrix(' in S else excerpt(S,'categorical(p:Vec','emitParameters(')),
]
out=ROOT/'figures';out.mkdir(exist_ok=True)
for name,formula,code in panels:
 (out/(name+'.tic')).write_text('\\documentclass{article}\n\\usepackage{fortify}\n\\usepackage[active,tightpage]{preview}\n\\setlength\\PreviewBorder{6pt}\n\\begin{document}\\begin{preview}\\begin{minipage}{19cm}\n\\small\n'+formula+'\n`\n'+code+'\n`\n\\end{minipage}\\end{preview}\\end{document}\n')
(out/'source-hashes.json').write_text(json.dumps({n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ['MicroGPT.fss','MicroGPTAlternatives.fss']},indent=2)+'\n')
