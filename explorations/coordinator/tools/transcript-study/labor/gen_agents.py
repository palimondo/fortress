import pickle,collections
from tab1 import grp
O=pickle.load(open('acct.pkl','rb'))
COLS=[('first',['__first']),('think',['__think']),('briefing',['KB: briefing (facts-extract)']),
 ('record',['KB: FACTS','KB: POSITIONS','KB: PLAN','KB: ledger','KB: INDEX and maps','KB: batch record','KB: handover/other docs']),
 ('spec',['KB: specification']),('reports',['reports and artifacts of the rung chain']),('code',['source (Java, Scala)','Fortress library','tests']),
 ('search',['search (grep, find, ls, git log)']),('diff',['git diff/show/status']),('edit',['edit: product (src, library, spec)','edit: tests']),
 ('scratch',['write: probes and scratch']),('report',['write: report files','edit: record (FACTS, ledger...)','structured result']),
 ('run',['build','run tests/stages','run probes','wait/poll']),('output',['read output (logs, results)']),('git',['git: commit/push/ops']),('refill',['__refill']),('other',['other'])]
def val(o,keys):
    v=0
    for k in keys:
        if k=='__first': v+=o['w1']
        elif k=='__think': v+=o['think']
        elif k=='__refill': v+=o['refill']
        else: v+=sum(c['res']+c['inp'] for c in o['calls'] if grp(c['cls'])==k)
    return v
print('b agent            writes turns '+' '.join('%7s'%c for c,_ in COLS))
names={}
seen=collections.Counter()
for o in O.values():
    lab=o['label']; seen[(o['batch'],lab)]+=1
    nm=lab
    if o['batch']==9 and lab in('rung:W','rung:S'): nm=lab+(' (killed)' if seen[(9,lab)]==1 else ' (resumed)')
    print('%d %-18s %5.0f %5d '%(o['batch'],nm,o['W']/1000,o['nturns'])+' '.join('%7.0f'%(val(o,k)/1000) for _,k in COLS))
