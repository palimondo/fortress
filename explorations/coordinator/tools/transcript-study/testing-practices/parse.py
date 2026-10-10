import json, os, sys, pickle
ROOT='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/'
RUNS={'b8':'wf_603242ca-111','b9':'wf_f747fd3e-9e4','b10':'wf_d5ec6194-bcc'}
def load_run(tag):
    run=RUNS[tag]
    labels={}
    for line in open(ROOT+run+'/journal.jsonl'):
        d=json.loads(line)
        if d['type']=='started':
            labels[d['agentId']]=d['label']
    out={}
    for aid,label in labels.items():
        f=ROOT+run+f'/agent-{aid}.jsonl'
        if not os.path.exists(f): continue
        calls=[]   # tool calls in order
        results={}
        turns=[]
        first_user=None
        seen_msg=set()
        for l in open(f):
            d=json.loads(l)
            t=d['type']
            m=d.get('message')
            if t=='user' and first_user is None:
                c=m['content']
                first_user=c if isinstance(c,str) else json.dumps(c)
            if t=='assistant':
                u=m.get('usage') or {}
                mid=m.get('id')
                if mid not in seen_msg:
                    seen_msg.add(mid)
                    turns.append({'ts':d['timestamp'],'cc':u.get('cache_creation_input_tokens',0),'inp':u.get('input_tokens',0),'cr':u.get('cache_read_input_tokens',0),'out':u.get('output_tokens',0)})
                for b in m['content']:
                    if b.get('type')=='tool_use':
                        calls.append({'id':b['id'],'name':b['name'],'input':b['input'],'ts':d['timestamp'],'turn':len(turns)})
                    elif b.get('type')=='text':
                        calls.append({'id':None,'name':'TEXT','input':{'text':b['text']},'ts':d['timestamp'],'turn':len(turns)})
            elif t=='user' and isinstance(m['content'],list):
                for b in m['content']:
                    if b.get('type')=='tool_result':
                        c=b.get('content')
                        if isinstance(c,list):
                            c=''.join(x.get('text','') for x in c if isinstance(x,dict))
                        results[b['tool_use_id']]=(c if isinstance(c,str) else str(c), b.get('is_error',False))
        for i,c in enumerate(calls):
            c['i']=i+1
            r=results.get(c['id'])
            c['res']=r[0] if r else None
            c['err']=r[1] if r else None
        out[aid]={'label':label,'calls':calls,'turns':turns,'first_user':first_user}
    return out
if __name__=='__main__':
    allr={}
    for tag in RUNS:
        allr[tag]=load_run(tag)
        print(tag,len(allr[tag]),sum(len(a['calls']) for a in allr[tag].values()))
    pickle.dump(allr,open('all.pkl','wb'))
