import json,re
for run,tag in [('wf_603242ca-111','b8'),('wf_f747fd3e-9e4','b9'),('wf_d5ec6194-bcc','b10')]:
    labels={}
    for line in open(f'{run}/journal.jsonl'):
        d=json.loads(line)
        if d['type']=='started': labels[d['agentId']]=d['label']
        if d['type']=='result':
            r=d['result']
            if isinstance(r,dict) and 'forPavol' in r and isinstance(r['forPavol'],list):
                for it in r['forPavol']:
                    s=json.dumps(it) if not isinstance(it,str) else it
                    if re.search(r'harness|junit|ant |build|cache|suite|script|tool|stage|distance|checker count|ladder|run-subset|wait|sleep|skill|stacktrace',s,re.I):
                        print(tag,labels[d['agentId']],'::',s[:500]); print()
