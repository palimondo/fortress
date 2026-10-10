import json,re
run='wf_d5ec6194-bcc'
labels={}
for line in open(f'{run}/journal.jsonl'):
    d=json.loads(line)
    if d['type']=='started': labels[d['agentId']]=d['label']
    if d['type']=='result' and labels.get(d['agentId']) in ('rung:N','rung:G'):
        txt=json.dumps(d['result']).replace('\\n','\n')
        for m in re.finditer(r'[^\n]{0,300}(subset|walk tests|the interpreter tests|tests that read|every test|hand|46 tests|14 tests|42 tests)[^\n]{0,300}',txt):
            print(labels[d['agentId']],'::',m.group(0)[:600]); print()
