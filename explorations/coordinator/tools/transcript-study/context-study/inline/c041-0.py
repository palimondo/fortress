import json
try:
    import numpy as np
except Exception as e:
    print('no numpy',e); raise SystemExit
rows=[];ys=[]
for name,id in [('W','ac7f17fcef729d710'),('N','a9d085d2ca3d1673f'),('G','ad8b9ef1d620d222e'),('C','a17102eab231ad505')]:
    d=json.load(open(f'json/{id}.json'))
    turns=d['turns']; ev=d['events']
    # per turn: result bytes of calls issued in previous turn(s) arriving before this turn; use calls by turn index
    resb={};resn={};outb={}
    for e in ev:
        if e['k']=='call':
            resb[e['turn']]=resb.get(e['turn'],0)+e['rbytes']; resn[e['turn']]=resn.get(e['turn'],0)+1
            outb[e['turn']]=outb.get(e['turn'],0)+len(json.dumps(e['input']))
    for i in range(1,len(turns)):
        t=turns[i]; p=turns[i-1]
        ctx=t['input']+t['cc']+t['cr']; pctx=p['input']+p['cc']+p['cr']
        growth=ctx-pctx
        if p['out']<=0: continue
        rows.append([resb.get(i-1,0),resn.get(i-1,0),outb.get(i-1,0)])
        ys.append(growth)
X=np.array(rows,float);y=np.array(ys,float)
# fit growth = a*resbytes + b*nresults + c*callinputbytes + d
A=np.c_[X,np.ones(len(X))]
coef,res,rk,sv=np.linalg.lstsq(A,y,rcond=None)
pred=A@coef
r2=1-((y-pred)**2).sum()/((y-y.mean())**2).sum()
print('coef bytes,nres,callbytes,const',coef,'R2',r2,len(y))
