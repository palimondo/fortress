import pickle,json,numpy as np
A=pickle.load(open('agents.pkl','rb'))
rows=[];Y=[]; flag=[]
for a in A.values():
    T=a['turns']
    for k in range(1,len(T)):
        u0=T[k-1]['usage'];u=T[k]['usage']
        ctx0=u0['cache_creation_input_tokens']+u0['cache_read_input_tokens']+u0['input_tokens']
        ctx=u['cache_creation_input_tokens']+u['cache_read_input_tokens']+u['input_tokens']
        new=ctx-ctx0
        # results arrived since turn k-1: results of calls of turn k-1
        pc=T[k-1]['calls']
        by=sum(c['rbytes'] for c in pc); n=len(pc)
        vis=sum(len(json.dumps(c['input'])) for c in pc)+T[k-1]['textchars']
        rows.append([by,n,vis,T[k]['att_before'],1]); Y.append(new); flag.append(T[k-1]['stop'] is not None)
X=np.array(rows,float);Y=np.array(Y,float)
co,_,_,_=np.linalg.lstsq(X,Y,rcond=None)
print('coeffs bytes,n,vis,att,const',co)
pred=X@co; print('r2',1-((Y-pred)**2).sum()/((Y-Y.mean())**2).sum(), len(Y))
# only turns where previous is final
m=np.array(flag)
co2,_,_,_=np.linalg.lstsq(X[m],Y[m],rcond=None); print('final-only',co2,m.sum())
# without const
co3,_,_,_=np.linalg.lstsq(X[:,:4],Y,rcond=None); print('noconst',co3)
print('neg new',(Y<0).sum(), 'sum new',Y.sum())
