import pickle,collections,sys
O=pickle.load(open('acct.pkl','rb'))
GROUP={
 'read:kb:briefing':'KB: briefing (facts-extract)',
 'read:kb:FACTS':'KB: FACTS','read:kb:POSITIONS':'KB: POSITIONS','read:kb:PLAN':'KB: PLAN','read:kb:ledger':'KB: ledger',
 'read:kb:map':'KB: INDEX and maps','read:kb:INDEX':'KB: INDEX and maps','read:kb:batch-record':'KB: batch record','read:kb:handover':'KB: handover/other docs','read:kb:otherdocs':'KB: handover/other docs',
 'read:spec':'KB: specification',
 'read:rung:artifacts':'reports and artifacts of the rung chain','read:transcripts':'reports and artifacts of the rung chain',
 'read:source':'source (Java, Scala)','read:library':'Fortress library','read:tests':'tests','read:probes':'tests',
 'search':'search (grep, find, ls, git log)',
 'git:diff-show':'git diff/show/status',
 'write:product':'edit: product (src, library, spec)','write:test':'edit: tests','write:scratch':'write: probes and scratch','write:report':'write: report files','write:kb':'edit: record (FACTS, ledger...)',
 'build':'build','run:tests-stages':'run tests/stages','run:probes':'run probes','wait:poll':'wait/poll',
 'read:output':'read output (logs, results)',
 'git:ops':'git: commit/push/ops','git:commit-push':'git: commit/push/ops',
 'report:structured':'structured result',
}
def grp(c): return GROUP.get(c,'other')
ORDER=['KB: briefing (facts-extract)','KB: FACTS','KB: POSITIONS','KB: PLAN','KB: ledger','KB: INDEX and maps','KB: batch record','KB: handover/other docs','KB: specification','reports and artifacts of the rung chain','source (Java, Scala)','Fortress library','tests','search (grep, find, ls, git log)','git diff/show/status','edit: product (src, library, spec)','edit: tests','write: probes and scratch','write: report files','edit: record (FACTS, ledger...)','build','run tests/stages','run probes','wait/poll','read output (logs, results)','git: commit/push/ops','structured result','other']
def summarize(ags):
    S=collections.Counter()
    for o in ags:
        S['_n']+=1; S['_W']+=o['W']; S['first (system, tools, brief)']+=o['w1']; S['own thinking and narration']+=o['think']; S['cache refill']+=o['refill']+max(0,o['resid'])*0
        for c in o['calls']: S[grp(c['cls'])]+=c['res']+c['inp']
    return S
def show(name,ags):
    S=summarize(ags); n=S['_n']; W=S['_W']
    print(f"== {name}  n={n}  mean writes {W/n/1000:.0f}K  total {W/1000:.0f}K")
    keys=['first (system, tools, brief)']+ORDER+['own thinking and narration','cache refill']
    for k in keys:
        v=S[k]
        if v>0: print(f"   {k:45s} {v/n/1000:7.1f}K {100*v/W:5.1f}%")
    acc=sum(S[k] for k in keys); print(f"   (accounted {acc/W*100:.1f}%)")
roles=collections.OrderedDict()
for o in O.values(): roles.setdefault(o['role'],[]).append(o)
if __name__=='__main__':
    for r,ags in roles.items(): show(r,ags)
