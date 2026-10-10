import pickle,collections,sys
from matrix10 import O,cell,sel
TPC=0.425
KINDS=[
 ('harness start (system prompt, tools, attachments), written part',None),
 ('the brief',None),
 ('thinking and narration',['__think']),
 ('record: briefing and record documents',['KB: briefing (facts-extract)','KB: FACTS','KB: POSITIONS','KB: PLAN','KB: ledger','KB: INDEX and maps','KB: batch record','KB: handover/other docs']),
 ("earlier agents' reports and transcripts",['reports and artifacts of the rung chain']),
 ('the diff (git diff, show, status)',['git diff/show/status']),
 ('the original tree: specification, source, library, tests, search',['KB: specification','source (Java, Scala)','Fortress library','tests','search (grep, find, ls, git log)']),
 ('running programs: builds, tests, stages, probes, writing probes',['build','run tests/stages','run probes','write: probes and scratch']),
 ('waiting and reading run output',['wait/poll','read output (logs, results)']),
 ('writing: reports, edits, commits',['write: report files','edit: record (FACTS, ledger...)','structured result','edit: product (src, library, spec)','edit: tests','git: commit/push/ops','other']),
]
def kinds(ags):
    out=collections.OrderedDict()
    n=len(ags)
    br=sum(o['brief_chars']*TPC for o in ags)/n
    w1=sum(o['w1'] for o in ags)/n
    for name,keys in KINDS:
        if name.startswith('harness'): v=sum(max(0,o['w1']-o['brief_chars']*TPC) for o in ags)/n
        elif name=='the brief': v=sum(min(o['w1'],o['brief_chars']*TPC) for o in ags)/n
        else: v=cell(ags,keys)
        out[name]=v
    return out
def show(label,ags):
    n=len(ags); W=sum(o['W'] for o in ags)/n
    k=kinds(ags)
    print(f'== {label} (n={n}, {W/1000:.0f}K writes per agent, {sum(o["W"] for o in ags)/1000:.0f}K together)')
    tot=0
    for name,v in k.items():
        print(f'   {name:70s} {v/1000:6.1f}K {100*v/W:4.0f}%'); tot+=v
    print(f'   (accounted {100*tot/W:.0f}%; cache refill {sum(o["refill"] for o in ags)/n/1000:.1f}K)')
if __name__=='__main__':
    for r in ['rung','skeptic','judge','skeptic2','repair']:
        show(r,sel(10,r))
    ch=sel(10,'skeptic')+sel(10,'judge')+sel(10,'skeptic2')
    show('checking roles pooled',ch)
