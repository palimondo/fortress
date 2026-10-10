import json
f="$f"
n=0
for l in open(f):
    d=json.loads(l)
    n+=1
    if n>40: break
    m=d.get('message',{})
    u=m.get('usage') if isinstance(m,dict) else None
    c=m.get('content') if isinstance(m,dict) else None
    desc=''
    if isinstance(c,list):
        for b in c:
            t=b.get('type')
            if t=='text': desc+=' TEXT:'+b['text'][:80].replace('\n',' ')
            elif t=='tool_use': desc+=' TOOL_USE:'+json.dumps(b['input'])[:120]
            elif t=='tool_result': desc+=' RESULT:'+str(b.get('content'))[:80].replace('\n',' ')
            elif t=='thinking': desc+=' THINK(len %d)'%len(b.get('thinking',''))
    elif isinstance(c,str): desc=' STR(%d):'%len(c)+c[:80].replace('\n',' ')
    att=d.get('attachment')
    if att: desc+=' ATT:'+str(att.get('type'))+' '+str(att)[:150]
    print(n,d['type'],(m.get('id') if isinstance(m,dict) else ''), (u and {k:u[k] for k in ('input_tokens','cache_creation_input_tokens','cache_read_input_tokens','output_tokens') if k in u}), desc[:300])
