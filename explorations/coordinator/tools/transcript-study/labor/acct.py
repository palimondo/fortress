import pickle,json,os,re,collections
from cls2 import classify
A=pickle.load(open('agents.pkl','rb'))
TPC=0.40  # tokens per char of result/call text
PER_RES=110
def role_of(label):
    base=label.split(':')[0]
    return {'rung':'rung','skeptic':'skeptic','skeptic2':'skeptic2','judge':'judge','repair':'repair','gather':'gather','gate':'gate','review':'review','commit':'commit'}[base] if label not in('judge:review','repair:review','gate:after-review') else {'judge:review':'judge:review','repair:review':'repair:review','gate:after-review':'gate'}[label]
OUT={}
for aid,a in A.items():
    T=a['turns']; role=role_of(a['label'])
    calls=[]; turns=[]
    u=T[0]['usage']
    ctx1=u['cache_creation_input_tokens']+u['cache_read_input_tokens']+u['input_tokens']
    w1=u['cache_creation_input_tokens']+u['input_tokens']
    brief_chars=a['first_user'][-1]
    tot_think=0;tot_res=0;tot_inp=0;tot_refill=0;tot_new=0
    prev_ctx=ctx1
    for k in range(1,len(T)):
        uk=T[k]['usage']
        ctx=uk['cache_creation_input_tokens']+uk['cache_read_input_tokens']+uk['input_tokens']
        wk=uk['cache_creation_input_tokens']+uk['input_tokens']
        new=ctx-prev_ctx
        refill=max(0,wk-new)
        pc=T[k-1]['calls']
        items=[]
        for c in pc:
            r=classify(c['name'],c['input'])
            res=(TPC*len(c.get('text','')) + PER_RES) if c['rbytes'] or c.get('rts') else 0
            res=TPC*c['rbytes']+PER_RES if c.get('rts') else 0
            inp=TPC*len(json.dumps(c['input']))
            items.append((c,r,res,inp))
        sres=sum(i[2] for i in items); sinp=sum(i[3] for i in items)
        if sres+sinp>new and sres+sinp>0:
            f=new/(sres+sinp); items=[(c,r,res*f,inp*f) for c,r,res,inp in items]; sres*=f; sinp*=f
        think=new-sres-sinp
        gap=T[k]['ts0']-max([c['rts'] for c in pc if c.get('rts')] or [T[k-1]['ts1']])
        for c,r,res,inp in items:
            calls.append(dict(aid=aid,turn=k-1,name=c['name'],cls=r['cls'],sub=r.get('sub'),files=r.get('files',[]),kinds=r.get('kinds',[]),res=res,inp=inp,rbytes=c['rbytes'],id=c['id'],input=c['input']))
        turns.append(dict(k=k,new=new,writes=wk,refill=refill,think=think,gap=gap,res=sres,inp=sinp,prev_calls=len(pc),prev_cls=[classify(c['name'],c['input'])['cls'] for c in pc],ts=T[k]['ts0']))
        tot_think+=think;tot_res+=sres;tot_inp+=sinp;tot_refill+=refill;tot_new+=new
        prev_ctx=ctx
    W=w1+sum(t['writes'] for t in turns)
    OUT[aid]=dict(aid=aid,batch=a['batch'],label=a['label'],role=role,calls=calls,turns=turns,ctx1=ctx1,w1=w1,cr1=u['cache_read_input_tokens'],brief_chars=brief_chars,W=W,think=tot_think,res=tot_res,inp=tot_inp,refill=tot_refill,new=tot_new,nturns=len(T),
        t0=T[0]['ts0'],t1=T[-1]['ts1'])
    # check closure
    OUT[aid]["resid"]=W-(w1+tot_new+tot_refill)
pickle.dump(OUT,open('acct.pkl','wb'))
for aid,o in OUT.items():
    print(o['batch'],o['label'],o['W'],'first',o['w1'],'refill',round(o['refill']),'think',round(o['think']),'res',round(o['res']),'inp',round(o['inp']))
