import pickle,collections,os,re,subprocess
from cls import kind_of_path,FILE_RE
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb')); briefs=pickle.load(open('briefs.pkl','rb'))
BASE={8:'493b4076f',9:'fa14a190c'}
def git(c,p):
    try: return subprocess.run(['git','-C','/home/user/fortress','show',f'{c}:{p}'],capture_output=True,text=True).stdout
    except Exception: return ''
REC={}
for b,c in BASE.items():
    facts=git(c,'explorations/coordinator/FACTS.md'); idx=git(c,'explorations/coordinator/INDEX.md')
    maps=''.join(git(c,'explorations/coordinator/map/'+m) for m in ['README.md','compile-path-walkthrough.md','design-intent-sources.md','dormant-code.md','modules-and-phases.md','spec-to-implementation.md','test-coverage.md'])
    REC[b]=dict(facts=facts,index=idx,maps=maps)
    print(b,len(facts),len(idx),len(maps))
def stem(f):
    b=os.path.basename(f); return b.rsplit('.',1)[0] if '.' in b else b
def named(text,f):
    b=os.path.basename(f); s=stem(f)
    if b in text: return True
    return len(s)>=6 and re.search(r'(?<![\w])'+re.escape(s)+r'(?![\w])',text) is not None
TERR={'read:source','read:library','read:tests','read:spec','read:kb:FACTS','read:kb:POSITIONS','read:kb:PLAN','read:kb:ledger','read:kb:INDEX','read:kb:map','read:kb:batch-record','read:kb:handover','read:kb:otherdocs'}
def run():
    res=collections.defaultdict(lambda:collections.Counter())
    detail=collections.defaultdict(list)
    for aid,o in O.items():
        brief=briefs[aid][1]
        # briefing text read by this agent
        ag=A[aid]
        btxt=''
        for t in ag['turns']:
            for c in t['calls']:
                r=None
        # collect briefing texts via calls
        btxt=''.join(c.get('text','') for t in ag['turns'] for c in t['calls'] if o and any(x['id']==c['id'] and x['cls']=='read:kb:briefing' for x in o['calls']))
        rec=REC[o['batch']]
        for c in o['calls']:
            cls=c['cls']
            tok=c['res']+c['inp']
            if cls=='search':
                res[(o['role'],'search (no file named)')]['tok']+=tok; res[(o['role'],'search (no file named)')]['n']+=1
                continue
            if cls not in TERR: continue
            fs=[f for f in c['files'] if kind_of_path(f) in ('source','library','tests','spec') or (kind_of_path(f) or '').startswith('kb:')]
            fs=sorted(set(fs))
            if not fs:
                res[(o['role'],'read (no file named)')]['tok']+=tok; res[(o['role'],'read (no file named)')]['n']+=1; continue
            for f in fs:
                if named(brief,f): k='1 named in the brief'
                elif named(btxt,f): k='2 named in the briefing it read'
                elif named(rec['facts']+rec['index'],f): k='3 on record (FACTS or INDEX)'
                elif named(rec['maps'],f): k='4 on record (maps only)'
                else: k='5 not on record'
                res[(o['role'],k)]['tok']+=tok/len(fs); res[(o['role'],k)]['n']+=1
                detail[(o['role'],k)].append((f,tok/len(fs)))
    return res,detail
if __name__=='__main__':
    res,detail=run()
    roles=sorted(set(r for r,_ in res))
    pickle.dump((dict(res),dict(detail)),open('explore.pkl','wb'))
    nag=collections.Counter(o['role'] for o in O.values())
    for r in ['rung','skeptic','judge','repair','skeptic2','gather','gate','review','judge:review','repair:review','commit']:
        print('==',r,nag[r])
        tot=sum(v['tok'] for (rr,k),v in res.items() if rr==r)
        for (rr,k),v in sorted(res.items()):
            if rr==r: print('   %-36s %7.1fK/agent  %5.1f%%  (%d file-reads)'%(k,v['tok']/nag[r]/1000,100*v['tok']/tot,v['n']))
