import pickle,re,collections
exec(open('cost.py').read().split("res=collections.defaultdict")[0])
rx=re.compile(r"cat\s*>\s*(\S+\.sh)\s*<<\s*'?\"?(\w+)'?\"?\n(.*?)\n\2\n",re.S)
rows=[]
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','gather','review','commit','judge'): continue
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            for m in rx.finditer(cmd):
                name,body=m.group(1).split('/')[-1],m.group(3)
                kind=None
                if re.search(r'SystemJUTest|CompilerJUTest|LibraryJUTest|TestRunner',body): kind='suite'
                elif re.search(r'checker|distance|DistanceMulti|shadow|ladder|classify|microgpt',body,re.I) and not re.search(r'^#.*env',body): kind='stage'
                elif re.search(r'fortress\s+(compile|run|typecheck)|bin/fortress|Shell walk|\$FORTRESS_HOME/bin|\$H/bin/fortress|\$FH/bin/fortress',body): kind='probe'
                elif re.search(r'export JAVA_HOME|run_bg|wait_for',body): kind='env'
                else: kind='other'
                rows.append((tag,a['label'],aid,c['i'],name,kind,len(body),call_cost(a,k)))
agg=collections.defaultdict(lambda:[set(),0,0.0])
for r in rows:
    key=r[5]
    agg[key][0].add((r[0],r[2])); agg[key][1]+=1; agg[key][2]+=r[7]
for k,v in agg.items(): print(k,'agents',len(v[0]),'scripts',v[1],'ITE(creation call only)',round(v[2]/1e3),'K')
byb=collections.defaultdict(lambda:collections.defaultdict(set))
for r in rows: byb[r[5]][r[0]].add(r[2])
for k,v in byb.items(): print(k,{b:len(s) for b,s in v.items()})
# agents per batch (non gate...)
nag=collections.Counter()
for tag,ag in allr.items():
    for aid,a in ag.items():
        if a['label'].split(':')[0] in('rung','skeptic','repair','skeptic2'): nag[tag]+=1
print(nag)
# list kind=other names
print([ (r[0],r[1],r[4]) for r in rows if r[5]=='other'][:20])
