import pickle,collections
from tab1 import grp
O=pickle.load(open('acct.pkl','rb'))
SUPER={'briefing':['KB: briefing (facts-extract)'],'KBdocs':['KB: FACTS','KB: POSITIONS','KB: PLAN','KB: ledger','KB: INDEX and maps','KB: batch record','KB: handover/other docs'],'spec':['KB: specification'],
 'artifacts':['reports and artifacts of the rung chain'],'src/lib/tests':['source (Java, Scala)','Fortress library','tests'],'search':['search (grep, find, ls, git log)'],'diff':['git diff/show/status'],
 'edit':['edit: product (src, library, spec)','edit: tests','write: probes and scratch','edit: record (FACTS, ledger...)'],'report':['write: report files','structured result'],
 'build/run/wait':['build','run tests/stages','run probes','wait/poll'],'output':['read output (logs, results)'],'git':['git: commit/push/ops'],'other':['other']}
inv={g:k for k,v in SUPER.items() for g in v}
cols=['first','think','briefing','KBdocs','spec','artifacts','src/lib/tests','search','diff','edit','report','build/run/wait','output','git','other','refill']
def row(o):
    d=collections.Counter()
    d['first']=o['w1']; d['think']=o['think']; d['refill']=o['refill']
    for c in o['calls']:
        d[inv.get(grp(c['cls']),'other')]+=c['res']+c['inp']
    return d
if __name__=='__main__':
    print('%-16s %5s %4s '%('agent','W','turn')+' '.join('%6s'%c[:6] for c in cols))
    for o in O.values():
        d=row(o)
        print('%d %-14s %5.0f %4d '%(o['batch'],o['label'],o['W']/1000,o['nturns'])+' '.join('%6.0f'%(d[c]/1000) for c in cols))
