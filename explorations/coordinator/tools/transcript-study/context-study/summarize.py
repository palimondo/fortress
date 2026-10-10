#!/usr/bin/env python3 -I
import json,sys,collections
sys.path.insert(0,'.')
import classify as C
OVR={'G':{88:['RUN'],89:['RUN'],90:['RUN'],91:['RUN'],103:['EDIT'],66:['SETUP'],85:['SETUP'],87:['SETUP']},
     'C':{130:['RUN'],1:['SETUP']},'W':{2:['SETUP'],6:['SETUP']},'N':{3:['SETUP']}}
WIN={'W':(59,75),'N':(20,151),'G':(76,108),'C':(119,135)}
ORDER=['BRIEF','BRIEFING','SKILL','RCORE','RNOTES','TOOLS','CODE','LIB','SPEC','TEST','GIT','RUN','EDIT','SETUP']
def run(w,upto,verbose=False):
    d=C.load(w); turns=d['turns']
    calls=[e for e in d['events'] if e['k']=='call' and e['n']<=upto]
    cls=collections.defaultdict(lambda:[0,0,0.0])  # calls, bytes, tokens
    for c in calls:
        tg=OVR[w].get(c['n']) or C.classify(c,C.ROOTS[w])
        tg=list(dict.fromkeys(tg))
        # reading classes: drop SETUP/EDIT/RUN-only mixing: a call with EDIT counts as EDIT only
        if 'EDIT' in tg: tg=['EDIT']
        if len(tg)>1 and 'GIT' in tg and any(x in tg for x in('LIB','CODE','TEST','SPEC','RNOTES','RCORE','TOOLS')): tg=[x for x in tg if x!='GIT']+(['GIT'] if False else [])
        if len(tg)>1 and 'RUN' in tg: tg=[x for x in tg if x!='RUN'] if any(x not in('RUN','TOOLS') for x in tg) else ['RUN']
        if len(tg)>1 and 'TOOLS' in tg and 'RUN' not in tg and len(tg)==2 and tg[0]!=tg[1] and 'GIT' in tg: tg=['TOOLS']
        t=C.tok(c)
        for x in tg:
            cls[x][0]+=1/len(tg); cls[x][1]+=c['rbytes']/len(tg); cls[x][2]+=t/len(tg)
    # writes in window
    last_turn=calls[-1]['turn']
    writes=sum(turns[i]['input']+turns[i]['cc'] for i in range(last_turn+1))
    first=turns[0]; first_ctx=first['input']+first['cc']+first['cr']
    brief_tok=0.425*len(d['brief'])
    return cls,writes,first_ctx,brief_tok,len(d['brief']),len(calls)
if __name__=='__main__':
    for w in 'WNGC':
        for name,idx in(('A strict',0),('B fix',1)):
            cls,writes,fc,bt,bl,n=run(w,WIN[w][idx])
            tot_res=sum(v[2] for v in cls.values())
            print(f'== {w} window {name}: {n} calls, writes {writes/1000:.0f}K, first ctx {fc/1000:.0f}K, brief {bl} chars ~{bt/1000:.0f}K tok, result tokens {tot_res/1000:.0f}K')
            for k in ORDER:
                if k in cls:
                    v=cls[k]
                    print(f'   {k:9s} calls {v[0]:6.1f}  chars {v[1]:8.0f}  tokens {v[2]/1000:6.1f}K  {100*v[2]/writes:5.1f}% of writes  {100*v[2]/tot_res:5.1f}% of results')
