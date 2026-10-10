import json
f='wf_d5ec6194-bcc/agent-a17102eab231ad505.jsonl'
n=0
for l in open(f):
    d=json.loads(l)
    if d['type'] in('assistant','user') and n<12:
        m=d['message']
        c=m['content']
        if isinstance(c,list):
            for b in c:
                t=b.get('type')
                s=json.dumps(b)[:400]
                print(d['type'],t,s)
        else:
            print(d['type'],'str',c[:100])
        n+=1
        print(' keys',list(d.keys()), m.get('usage') and {k:v for k,v in m['usage'].items() if 'tokens' in k})
