import pickle,collections,sys
from tab1 import grp
O=pickle.load(open('acct.pkl','rb'))
ROWS=[
 ('first call',['__first']),
 ('own thinking',['__think']),
 ('briefing (facts-extract)',['KB: briefing (facts-extract)']),
 ('record documents',['KB: FACTS','KB: POSITIONS','KB: PLAN','KB: ledger','KB: INDEX and maps','KB: batch record','KB: handover/other docs']),
 ('specification',['KB: specification']),
 ('chain reports/transcripts',['reports and artifacts of the rung chain']),
 ('source',['source (Java, Scala)']),
 ('library',['Fortress library']),
 ('tests',['tests']),
 ('search',['search (grep, find, ls, git log)']),
 ('git diff/show',['git diff/show/status']),
 ('edit product',['edit: product (src, library, spec)']),
 ('edit tests',['edit: tests']),
 ('write probes/scratch',['write: probes and scratch']),
 ('write reports/record',['write: report files','edit: record (FACTS, ledger...)','structured result']),
 ('build',['build']),
 ('run tests/stages',['run tests/stages']),
 ('run probes',['run probes']),
 ('wait/poll',['wait/poll']),
 ('read output',['read output (logs, results)']),
 ('git commit/push/ops',['git: commit/push/ops']),
 ('cache refill',['__refill']),
 ('other',['other']),
]
def cell(ags,keys):
    v=0
    for o in ags:
        for k in keys:
            if k=='__first': v+=o['w1']
            elif k=='__think': v+=o['think']
            elif k=='__refill': v+=o['refill']
            else: v+=sum(c['res']+c['inp'] for c in o['calls'] if grp(c['cls'])==k)
    return v/len(ags)
def table(groups):
    names=list(groups)
    print('class | '+' | '.join(f'{n}(n={len(groups[n])})' for n in names))
    for name,keys in ROWS:
        print(name+' | '+' | '.join('%.0f'%(cell(groups[n],keys)/1000) for n in names))
    print('WRITES | '+' | '.join('%.0f'%(sum(o['W'] for o in groups[n])/len(groups[n])/1000) for n in names))
    print('% of writes:')
    for name,keys in ROWS:
        print(name+' | '+' | '.join('%.0f'%(100*cell(groups[n],keys)/(sum(o['W'] for o in groups[n])/len(groups[n]))) for n in names))
def sel(batch,role,lab=None):
    return [o for o in O.values() if o['batch']==batch and o['role']==role and (lab is None or o['label'] in lab)]
if __name__=='__main__':
    which=sys.argv[1] if len(sys.argv)>1 else '10'
    if which=='10':
        g=collections.OrderedDict((r,sel(10,r)) for r in ['rung','skeptic','judge','repair','skeptic2','gather','review','gate','commit'])
        table(g)
    else:
        g=collections.OrderedDict()
        for b in (8,9):
            for r in ['rung','skeptic','judge','repair','skeptic2']:
                g[f'{r}{b}']=sel(b,r)
        table(g)
