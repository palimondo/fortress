import json
f='agent-ac7f17fcef729d710.jsonl'
lines=[json.loads(l) for l in open(f).read().split('\n') if l]
from collections import Counter
print(Counter(d['type'] for d in lines))
for i,d in enumerate(lines[:40]):
    t=d['type']
    if t=='attachment':
        a=d['attachment']; print(i,'att',a.get('type'), str(a)[:150].replace('\n',' '))
    elif t in('assistant','user'):
        m=d['message']; c=m['content']
        if isinstance(c,str): print(i,t,'str',len(c))
        else:
            for b in c:
                bt=b['type']
                if bt=='tool_use': print(i,t,'tool_use',b['name'],json.dumps(b['input'])[:200])
                elif bt=='tool_result':
                    cc=b['content']; n=len(cc) if isinstance(cc,str) else sum(len(x.get('text','')) for x in cc)
                    print(i,t,'tool_result',n, b.get('tool_use_id'))
                elif bt=='text': print(i,t,'text',b['text'][:200].replace('\n',' '))
                else: print(i,t,bt,str(b)[:100])
        if t=='assistant': print('   usage',m.get('usage'), m.get('id'), m.get('stop_reason'))
