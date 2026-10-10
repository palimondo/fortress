import pickle,collections,os
from cls import kind_of_path
O=pickle.load(open('acct.pkl','rb'))
def lab(c):
    cls=c['cls']
    if cls=='read:kb:briefing': return 'the briefing slice'
    if cls=='read:transcripts': return "the worker's/repair's transcript (jq, awk)"
    fs=sorted(set(os.path.basename(f) for f in c['files'] if kind_of_path(f))) or sorted(set(os.path.basename(f) for f in c['files']))
    if cls=='search': return '(search, no file named)'
    if cls=='git:diff-show': return 'git diff/show/log'
    if cls=='run:probes': return '(probe runs)'
    return ','.join(fs[:2]) if fs else '('+cls+')'
for role in ['skeptic','judge','skeptic2']:
    ags=[o for o in O.values() if o['batch']==10 and o['role']==role]
    t=collections.Counter(); n=collections.defaultdict(set)
    for o in ags:
        for c in o['calls']:
            k=lab(c); t[k]+=c['res']+c['inp']; n[k].add(o['aid'])
    print('==',role,len(ags))
    for k,v in t.most_common(9): print('   %-46s %6.1fK over %d agents'%(k[:46],v/1000,len(n[k])))
