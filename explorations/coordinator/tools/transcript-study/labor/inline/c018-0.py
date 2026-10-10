import json,collections
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
f=B+'/wf_603242ca-111/agent-a226d80289a5176a7.jsonl'
byid=collections.OrderedDict()
types=collections.Counter()
for l in open(f):
    d=json.loads(l)
    types[d['type']]+=1
    if d['type']=='assistant':
        m=d['message']
        byid.setdefault(m['id'],[]).append((m.get('stop_reason'),m['usage'].get('output_tokens'),m['usage'].get('cache_creation_input_tokens'),m['usage'].get('input_tokens'),m['usage'].get('cache_read_input_tokens'),[b['type'] for b in m['content']]))
print(types, len(byid))
for i,(k,v) in enumerate(byid.items()):
    if i<8 or i>len(byid)-4: print(k,v)
# show keys of a tool_result user line
n=0
for l in open(f):
    d=json.loads(l)
    if d['type']=='user' and isinstance(d['message']['content'],list):
        print(list(d.keys())); print(json.dumps(d)[:700]); n+=1
        if n>=2: break
print(json.dumps(json.loads(open(f).readlines()[11])['attachment'])[:300])
u=json.loads(open(f).readlines()[12])['message']['usage']; print(u)
