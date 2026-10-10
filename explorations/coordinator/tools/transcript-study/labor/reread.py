import pickle,collections,os,re,json
from cls import kind_of_path
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
def lines_of(txt):
    return [l.strip() for l in txt.split('\n') if len(l.strip())>=25]
def lab(c):
    cls=c['cls']
    if cls=='read:kb:briefing': return 'BRIEFING'
    fs=sorted(set(os.path.basename(f) for f in c['files'] if kind_of_path(f))) or sorted(set(os.path.basename(f) for f in c['files']))
    return ','.join(fs[:3]) if fs else '('+cls+')'
OUT=[]
for aid,o in O.items():
    ag=A[aid]
    txt={c['id']:c.get('text','') for t in ag['turns'] for c in t['calls']}
    seen_res=set(); seen_inp=set()
    cmds=collections.Counter()
    for c in o['calls']:
        ls=lines_of(txt.get(c['id'],''))
        tot=sum(len(l) for l in ls)
        rr=sum(len(l) for l in ls if l in seen_res)
        ri=sum(len(l) for l in ls if l not in seen_res and l in seen_inp)
        key=json.dumps(c['input'],sort_keys=True)
        same=cmds[key]; cmds[key]+=1
        OUT.append(dict(aid=aid,role=o['role'],cls=c['cls'],label=lab(c),res=c['res'],frac_res=rr/tot if tot else 0,frac_inp=ri/tot if tot else 0,samecmd=same,tok_rr=c['res']*(rr/tot if tot else 0),tok_ri=c['res']*(ri/tot if tot else 0)))
        for l in ls: seen_res.add(l)
        # own inputs: lines of heredoc bodies / edit new_string
        inp=c['input']; s=''
        if isinstance(inp,dict):
            for v in inp.values():
                if isinstance(v,str): s+=v+'\n'
        for l in lines_of(s): seen_inp.add(l)
pickle.dump(OUT,open('reread.pkl','wb'))
nag=collections.Counter(o['role'] for o in O.values())
tab=collections.defaultdict(lambda:collections.Counter())
for r in OUT:
    g=r['cls']
    if g.startswith('write') or g.startswith('git:commit') or g.startswith('report') : continue
    tab[r['role']]['res']+=r['res']; tab[r['role']]['rr']+=r['tok_rr']; tab[r['role']]['ri']+=r['tok_ri']
    if r['samecmd']>0: tab[r['role']]['samecmd']+=r['res']; tab[r['role']]['n_samecmd']+=1
for role in nag:
    t=tab[role]; n=nag[role]
    print('%-14s results %6.1fK/agent  repeated-from-earlier-result %5.1fK (%2.0f%%)  read-back-of-own-writes %5.1fK (%2.0f%%)  identical-command-repeats %4.1fK (%d)'%(role,t['res']/n/1000,t['rr']/n/1000,100*t['rr']/t['res'],t['ri']/n/1000,100*t['ri']/t['res'],t['samecmd']/n/1000,t['n_samecmd']))
# by class group
g=collections.defaultdict(lambda:collections.Counter())
for r in OUT:
    c=r['cls']
    if c.startswith('write') or c.startswith('git:commit') or c.startswith('report'): continue
    g[c]['res']+=r['res']; g[c]['rr']+=r['tok_rr']; g[c]['ri']+=r['tok_ri']
print()
for c,v in sorted(g.items(),key=lambda x:-x[1]['rr']-x[1]['ri'])[:16]:
    print('%-24s res %7.0fK  re-read %6.0fK (%2.0f%%)  read-back %6.0fK (%2.0f%%)'%(c,v['res']/1000,v['rr']/1000,100*v['rr']/v['res'],v['ri']/1000,100*v['ri']/v['res']))
tot=sum(v['res'] for v in g.values()); print('TOTAL results',tot/1000,'re-read',sum(v['rr'] for v in g.values())/1000,'readback',sum(v['ri'] for v in g.values())/1000)
