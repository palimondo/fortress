import pickle,re,collections,json
exec(open('cost.py').read().split("res=collections.defaultdict")[0])
rxcreate=re.compile(r"cat\s*>\s*(\S+\.sh)\s*<<\s*'?\"?(\w+)'?\"?\n(.*?)\n\2\n",re.S)
def kind_of_body(body):
    if re.search(r'SystemJUTest|CompilerJUTest|LibraryJUTest|TestRunner',body): return 'suite'
    if re.search(r'checker|distance|DistanceMulti|shadow|ladder|classify|microgpt',body,re.I): return 'stage'
    if re.search(r'fortress\s+(compile|run|typecheck)|bin/fortress|Shell walk|\$FORTRESS_HOME/bin|\$H/bin/fortress|\$FH/bin/fortress',body): return 'probe'
    if re.search(r'export JAVA_HOME|run_bg|wait_for',body): return 'env'
    return 'other'
READ=re.compile(r'\s*(cd [^;&]*&&\s*)?(cat|sed -n|head|tail|grep|ls|wc|less)\b')
READ_ART={
 'stage':r'checker-count/run\.sh|distance/run\.sh|DistanceMulti|classify\.py|report\.py|run-subset\.sh|run-ladder\.sh|count-run|microgpt-phase',
 'suite':r'build\.xml|FileTests\.java|SystemJUTest|CompilerJUTest',
 'probe':r'Shell\.java|bin/fortress\b|ProjectProperties',
 'harness-junit':r'harness-one\.sh|merged-tests/junit\.sh',
 'env':r'experiment/env\.sh',
}
STAGE_EDIT=re.compile(r'(cp|sed\s+-i?e?)[^\n]*(run-subset|microgpt-phase|classify|report)\.(sh|py)')
P=collections.defaultdict(lambda:{'calls':0,'tok':0.0,'ite':0.0,'agents':set(),'byb':collections.Counter(),'byrole':collections.Counter()})
def add(name,tag,aid,a,k,c,share=1.0):
    p=P[name]; p['calls']+=1
    t=0.41*len(c.get('res') or '')+110+0.28*len(c['input'].get('command',''))
    p['tok']+=t*share; p['ite']+=call_cost(a,k)*share; p['agents'].add((tag,aid)); p['byb'][tag]+=1; p['byrole'][a['label'].split(':')[0]]+=1
for tag,ag in allr.items():
    for aid,a in ag.items():
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command',''); res=c['res'] or ''
            # script creation
            made=set()
            for m in rxcreate.finditer(cmd):
                kd=kind_of_body(m.group(3)); made.add(kd)
            if STAGE_EDIT.search(cmd): made.add('stage')
            for kd in made:
                if kd in('stage','suite','probe','env'): add('make-script:'+kd,tag,aid,a,k,c,1.0/len(made))
            # reading
            parts=re.split(r'&&|;',cmd)
            arts=set()
            for p_ in parts:
                if READ.match(p_):
                    for kd,r in READ_ART.items():
                        if re.search(r,p_): arts.add(kd)
            for kd in arts: add('read:'+kd,tag,aid,a,k,c,1.0/len(arts))
            # failures
            if 'harness-one' in cmd and 'tests does not exist' in res: add('fail:harness-one-relative',tag,aid,a,k,c)
            if 'Blocked: sleep' in res: add('fail:sleep-blocked',tag,aid,a,k,c)
            if 'moved to the background' in res: add('fail:wait-moved-bg',tag,aid,a,k,c)
            if 'denied by a built-in' in res: add('fail:auto-check-refusal',tag,aid,a,k,c)
            if re.search(r'-debug\s+(stacktrace|interpreter)',cmd): add('debug-flag',tag,aid,a,k,c)
for n in sorted(P):
    p=P[n]
    print(f"{n:28s} agents={len(p['agents']):3d} calls={p['calls']:3d} tok={p['tok']/1e3:6.0f}K ITE={p['ite']/1e3:6.0f}K b={dict(p['byb'])} roles={dict(p['byrole'])}")
print('----- gate/commit/gather excluded')
P2=collections.defaultdict(lambda:{'calls':0,'tok':0.0,'ite':0.0,'agents':set(),'roles':collections.Counter()})
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','gather','review','judge'): continue
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command',''); res=c['res'] or ''
            made=set()
            for m in rxcreate.finditer(cmd): made.add(kind_of_body(m.group(3)))
            if STAGE_EDIT.search(cmd): made.add('stage')
            names=[]
            for kd in made:
                if kd in('stage','suite','probe','env'): names.append('make-script:'+kd)
            parts=re.split(r'&&|;',cmd)
            arts=set()
            for p_ in parts:
                if READ.match(p_):
                    for kd,r in READ_ART.items():
                        if re.search(r,p_): arts.add(kd)
            names+=['read:'+x for x in arts]
            if not names: continue
            sh=1.0/len(names)
            for n in names:
                p=P2[n]; p['calls']+=1; p['tok']+=(0.41*len(res)+110+0.28*len(cmd))*sh; p['ite']+=call_cost(a,k)*sh; p['agents'].add((tag,aid)); p['roles'][role]+=1
for n in sorted(P2):
    p=P2[n]; print(f"{n:24s} agents={len(p['agents']):3d} calls={p['calls']:3d} tok={p['tok']/1e3:5.0f}K ITE={p['ite']/1e3:6.0f}K {dict(p['roles'])}")
