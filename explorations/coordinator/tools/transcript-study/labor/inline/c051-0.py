import json
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
f=B+'/wf_603242ca-111/agent-a226d80289a5176a7.jsonl'
n=0;tot=0
for l in open(f):
    d=json.loads(l)
    if d['type']=='assistant': break
    if d['type']=='attachment':
        r=d.get('rendered'); a=d['attachment']
        print(a['type'], 'rendered', len(r) if r else None, 'role',d.get('renderedRole'), 'json', len(json.dumps(a)))
        if r: tot+=len(r)
print('total rendered',tot)
