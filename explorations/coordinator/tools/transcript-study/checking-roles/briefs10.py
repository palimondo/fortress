import json,re,sys,pickle
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc'
J=[json.loads(l) for l in open(B+'/journal.jsonl')]
lab={d['agentId']:d.get('label') for d in J if d['type']=='started'}
def first_user(aid):
    for l in open(f'{B}/agent-{aid}.jsonl'):
        d=json.loads(l)
        if d['type']=='user':
            c=d['message']['content']
            t=c if isinstance(c,str) else ''.join(b.get('text','') for b in c if b.get('type')=='text')
            if t: return t
        if d['type']=='assistant': return None
BR={aid:first_user(aid) for aid in lab}
pickle.dump((lab,BR),open('briefs10.pkl','wb'))
for aid,l in lab.items():
    t=BR[aid]; print(l,aid,len(t) if t else None)
