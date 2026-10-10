import json
for r in ['wf_603242ca-111','wf_f747fd3e-9e4','wf_d5ec6194-bcc']:
    print('==',r)
    for line in open(f'{r}/journal.jsonl'):
        d=json.loads(line)
        if d['type']=='started':
            print(d['agentId'],d['label'],d['phase'])
