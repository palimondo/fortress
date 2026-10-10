import pickle,re,os
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
def secs(t,minsize=0):
    ms=[(m.start(),m.group(1)) for m in re.finditer(r'^\s{0,4}(#{1,3} .*)$',t,re.M)]
    out=[]
    for i,(p,h) in enumerate(ms):
        e=ms[i+1][0] if i+1<len(ms) else len(t)
        out.append((p,e-p,h))
    return out
for k in ['rung:N','skeptic:N','judge:N','skeptic2:N','repair:N']:
    t=byl[k]; print('=====',k,len(t))
    for p,n,h in secs(t):
        if p>=47000 or n>3000: print(f'{p:7d} {n:6d} {h[:100]}')
