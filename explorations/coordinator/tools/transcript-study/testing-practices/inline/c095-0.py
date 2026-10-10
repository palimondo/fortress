import json,re,collections
for run,tag in [('wf_603242ca-111','b8'),('wf_f747fd3e-9e4','b9'),('wf_d5ec6194-bcc','b10')]:
    labels={}
    keys=collections.Counter()
    hits=[]
    for line in open(f'{run}/journal.jsonl'):
        d=json.loads(line)
        if d['type']=='started': labels[d['agentId']]=d['label']
        if d['type']=='result':
            r=d['result']
            lab=labels.get(d['agentId'])
            if isinstance(r,dict):
                for k in r: keys[k]+=1
                txt=json.dumps(r)
                for m in re.finditer(r'[^.]{0,160}(trap|a trap|had to|did not know|could not find|no instruction|undocumented|not documented|the brief did not|nothing says|figure out|worked out|learned)[^.]{0,200}',txt,re.I):
                    hits.append((lab,m.group(0)[:360]))
    print('==',tag,dict(keys))
    for h in hits[:40]: print('  ',h)
