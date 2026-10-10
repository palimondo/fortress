import json,re
ids={'N':'a3efce1e24bbeda39','G':'a17fa6c49e2058f77','W':'a67eeefc52d0d3403','C':'a0870bca7f79bbd8d'}
for w,i in ids.items():
    d=json.load(open(f'json/{i}.json'))
    calls=[e for e in d['events'] if e['k']=='call' and e['tool']=='Bash']
    r={}
    for name,pat in (('POSITIONS','POSITIONS|positions:'),('FACTS','FACTS\\.md'),('INDEX','INDEX\\.md|index:'),('ledger','fortress-gap-ledger|ledger:'),('transcript','agent-[0-9a-f]+\\.jsonl|subagents'),('worker REPORT','REPORT\\.md')):
        r[name]=[c['n'] for c in calls if re.search(pat,c['input'].get('command',''))]
    print(w,{k:(len(v),v[:6]) for k,v in r.items()})
    tb=sum(c['rbytes'] for c in d['events'] if c['k']=='call' and c['n'] in set(r['transcript']))
    print('   transcript-read bytes',tb,'~tokens',int(tb*0.41/1000),'K of',len(d['turns']),'turns')
