import pickle,numpy as np
A=pickle.load(open('agents.pkl','rb'))
rows=[]
for aid,a in A.items():
    t=a['turns'][0]; u=t['usage']
    ctx1=u['cache_creation_input_tokens']+u['cache_read_input_tokens']+u['input_tokens']
    w1=u['cache_creation_input_tokens']+u['input_tokens']
    brief=a['first_user'][-1]
    rows.append((a['batch'],a['label'],ctx1,w1,u['cache_read_input_tokens'],brief,sum(a['first_user'])))
    print(a['batch'],a['label'],ctx1,w1,u['cache_read_input_tokens'],brief)
X=np.array([[r[5],1] for r in rows]); y=np.array([r[2] for r in rows])
co,res,_,_=np.linalg.lstsq(X,y,rcond=None); print('ctx1 = %.4f*chars + %.0f'%tuple(co))
pred=X@co; print('resid max',np.abs(y-pred).max(), 'r2',1-((y-pred)**2).sum()/((y-y.mean())**2).sum())
