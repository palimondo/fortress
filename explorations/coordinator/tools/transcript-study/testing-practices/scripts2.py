import re,collections
src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
def kind2(body,name):
    if re.search(r'SystemJUTest|CompilerJUTest|LibraryJUTest|TestRunner',body): return 'suite'
    if re.search(r'DistanceMulti|tools/distance|checker-count|run-subset|ladder|microgpt-phase|shadow-patch|count-run|classify\.py|dev-?check|probe\.componentOnly|compiled checker|\-stop typecheck|checkApi',body): return 'stage-ish'
    if re.search(r'fortress\s+(compile|run|typecheck)|bin/fortress|Shell walk|\$FORTRESS_HOME/bin|\$H/bin/fortress|\$FH/bin/fortress|\$B/bin/fortress|\$W/bin/fortress',body): return 'probe'
    if re.search(r'export JAVA_HOME|run_bg|wait_for',body): return 'env'
    return 'other'
rows=[]
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','gather','review','judge'): continue
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            for m in rxcreate.finditer(cmd):
                nm=m.group(1).split('/')[-1]
                rows.append((tag,a['label'],aid,c['i'],nm,kind2(m.group(3),nm),call_cost(a,k)))
            if STAGE_EDIT.search(cmd) and not rxcreate.search(cmd):
                rows.append((tag,a['label'],aid,c['i'],'(copy+sed of a stage script)','stage-copy',call_cost(a,k)))
by=collections.defaultdict(lambda:{'agents':set(),'n':0,'ite':0.0})
for r in rows:
    b=by[r[5]]; b['agents'].add((r[0],r[2])); b['n']+=1; b['ite']+=r[6]
for k,v in by.items(): print(k,len(v['agents']),v['n'],round(v['ite']/1e3),'K')
print([ (r[0],r[1],r[4]) for r in rows if r[5] in('stage-ish','stage-copy')])
