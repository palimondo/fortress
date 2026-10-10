import json,re
S='/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/context-study'
for name,f in [('W','agent-ac7f17fcef729d710.jsonl'),('N','agent-a9d085d2ca3d1673f.jsonl'),('G','agent-ad8b9ef1d620d222e.jsonl'),('C','agent-a17102eab231ad505.jsonl')]:
    first=json.loads(open(f).readline())
    c=first['message']['content']
    open(f'{S}/brief-{name}.txt','w').write(c)
    print(name,len(c))
