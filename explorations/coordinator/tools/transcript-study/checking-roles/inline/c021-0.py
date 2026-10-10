import json
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/journal.jsonl'
for l in open(B):
    d=json.loads(l)
    if d['type']=='started': print(d['agentId'],d.get('label'),d.get('key'))
