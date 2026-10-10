import json
J='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/journal.jsonl'
lab={}
for l in open(J):
    d=json.loads(l)
    if d['type']=='started': lab[d['key']]=d.get('label')
    elif d['type']=='result':
        r=d.get('result')
        l=lab.get(d['key'])
        if isinstance(r,dict):
            print(l,{k:(len(v) if isinstance(v,(str,list,dict)) else v) for k,v in r.items()})
        else: print(l,type(r),str(r)[:100])
