import json,glob,os
names={}
for f in glob.glob('/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/agent-*.meta.json'):
    i=os.path.basename(f)[6:-10]; names[i]=json.load(open(f))['description']
tot=0;W=0
rows=[]
for i,n in names.items():
    d=json.load(open(f'json/{i}.json')); turns=d['turns']
    ev=[e for e in d['events'] if e['k']=='call']
    resby={}
    for e in ev: resby[e['turn']]=resby.get(e['turn'],0)+0.41*e['rbytes']+110
    ite=0
    for k,t in enumerate(turns):
        ctx=t['input']+t['cc']+t['cr']
        ite+=1.25*t['cc']+t['input']+0.05*t['cr']
        if k+1<len(turns):
            nn=turns[k+1]; nctx=nn['input']+nn['cc']+nn['cr']
            out=max(nctx-ctx-resby.get(k,0),0)
        else: out=t['out']
        ite+=5*out
    w=sum(t['input']+t['cc'] for t in turns)
    rows.append((n,len(turns),w,ite))
    tot+=ite;W+=w
for r in sorted(rows,key=lambda r:-r[3]): print('%-12s turns %3d writes %4dK  ITE %.2fM'%(r[0],r[1],r[2]/1000,r[3]/1e6))
print('total writes %.2fM  ITE %.1fM'%(W/1e6,tot/1e6))
