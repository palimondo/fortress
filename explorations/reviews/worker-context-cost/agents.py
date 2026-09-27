import json,glob
D='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
RUNS=[('wf_aabc0cb2-d31','repair batch','Opus 5'),('wf_3b5a273c-a80','batch 1','Opus 5'),('wf_d1628adb-2ee','batch 2','Opus 5'),
      ('wf_776d7c2c-6c3','batch 3','Opus 5.5'),('wf_207012c9-0ef','batch 3.5','Opus 5.5'),('wf_f54d0e4b-63d','batch 4','Opus 5.5'),
      ('wf_88172730-ebe','batch 5','Opus 5.5'),('wf_b262c534-337','batch 6','Opus 5.5')]
def agents(scope=('Rung','Skeptic')):
    out=[]
    for w,name,tier in RUNS:
        for m in sorted(glob.glob(f'{D}/{w}/*.meta.json')):
            d=json.load(open(m))
            if d['workflowPhase'] not in scope: continue
            role=d['description']
            kind='skeptic' if role.startswith('skeptic') else ('repair' if role.startswith(('repair','resume')) else 'rung')
            out.append(dict(wf=w,batch=name,tier=tier,role=role,kind=kind,path=m.replace('.meta.json','.jsonl'),aid=m.split('agent-')[1][:17]))
    return out
