import pickle,re,statistics
allr=pickle.load(open('all.pkl','rb'))
vals={'b8':[],'b9':[],'b10':[]}
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','gather','review','judge'): continue
        seen=set()
        for c in a['calls']:
            if c['name']=='Bash' and c['res']:
                for m in re.finditer(r'BUILD SUCCESSFUL\s*(?:\d+:)?\s*Total time: (?:(\d+) minutes? )?(\d+) seconds?',c['res']):
                    t=int(m.group(1) or 0)*60+int(m.group(2))
                    if t>400: continue   # test suites
                    key=(c['i'],t)
                    if key in seen: continue
                    seen.add(key); vals[tag].append(t)
for t,v in vals.items():
    print(t,len(v),'min',min(v),'median',statistics.median(v),'max',max(v),'p75',sorted(v)[int(len(v)*.75)])
allv=sum(vals.values(),[])
print('all',len(allv),statistics.median(allv),max(allv))
