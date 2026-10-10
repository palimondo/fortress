import pickle,numpy as np,json
A=pickle.load(open('agents.pkl','rb')); O=pickle.load(open('acct.pkl','rb'))
rows=[];ys=[];meta=[]
for aid,a in A.items():
    T=a['turns']
    for k in range(1,len(T)):
        p=T[k-1]
        if p['stop'] and not p['thinking']:
            u0=T[k-1]['usage'];u=T[k]['usage']
            new=(u['cache_creation_input_tokens']+u['cache_read_input_tokens']+u['input_tokens'])-(u0['cache_creation_input_tokens']+u0['cache_read_input_tokens']+u0['input_tokens'])
            by=sum(c['rbytes'] for c in p['calls']); n=len(p['calls'])
            rows.append([p['out'],by,n,1]); ys.append(new); meta.append((aid,k,p['out'],by,n,new,T[k]['att_before']))
X=np.array(rows,float);y=np.array(ys,float)
print(len(y))
co,_,_,_=np.linalg.lstsq(X,y,rcond=None); print('out,bytes,n,const',co)
pred=X@co; print('r2',1-((y-pred)**2).sum()/((y-y.mean())**2).sum())
for m in meta[:25]: print(m, 'est', round(m[2]+0.4*m[3]+110*m[4]))
