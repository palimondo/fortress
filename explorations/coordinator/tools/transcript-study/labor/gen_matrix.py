import pickle,collections
from tab1 import grp
O=pickle.load(open('acct.pkl','rb'))
ROWS=[
 ('first call: system, tools, attachments, brief',['__first']),
 ('own thinking and narration (and harness reminders)',['__think']),
 ('briefing (facts-extract parts)',['KB: briefing (facts-extract)']),
 ('record: FACTS, POSITIONS, PLAN, ledger, INDEX, maps, batch record, handover',['KB: FACTS','KB: POSITIONS','KB: PLAN','KB: ledger','KB: INDEX and maps','KB: batch record','KB: handover/other docs']),
 ('specification',['KB: specification']),
 ('reports, records, transcripts of the rung chain',['reports and artifacts of the rung chain']),
 ('source, library, tests',['source (Java, Scala)','Fortress library','tests']),
 ('search (grep, find, ls, git log)',['search (grep, find, ls, git log)']),
 ('git diff, show, status',['git diff/show/status']),
 ('edit product and tests',['edit: product (src, library, spec)','edit: tests']),
 ('write probes, scratch',['write: probes and scratch']),
 ('write report files and record',['write: report files','edit: record (FACTS, ledger...)','structured result']),
 ('build, run tests/stages, run probes, wait',['build','run tests/stages','run probes','wait/poll']),
 ('read output (logs, results)',['read output (logs, results)']),
 ('git commit/push/ops',['git: commit/push/ops']),
 ('cache refill',['__refill']),
 ('other',['other']),
]
ROLES=['rung','skeptic','skeptic2','judge','repair','gather','gate','review','judge:review','repair:review','commit']
def cell(ags,keys):
    v=0
    for o in ags:
        for k in keys:
            if k=='__first': v+=o['w1']
            elif k=='__think': v+=o['think']
            elif k=='__refill': v+=o['refill']
            else: v+=sum(c['res']+c['inp'] for c in o['calls'] if grp(c['cls'])==k)
    return v/len(ags)
G=collections.defaultdict(list)
for o in O.values(): G[o['role']].append(o)
print('| class (K tokens written per agent) | '+' | '.join(ROLES)+' |')
print('|---|'+'---|'*len(ROLES))
tot={r:sum(o['W'] for o in G[r])/len(G[r]) for r in ROLES}
for name,keys in ROWS:
    print('| '+name+' | '+' | '.join('%.0f'%(cell(G[r],keys)/1000) for r in ROLES)+' |')
print('| **writes per agent** | '+' | '.join('**%.0f**'%(tot[r]/1000) for r in ROLES)+' |')
print('| agents | '+' | '.join(str(len(G[r])) for r in ROLES)+' |')
print()
print('shares %')
for name,keys in ROWS:
    print('| '+name+' | '+' | '.join('%.0f'%(100*cell(G[r],keys)/tot[r]) for r in ROLES)+' |')
