import pickle,collections,os,re
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
def unesc(s): return s.replace('\\n','\n').replace('\\"','"').replace('\\\\','\\').replace('\\t','\t')
def lines_of(txt): return [l.strip() for l in txt.split('\n') if len(l.strip())>=25]
from cls import kind_of_path
def lab(c):
    cls=c['cls']
    if cls=='read:kb:briefing': return 'BRIEFING'
    fs=sorted(set(os.path.basename(f) for f in c['files'] if kind_of_path(f))) or sorted(set(os.path.basename(f) for f in c['files']))
    return ','.join(fs[:3]) if fs else '('+cls+')'
rows=[]
for aid,o in O.items():
    br=set(lines_of(briefs[aid][1]))|set(lines_of(unesc(briefs[aid][1])))
    txt={c['id']:c.get('text','') for t in A[aid]['turns'] for c in t['calls']}
    for c in o['calls']:
        if c['cls'].startswith('write') or c['cls'].startswith('report'): continue
        ls=lines_of(txt.get(c['id'],'')); tot=sum(len(l) for l in ls)
        inb=sum(len(l) for l in ls if l in br)
        rows.append(dict(aid=aid,role=o['role'],cls=c['cls'],label=lab(c),res=c['res'],inb=c['res']*(inb/tot if tot else 0),batch=o['batch']))
pickle.dump(rows,open('inbrief3.pkl','wb'))
nag=collections.Counter(o['role'] for o in O.values())
tab=collections.defaultdict(lambda:collections.Counter())
for r in rows: tab[r['role']]['res']+=r['res']; tab[r['role']]['inb']+=r['inb']
for role,n in nag.items():
    t=tab[role]; print('%-14s results %6.1fK/agent  lines already in the (unescaped) brief %5.1fK (%.0f%%)'%(role,t['res']/n/1000,t['inb']/n/1000,100*t['inb']/t['res']))
lab_=collections.defaultdict(lambda:[0,0,set()])
for r in rows:
    x=lab_[(r['role'],r['label'])]; x[0]+=r['res']; x[1]+=r['inb']; x[2].add(r['aid'])
print('top (role,label) by tokens already in the brief')
for (role,l),(a,b,s) in sorted(lab_.items(),key=lambda x:-x[1][1])[:14]:
    print('  %-12s %-44s read %6.1fK  in brief %6.1fK  agents %d'%(role,l[:44],a/1000,b/1000,len(s)))
