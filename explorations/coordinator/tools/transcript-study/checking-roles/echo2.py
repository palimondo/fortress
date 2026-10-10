import re,sys,pickle,collections
from echo import texts,toks,unesc,BR,byid,lab
def blocks(t):
    # split by '  ## ' or '  # ' headings (indented by 2), keep first block as 'start'
    ms=[(m.start(),m.group(2)) for m in re.finditer(r'^( {2})(#{1,2} .*)$',t,re.M)]
    out=[]
    for i,(p,h) in enumerate(ms):
        e=ms[i+1][0] if i+1<len(ms) else len(t)
        out.append((h[:60],t[p:e]))
    return out
def run(l,show=True):
    aid=byid[l]; t=BR[aid]
    out,res=texts(aid)
    bl=blocks(t)
    # prefix tokens = tokens in blocks before '# Your role'
    pre=set(); rolei=[i for i,(h,_) in enumerate(bl) if h.startswith('# Your role')][0]
    for h,x in bl[:rolei]: pre|=toks(x)
    rows=[]
    # merge the prefix blocks into one row
    pref=''.join(x for h,x in bl[:rolei])
    tk=toks(pref)
    ino=sum(1 for x in tk if x in out); inr=sum(1 for x in tk if x in res)
    rows.append(('(shared prefix)',len(pref),len(tk),ino,inr))
    for h,x in bl[rolei:]:
        tk=toks(unesc(x))-pre
        ino=sum(1 for z in tk if z in out); inr=sum(1 for z in tk if z in res)
        rows.append((h,len(x),len(tk),ino,inr))
    if show:
        print('=====',l,len(t),'chars')
        for h,n,k,a,b in rows:
            if n<400 and k==0: continue
            print(f'  {h:60s} {n:6d}  tokens {k:4d}  in-own-output {100*a/k if k else 0:3.0f}%  in-results {100*b/k if k else 0:3.0f}%')
    return rows
if __name__=='__main__':
    for l in sys.argv[1:]: run(l)
