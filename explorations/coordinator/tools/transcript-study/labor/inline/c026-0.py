import pickle,json,numpy as np
A=pickle.load(open('agents.pkl','rb'))
# turns with a stop reason, no thinking, single tool_use: out tokens vs chars of input
xs=[];ys=[]
for a in A.values():
    for t in a['turns']:
        if t['stop'] and not t['thinking'] and t['out']>200:
            ch=sum(len(json.dumps(c['input'])) for c in t['calls'])+t['textchars']
            xs.append(ch); ys.append(t['out'])
xs=np.array(xs);ys=np.array(ys)
print(len(xs), 'tokens/char median', np.median(ys/xs), 'mean', ys.sum()/xs.sum())
# all stop turns
xs=[];ys=[];th=[]
for a in A.values():
    for t in a['turns']:
        if t['stop']:
            ch=sum(len(json.dumps(c['input'])) for c in t['calls'])+t['textchars']
            xs.append(ch); ys.append(t['out']); th.append(t['thinking'])
xs=np.array(xs);ys=np.array(ys);th=np.array(th)
print(len(xs),'thinking frac',th.mean(),'all stop turns: out',ys.sum(),'chars',xs.sum(), 'ratio', ys.sum()/xs.sum())
print('thinking turns avg out',ys[th].mean(),'non-thinking',ys[~th].mean())
tot=sum(1 for a in A.values() for t in a['turns']); st=sum(1 for a in A.values() for t in a['turns'] if t['stop'])
print('turns',tot,'with stop',st)
