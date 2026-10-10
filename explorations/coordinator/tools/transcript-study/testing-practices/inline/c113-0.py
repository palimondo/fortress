import json,re
for run,tag in [('wf_603242ca-111','b8'),('wf_f747fd3e-9e4','b9'),('wf_d5ec6194-bcc','b10')]:
    labels={}
    for line in open(f'{run}/journal.jsonl'):
        d=json.loads(line)
        if d['type']=='started': labels[d['agentId']]=d['label']
        if d['type']=='result':
            lab=labels.get(d['agentId'])
            txt=json.dumps(d['result'])
            if not lab.startswith(('rung','repair','skeptic')): continue
            for m in re.finditer(r'[^.\\]{0,200}(whole suite|testSystem|the interpreter suite|whole-suite|interpreter corpus|all [0-9]+ (interpreter )?tests|the shards|509 tests|486 tests|the suite)[^.]{0,260}',txt):
                s=m.group(0).replace('\\n',' ')
                print(tag,lab,'::',s[:420]); break
