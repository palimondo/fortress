import json,sys,collections
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
for run in ['wf_603242ca-111','wf_f747fd3e-9e4']:
    print(run)
    seen={}
    for l in open(f'{B}/{run}/journal.jsonl'):
        d=json.loads(l)
        if d['type']=='started':
            seen[d['agentId']]=(d.get('label'),d.get('phase'))
    for k,v in seen.items(): print(' ',k,v)
