import json,glob
n=0
for f in glob.glob('agent-*.jsonl'):
    for l in open(f):
        d=json.loads(l)
        if d['type']=='assistant':
            for b in d['message']['content']:
                if b['type']=='tool_use' and (b['name']=='Skill' or 'fortress-repo' in json.dumps(b['input'])):
                    n+=1; print(f,b['name'],json.dumps(b['input'])[:150])
print('skill calls or reads of the skill by any batch-10 agent:',n)
