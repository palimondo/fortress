import json,re,sys
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
def first_msgs(run,aid):
    out=[]
    for l in open(f'{B}/{run}/agent-{aid}.jsonl'):
        d=json.loads(l)
        if d['type']=='user':
            c=d['message']['content']
            if isinstance(c,str): out.append(c)
            else:
                t=''.join(b.get('text','') for b in c if b.get('type')=='text')
                if t: out.append(t)
            if len(out)>=2: break
        if d['type']=='assistant': break
    return out
if __name__=='__main__':
    run,aid=sys.argv[1],sys.argv[2]
    m=first_msgs(run,aid)
    t=m[-1]
    print(len(t))
    pos=0
    for mm in re.finditer(r'^(#{1,4} .*|\[Workflow harness.*)$',t,re.M):
        print(mm.start(),mm.group(0)[:100])
