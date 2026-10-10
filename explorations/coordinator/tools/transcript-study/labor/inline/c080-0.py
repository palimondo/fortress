import pickle,collections,os,re
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
def unesc(s): return s.replace('\\n','\n').replace('\\"','"').replace('\\\\','\\').replace('\\t','\t')
def norm(s): return re.sub(r'\s+',' ',s)
W=40
out=[]
for aid,o in O.items():
    br=norm(unesc(briefs[aid][1]))+' '+norm(briefs[aid][1])
    txt={c['id']:c.get('text','') for t in A[aid]['turns'] for c in t['calls']}
    for c in o['calls']:
        if c['cls'].startswith('write') or c['cls'].startswith('report'): continue
        t=norm(txt.get(c['id'],''))
        if len(t)<200: continue
        n=0;h=0
        for i in range(0,len(t)-W,20):
            n+=1
            if t[i:i+W] in br: h+=1
        out.append((o['role'],c['cls'],[os.path.basename(f) for f in c['files'][:2]],c['res'],c['res']*h/n,aid,o['label']))
tab=collections.defaultdict(lambda:[0,0])
for r in out: tab[r[0]][0]+=r[3]; tab[r[0]][1]+=r[4]
nag=collections.Counter(o['role'] for o in O.values())
for role,(a,b) in tab.items(): print('%-14s results %6.1fK/agent, 40-char windows already in the unescaped brief %5.1fK (%.0f%%)'%(role,a/nag[role]/1000,b/nag[role]/1000,100*b/a))
tot=sum(r[4] for r in out); print('total in brief',tot/1000)
for r in sorted(out,key=lambda r:-r[4])[:12]: print(r[6],r[1],r[2],'%.1fK of %.1fK'%(r[4]/1000,r[3]/1000))
