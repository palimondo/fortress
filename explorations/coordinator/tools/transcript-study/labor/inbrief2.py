import pickle,collections,os,re
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
rows=pickle.load(open('inbrief.pkl','rb'))
def norm(s): return re.sub(r'\s+',' ',s)
W=50
out=[]
for aid,o in O.items():
    br=norm(briefs[aid][1])
    txt={c['id']:c.get('text','') for t in A[aid]['turns'] for c in t['calls']}
    for c in o['calls']:
        if c['cls'].startswith('write') or c['cls'].startswith('report'): continue
        t=norm(txt.get(c['id'],''))
        if len(t)<200: continue
        n=0;h=0
        for i in range(0,len(t)-W,25):
            n+=1
            if t[i:i+W] in br: h+=1
        out.append((o['role'],c['cls'],c['files'][:2],c['res'],c['res']*h/n,aid))
tab=collections.defaultdict(lambda:[0,0])
for r in out: tab[r[0]][0]+=r[3]; tab[r[0]][1]+=r[4]
nag=collections.Counter(o['role'] for o in O.values())
for role,(a,b) in tab.items(): print('%-14s results %6.1fK/agent, text already in the brief (50-char windows) %5.1fK (%.0f%%)'%(role,a/nag[role]/1000,b/nag[role]/1000,100*b/a))
big=sorted(out,key=lambda r:-r[4])[:15]
for r in big: print(r[0],r[1],[os.path.basename(f) for f in r[2]],'%.1fK of %.1fK'%(r[4]/1000,r[3]/1000))
pickle.dump(out,open('inbrief2.pkl','wb'))
