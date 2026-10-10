import pickle
import numpy as np
O=pickle.load(open('acct.pkl','rb'))
rows=[(o['label'],o['brief_chars'],o['ctx1'],o['w1'],o['cr1']) for o in O.values() if o['batch']==10]
x=np.array([r[1] for r in rows],float); y=np.array([r[2] for r in rows],float)
b,a=np.polyfit(x,y,1)
r2=1-((y-(a+b*x))**2).sum()/((y-y.mean())**2).sum()
print('ctx1 = %.0f + %.3f * chars, R2 %.3f'%(a,b,r2))
for l,c,ctx,w,cr in rows: print(f'{l:12s} brief {c:7d} chars  ctx1 {ctx:7d}  first writes {w:7d}  cacheread {cr:6d}  fit-brief-tokens {b*c:7.0f} resid {ctx-(a+b*c):6.0f}')
