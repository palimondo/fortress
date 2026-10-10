import json,glob,os,pickle,datetime,re
B='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
RUNS={'wf_603242ca-111':8,'wf_f747fd3e-9e4':9}
def ts(s): return datetime.datetime.fromisoformat(s.replace('Z','+00:00')).timestamp()
def rbytes(c):
    if isinstance(c,str): return len(c)
    if isinstance(c,list):
        n=0
        for b in c:
            if isinstance(b,dict):
                if b.get('type')=='text': n+=len(b.get('text',''))
                else: n+=len(json.dumps(b))
            else: n+=len(str(b))
        return n
    return len(json.dumps(c))
def rtext(c):
    if isinstance(c,str): return c
    if isinstance(c,list): return '\n'.join(b.get('text','') for b in c if isinstance(b,dict) and b.get('type')=='text')
    return ''
def parse_agent(path):
    turns=[]; byid={}
    results={}   # tool_use_id -> dict
    pending_att=0  # reminder chars since last assistant
    first_user=[]  # first user msgs (str)
    att_sizes=[]   # attachments before first assistant: (type,chars)
    other_user=[] # (turn_index_before, chars) for user text msgs mid-conversation
    sys_len=0
    for l in open(path):
        d=json.loads(l); t=d['type']
        if t=='attachment':
            a=d['attachment']; sz=len(json.dumps(a))
            if a.get('type')=='prompt_snapshot':
                if not turns:
                    sp=a.get('systemPrompt'); sys_len=len(json.dumps(sp))
                    tl=a.get('tools'); 
                    if tl is not None: sys_len+=len(json.dumps(tl))
                continue
            if not turns: att_sizes.append((a.get('type'),sz))
            else: pending_att+=len(d.get('rendered') or '') if d.get('rendered') else sz//2
            continue
        if t=='user':
            c=d['message']['content']
            if isinstance(c,str):
                if not turns: first_user.append(len(c))
                else: other_user.append((len(turns),len(c)))
            else:
                for b in c:
                    if b.get('type')=='tool_result':
                        results[b['tool_use_id']]=dict(bytes=rbytes(b.get('content')),err=bool(b.get('is_error')),ts=ts(d['timestamp']),text=rtext(b.get('content')))
                    elif b.get('type')=='text':
                        if not turns: first_user.append(len(b['text']))
                        else: other_user.append((len(turns),len(b['text'])))
            continue
        if t=='assistant':
            m=d['message']; mid=m['id']
            if mid not in byid:
                tr=dict(id=mid,ts0=ts(d['timestamp']),ts1=ts(d['timestamp']),calls=[],textchars=0,thinking=False,att_before=pending_att,usage=None,stop=None,out=0)
                pending_att=0
                byid[mid]=tr; turns.append(tr)
            tr=byid[mid]; tr['ts1']=ts(d['timestamp'])
            u=m['usage']; tr['usage']=u; tr['out']=max(tr['out'],u.get('output_tokens',0))
            if m.get('stop_reason'): tr['stop']=m['stop_reason']
            for b in m['content']:
                if b['type']=='tool_use': tr['calls'].append(dict(id=b['id'],name=b['name'],input=b['input']))
                elif b['type']=='text': tr['textchars']+=len(b['text'])
                elif b['type']=='thinking': tr['thinking']=True
    for tr in turns:
        for c in tr['calls']:
            r=results.get(c['id'])
            c['rbytes']=r['bytes'] if r else 0
            c['rts']=r['ts'] if r else None
            c['err']=r['err'] if r else False
            c['text']=r['text'] if r else ''
    return dict(turns=turns,first_user=first_user,att_sizes=att_sizes,other_user=other_user,sys_len=sys_len)
if __name__=='__main__':
    out={}
    for run,b in RUNS.items():
        lab={}
        for l in open(f'{B}/{run}/journal.jsonl'):
            d=json.loads(l)
            if d['type']=='started': lab[d['agentId']]=d.get('label')
        for aid,label in lab.items():
            p=f'{B}/{run}/agent-{aid}.jsonl'
            a=parse_agent(p); a['batch']=b; a['label']=label; a['aid']=aid; a['run']=run
            out[aid]=a
    pickle.dump(out,open('agents.pkl','wb'))
    for aid,a in out.items():
        tt=a['turns']; w=sum(t['usage']['cache_creation_input_tokens']+t['usage']['input_tokens'] for t in tt)
        print(a['batch'],a['label'],aid,len(tt),'writes',w,'sys',a['sys_len'],'first_user',a['first_user'],'att',sum(x[1] for x in a['att_sizes']))
