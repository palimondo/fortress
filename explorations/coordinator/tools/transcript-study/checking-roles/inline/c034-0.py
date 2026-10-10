import json
J='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/journal.jsonl'
lab={}
res={}
for l in open(J):
    d=json.loads(l)
    if d['type']=='started': lab[d['key']]=d.get('label')
    elif d['type']=='result': res[lab[d['key']]]=d['result']
json.dump(res,open('results10.json','w'))
r=res['judge:N']
print(r['kind'],r['decision'])
print(r['ruling'])
print('---SPEC'); print(r['specRuling'])
print('---INSTR'); 
for i in r['instructions']: print('-',i[:600])
